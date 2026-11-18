import type { GitHubRepo, RepositoryCache } from '../types/github'

export const GITHUB_REPOS_URL =
  'https://api.github.com/users/vfonseca2026-afk/repos?sort=updated&per_page=6'

const CACHE_DURATION_MS = 5 * 60 * 1000
let cache: RepositoryCache | null = null

export function getCachedRepositories(): GitHubRepo[] | null {
  return cache && cache.expiresAt > Date.now() ? cache.data : null
}

// JSON externo se recibe como unknown y se valida antes de usarlo en React.
function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (typeof value !== 'object' || value === null) return false
  if (!('id' in value) || typeof value.id !== 'number') return false
  if (!('name' in value) || typeof value.name !== 'string') return false
  if (!('description' in value) ||
      (value.description !== null && typeof value.description !== 'string')) return false
  if (!('language' in value) ||
      (value.language !== null && typeof value.language !== 'string')) return false
  if (!('stargazers_count' in value) ||
      typeof value.stargazers_count !== 'number') return false
  if (!('updated_at' in value) || typeof value.updated_at !== 'string') return false
  if (!('html_url' in value) || typeof value.html_url !== 'string') return false

  try {
    const url = new URL(value.html_url)
    return url.protocol === 'https:' && url.hostname === 'github.com'
  } catch {
    return false
  }
}

export async function fetchRepositories(
  signal: AbortSignal,
  forceRefresh = false,
): Promise<GitHubRepo[]> {
  signal.throwIfAborted()
  const cached = getCachedRepositories()
  if (cached !== null && !forceRefresh) return cached

  const response = await fetch(GITHUB_REPOS_URL, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub limitó la consulta. Espera unos minutos y vuelve a intentar.')
    }
    if (response.status === 404) {
      throw new Error('No se encontró el perfil de GitHub configurado.')
    }
    throw new Error(`GitHub no pudo responder a la consulta (HTTP ${response.status}).`)
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      throw new Error('GitHub devolvió una respuesta que no es JSON válido.', { cause: error })
    }
    throw error
  }
  signal.throwIfAborted()
  if (!Array.isArray(payload)) {
    throw new Error('GitHub devolvió un formato de respuesta inesperado.')
  }
  const entries: unknown[] = payload
  if (!entries.every(isGitHubRepo)) {
    throw new Error('La respuesta de GitHub no contiene los datos esperados.')
  }

  cache = { data: entries, expiresAt: Date.now() + CACHE_DURATION_MS }
  return entries
}
