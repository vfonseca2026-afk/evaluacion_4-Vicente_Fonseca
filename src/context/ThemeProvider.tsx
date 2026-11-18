import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { getInitialTheme, saveTheme } from '../services/themeStorage'
import type { Theme, ThemeProviderProps } from '../types/theme'

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  function toggleTheme(): void {
    setTheme(previous => previous === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
