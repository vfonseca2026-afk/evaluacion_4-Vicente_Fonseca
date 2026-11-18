import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Tema claro"
      aria-pressed={isLight}
      onClick={toggleTheme}
    >
      Tema: {isLight ? 'claro' : 'oscuro'}
    </button>
  )
}
