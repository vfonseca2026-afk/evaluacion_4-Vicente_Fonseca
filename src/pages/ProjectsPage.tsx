import { useState } from 'react'
import { projects } from '../data/portfolioData'
import ProjectFilters from '../components/ProjectFilters'
import ProjectResults from '../components/ProjectResults'
import GitHubRepositories from '../components/GitHubRepositories'
import { filterProjects } from '../utils/filterProjects'
import type { ProjectFilter } from '../types/filters'

const technologies: string[] = [...new Set(projects.flatMap(project => project.technologies))]
  .sort((first, second) => first.localeCompare(second, 'es'))

const initialFilter: ProjectFilter = { query: '', technology: '' }

export default function ProjectsPage() {
  // El padre comparte el filtro con los controles y los resultados, sin duplicarlo.
  const [filter, setFilter] = useState<ProjectFilter>(initialFilter)
  const filteredProjects = filterProjects(projects, filter)

  return (
    <section className="section trabajos" aria-labelledby="projects-title">
      <div className="container">
        <header className="section__head">
          <h1 id="projects-title">Trabajos y evidencias de mi progreso</h1>
          <p className="section__desc">
            Evidencias del aprendizaje práctico desarrolladas durante el tiempo que me he desarrollado en el ámbito.
          </p>
        </header>
        <ProjectFilters
          query={filter.query}
          technology={filter.technology}
          technologies={technologies}
          onQueryChange={query => setFilter(previous => ({ ...previous, query }))}
          onTechnologyChange={technology => setFilter(previous => ({ ...previous, technology }))}
          onReset={() => setFilter(initialFilter)}
        />
        <ProjectResults projects={filteredProjects} />
        <GitHubRepositories />
      </div>
    </section>
  )
}
