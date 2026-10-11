import { useId, useState, type FormEvent } from 'react'
import { ValidationError, toDomainError, type FieldErrors } from '../db/errors'
import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH, validateBusinessInput } from '../db/validation'
import type { BusinessInput } from '../types'

interface Props {
  initial?: { name: string; description: string | null }
  submitLabel: string
  resetOnSuccess?: boolean
  onSubmit: (input: BusinessInput) => Promise<void>
  onCancel?: () => void
}

export function BusinessForm({ initial, submitLabel, resetOnSuccess, onSubmit, onCancel }: Props) {
  const formId = useId()
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaveError(null)
    const input = { name, description }
    const errors = validateBusinessInput(input)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSaving(true)
    try {
      await onSubmit(input)
      if (resetOnSuccess) {
        setName('')
        setDescription('')
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(error.fieldErrors)
      } else {
        setSaveError(toDomainError(error).message)
      }
    } finally {
      setSaving(false)
    }
  }

  const nameErrorId = `${formId}-name-error`
  const descriptionErrorId = `${formId}-description-error`

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${formId}-name`}>Name</label>
        <input
          id={`${formId}-name`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? nameErrorId : undefined}
          autoComplete="off"
        />
        <span className="hint">
          Required, up to {NAME_MAX_LENGTH} characters ({name.trim().length}/{NAME_MAX_LENGTH})
        </span>
        {fieldErrors.name && (
          <span id={nameErrorId} className="field-error">
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${formId}-description`}>Description</label>
        <textarea
          id={`${formId}-description`}
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={fieldErrors.description ? descriptionErrorId : undefined}
        />
        <span className="hint">
          Optional, up to {DESCRIPTION_MAX_LENGTH} characters ({description.trim().length}/
          {DESCRIPTION_MAX_LENGTH})
        </span>
        {fieldErrors.description && (
          <span id={descriptionErrorId} className="field-error">
            {fieldErrors.description}
          </span>
        )}
      </div>

      {saveError && (
        <p role="alert" className="banner banner-error">
          {saveError}
        </p>
      )}

      <div className="actions">
        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="button" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
