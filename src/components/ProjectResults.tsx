import ProjectCard from './ProjectCard'
import type { ProjectResultsProps } from '../types/filters'

export default function ProjectResults({ projects }: ProjectResultsProps) {
  return (
    <div className="project-results" id="project-results">
      <p className="project-results__status" id="project-results-count" role="status">
        {projects.length === 1 ? '1 trabajo encontrado.' : `${projects.length} trabajos encontrados.`}
      </p>
      {projects.length === 0 ? (
        <p className="project-results__empty">No hay coincidencias. Prueba otra búsqueda o limpia los filtros.</p>
      ) : (
        <div className="projects__grid">
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  )
}
