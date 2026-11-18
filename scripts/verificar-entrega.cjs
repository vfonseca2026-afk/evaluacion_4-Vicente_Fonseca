const fs = require('node:fs/promises')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const errors = []
const warnings = []

async function read(relative) {
  try {
    return await fs.readFile(path.join(root, relative), 'utf8')
  } catch {
    errors.push(`Falta el documento ${relative}`)
    return null
  }
}

async function main() {
  const files = ['README.md', 'INVENTARIO.md', 'uso_ia.md']
  try {
    for (const entry of await fs.readdir(path.join(root, 'docs'), { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.md')) files.push('docs/' + entry.name)
    }
  } catch {
    errors.push('Falta la carpeta docs')
  }

  let bitacora = null
  let audit = null
  let links = 0
  for (const relative of files) {
    const text = await read(relative)
    if (text === null) continue
    if (relative === 'uso_ia.md') bitacora = text
    if (relative === 'docs/auditoria-accesibilidad.md') audit = text

    let fence = null
    const prose = []
    for (const line of text.split(/\r?\n/)) {
      const marker = line.match(/^\s*(`{3,}|~{3,})/)
      if (marker) {
        if (!fence) fence = marker[1]
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null
      } else if (!fence) prose.push(line)
    }
    if (fence) errors.push(`Bloque de código sin cerrar en ${relative}`)

    for (const match of prose.join('\n').matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      const href = match[1]
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('#')) continue
      let target
      try {
        target = path.resolve(root, path.dirname(relative), decodeURIComponent(href.split('#')[0]))
      } catch {
        errors.push(`Enlace inválido en ${relative}: ${href}`)
        continue
      }
      if (!target.startsWith(root + path.sep)) {
        errors.push(`Enlace fuera del proyecto en ${relative}: ${href}`)
        continue
      }
      links++
      try { await fs.access(target) } catch { errors.push(`Enlace sin archivo en ${relative}: ${href}`) }
    }
  }

  if (bitacora) {
    const sections = [...bitacora.matchAll(/^## ([1-6])\./gm)].map(match => match[1]).join('')
    if (sections !== '123456') errors.push('uso_ia.md debe tener las seis secciones numeradas en orden')
    if (bitacora.includes('PENDIENTE PERSONAL')) errors.push('La bitácora todavía contiene apartados personales sin completar')
  }

  if (!audit) errors.push('Falta docs/auditoria-accesibilidad.md')
  else if (/\|\s*Por registrar\s*\|/i.test(audit) || /: por registrar\./i.test(audit)) {
    errors.push('Falta completar el registro real de teclado/responsividad y sus datos de ejecución en la auditoría')
  }

  try {
    const png = await fs.readFile(path.join(root, 'docs/captura-e2.png'))
    const signature = Buffer.from([137,80,78,71,13,10,26,10])
    if (png.length < 33 || !png.subarray(0,8).equals(signature) || png.toString('ascii',12,16) !== 'IHDR') {
      errors.push('docs/captura-e2.png no tiene una cabecera PNG válida')
    } else {
      const width = png.readUInt32BE(16)
      const height = png.readUInt32BE(20)
      if (width < 1280 || height < 720) {
        errors.push(`La captura es pequeña (${width} x ${height}). Obtener una referencia de escritorio en alta resolución; se recomienda 1440 px de ancho o más`)
      } else console.log(`Captura encontrada: ${width} x ${height}`)
      warnings.push('Comprobar visualmente que la captura muestre el original E2 completo; el script no verifica su contenido ni decodifica todos los píxeles')
    }
  } catch {
    errors.push('Falta docs/captura-e2.png: capturar el portafolio original y guardar el PNG en esa ruta')
  }

  console.log(`Documentos revisados: ${files.length}. Enlaces relativos comprobados: ${links}.`)
  for (const message of [...new Set(warnings)]) console.log('REVISIÓN MANUAL: ' + message)
  if (errors.length) {
    for (const message of [...new Set(errors)]) console.error('PENDIENTE: ' + message)
    process.exitCode = 1
  } else {
    console.log('PASS: estructura documental, enlaces, bitácora y cabecera/dimensiones de la captura. Revisar personalmente exactitud y evidencia antes de entregar.')
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
