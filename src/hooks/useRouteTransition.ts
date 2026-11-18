import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import type { RouteTransitionResult } from '../types/motion'
import { motionDurations } from '../data/motion'
import { motionDuration } from '../utils/motion'

export function useRouteTransition(): RouteTransitionResult {
  const location = useLocation()
  const [displayedLocation, setDisplayedLocation] = useState<Location>(location)
  const leaving = location.pathname !== displayedLocation.pathname

  useEffect(() => {
    if (location.key === displayedLocation.key) return
    const duration = leaving ? motionDuration(motionDurations.routeExit) : 0
    const timeout = window.setTimeout(() => setDisplayedLocation(location), duration)
    // Si se navega otra vez antes de terminar, solo se presenta el último destino.
    return () => window.clearTimeout(timeout)
  }, [location, displayedLocation.key, leaving])

  return { displayedLocation, leaving }
}
