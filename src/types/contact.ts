import type { ContactChangeEvent, ContactValues } from './index'

export type ContactFieldName = keyof ContactValues
export type ContactErrors = Partial<Record<ContactFieldName, string>>

export interface ContactStatus {
  kind: 'idle' | 'success' | 'error'
  message: string
}

export interface ContactFieldDefinition {
  name: ContactFieldName
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
  placeholder: string
  autoComplete?: string
}

export interface ContactFieldProps {
  field: ContactFieldDefinition
  prefix: string
  value: string
  error: string | undefined
  onChange: (event: ContactChangeEvent) => void
}
