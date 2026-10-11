export type FieldErrors = Partial<Record<'name' | 'description' | 'lifecycle_state', string>>

export class ValidationError extends Error {
  readonly fieldErrors: FieldErrors

  constructor(fieldErrors: FieldErrors) {
    super(Object.values(fieldErrors).join(' '))
    this.name = 'ValidationError'
    this.fieldErrors = fieldErrors
  }
}

export class RecordNotFoundError extends Error {
  constructor(id: string) {
    super(`Business record ${id} was not found.`)
    this.name = 'RecordNotFoundError'
  }
}

export class InvalidTransitionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidTransitionError'
  }
}

export type StorageErrorKind = 'unsupported' | 'quota' | 'unavailable' | 'unknown'

const STORAGE_MESSAGES: Record<StorageErrorKind, string> = {
  unsupported:
    'Local storage (IndexedDB) is not supported in this browser. Data cannot be saved on this device.',
  quota: 'Device storage is full. Free up space and try again; your change was not saved.',
  unavailable:
    'Local storage is unavailable (it may be blocked by private browsing or browser settings). Your change was not saved.',
  unknown: 'A local storage error occurred. Your change was not saved.',
}

export class StorageError extends Error {
  readonly kind: StorageErrorKind

  constructor(kind: StorageErrorKind, options?: { cause?: unknown }) {
    super(STORAGE_MESSAGES[kind], options)
    this.name = 'StorageError'
    this.kind = kind
  }
}

const DOMAIN_ERRORS = [ValidationError, RecordNotFoundError, InvalidTransitionError, StorageError]

function errorNames(error: unknown): string[] {
  const names: string[] = []
  let current: unknown = error
  for (let depth = 0; current && depth < 5; depth++) {
    if (typeof current === 'object' && 'name' in current && typeof current.name === 'string') {
      names.push(current.name)
    }
    current =
      typeof current === 'object' && current !== null
        ? ((current as { inner?: unknown; cause?: unknown }).inner ??
          (current as { cause?: unknown }).cause)
        : undefined
  }
  return names
}

/** Passes domain errors through; maps IndexedDB/Dexie failures to a StorageError. */
export function toDomainError(error: unknown): Error {
  if (DOMAIN_ERRORS.some((ErrorType) => error instanceof ErrorType)) {
    return error as Error
  }
  const names = errorNames(error)
  if (names.includes('QuotaExceededError')) {
    return new StorageError('quota', { cause: error })
  }
  if (
    names.some((name) =>
      ['MissingAPIError', 'OpenFailedError', 'DatabaseClosedError', 'InvalidStateError'].includes(
        name,
      ),
    )
  ) {
    return new StorageError('unavailable', { cause: error })
  }
  return new StorageError('unknown', { cause: error })
}
