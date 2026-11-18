const fs = require('node:fs/promises')
const path = require('node:path')
const assert = require('node:assert/strict')
const Module = require('node:module')
const os = require('node:os')
let generatedDirectory
const base = path.resolve(__dirname, '..')
const ts = require(path.join(base, 'node_modules/typescript'))
const postcss = require(path.join(base, 'node_modules/postcss'))

async function main() {
  const runtime = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-verificacion-'))
  generatedDirectory = runtime
  let passed = 0
  async function compile(folder) {
    for (const file of await fs.readdir(folder, { withFileTypes: true })) {
      const source = path.join(folder, file.name)
      if (file.isDirectory()) { await compile(source); continue }
      if (file.name.endsWith('.d.ts')) continue
      const relative = path.relative(path.join(base, 'src'), source)
      if (!/\.(tsx?|css)$/.test(relative)) continue
      const target = path.join(runtime, relative.replace(/\.tsx?$/, '.js'))
      await fs.mkdir(path.dirname(target), { recursive: true })
      const text = await fs.readFile(source, 'utf8')
      if (relative.endsWith('.css')) {
        const stylesheet = postcss.parse(text)
        stylesheet.walkRules(rule => {
          for (const match of rule.selector.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)/g)) {
            assert.match(match[1], /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?(?:--[a-z][a-z0-9]*(?:-[a-z0-9]+)*)?$/, 'Clase fuera de BEM: ' + match[1])
          }
        })
        passed++
      }
      await fs.writeFile(target, relative.endsWith('.css') ? text : ts.transpileModule(text, {
        compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      }).outputText)
    }
  }
  await compile(path.join(base, 'src'))
  process.env.NODE_PATH = path.join(base, 'node_modules')
  Module._initPaths()
  require.extensions['.css'] = () => {}
  const React = require('react')
  const { renderToStaticMarkup } = require('react-dom/server')
  const { MemoryRouter } = require('react-router-dom')
  const App = require(path.join(runtime, 'App.js')).default
  const ThemeProvider = require(path.join(runtime, 'context/ThemeProvider.js')).default
  const ContactField = require(path.join(runtime, 'components/ContactField.js')).default
  const { validateContact } = require(path.join(runtime, 'utils/contactValidation.js'))
  const { contactFields } = require(path.join(runtime, 'data/contactFields.js'))
  const render = route => renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [route] },
    React.createElement(ThemeProvider, null, React.createElement(App))))

  for (const [route, title] of [['/', 'Vicente'], ['/sobre-mi', 'Sobre mí'], ['/trabajos', 'Trabajos y evidencias'], ['/contacto', 'Contacto'], ['/inexistente', '404']]) {
    const markup = render(route)
    const main = markup.match(/<main[^>]*>(.*?)<\/main>/s)[1]
    assert.equal((main.match(/<h1[\s>]/g) || []).length, 1)
    assert.match(main.match(/<h1[^>]*>(.*?)<\/h1>/s)[1], new RegExp(title))
    assert.match(main, /<h1[^>]*tabindex="-1"/)
    assert.equal((main.match(/<article class="card"/g) || []).length, route === '/trabajos' ? 3 : 0)
    assert.equal(/id="contact-nombre"/.test(main), route === '/contacto')
    assert.equal(/id="hero-heading"/.test(main), route === '/')
    assert.equal((markup.match(/aria-current="page"/g) || []).length, ['/sobre-mi','/trabajos','/contacto'].includes(route) ? 1 : 0)
    const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    assert.equal(ids.length, new Set(ids).size)
    for (const label of markup.matchAll(/<label[^>]*for="([^"]+)"/g)) assert.ok(ids.includes(label[1]))
    assert.match(markup, /aria-haspopup="dialog"/)
    assert.match(markup, /class="page-progress" aria-hidden="true"/)
    passed++
  }

  const valid = { nombre: 'Vicente', email: 'vicente@example.com', asunto: '', mensaje: 'Hola' }
  for (const [changes, expected] of [[{}, []], [{nombre:'  '},['nombre']], [{email:''},['email']], [{email:'sin-arroba'},['email']], [{email:'a@@b.cl'},['email']], [{email:'a b@example.com'},['email']], [{mensaje:'\n\t'},['mensaje']], [{nombre:'',email:'',mensaje:''},['nombre','email','mensaje']], [{email:'  nombre+proyecto@correo.cl  '},[]]]) {
    const values = {...valid,...changes}
    const before = JSON.stringify(values)
    assert.deepEqual(Object.keys(validateContact(values)),expected)
    assert.equal(JSON.stringify(values),before)
    passed++
  }
  for (const field of contactFields) {
    const markup = renderToStaticMarkup(React.createElement(ContactField, {field,prefix:'test',value:'',error:'Revisa este campo.',onChange:()=>{}}))
    assert.match(markup,new RegExp(`aria-describedby="test-${field.name}-error"`))
    assert.match(markup,/aria-invalid="true"/)
    assert.match(markup,new RegExp(`id="test-${field.name}-error"`))
    assert.match(markup,new RegExp(`for="test-${field.name}"`))
    passed++
  }

  function luminance(hex) {
    const rgb = hex.match(/[0-9a-f]{2}/gi).map(value=>parseInt(value,16)/255)
      .map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4)
    return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722
  }
  const pairs = [
    ['ffffff','24124c'], ['aab8cc','170a35'], ['64748b','faf8ff'], ['9a3412','ffffff'],
    ['ffb4ab','24124c'], ['475569','f6f2fc'], ['1a0b3b','fcd1ae'], ['3b1478','ede9fe'],
    ['4c1d95','ffffff'], ['ffffff','4c1d95'], ['140a2b','faf8ff'],
  ]
  for (const [text,bg] of pairs) {
    const values = [luminance(text),luminance(bg)].sort((a,b)=>b-a)
    const ratio=(values[0]+.05)/(values[1]+.05)
    assert.ok(ratio>=4.5, `${text}/${bg} = ${ratio}`)
    passed++
  }
  console.log(`PASS: ${passed} comprobaciones de CSS/BEM, vistas separadas, títulos, navegación activa, etiquetas e IDs, validación, errores asociados y 11 pares de contraste >= 4.5:1.`)
}
main().catch(error => { console.error(error); process.exitCode = 1 }).finally(async () => {
  if (!generatedDirectory) return
  const resolved = path.resolve(generatedDirectory)
  if (path.dirname(resolved) !== path.resolve(os.tmpdir()) || !path.basename(resolved).startsWith('portfolio-verificacion-')) {
    throw new Error('La carpeta temporal no pertenece a esta verificación')
  }
  await fs.rm(resolved, { recursive: true, force: true })
})
