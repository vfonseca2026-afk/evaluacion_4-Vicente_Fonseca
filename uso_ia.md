# Declaración y bitácora de uso de IA

Proyecto: Portafolio E4 de Vicente Fonseca. Sesión de trabajo: 17 de noviembre de 2026.

## 1. Herramientas utilizadas

- Codex de OpenAI. Modelo GPT-6.1 Sol y Astra GPT-6.2.
- Herramientas del asistente para leer los PDF, revisar código, preparar archivos y ejecutar comprobaciones automatizadas.
- Navegador integrado durante la revisión inicial. Las revisiones visuales automáticas posteriores tuvieron limitaciones de acceso; no se registran como realizadas cuando no pudieron completarse.

## 2. Propósito de uso

Se solicitó asistencia para interpretar requisitos y rúbrica, migrar el portafolio E2, configurar TypeScript, separar componentes y datos, implementar rutas y consumo de API, gestionar estado, adaptar CSS a BEM, mejorar accesibilidad y redactar documentación.

También se pidió ordenar el trabajo en aproximadamente seis commits relacionados, con ramas, pruebas y Pull Requests, y explicar las salidas de Git, npm y TypeScript durante la implementación.

## 3. Ajustes, refactorización y verificación

### Decisiones y correcciones durante la sesión

- Se sustituyó la propuesta inicial de trabajar sobre una copia del asistente por instrucciones y paquetes aplicables a la base ya conectada al repositorio del estudiante.
- El estudiante pidió una secuencia de cinco o seis commits; el trabajo se reorganizó por etapas.
- Los filtros y el tema se identificaron como incorporaciones de E4, ya que no estaban implementados en la E2 original.

### Verificación acreditada

Las salidas compartidas por el estudiante acreditan lint/build y publicación de los primeros avances, incluidos los commits `7a02cd4` (TypeScript) y `9d1a6f8` (migración). No se inventan identificadores ni resultados de etapas que no aparecieron en las salidas aportadas.

El asistente comprobó los paquetes con lint/build. Además ejecutó 18 comprobaciones simuladas del servicio GitHub, 21 de filtros y almacenamiento, y un verificador reproducible con 48 comprobaciones de estilos, renderizado, formulario y contraste. Esto no sustituye las pruebas reales del navegador del estudiante ni acredita por sí mismo una auditoría WCAG.

### Experiencia personal del estudiante

Realicé varias pruebas manuales revisando las diferentes versiones del trabajo y el alcance para el usuario que se iba construyendo en cada una. Durante ese proceso corregí lineamientos en función de lo que quería conseguir y de lo que se necesitaba para cumplir los requerimientos de la rúbrica.

Mi intervención se centró en auditar los resultados y orientar las decisiones. Por ejemplo, al aclararse la exigencia de navegar por vistas con React Router, retiré la propuesta de reunir todas las secciones mediante scroll y pedí continuar con la estructura acorde a la evaluación.

Esta descripción corresponde a revisiones manuales generales declaradas por mí. No incluye métricas Lighthouse, un listado exhaustivo de pruebas de teclado ni resultados por navegador o resolución; esos datos no se atribuyen a mis pruebas sin registrarlos de manera específica.

## 4. Reflexión crítica final

Aprendí a manejar la inteligencia artificial de forma más flexible y a auditar sus resultados mediante el análisis de lo que iba entregando. La experiencia me mostró la importancia de mantener una dirección propia: debía contrastar las propuestas con lo que quería lograr y con los requerimientos de la rúbrica, en lugar de asumir que cada solución generada era la adecuada.

En cuanto al flujo de la aplicación, considero que puedo explicar qué hace y qué no hace el código, qué partes se comunican entre sí y cómo colaboran para producir el resultado. Al revisar código concreto, puedo deducir su funcionamiento leyendo las líneas y relacionándolas con ese flujo.

El uso de IA también plantea un riesgo de deuda cognitiva cuando se incorpora una solución sin analizarla. Por eso considero importante revisar el resultado, entender las relaciones entre componentes y poder justificar las decisiones. La asistencia permitió avanzar, pero la responsabilidad de evaluar el comportamiento y contrastarlo con los requisitos siguió siendo mía.

Como preparación técnica para la defensa, los puntos que conviene repasar en este proyecto son props y estado, Context, dependencias y limpieza de useEffect, validación de JSON y funcionamiento de React Router. Esta lista es una guía de preparación; no se presenta como una evaluación independiente de mi dominio de cada concepto.
