# Integración GitHub REST API

Se elige GitHub porque los repositorios públicos complementan los trabajos históricos de E2 con código real del estudiante.

## Contrato

- Base: `https://api.github.com`
- Método: GET
- Ruta: `/users/vfonseca2026-afk/repos`
- Parámetros: `sort=updated`, `per_page=6`.
- Endpoint completo: `https://api.github.com/users/vfonseca2026-afk/repos?sort=updated&per_page=6`.
- Consulta pública sin token ni clave API.
- Referencia oficial: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

La respuesta es un arreglo. Ejemplo ilustrativo de los campos utilizados (no datos reales):

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

`description` y `language` admiten null. El servicio recibe JSON como unknown y valida los campos antes de usarlos. Solo admite enlaces HTTPS a github.com. La interfaz renderiza nombre, descripción, lenguaje, estrellas y enlace al código; updated_at forma parte del contrato validado.

## Responsabilidades

- `src/types/github.ts`: respuesta, caché, estado asíncrono y props.
- `src/services/githubService.ts`: fetch, validación, errores HTTP y caché.
- `src/hooks/useGitHubRepositories.ts`: useEffect, estado, reintento y cleanup.
- `GitHubRepositories`: carga, error, éxito y lista vacía.
- `RepositoryCard`: presentación de un repositorio mediante props.

## Caché y cancelación

Los éxitos se almacenan cinco minutos en memoria. Volver a Trabajos durante ese intervalo reutiliza los datos. Recargar el navegador borra esa memoria. Actualizar y Reintentar solicitan datos nuevos; los errores no se guardan en caché. La caché almacena respuestas completadas, no deduplica peticiones simultáneas.

Cada efecto crea su AbortController. Al desmontar se cancela la petición y se evita actualizar el estado mediante la bandera active. Un límite de 15 segundos cancela consultas demasiado lentas y muestra un mensaje. En StrictMode de desarrollo puede verse una petición inicial cancelada antes de la definitiva; el cleanup es intencional.

## Cómo verificar

1. Ejecutar lint y build; entrar a Trabajos y observar los repositorios.
2. Comprobar descripción nula, lenguaje nulo y cero estrellas mediante respuestas simuladas.
3. En Network, volver a Trabajos antes de cinco minutos: no debe emitirse otra consulta cuando ya existe un éxito cacheado.
4. Actualizar repositorios fuerza una consulta nueva.
5. Para probar sin conexión, activar Offline en DevTools y pulsar Actualizar. Restaurar conexión y Reintentar.
6. Con conexión lenta, salir de Trabajos mientras carga: la petición debe cancelarse.
7. Probar respuesta vacía, JSON inválido, HTTP 403/429/404/500 y timeout mediante simulación.

## Verificación de preparación

El agente ejecutó lint y build correctamente. También comprobó el servicio con 18 verificaciones automatizadas y respuestas simuladas: campos nulos y cero estrellas, contrato, URL del endpoint, caché, expiración, actualización forzada, HTTP 403/429/404/500, datos inválidos, URLs ajenas a GitHub, arreglo vacío, JSON inválido, cancelación antes de completar la respuesta y recuperación tras un fallo de red. Estas pruebas no son consultas reales a GitHub ni sustituyen la revisión del hook y la interfaz en navegador.

Los resultados efectivamente ejecutados por el estudiante deben registrarse en el README final; la lista anterior describe el procedimiento de navegador, no afirma que se haya completado.
