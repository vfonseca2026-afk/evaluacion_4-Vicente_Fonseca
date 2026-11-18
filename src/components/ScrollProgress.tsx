import type { ScrollProgressProps } from '../types/ui'
import './ScrollProgress.css'

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return <div className="page-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
}
