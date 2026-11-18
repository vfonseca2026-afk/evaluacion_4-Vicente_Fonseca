# Portafolio de Vicente Fonseca

Portafolio académico desarrollado para la Evaluación N.º 4 de Desarrollo de Frontend, asignatura ICINF1107 de Ingeniería Civil en Informática de la Universidad Católica de Temuco.

El proyecto migra el portafolio estático de la Evaluación N.º 2 a una aplicación React con TypeScript. Conserva su identidad visual e incorpora navegación mediante React Router, componentes reutilizables y consulta de repositorios públicos de GitHub.

## Tecnologías

- React.
- TypeScript con configuración estricta.
- Vite.
- React Router.
- CSS modular con nomenclatura BEM en la aplicación React.
- ESLint.
- GitHub REST API.

## Instalación y ejecución

Se requiere Node.js `^20.19.0` o `>=22.12.0`, según el contrato de la versión de Vite utilizada, y npm.

### Clonar el repositorio

```bash
git clone https://github.com/vfonseca2026-afk/evaluacion_4-Vicente_Fonseca.git
cd evaluacion_4-Vicente_Fonseca
```

### Instalar las dependencias

```bash
npm install
```

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrir la dirección que indique Vite en la terminal.

### Revisar el código y los tipos

```bash
npm run lint
npm run typecheck
```

### Generar la versión de producción

```bash
npm run build
```

Este comando comprueba los tipos de TypeScript y genera los archivos de producción en `dist/`.

### Previsualizar la compilación

```bash
npm run preview
```

## Secciones y rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada y presentación |
| `/sobre-mi` | Biografía y datos académicos |
| `/trabajos` | Proyectos históricos y repositorios de GitHub |
| `/contacto` | Formulario de contacto |
| Cualquier otra dirección | Página 404 con retorno al inicio |

La navegación utiliza `BrowserRouter`, `Routes`, `Route`, `Link` y `NavLink`. La barra de navegación identifica la sección activa.

## Estructura del proyecto

```text
public/
├── img/                 Imágenes del portafolio original
└── proyectos/           Proyectos históricos de la E2

src/
├── components/          Componentes reutilizables
├── context/             Proveedor y contexto del tema
├── data/                Datos estáticos de proyectos, campos y navegación
├── hooks/               Consulta asíncrona, acceso al tema y estado de scroll
├── pages/               Vistas asociadas a las rutas
├── services/            GitHub, caché y persistencia del tema
├── styles/              Layout, botones y variables de tema
├── types/               Interfaces y tipos exportados
├── utils/               Filtrado y validación de formulario
├── App.tsx              Estructura y configuración de rutas
├── main.tsx             Punto de entrada
└── index.css            Variables, reset y estilos base

scripts/
└── verificar-proyecto.cjs  Verificación automatizada

docs/
├── api-github.md           Contrato y funcionamiento de la API
├── estado-y-tema.md        Gestión de filtros y tema
├── verificacion-etapa-5.md  Alcance de pruebas y revisión manual
├── auditoria-accesibilidad.md  Evidencias y registro manual
├── como-capturar-e2.md      Procedimiento de captura
└── captura-e2.png          Referencia visual original que debe incorporarse

INVENTARIO.md               Trazabilidad de la migración
uso_ia.md                   Declaración y reflexión sobre el uso de IA
```

## Migración desde la Evaluación N.º 2

Se recuperan:

- Paleta violeta, tipografías y fondo ilustrado.
- Avatar y textos de presentación.
- Sección Sobre mí.
- Tarjetas de Psicoanálisis Conductual, perfil de GitHub y Bitácora de hongos.
- Formulario de contacto y robot flotante.
- Barra de progreso de lectura y sombra del encabezado.
- Proyectos históricos con sus recursos.

Las secciones principales se convierten en vistas de React Router. Las tarjetas se generan desde datos separados y reciben información mediante props tipadas.

Los proyectos históricos se conservan en `public/proyectos/` como evidencias autónomas que se abren en otra pestaña.

La trazabilidad de componentes, estilos e interacciones se explica en [INVENTARIO.md](INVENTARIO.md).

### Referencia visual original

![Portafolio original de la Evaluación N.º 2](docs/captura-e2.png)

La imagen debe proceder del portafolio original conservado aparte, en alta resolución, sin reemplazarla por una captura de React. El procedimiento está en [Cómo capturar E2](docs/como-capturar-e2.md). Comprobar que el archivo esté incorporado antes del commit final.

Se preservan los recursos y la identidad visual. Los cambios de estructura responden al enrutamiento por vistas exigido por la evaluación, la separación de componentes y las mejoras de accesibilidad. El inventario distingue lo recuperado de lo añadido.

## Funcionalidades

### Filtros de trabajos

La búsqueda permite filtrar por título, descripción y tecnología,
ignorando mayúsculas y tildes. Puede combinarse con la selección
de una tecnología.

El estado vive en ProjectsPage y se comparte mediante props entre
los controles y los resultados. La lista filtrada se calcula a partir
de ese estado, sin guardar una copia adicional.

### Preferencia de tema

ThemeProvider comparte el tema mediante Context API.
Los controles del encabezado y del pie modifican la misma preferencia.

La elección se conserva en localStorage. Si el almacenamiento está
bloqueado, el cambio continúa funcionando durante la sesión.

Más detalles en [Gestión de filtros y tema](docs/estado-y-tema.md).

### Formulario de contacto

Los campos se gestionan mediante estado de React.

El formulario comprueba los campos obligatorios, el formato del correo y que el nombre y el mensaje no contengan únicamente espacios. Los errores se asocian a cada campo mediante `aria-describedby` y `aria-invalid`; al validar, el foco pasa al primer campo inválido.

La confirmación indica que se trata de una validación local. No existe todavía un servicio de envío de correo.

### Contacto rápido

El robot abre un diálogo modal que reutiliza el componente del formulario.

El diálogo enfoca el primer campo al abrirse. Permite cerrar mediante su botón, con Escape o pulsando el fondo exterior, y devuelve el foco al botón de apertura.

### Repositorios de GitHub

La página Trabajos consulta los repositorios públicos del estudiante y muestra:

- Nombre.
- Descripción.
- Lenguaje principal.
- Cantidad de estrellas.
- Enlace al código fuente.

## Contrato de la API

Se utiliza GitHub REST API porque permite complementar los trabajos del portafolio con repositorios públicos reales.

**URL base:**

```text
https://api.github.com
```

**Endpoint:**

```text
GET /users/vfonseca2026-afk/repos?sort=updated&per_page=6
```

**Parámetros:**

| Parámetro | Valor | Propósito |
| --- | --- | --- |
| `sort` | `updated` | Ordenar por actualización |
| `per_page` | `6` | Solicitar hasta seis repositorios |

La consulta de estos recursos públicos no requiere incorporar un token en el frontend.

### Respuesta esperada

Ejemplo ilustrativo de los campos utilizados:

```json
[
  {
    "id": 1,
    "name": "mi-proyecto",
    "description": "Descripción del proyecto",
    "html_url": "https://github.com/vfonseca2026-afk/mi-proyecto",
    "language": "TypeScript",
    "stargazers_count": 0,
    "updated_at": "2026-11-17T12:00:00Z"
  }
]
```

`description` y `language` pueden ser `null`. La interfaz muestra textos alternativos cuando esos valores no están disponibles.

El JSON se recibe como `unknown` y se valida antes de utilizarlo. Los enlaces deben corresponder a direcciones HTTPS de GitHub.

### Estado asíncrono

El hook `useGitHubRepositories` gestiona explícitamente:

- Carga.
- Datos obtenidos.
- Error.

También se contempla una respuesta exitosa sin repositorios.

Las peticiones se realizan mediante `fetch`. Al desmontar el componente, la limpieza de `useEffect` utiliza `AbortController` para cancelar la consulta pendiente y evitar actualizaciones de estado obsoletas.

Las consultas tienen un límite de espera de 15 segundos.

### Caché y reintentos

Las respuestas correctas se almacenan en memoria durante cinco minutos.

Volver a Trabajos durante ese intervalo reutiliza los datos. Recargar la página elimina la caché en memoria.

Los botones Actualizar repositorios y Reintentar consulta fuerzan una nueva petición. Los errores no se almacenan en caché.

La implementación guarda respuestas completadas; no deduplica peticiones simultáneas. En StrictMode de desarrollo puede observarse una petición inicial cancelada por la limpieza del efecto.

Más detalles en [la documentación de la API](docs/api-github.md).

## Accesibilidad y diseño responsivo

La implementación incorpora:

- Elementos semánticos para navegación, contenido y tarjetas.
- Etiquetas asociadas a los campos mediante `htmlFor` e `id`.
- Foco visible para navegación por teclado.
- Mensajes de estado mediante `role="status"` y errores mediante `role="alert"`.
- Diálogo modal nativo.
- Estilos adaptables a distintos tamaños de pantalla.
- Respeto por la preferencia de movimiento reducido.

El alcance de las comprobaciones automatizadas, las revisiones generales declaradas por el autor y el registro específico de teclado y responsividad se distinguen en [Auditoría de accesibilidad](docs/auditoria-accesibilidad.md). Los once pares de contraste de referencia superan 4.5:1; no se declara una auditoría integral ni conformidad completa con WCAG. Completar los resultados manuales efectivamente ejecutados antes de entregar.

## Verificación

Antes de integrar cada avance se deben ejecutar:

```bash
npm run lint
npm run build
```
También puede ejecutarse el verificador automatizado:

```sh
node scripts/verificar-proyecto.cjs
node scripts/verificar-entrega.cjs
```

El primer verificador realiza 48 comprobaciones de CSS/BEM, vistas, etiquetas, validación, asociación de errores y once pares de contraste. No ejecuta los efectos del navegador ni sustituye la revisión visual y de teclado. Su alcance se explica en [Verificación de la etapa 5](docs/verificacion-etapa-5.md). El segundo comprueba los documentos, sus enlaces relativos, las seis secciones de la bitácora y la presencia de una captura PNG válida. Estos verificadores no sustituyen la revisión personal de los contenidos.

### Comprobaciones manuales

- Recorrer las cuatro rutas principales.
- Comprobar la navegación activa y el retorno al inicio.
- Abrir una ruta inexistente y revisar la página 404.
- Revisar las tarjetas y sus enlaces.
- Probar campos vacíos, correo inválido y mensajes válidos.
- Abrir el robot, cerrar con Escape y revisar el foco.
- Comprobar los repositorios y el botón de actualización.
- Simular falta de conexión y recuperar la consulta con Reintentar.
- Revisar la interfaz en móvil y con teclado.

El autor declaró revisiones manuales de distintas versiones y del alcance para el usuario. Los resultados específicos de teclado y tamaños de pantalla deben registrarse en [la auditoría](docs/auditoria-accesibilidad.md); no se atribuyen pruebas ni métricas que no se hayan realizado.

## Flujo de Git

El desarrollo se organiza mediante ramas por funcionalidad, commits convencionales y Pull Requests hacia `main`.

Organización de ramas por etapa:

- `feat/base-typescript`.
- `feat/migracion-portafolio`.
- `feat/consumo-api`.
- `feat/filtros-tema`.
- `style/bem-accesibilidad`.
- `docs/documentacion-final`.

Cada Pull Request debe describir los cambios, explicar cómo comprobarlos y revisarse antes de su integración.

## Despliegue

La compilación genera una aplicación estática en `dist/`.

Como se utiliza `BrowserRouter`, el alojamiento debe servir `index.html` al solicitar rutas de la aplicación como `/contacto`, conservando el acceso normal a los archivos estáticos.

La configuración del alojamiento y la publicación no están incluidas todavía.

## Uso de IA

La participación del asistente, los prompts, las verificaciones y la reflexión del autor se documentan en [uso_ia.md](uso_ia.md). El asistente generó una parte sustancial del código y la documentación; el autor dirigió y revisó las decisiones y aplicó los avances por etapas.

## Comprobación previa a la entrega

- Revisar que `docs/captura-e2.png` muestre el original en alta resolución.
- Completar los resultados reales de teclado y responsividad en la auditoría.
- Revisar que la reflexión de `uso_ia.md` represente la experiencia personal del autor.
- Ejecutar lint, build y los verificadores.
- Revisar el PR final y comprobar que los cambios estén integrados en `main`.

Las imágenes históricas conservan sus dimensiones originales. La optimización adicional y un servicio real de correo son posibles mejoras posteriores; no se presentan como implementadas.

## Autor

Vicente Fonseca  
Ingeniería Civil en Informática  
Universidad Católica de Temuco
