import ThemeToggle from './ThemeToggle'
export default function Footer() { return (<footer className="footer">
        <div className="container footer__content">
            <p>&copy; 2026 Vicente Fonseca — Ingeniería Civil en Informática, UCT.</p>
            <p className="footer__sub">ICINF1107 Desarrollo de Frontend · Profesor: Cristian Iglesias Vera</p>
            <ThemeToggle />
        </div>
    </footer>) }
