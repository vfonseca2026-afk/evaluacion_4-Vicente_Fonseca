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
export default function App() {
 const { pathname } = useLocation()
 const main = useRef<HTMLElement>(null)
 useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  main.current?.focus({ preventScroll: true })
 }, [pathname])
 return <><button className="skip-link" onClick={() => main.current?.focus()}>Saltar al contenido principal</button><Navbar />
 <main className="app__main" ref={main} tabIndex={-1}><Routes><Route path="/" element={<HomePage />} /><Route path="/sobre-mi" element={<AboutPage />} /><Route path="/trabajos" element={<ProjectsPage />} /><Route path="/contacto" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /><QuickContact /></>
}
