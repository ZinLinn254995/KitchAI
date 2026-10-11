import type { Business, BusinessInput, OperationType } from '../types'
import type { KitchAIDatabase } from './database'
import { InvalidTransitionError, RecordNotFoundError, toDomainError } from './errors'
import { generateId as defaultGenerateId } from './ids'
import { buildOutboxEntry } from './outbox'
import { assertValidBusinessInput, assertValidLifecycleState } from './validation'

export interface RepositoryOptions {
  now?: () => Date
  generateId?: () => string
  /** Authenticated owner from WP3. Until then records stay local-only with a null owner. */
  ownerId?: string | null
}

export type BusinessPatch = Partial<BusinessInput>

const byUpdatedDesc = (a: Business, b: Business) => b.updated_at.localeCompare(a.updated_at)

/**
 * Local-only business record repository. Every mutation writes the record and
 * its outbox operation in a single Dexie transaction and performs no network I/O.
 */
export function createBusinessRepository(db: KitchAIDatabase, options: RepositoryOptions = {}) {
  const now = () => (options.now ?? (() => new Date()))().toISOString()
  const newId = options.generateId ?? defaultGenerateId
  const ownerId = options.ownerId ?? null

  async function insert(record: Business) {
    const entry = buildOutboxEntry(record, 'create', newId(), record.updated_at)
    await db.transaction('rw', db.businesses, db.outbox, async () => {
      await db.businesses.add(record)
      await db.outbox.add(entry)
    })
  }

  async function mutate(
    id: string,
    operation: Exclude<OperationType, 'create'>,
    apply: (current: Business, timestamp: string) => Partial<Business>,
  ): Promise<Business> {
    try {
      let next: Business | undefined
      await db.transaction('rw', db.businesses, db.outbox, async () => {
        const current = await db.businesses.get(id)
        if (!current) throw new RecordNotFoundError(id)
        if (current.deleted_at !== null) {
          throw new InvalidTransitionError('Deleted records cannot be changed.')
        }
        const timestamp = now()
        next = {
          ...current,
          ...apply(current, timestamp),
          updated_at: timestamp,
          version: current.version + 1,
          sync_state: 'pending',
          pending_operation: operation,
        }
        assertValidLifecycleState(next.lifecycle_state)
        await db.businesses.put(next)
        await db.outbox.add(buildOutboxEntry(next, operation, newId(), timestamp))
      })
      return next!
    } catch (error) {
      throw toDomainError(error)
    }
  }

  return {
    async create(input: BusinessInput): Promise<Business> {
      const { name, description } = assertValidBusinessInput(input)
      const timestamp = now()
      const record: Business = {
        id: newId(),
        owner_id: ownerId,
        name,
        description,
        lifecycle_state: 'active',
        created_at: timestamp,
        updated_at: timestamp,
        version: 1,
        server_version: null,
        deleted_at: null,
        sync_state: 'pending',
        pending_operation: 'create',
        conflict_data: null,
      }
      try {
        await insert(record)
      } catch (error) {
        throw toDomainError(error)
      }
      return record
    },

    async update(id: string, patch: BusinessPatch): Promise<Business> {
      return mutate(id, 'update', (current) => {
        const normalized = assertValidBusinessInput({
          name: patch.name ?? current.name,
          description: patch.description === undefined ? current.description : patch.description,
        })
        return normalized
      })
    },

    async archive(id: string): Promise<Business> {
      return mutate(id, 'archive', (current) => {
        if (current.lifecycle_state !== 'active') {
          throw new InvalidTransitionError('Only active records can be archived.')
        }
        return { lifecycle_state: 'archived' }
      })
    },

    async restore(id: string): Promise<Business> {
      return mutate(id, 'restore', (current) => {
        if (current.lifecycle_state !== 'archived') {
          throw new InvalidTransitionError('Only archived records can be restored.')
        }
        return { lifecycle_state: 'active' }
      })
    },

    /** Soft delete: sets deleted_at and keeps the tombstone. Never physically removes the record. */
    async softDelete(id: string): Promise<Business> {
      return mutate(id, 'delete', (_current, timestamp) => ({ deleted_at: timestamp }))
    },

    async get(id: string): Promise<Business | undefined> {
      return db.businesses.get(id)
    },

    async listActive(): Promise<Business[]> {
      const records = await db.businesses.where('lifecycle_state').equals('active').toArray()
      return records.filter((record) => record.deleted_at === null).sort(byUpdatedDesc)
    },

    async listArchived(): Promise<Business[]> {
      const records = await db.businesses.where('lifecycle_state').equals('archived').toArray()
      return records.filter((record) => record.deleted_at === null).sort(byUpdatedDesc)
    },

    async listDeleted(): Promise<Business[]> {
      const records = await db.businesses.filter((record) => record.deleted_at !== null).toArray()
      return records.sort(byUpdatedDesc)
    },
  }
}

export type BusinessRepository = ReturnType<typeof createBusinessRepository>
