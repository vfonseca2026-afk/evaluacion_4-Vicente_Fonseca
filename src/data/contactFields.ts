import type { ContactFieldDefinition } from '../types/contact'

export const contactFields: ContactFieldDefinition[] = [
  { name: 'nombre', label: 'Nombre completo', type: 'text', required: true, placeholder: 'Ej. Juan Pérez', autoComplete: 'name' },
  { name: 'email', label: 'Correo electrónico', type: 'email', required: true, placeholder: 'ejemplo@correo.cl', autoComplete: 'email' },
  { name: 'asunto', label: 'Asunto', type: 'text', required: false, placeholder: 'Motivo de consulta' },
  { name: 'mensaje', label: 'Mensaje', type: 'textarea', required: true, placeholder: 'Escribe tu mensaje aquí…' },
]
