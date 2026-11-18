import { projects } from '../data/portfolioData'
import ProjectCard from '../components/ProjectCard'
import GitHubRepositories from '../components/GitHubRepositories'
export default function ProjectsPage() {
 return <section className="section trabajos" aria-labelledby="projects-title"><div className="container">
 <header className="section__head"><h1 id="projects-title">Trabajos y evidencias de mi progreso</h1><p className="section__desc">Evidencias del aprendizaje práctico desarrolladas durante el tiempo que me he desarrollado en el ámbito.</p></header>
 <div className="projects__grid">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
 <GitHubRepositories />
 </div></section>
}
