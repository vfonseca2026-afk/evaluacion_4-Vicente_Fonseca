import { useEffect, useState } from 'react'
import { fetchRepositories, getCachedRepositories } from '../services/githubService'
import type { FetchState, GitHubRepo, RepositoriesResult } from '../types/github'

export function useGitHubRepositories(): RepositoriesResult {
  const [attempt, setAttempt] = useState<number>(0)
  const [state, setState] = useState<FetchState<GitHubRepo[]>>(() => {
    const data = getCachedRepositories()
    return { data, loading: data === null, error: null }
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    let timedOut = false
    const timeout = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 15000)

    async function load(): Promise<void> {
      try {
        const data = await fetchRepositories(controller.signal, attempt > 0)
        if (active) setState({ data, loading: false, error: null })
      } catch (error: unknown) {
        if (!active) return
        const message = timedOut
          ? 'La consulta tardó demasiado. Comprueba tu conexión y vuelve a intentar.'
          : error instanceof TypeError
            ? 'No se pudo conectar con GitHub. Comprueba tu conexión a Internet.'
            : error instanceof Error
              ? error.message
              : 'Ocurrió un error al consultar los repositorios.'
        setState({ data: null, loading: false, error: message })
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void load()
    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [attempt])

  function retry(): void {
    setState({ data: null, loading: true, error: null })
    setAttempt(previous => previous + 1)
  }

  return { ...state, retry }
}
