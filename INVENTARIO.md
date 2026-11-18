# Inventario de migración E2 → React

Autor: Vicente Fonseca. Asignatura: Desarrollo de Frontend, ICINF1107.

## Fuente y preservación histórica

La referencia es el portafolio estático de E2 incluido en `Portafolio_Vicente-Fonseca.rar`. Se recuperaron su `index.html`, `css/styles.css`, imágenes y los dos proyectos históricos. El RAR y el repositorio original se conservan aparte; la migración se desarrolla en el repositorio nuevo de E4.

La captura comparativa debe guardarse en [docs/captura-e2.png](docs/captura-e2.png). El procedimiento para obtenerla del original se explica en [Cómo capturar E2](docs/como-capturar-e2.md).

## Mapeo de contenido y componentes

| Elemento de E2 | Destino en React | Decisión de migración |
| --- | --- | --- |
| Portada `#inicio` | `src/pages/HomePage.tsx` | Conserva avatar, presentación, fondo, tipografías, botones y animaciones de entrada |
| Sección `#sobre-mi` | `src/pages/AboutPage.tsx` | Conserva biografía y datos destacados |
| Sección `#trabajos` | `src/pages/ProjectsPage.tsx` | Presenta los trabajos históricos y agrega filtros y repositorios |
| Tarjetas repetidas en HTML | `src/components/ProjectCard.tsx` | Renderiza cada proyecto desde props tipadas |
| Información de trabajos | `src/data/portfolioData.ts` | Separa los datos de la presentación |
| Sección `#contacto` | `src/pages/ContactPage.tsx` | Aloja el formulario controlado |
| Formularios principal y emergente | `ContactForm.tsx`, `ContactField.tsx`, `data/contactFields.ts` | Una implementación reutilizable con IDs distintos para cada instancia |
| Robot y popup | `src/components/QuickContact.tsx` | Conserva robot CSS y emplea un diálogo nativo controlado por estado React |
| Encabezado y navegación | `Navbar.tsx`, `data/navigation.ts` | Sustituye anclas por Link/NavLink y rutas de React Router |
| Pie de página | `src/components/Footer.tsx` | Conserva información académica y agrega acceso a la preferencia de tema |
| Progreso de lectura y sombra del encabezado | `ScrollProgress.tsx`, `useScrollState.ts` | Recupera los efectos mediante estado, requestAnimationFrame y limpieza de eventos |
| `img/` | `public/img/` | Conserva los recursos originales |
| Proyectos Psicoanálisis Conductual y HongosTemuco | `public/proyectos/` | Preserva las evidencias estáticas, abiertas desde sus tarjetas |

## Refactorización de estilos

`src/index.css` contiene variables, reset y reglas base. La paleta violeta, el tono durazno, las tipografías Bricolage Grotesque y DM Sans y los breakpoints de 600, 900 y 1200 px proceden de E2.

| Responsabilidad | Archivo actual |
| --- | --- |
| Layout y títulos de sección | `src/styles/layout.css` |
| Botones compartidos | `src/styles/buttons.css` |
| Variables de tema | `src/styles/theme.css` |
| Encabezado y navegación | `src/components/Navbar.css` |
| Portada | `src/pages/HomePage.css` |
| Sobre mí | `src/pages/AboutPage.css` |
| Grilla de trabajos | `src/pages/ProjectsPage.css` |
| Tarjetas | `src/components/ProjectCard.css` |
| Contacto y formulario | `src/pages/ContactPage.css`, `src/components/ContactForm.css` |
| Robot y diálogo | `src/components/QuickContact.css` |
| API, tarjetas y mensajes | `GitHubRepositories.css`, `RepositoryCard.css`, `StatusMessage.css` |
| Filtros | `src/components/ProjectFilters.css` |
| Tema, progreso y pie | `ThemeToggle.css`, `ScrollProgress.css`, `Footer.css` |

La aplicación React usa bloques, elementos y modificadores BEM. Se retiraron reglas de la E2 para overlays o formularios que ya no tenían un componente asociado. Los estilos de los proyectos históricos se preservan como parte de esas evidencias; no se presentan como estilos refactorizados de la aplicación React.

## Interacciones y accesibilidad

- La navegación muestra una vista por ruta, indica la ruta activa y conserva una página 404. Cada vista tiene un h1 y el cambio de ruta enfoca su título.
- El menú original se adaptaba con CSS. E2 no incluía menú hamburguesa, filtros ni modo oscuro: estas últimas dos funciones son incorporaciones de E4, no recuperaciones históricas.
- El formulario original tenía restricciones HTML, pero no un servicio real de correo. La versión React valida estado controlado, rechaza campos compuestos solo por espacios, muestra errores asociados y mantiene una confirmación honesta de validación local.
- El diálogo nativo sustituye el manejo manual del overlay y del encierro de foco. Se conserva el cierre con Escape y el retorno al robot, y se incorpora foco inicial explícito y cierre desde el fondo exterior.
- Se mantienen etiquetas y textos alternativos; se mejoran foco, asociación de errores, tamaño de controles y distribución de textos largos.
- Se limpian espacios sobrantes en dos archivos de las copias de proyectos históricos; no se cambia su contenido funcional.
- La aparición gradual de secciones mediante IntersectionObserver no se migró. El contenido de cada vista se muestra directamente para evitar ocultarlo si falla ese efecto. Se conservan animaciones de portada, robot y hover y se respeta movimiento reducido.

## Incorporaciones propias de E4

- TypeScript estricto y tipos exportados, sin usar `any` en el código de la aplicación.
- GitHub REST API con respuesta validada, estados explícitos, timeout, AbortController, caché y reintento.
- Filtros con estado elevado al padre y listado derivado durante el render.
- Context API para una preferencia de tema compartida y persistida en localStorage.
- Verificador reproducible y documentación de contratos y pruebas.

## Límites y decisiones

El diseño se conserva dentro de la adaptación a rutas exigida por E4; no se afirma que la distribución completa sea idéntica a la página continua de E2. Las imágenes históricas se mantienen con sus tamaños originales. El formulario no envía correo. La aplicación necesita un alojamiento que resuelva las rutas de BrowserRouter hacia index.html; el despliegue no está configurado.

Las comprobaciones automatizadas y las tareas de revisión manual se distinguen en [Auditoría de accesibilidad](docs/auditoria-accesibilidad.md). La captura y los resultados personales deben completarse antes de entregar.
