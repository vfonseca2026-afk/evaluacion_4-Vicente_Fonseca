import type { ProjectItem } from '../types'
import type { ProjectFilter } from '../types/filters'

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim()
}

export function filterProjects(projects: ProjectItem[], filter: ProjectFilter): ProjectItem[] {
  const query = normalize(filter.query)
  return projects.filter(project => {
    const text = normalize(`${project.title} ${project.description} ${project.technologies.join(' ')}`)
    const matchesQuery = text.includes(query)
    const matchesTechnology = filter.technology === '' || project.technologies.includes(filter.technology)
    return matchesQuery && matchesTechnology
  })
}
