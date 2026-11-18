import { useLayoutEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import { useRouteTransition } from './hooks/useRouteTransition'
import { motionDurations } from './data/motion'

export default function App() {
  const { displayedLocation, leaving } = useRouteTransition()
  const { progress, scrolled } = useScrollState()
  const main = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    main.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
  }, [displayedLocation.key])

  return (
    <>
      <ScrollProgress progress={progress} />
      <button className="skip-link" onClick={() => main.current?.focus()}>
        Saltar al contenido principal
      </button>
      <Navbar scrolled={scrolled} />
      <main className="app__main" ref={main} tabIndex={-1} aria-busy={leaving}>
        <div
          className={`route-transition${leaving ? ' route-transition--leaving' : ''}`}
          style={{ transitionDuration: `${motionDurations.routeExit}ms` }}
          inert={leaving}
        >
          <div
            className="route-transition__page"
            key={displayedLocation.pathname}
            style={{ animationDuration: `${motionDurations.routeEnter}ms` }}
          >
            <Routes location={displayedLocation}>
              <Route path="/" element={<HomePage />} />
              <Route path="/sobre-mi" element={<AboutPage />} />
              <Route path="/trabajos" element={<ProjectsPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
      <QuickContact />
    </>
  )
}
