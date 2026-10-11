import { LIFECYCLE_STATES, type BusinessInput, type LifecycleState } from '../types'
import { ValidationError, type FieldErrors } from './errors'

export const NAME_MAX_LENGTH = 200
export const DESCRIPTION_MAX_LENGTH = 2000

export interface NormalizedBusinessInput {
  name: string
  description: string | null
}

export function validateBusinessInput(input: BusinessInput): FieldErrors {
  const errors: FieldErrors = {}
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  if (name.length === 0) {
    errors.name = 'Name is required.'
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Name must be at most ${NAME_MAX_LENGTH} characters.`
  }

  const description = input.description
  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      errors.description = 'Description must be text.'
    } else if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
      errors.description = `Description must be at most ${DESCRIPTION_MAX_LENGTH} characters.`
    }
  }
  return errors
}

export function isLifecycleState(value: unknown): value is LifecycleState {
  return typeof value === 'string' && (LIFECYCLE_STATES as readonly string[]).includes(value)
}

/** Validates and normalizes input, throwing ValidationError on any field error. */
export function assertValidBusinessInput(input: BusinessInput): NormalizedBusinessInput {
  const errors = validateBusinessInput(input)
  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors)
  }
  const description = input.description?.trim() ?? ''
  return {
    name: input.name.trim(),
    description: description.length > 0 ? description : null,
  }
}

export function assertValidLifecycleState(value: unknown): LifecycleState {
  if (!isLifecycleState(value)) {
    throw new ValidationError({ lifecycle_state: "Lifecycle state must be 'active' or 'archived'." })
  }
  return value
}
