# Transiciones suaves

## Diálogo del robot

- Entrada de 280 ms con opacidad, desplazamiento de 14 px y una escala muy ligera.
- Salida de 180 ms antes de cerrar el diálogo nativo, con desvanecimiento del fondo.
- Escape, botón y clic en el fondo exterior solicitan el mismo cierre animado.
- El diálogo conserva el comportamiento modal durante la salida y devuelve el foco al robot cuando realmente se cierra.

## Navegación

- Se conserva una vista por ruta con React Router y la página 404.
- La vista anterior se desvanece durante 120 ms; la nueva aparece durante 240 ms con un desplazamiento de 8 px.
- La espera pendiente se cancela si el usuario elige otro destino antes de terminar.
- La vista de salida queda inert para no interactuar con controles a punto de desaparecer.
- El desplazamiento al inicio y el foco del título se aplican cuando se presenta el nuevo contenido, no al empezar la salida.
- El encabezado, el pie y el robot permanecen fuera de la transición.

Las duraciones se centralizan en `src/data/motion.ts`. Con prefers-reduced-motion, se omiten las animaciones y las esperas de salida pasan a cero.

## Revisión manual

1. Abrir y cerrar el robot con botón, Escape y fondo exterior.
2. Cerrar inmediatamente después de abrir y volver a abrirlo.
3. Comprobar que el foco vuelve al robot tras la salida.
4. Navegar entre Inicio y las otras vistas, incluyendo 404 y Atrás/Adelante.
5. Pulsar varios enlaces rápidamente y comprobar que termina en el último destino.
6. Probar teclado y la preferencia de movimiento reducido.

Lint, build y el verificador de la aplicación deben pasar. Las pruebas de renderizado no ejecutan las animaciones ni sustituyen esta revisión visual.

La entrada del diálogo utiliza CSS @starting-style, pensado para transiciones desde elementos inicialmente ocultos. Referencia: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style

Verificación del paquete: lint, build y las 48 comprobaciones existentes aprobados. La suavidad visual y los casos de interacción descritos arriba deben comprobarse en el navegador del estudiante; no se presentan como pruebas visuales automatizadas realizadas.
