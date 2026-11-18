import type { ContactFieldProps } from '../types/contact'

export default function ContactField({ field, prefix, value, error, onChange }: ContactFieldProps) {
  const id = `${prefix}-${field.name}`
  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    placeholder: field.placeholder,
    autoComplete: field.autoComplete,
    onChange,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  }
  const fullWidth = field.name === 'asunto' || field.name === 'mensaje'
  return (
    <div className={`form__field${fullWidth ? ' form__field--full' : ''}`}>
      <label className="form__label" htmlFor={id}>
        {field.label}{field.required ? ' *' : ''}
      </label>
      {field.type === 'textarea' ? (
        <textarea {...common} className="form__control form__control--textarea" rows={5} />
      ) : (
        <input {...common} className="form__control" type={field.type} />
      )}
      {error && <p className="form__error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
