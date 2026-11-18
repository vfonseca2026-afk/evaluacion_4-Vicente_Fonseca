import type { ProjectFiltersProps, SearchChangeEvent, TechnologyChangeEvent } from '../types/filters'
import './ProjectFilters.css'

export default function ProjectFilters({
  query,
  technology,
  technologies,
  onQueryChange,
  onTechnologyChange,
  onReset,
}: ProjectFiltersProps) {
  function changeQuery(event: SearchChangeEvent): void {
    onQueryChange(event.target.value)
  }

  function changeTechnology(event: TechnologyChangeEvent): void {
    onTechnologyChange(event.target.value)
  }

  return (
    <section className="project-filters" aria-label="Filtros de trabajos del portafolio">
      <div className="project-filters__field">
        <label className="project-filters__label" htmlFor="project-query">Buscar trabajos</label>
        <input
          className="project-filters__control"
          id="project-query"
          type="search"
          placeholder="Título, descripción o tecnología"
          value={query}
          onChange={changeQuery}
          aria-controls="project-results"
          aria-describedby="project-results-count"
        />
      </div>
      <div className="project-filters__field">
        <label className="project-filters__label" htmlFor="project-technology">Tecnología</label>
        <select
          className="project-filters__control"
          id="project-technology"
          value={technology}
          onChange={changeTechnology}
          aria-controls="project-results"
        >
          <option value="">Todas las tecnologías</option>
          {technologies.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <button
        className="project-filters__reset"
        type="button"
        onClick={onReset}
        disabled={query === '' && technology === ''}
      >
        Limpiar filtros
      </button>
      <p className="project-filters__note">
        Estos filtros se aplican a los trabajos del portafolio. Los repositorios de GitHub se muestran por separado.
      </p>
    </section>
  )
}
