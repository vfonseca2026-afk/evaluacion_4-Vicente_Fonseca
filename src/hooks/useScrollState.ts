import { useEffect, useState } from 'react'
import type { ScrollState } from '../types/ui'

export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrolled: false })

  useEffect(() => {
    let frame = 0
    function update(): void {
      frame = 0
      const maximum = document.documentElement.scrollHeight - window.innerHeight
      const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0
      const scrolled = window.scrollY > 10
      setState(previous => previous.progress === progress && previous.scrolled === scrolled
        ? previous : { progress, scrolled })
    }
    function schedule(): void {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [])

  return state
}
