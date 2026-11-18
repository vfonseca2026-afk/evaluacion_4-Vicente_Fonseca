import type { ProjectCardProps } from '../types'
export default function ProjectCard({ project }: ProjectCardProps) {
 return <article className="card">
  <div className="card__media">{project.image ? <img className="card__thumb" src={project.image} alt={project.alt} loading="lazy" /> : <span className="glyph" aria-hidden="true">&lt;/&gt;</span>}</div>
  <div className="card__body"><h2>{project.title}</h2><p className="card__desc">{project.description}</p>
   <ul className="tags__list" aria-label="Tecnologías utilizadas">{project.technologies.map(technology => <li className="tag" key={technology}>{technology}</li>)}</ul>
   <a className="btn btn--card" href={project.url} target="_blank" rel="noopener noreferrer">{project.linkLabel}<span className="visually-hidden"> (se abre en una pestaña nueva)</span></a>
  </div>
 </article>
}
