# Etapa 5: CSS modular, accesibilidad y responsividad

## Cambios

- Se mantienen las vistas independientes con BrowserRouter, Routes, Route y NavLink, el indicador de ruta activa y la página 404.
- `index.css` conserva variables, reset y reglas base; los componentes y páginas importan sus propios estilos. Layout, botones y tema tienen módulos compartidos.
- Las clases de la aplicación React siguen nomenclatura BEM. Se retiran reglas de overlays, formularios y efectos de la E2 que no tenían componente React asociado.
- Se conservan paleta, tipografías, dimensiones y breakpoints de la E2. El icono original de GitHub se recupera en su tarjeta.
- Los temas utilizan variables CSS, evitando duplicar selectores por cada control.
- El formulario identifica los campos inválidos con aria-invalid, asocia sus mensajes mediante aria-describedby y enfoca el primer campo inválido. Se validan nombre y mensaje no vacíos y correo con formato nombre@dominio.extensión. No se envía correo.
- Los campos se definen en un módulo de datos tipado y se presentan mediante un componente reutilizable.
- El diálogo enfoca el primer campo al abrirse y devuelve el foco al robot al cerrarse. También permite cerrar desde el fondo exterior; clicar dentro del formulario no debe cerrarlo.
- Se recuperan barra de progreso y sombra del encabezado mediante un hook con limpieza de listeners, observer y requestAnimationFrame.
- Se reserva espacio en el pie para el robot, se establecen controles principales de al menos 44 px y columnas minmax(0,1fr) para contener texto largo.
- Solo se limpian espacios sobrantes de dos archivos de las evidencias copiadas a public. El RAR y el repositorio originales de E2 no se modifican.

## Verificación automatizada reproducible

```sh
npm run lint
npm run build
node scripts/verificar-proyecto.cjs
```

El script usa React, TypeScript y PostCSS instalados con el proyecto. Genera archivos temporales y elimina únicamente su propia carpeta temporal al terminar.

Resultado de preparación: lint y build aprobados, y 48 comprobaciones aprobadas:

- Análisis sintáctico de los 19 módulos CSS y nombres de clases BEM.
- Cinco vistas renderizadas por separado: Inicio, Sobre mí, Trabajos, Contacto y 404; un h1 por vista, ruta activa, IDs únicos, etiquetas asociadas y presencia de los componentes esperados.
- Nueve casos de validación de formulario, incluidos campos vacíos, espacios, correos inválidos y una dirección con alias.
- Cuatro campos con asociación de error e indicación aria-invalid.
- Once pares de colores opacos de texto y superficie con relación calculada mínima de 4.5:1.

El renderizado de prueba no ejecuta efectos del navegador. El cálculo de contraste no mide todos los píxeles, fondos ilustrados o estados posibles. No se presenta como auditoría WCAG completa, revisión Lighthouse ni prueba de teclado realizada.

## Comprobaciones manuales antes del PR

| Comprobación | Resultado que debe observarse |
| --- | --- |
| Tab desde el inicio | Aparece Saltar al contenido principal y funciona |
| Navegación | Cambia de vista, indica ruta activa y lleva foco al título |
| Ancho 320, 600, 900 y 1200 px | Sin desplazamiento horizontal ni controles cortados |
| Ambos temas | Títulos, textos, campos y errores legibles |
| Formulario vacío | Mensajes por campo y foco en nombre |
| Nombre y mensaje con espacios | Errores claros, sin confirmación de éxito |
| Correo inválido | Error asociado al campo de correo |
| Formulario válido | Confirmación explícita de validación local sin envío |
| Robot | Abre y enfoca nombre; Tab permanece en el diálogo |
| Escape, botón y fondo exterior | Cierran y devuelven foco al robot |
| Clic dentro del formulario | Mantiene abierto el diálogo |
| Trabajos | Filtros y API mantienen su comportamiento |
| Scroll | Progreso y sombra del encabezado funcionan |
| Movimiento reducido | Evita las animaciones de entrada prolongadas |
| URL inexistente | Muestra 404 con retorno al inicio |

Registrar las comprobaciones efectivamente realizadas por el estudiante en el README final. La lista anterior es un procedimiento de revisión; no se atribuye su ejecución al estudiante.
