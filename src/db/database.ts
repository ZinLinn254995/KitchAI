import Dexie, { type Table } from 'dexie'
import type { Business, OutboxEntry } from '../types'
import { StorageError, toDomainError } from './errors'

export const DEFAULT_DATABASE_NAME = 'kitchai-local'

export class KitchAIDatabase extends Dexie {
  businesses!: Table<Business, string>
  outbox!: Table<OutboxEntry, string>

  constructor(name: string = DEFAULT_DATABASE_NAME) {
    super(name)
    this.version(1).stores({
      businesses: 'id, lifecycle_state, sync_state, updated_at',
      outbox: 'operation_id, record_id, status, created_at, [record_id+record_version]',
    })
  }
}

export function isIndexedDbSupported(): boolean {
  return typeof globalThis.indexedDB !== 'undefined' && globalThis.indexedDB !== null
}

/** Opens the database, failing with a StorageError when IndexedDB is unsupported or blocked. */
export async function openDatabase(name: string = DEFAULT_DATABASE_NAME): Promise<KitchAIDatabase> {
  if (!isIndexedDbSupported()) {
    throw new StorageError('unsupported')
  }
  const db = new KitchAIDatabase(name)
  try {
    await db.open()
  } catch (error) {
    throw toDomainError(error)
  }
  return db
}
