import type { Theme } from '../types/theme'

const STORAGE_KEY = 'vicente-portfolio-theme'

export function getInitialTheme(): Theme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function saveTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // El cambio sigue funcionando durante la sesión si el navegador bloquea storage.
  }
}
