import './RepositoryCard.css'
import type { RepositoryCardProps } from '../types/github'

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <article className="repository-card">
      <h3 className="repository-card__title">{repository.name}</h3>
      <p className="repository-card__description">
        {repository.description || 'Este repositorio todavía no tiene una descripción.'}
      </p>
      <dl className="repository-card__metadata">
        <div>
          <dt>Lenguaje</dt>
          <dd>{repository.language ?? 'Sin lenguaje detectado'}</dd>
        </div>
        <div>
          <dt>Estrellas</dt>
          <dd>{repository.stargazers_count}</dd>
        </div>
      </dl>
      <a
        className="btn btn--card"
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver código
        <span className="visually-hidden">
          {' '}de {repository.name} (se abre en una pestaña nueva)
        </span>
      </a>
    </article>
  )
}
