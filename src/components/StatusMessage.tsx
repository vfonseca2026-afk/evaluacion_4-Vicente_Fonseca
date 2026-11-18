import './StatusMessage.css'
import type { StatusMessageProps } from '../types/github'

export default function StatusMessage({ children, error = false }: StatusMessageProps) {
  return (
    <p
      className={`status-message${error ? ' status-message--error' : ''}`}
      role={error ? 'alert' : 'status'}
    >
      {children}
    </p>
  )
}
