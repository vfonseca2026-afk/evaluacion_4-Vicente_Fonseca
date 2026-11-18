import type { ChangeEvent } from 'react'
import type { ProjectItem } from './index'

export interface ProjectFilter {
  query: string
  technology: string
}

export interface ProjectFiltersProps extends ProjectFilter {
  technologies: string[]
  onQueryChange: (query: string) => void
  onTechnologyChange: (technology: string) => void
  onReset: () => void
}

export interface ProjectResultsProps {
  projects: ProjectItem[]
}

export type SearchChangeEvent = ChangeEvent<HTMLInputElement>
export type TechnologyChangeEvent = ChangeEvent<HTMLSelectElement>
