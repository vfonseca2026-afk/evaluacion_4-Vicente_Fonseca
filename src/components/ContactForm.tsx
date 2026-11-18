import { useState } from 'react'
import type { ContactValues, ContactFormProps, ContactChangeEvent, ContactSubmitEvent } from '../types'
import type { ContactErrors, ContactStatus } from '../types/contact'
import { contactFields } from '../data/contactFields'
import { validateContact } from '../utils/contactValidation'
import ContactField from './ContactField'
import './ContactForm.css'

const initialValues: ContactValues = { nombre: '', email: '', asunto: '', mensaje: '' }

export default function ContactForm({ prefix }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<ContactStatus>({ kind: 'idle', message: '' })

  function change(event: ContactChangeEvent): void {
    const { name, value } = event.target
    const field = contactFields.find(item => item.name === name)?.name
    if (!field) return
    setValues(previous => ({ ...previous, [field]: value }))
    setErrors(previous => ({ ...previous, [field]: undefined }))
    setStatus({ kind: 'idle', message: '' })
  }

  function submit(event: ContactSubmitEvent): void {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    const firstInvalid = contactFields.find(field => nextErrors[field.name])
    if (firstInvalid) {
      setStatus({ kind: 'error', message: 'Revisa los campos indicados antes de continuar.' })
      const control = event.currentTarget.elements.namedItem(firstInvalid.name)
      if (control instanceof HTMLElement) control.focus()
      return
    }
    setStatus({ kind: 'success', message: 'Formulario validado correctamente. Esta demostración no envía mensajes: aún no hay un servicio de correo conectado.' })
  }

  return (
    <form className="form" onSubmit={submit} noValidate aria-describedby={`${prefix}-note`}>
      {contactFields.map(field => (
        <ContactField key={field.name} field={field} prefix={prefix} value={values[field.name]} error={errors[field.name]} onChange={change} />
      ))}
      <p className="form__note" id={`${prefix}-note`}>* Campos obligatorios. Demostración sin envío de correo.</p>
      <button className="btn btn--primary btn--block form__submit" type="submit">Validar mensaje</button>
      <p className={`form__status${status.kind === 'error' ? ' form__status--error' : ''}`} role={status.kind === 'error' ? 'alert' : 'status'}>
        {status.message}
      </p>
    </form>
  )
}
