import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ThemeProvider from './context/ThemeProvider'
import './index.css'
import './styles/layout.css'
import './styles/buttons.css'
import './styles/theme.css'
const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento raíz')
createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter><App /></BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
