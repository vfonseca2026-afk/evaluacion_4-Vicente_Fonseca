# Portafolio de Vicente Fonseca

Portafolio académico desarrollado para la Evaluación N.º 4 de Desarrollo de Frontend, asignatura ICINF1107 de Ingeniería Civil en Informática de la Universidad Católica de Temuco.

El proyecto migra el portafolio estático de la Evaluación N.º 2 a una aplicación React con TypeScript. Conserva su identidad visual e incorpora navegación mediante React Router, componentes reutilizables y consulta de repositorios públicos de GitHub.

## Tecnologías

- React.
- TypeScript con configuración estricta.
- Vite.
- React Router.
- CSS con nomenclatura BEM en los componentes adaptados.
- ESLint.
- GitHub REST API.

## Instalación y ejecución

Se requiere Node.js compatible con Vite 8 y npm.

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
├── data/                Datos estáticos de los proyectos
├── hooks/               Lógica de consulta y estado asíncrono
├── pages/               Vistas asociadas a las rutas
├── services/            Comunicación con GitHub y caché
├── types/               Interfaces y tipos exportados
├── App.tsx              Estructura y configuración de rutas
├── main.tsx             Punto de entrada
└── index.css            Estilos generales y diseño recuperado

docs/
└── api-github.md         Contrato y funcionamiento de la API
```

## Migración desde la Evaluación N.º 2

Se recuperan:

- Paleta violeta, tipografías y fondo ilustrado.
- Avatar y textos de presentación.
- Sección Sobre mí.
- Tarjetas de Psicoanálisis Conductual, perfil de GitHub y Bitácora de hongos.
- Formulario de contacto y robot flotante.
- Proyectos históricos con sus recursos.

Las secciones principales se convierten en vistas de React Router. Las tarjetas se generan desde datos separados y reciben información mediante props tipadas.

Los proyectos históricos se conservan en `public/proyectos/` como evidencias autónomas que se abren en otra pestaña.

La captura comparativa de E2 y el inventario detallado de migración están pendientes de incorporarse en la etapa de documentación.

## Funcionalidades

### Formulario de contacto

Los campos se gestionan mediante estado de React.

El formulario comprueba los campos obligatorios, el formato del correo y que el nombre y el mensaje no contengan únicamente espacios.

La confirmación indica que se trata de una validación local. No existe todavía un servicio de envío de correo.

### Contacto rápido

El robot abre un diálogo modal que reutiliza el componente del formulario.

El diálogo permite cerrar mediante su botón o con Escape y devuelve el foco al botón de apertura.

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

Estos elementos forman parte de la implementación. La auditoría integral de accesibilidad y su evidencia final todavía están pendientes; no se declara conformidad completa con WCAG.

## Verificación

Antes de integrar cada avance se deben ejecutar:

```bash
npm run lint
npm run build
```

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

Los resultados de la revisión manual y la auditoría final se documentarán al completar las etapas restantes.

## Flujo de Git

El desarrollo se organiza mediante ramas por funcionalidad, commits convencionales y Pull Requests hacia `main`.

Ramas utilizadas para las primeras etapas:

- `feat/base-typescript`.
- `feat/migracion-portafolio`.
- `feat/consumo-api`.

Cada Pull Request debe describir los cambios, explicar cómo comprobarlos y revisarse antes de su integración.

## Despliegue

La compilación genera una aplicación estática en `dist/`.

Como se utiliza `BrowserRouter`, el alojamiento debe servir `index.html` al solicitar rutas de la aplicación como `/contacto`, conservando el acceso normal a los archivos estáticos.

La configuración del alojamiento y la publicación no están incluidas todavía.

## Trabajo pendiente

- Incorporar filtros de proyectos.
- Implementar la preferencia de tema mediante Context API.
- Completar la organización modular de CSS y revisar BEM.
- Corregir detalles de accesibilidad y revisar imágenes.
- Completar las pruebas y registrar sus resultados.
- Incorporar `docs/captura-e2.png`.
- Completar `INVENTARIO.md`.
- Incorporar `uso_ia.md` con las seis secciones exigidas y una reflexión personal.

## Autor

Vicente Fonseca  
Ingeniería Civil en Informática  
Universidad Católica de Temuco