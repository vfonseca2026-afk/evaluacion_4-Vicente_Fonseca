import type { Location } from 'react-router-dom'

export interface RouteTransitionResult {
  displayedLocation: Location
  leaving: boolean
}
