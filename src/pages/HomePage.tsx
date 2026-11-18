import './HomePage.css'
import { Link } from 'react-router-dom'
export default function HomePage() { return (<section id="inicio" className="hero" aria-labelledby="hero-heading">

            <div className="container hero__content">
                <div className="hero__avatar-wrap">
                    <img src="/img/perfil.jpg" alt="Ilustración en pixel art de un personaje con gorro verde sentado entre flores" className="hero__avatar" width="320" height="320" />
                </div>
                <p className="hero__kicker">Ingeniería Civil en Informática · UCT</p>
                <h1 tabIndex={-1} id="hero-heading" className="hero__title">
                    <span className="hero__line"><span>Vicente</span></span>{' '}
                    <span className="hero__line"><span>Fonseca</span></span>
                </h1>
                <p className="hero__lead">Construyo interfaces web <strong>semánticas, accesibles y responsivas</strong> pensadas para que quien las visita encuentre lo que busca rápido.</p>
                <div className="hero__actions">
                    <Link to="/trabajos" className="btn btn--primary">Ver mis trabajos</Link>
                    <Link to="/contacto" className="btn btn--ghost">Escribirme</Link>
                </div>
            </div>
        </section>) }
