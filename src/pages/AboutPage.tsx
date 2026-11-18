import './AboutPage.css'
export default function AboutPage() { return (<section id="sobre-mi" className="section sobre-mi about" aria-labelledby="sobre-mi-heading">
            <div className="container">
                <header className="section__head">
                    <h1 className="section__title" tabIndex={-1} id="sobre-mi-heading">Sobre mí</h1>
                    <p className="section__desc">Quién soy y qué estoy aprendiendo.</p>
                </header>

                <div className="about__grid">
                    <div className="about__bio">
                        <p>
                            ¡Hola! Soy <strong>Vicente Fonseca</strong>, estudiante de primer año de Ingeniería Civil en Informática en la
                            <strong>Universidad Católica de Temuco</strong>. Me enfoco en el desarrollo de software y en la construcción de interfaces web
                            modernas, accesibles y responsivas.
                        </p>
                        <p>
                            Actualmente desarrollo competencias en arquitectura Frontend (HTML5, CSS3),
                            buenas prácticas de accesibilidad web (WCAG) y desarrollo backend estructurado.
                        </p>
                    </div>

                    <ul className="facts" aria-label="Datos destacados">
                        <li className="fact">
                            <span className="fact__value">1.º</span>
                            <span className="fact__label">año de carrera</span>
                        </li>
                        <li className="fact">
                            <span className="fact__value">3</span>
                            <span className="fact__label">puntos de quiebre responsivos</span>
                        </li>
                        <li className="fact">
                            <span className="fact__value">WCAG</span>
                            <span className="fact__label">accesibilidad como base</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>) }
