# Registro de accesibilidad y revisión responsiva

Fecha de preparación: 17 de noviembre de 2026. Este documento distingue comprobaciones automatizadas y revisión manual declarada por el autor.

## Resumen de implementación

La aplicación tiene un main y un h1 por vista, navegación semántica, etiquetas vinculadas, mensajes de estado, errores asociados a campos, controles nativos, foco visible y preferencia de movimiento reducido. El diálogo utiliza el comportamiento modal del navegador. El diseño usa columnas con mínimos flexibles y breakpoints de 600, 900 y 1200 px.

## Comprobaciones automatizadas

En la preparación de los paquetes se aprobaron lint y build. El script reproducible `node scripts/verificar-proyecto.cjs` aprobó 48 comprobaciones: sintaxis de 19 módulos CSS y nombres BEM, cinco vistas, nueve casos de validación, asociación de errores de cuatro campos y once pares de contraste.

Los tests renderizan componentes sin ejecutar efectos del navegador: no verifican el comportamiento real de Tab, Escape, foco, red ni tamaños de viewport. El detalle se encuentra en [Verificación de la etapa 5](verificacion-etapa-5.md).

### Contraste de colores de referencia

Relación calculada a partir de luminancia relativa para pares opacos usados o definidos como referencia en los estilos:

| Elemento | Texto | Fondo | Relación |
| --- | --- | --- | --- |
| Texto del formulario oscuro | `#ffffff` | `#24124c` | 16.59:1 |
| Placeholder oscuro | `#aab8cc` | `#170a35` | 9.23:1 |
| Placeholder claro | `#64748b` | `#faf8ff` | 4.52:1 |
| Error claro | `#9a3412` | `#ffffff` | 7.31:1 |
| Error oscuro | `#ffb4ab` | `#24124c` | 9.77:1 |
| Texto sobre superficie clara de referencia | `#475569` | `#f6f2fc` | 6.87:1 |
| Botón principal | `#1a0b3b` | `#fcd1ae` | 12.88:1 |
| Etiqueta de tecnología | `#3b1478` | `#ede9fe` | 11.36:1 |
| Título de tarjeta | `#4c1d95` | `#ffffff` | 10.95:1 |
| Botón de tarjeta | `#ffffff` | `#4c1d95` | 10.95:1 |
| Campo claro | `#140a2b` | `#faf8ff` | 17.99:1 |

Los once pares superan 4.5:1. Este cálculo no representa una medición de todos los píxeles, mezclas de transparencias, fondos ilustrados o estados posibles, y no acredita conformidad WCAG completa.

## Revisión manual comunicada por el autor

Vicente indicó que realizó varias pruebas manuales revisando y auditando diferentes versiones y el alcance para el usuario. También contrastó las decisiones con lo necesario para cumplir la rúbrica. Esta declaración acredita una revisión general; no se transforma en resultados específicos de teclado o Lighthouse que no se hayan comunicado.

Al preparar este registro no se habían comunicado métricas Lighthouse, una sesión de lector de pantalla ni resultados individualizados de teclado por navegador o resolución.

## Registro de teclado y responsividad

Antes de entregar, realizar estas comprobaciones y sustituir «Por registrar» por el resultado real, anotando navegador, fecha y tamaños utilizados. No marcar como aprobado un caso que no se ejecutó.

| Comprobación | Resultado real |
| --- | --- |
| Tab muestra el salto al contenido y Enter lo activa | Por registrar |
| Menú completo con Tab/Enter y foco visible | Por registrar |
| Cambio de ruta enfoca el título principal | Por registrar |
| Formulario vacío enfoca el primer campo inválido | Por registrar |
| Errores de nombre, correo y mensaje se identifican claramente | Por registrar |
| Robot enfoca nombre al abrir y Tab permanece dentro del diálogo | Por registrar |
| Escape y botón de cierre devuelven foco al robot | Por registrar |
| Filtros, selector y tema se utilizan con teclado | Por registrar |
| Ambas paletas son legibles en las cuatro vistas | Por registrar |
| Anchos de 320, 600, 900 y 1200 px sin desbordamiento horizontal | Por registrar |

Navegador y versión: por registrar. Fecha de ejecución: por registrar. Resoluciones efectivamente utilizadas: por registrar.

## Conclusión y límites

Se incorporaron medidas de accesibilidad y hay comprobaciones automatizadas reproducibles. La revisión general del autor está declarada. El registro detallado anterior debe completarse para aportar evidencia de navegación por teclado; no se presentan puntuaciones Lighthouse ni certificación WCAG inexistentes.
