# Gestión de filtros y tema

## Filtros: estado local elevado

`ProjectsPage` almacena un único estado tipado `ProjectFilter`, con query y technology. `ProjectFilters` recibe los valores y callbacks; `ProjectResults` recibe el listado calculado. Son componentes hermanos sincronizados mediante su padre.

La lista filtrada se deriva con una función pura durante el render. No se guarda una segunda copia en estado ni se necesita useEffect para calcularla. Se busca en título, descripción y tecnologías, ignorando mayúsculas y tildes. Ambos filtros se combinan con AND. Las opciones de tecnología se obtienen del catálogo completo.

Los filtros afectan los tres trabajos históricos; los repositorios de la API permanecen en su sección propia. Al salir de Trabajos se desmonta la vista y el filtro vuelve a su valor inicial al regresar. Limpiar filtros restaura el catálogo completo.

## Tema: estado transversal con Context API

`ThemeProvider` envuelve toda la aplicación y conserva un único estado light/dark. `ThemeContext` lo distribuye y `useTheme` comprueba que el consumidor esté dentro del proveedor.

Los botones de encabezado y pie utilizan el mismo contexto. Cambiar uno actualiza ambos y aplica el tema a formularios, filtros y secciones mediante data-theme en el elemento html. Se evita pasar la preferencia manualmente por componentes intermedios.

El modo oscuro es la opción inicial para respetar la identidad E2. La selección se guarda en localStorage con la clave `vicente-portfolio-theme`. Un valor inválido o almacenamiento bloqueado usa el modo oscuro; el usuario puede cambiar de tema durante la sesión incluso si no puede guardarse. La persistencia entre pestañas abiertas no se sincroniza automáticamente.

La portada, el encabezado y el pie mantienen la paleta violeta en ambos modos; el modo claro adapta las superficies de contenido, campos y mensajes. El botón indica el modo actual. Su nombre accesible estable es Tema claro, con aria-pressed true cuando ese modo está activo.

## Archivos principales

- `src/types/filters.ts`, `src/types/theme.ts`: tipos de estado, props y eventos.
- `src/utils/filterProjects.ts`: cálculo puro del filtro.
- `src/components/ProjectFilters.tsx`, `ProjectResults.tsx`: controles y resultados.
- `src/context/ThemeContext.ts`, `ThemeProvider.tsx`: estado compartido.
- `src/hooks/useTheme.ts`: acceso al contexto.
- `src/services/themeStorage.ts`: persistencia con tratamiento de fallos.
- `src/components/ThemeToggle.tsx`: control reutilizado.
- `src/styles/theme.css`: variaciones de tema.

## Verificación manual

1. En Trabajos, comprobar las tres tarjetas sin filtros.
2. Buscar hongos: debe quedar Bitácora de hongos.
3. Buscar psicoanalisis sin tilde: debe encontrar Psicoanálisis Conductual.
4. Limpiar y seleccionar GitHub: debe quedar la tarjeta del perfil.
5. Combinar hongos con GitHub: debe aparecer estado sin coincidencias.
6. Limpiar: deben regresar los tres trabajos; la sección API debe seguir disponible.
7. Cambiar a tema claro desde el encabezado y comprobar el botón del pie.
8. Cambiar desde el pie y comprobar el encabezado.
9. Navegar por las rutas, abrir el robot y revisar formularios y foco en ambos temas.
10. Recargar: debe mantenerse la elección cuando localStorage está habilitado.
11. Revisar ambos modos a 320 px sin desbordamientos y con teclado.

Este procedimiento no constituye por sí mismo evidencia de pruebas realizadas ni una auditoría WCAG completa.

## Comprobaciones del paquete

El agente ejecutó lint y build correctamente. Además, realizó 21 comprobaciones automatizadas de la función de filtros y del almacenamiento del tema: búsquedas con mayúsculas y sin tildes, búsqueda en descripción y tecnología, combinación AND, lista vacía, ausencia de mutaciones y tratamiento de valores inválidos o almacenamiento bloqueado.

La revisión visual automática no pudo completarse porque el control del navegador se detuvo al no poder verificar la URL actual. Las comprobaciones manuales anteriores deben realizarse en el navegador del estudiante antes del commit.
