import type { ReactNode } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export interface ThemeProviderProps {
  children: ReactNode
}
