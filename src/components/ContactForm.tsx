import { useState } from 'react'
import type { ContactValues, ContactFormProps, ContactChangeEvent, ContactSubmitEvent } from '../types'
const empty: ContactValues = { nombre: '', email: '', asunto: '', mensaje: '' }
export default function ContactForm({ prefix }: ContactFormProps) {
 const [values, setValues] = useState<ContactValues>(empty)
 const [status, setStatus] = useState<string>('')
 function change(event: ContactChangeEvent) {
  const { name, value } = event.target
  setValues(previous => ({ ...previous, [name]: value }))
  setStatus('')
 }
 function submit(event: ContactSubmitEvent) {
  event.preventDefault()
  if (!values.nombre.trim() || !values.mensaje.trim()) { setStatus('Completa tu nombre y mensaje; no pueden contener solo espacios.'); return }
  setStatus('Formulario validado correctamente. Esta demostración no envía mensajes: aún no hay un servicio de correo conectado.')
 }
 return <form className="form" onSubmit={submit}>
 <div className="form__row"><div className="form__group"><label htmlFor={`${prefix}-nombre`}>Nombre completo *</label><input id={`${prefix}-nombre`} name="nombre" autoComplete="name" required value={values.nombre} onChange={change} placeholder="Ej. Juan Pérez" /></div>
 <div className="form__group"><label htmlFor={`${prefix}-email`}>Correo electrónico *</label><input id={`${prefix}-email`} name="email" type="email" autoComplete="email" required value={values.email} onChange={change} placeholder="ejemplo@correo.cl" /></div></div>
 <div className="form__group"><label htmlFor={`${prefix}-asunto`}>Asunto</label><input id={`${prefix}-asunto`} name="asunto" value={values.asunto} onChange={change} placeholder="Motivo de consulta" /></div>
 <div className="form__group"><label htmlFor={`${prefix}-mensaje`}>Mensaje *</label><textarea id={`${prefix}-mensaje`} name="mensaje" required rows={5} value={values.mensaje} onChange={change} placeholder="Escribe tu mensaje aquí…" /></div>
 <p className="form__note">* Campos obligatorios. Demostración sin envío de correo.</p><button className="btn btn--primary btn--block" type="submit">Validar mensaje</button>
 <p className="form__status" role="status">{status}</p>
 </form>
}
