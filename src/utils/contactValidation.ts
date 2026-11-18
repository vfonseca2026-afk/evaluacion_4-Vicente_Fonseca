import type { ContactValues } from '../types'
import type { ContactErrors } from '../types/contact'

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.nombre.trim()) errors.nombre = 'Escribe tu nombre; no puede contener solo espacios.'
  if (!values.email.trim()) {
    errors.email = 'Escribe tu correo electrónico.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Escribe un correo válido, por ejemplo nombre@correo.cl.'
  }
  if (!values.mensaje.trim()) errors.mensaje = 'Escribe un mensaje; no puede contener solo espacios.'
  return errors
}
