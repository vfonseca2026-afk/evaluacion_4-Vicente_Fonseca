import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickContact from './components/QuickContact'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollProgress from './components/ScrollProgress'
import { useScrollState } from './hooks/useScrollState'
export default function App() {
 const { pathname, key } = useLocation()
 const { progress, scrolled } = useScrollState()
 const main = useRef<HTMLElement>(null)
 useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  main.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
 }, [pathname, key])
 return <><ScrollProgress progress={progress} /><button className="skip-link" onClick={() => main.current?.focus()}>Saltar al contenido principal</button><Navbar scrolled={scrolled} />
 <main className="app__main" ref={main} tabIndex={-1}><Routes><Route path="/" element={<HomePage />} /><Route path="/sobre-mi" element={<AboutPage />} /><Route path="/trabajos" element={<ProjectsPage />} /><Route path="/contacto" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /><QuickContact /></>
}
