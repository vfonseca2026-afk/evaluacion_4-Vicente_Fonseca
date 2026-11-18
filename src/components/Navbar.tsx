import { Link, NavLink } from 'react-router-dom'
export default function Navbar() {
 return <header className="header"><div className="header__container">
 <Link to="/" className="brand" aria-label="Vicente Fonseca, ir al inicio"><span className="brand__mark" aria-hidden="true">VF</span><span className="brand__name">Vicente Fonseca</span></Link>
 <nav className="nav" aria-label="Navegación principal"><ul className="nav__list">{[{path:'/sobre-mi',label:'Sobre mí'},{path:'/trabajos',label:'Trabajos'},{path:'/contacto',label:'Contacto'}].map(item => <li key={item.path}><NavLink to={item.path} className={({isActive}) => `nav__link${isActive ? ' nav__link--active' : ''}`}>{item.label}</NavLink></li>)}</ul></nav>
 </div></header>
}
