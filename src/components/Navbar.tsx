import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { navigationItems } from '../data/navigation'
import type { NavbarProps } from '../types/ui'
export default function Navbar({ scrolled }: NavbarProps) {
 return <header className={`header${scrolled ? ' header--scrolled' : ''}`}><div className="header__container">
 <Link to="/" className="brand" aria-label="Vicente Fonseca, ir al inicio"><span className="brand__mark" aria-hidden="true">VF</span><span className="brand__name">Vicente Fonseca</span></Link>
 <nav className="nav" aria-label="Navegación principal"><ul className="nav__list">{navigationItems.map(item => <li key={item.path}><NavLink to={item.path} className={({isActive}) => `nav__link${isActive ? ' nav__link--active' : ''}`}>{item.label}</NavLink></li>)}</ul></nav>
 <ThemeToggle />
 </div></header>
}
