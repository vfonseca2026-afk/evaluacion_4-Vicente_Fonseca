import { useGitHubRepositories } from '../hooks/useGitHubRepositories'
import RepositoryCard from './RepositoryCard'
import StatusMessage from './StatusMessage'
import './GitHubRepositories.css'

export default function GitHubRepositories() {
  const { data, loading, error, retry } = useGitHubRepositories()

  return (
    <section className="github-repositories" aria-labelledby="github-title">
      <header className="section__head">
        <h2 className="github-repositories__title" id="github-title">
          Mis repositorios en GitHub
        </h2>
        <p className="section__desc">
          Código y proyectos públicos, ordenados por actualización más reciente.
        </p>
      </header>

      {loading && <StatusMessage>Cargando repositorios de GitHub…</StatusMessage>}

      {error && (
        <div className="github-repositories__error">
          <StatusMessage error>{error}</StatusMessage>
          <button className="btn btn--primary" type="button" onClick={retry}>
            Reintentar consulta
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <StatusMessage>
            {data.length === 0
              ? 'Todavía no hay repositorios públicos para mostrar.'
              : `Se cargaron ${data.length} repositorios públicos.`}
          </StatusMessage>
          <div className="github-repositories__grid">
            {data.map(repository => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
          <div className="github-repositories__actions">
            <button className="btn btn--primary" type="button" onClick={retry}>
              Actualizar repositorios
            </button>
          </div>
        </>
      )}
    </section>
  )
}
