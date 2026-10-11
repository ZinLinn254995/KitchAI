import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createBusinessRepository } from './businesses'
import { KitchAIDatabase, openDatabase } from './database'
import { InvalidTransitionError, StorageError, ValidationError, toDomainError } from './errors'
import { setupStore } from './test-utils'
import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH, validateBusinessInput } from './validation'

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

let ctx: Awaited<ReturnType<typeof setupStore>>

beforeEach(async () => {
  ctx = await setupStore()
})

afterEach(async () => {
  ctx.db.close()
  await ctx.db.delete()
  vi.unstubAllGlobals()
})

describe('create / read / update', () => {
  it('creates a local record with the full contract shape', async () => {
    const created = await ctx.repo.create({ name: '  Corner Cafe  ', description: 'Breakfast' })
    expect(created).toMatchObject({
      owner_id: null,
      name: 'Corner Cafe',
      description: 'Breakfast',
      lifecycle_state: 'active',
      version: 1,
      server_version: null,
      deleted_at: null,
      sync_state: 'pending',
      pending_operation: 'create',
      conflict_data: null,
    })
    expect(created.id).toMatch(UUID_V4)
    expect(created.created_at).toBe(created.updated_at)
    expect(await ctx.repo.get(created.id)).toEqual(created)
    expect(await ctx.repo.listActive()).toEqual([created])
  })

  it('stores an empty description as null', async () => {
    const created = await ctx.repo.create({ name: 'Stall', description: '   ' })
    expect(created.description).toBeNull()
  })

  it('updates name and description, keeping id and created_at stable', async () => {
    const created = await ctx.repo.create({ name: 'Old' })
    const updated = await ctx.repo.update(created.id, { name: 'New', description: 'Desc' })
    expect(updated.id).toBe(created.id)
    expect(updated.created_at).toBe(created.created_at)
    expect(updated.name).toBe('New')
    expect(updated.description).toBe('Desc')
    expect(updated.updated_at > created.updated_at).toBe(true)
    expect(updated.pending_operation).toBe('update')
    expect(updated.sync_state).toBe('pending')
    expect(await ctx.repo.get(created.id)).toEqual(updated)
  })

  it('generates a distinct stable id per record', async () => {
    const ids = new Set<string>()
    for (let i = 0; i < 20; i++) {
      ids.add((await ctx.repo.create({ name: `B${i}` })).id)
    }
    expect(ids.size).toBe(20)
  })

  it('binds the owner only when one is provided (WP3)', async () => {
    const repo = createBusinessRepository(ctx.db, { ownerId: 'owner-from-wp3' })
    expect((await repo.create({ name: 'Owned' })).owner_id).toBe('owner-from-wp3')
  })
})

describe('validation', () => {
  it('requires a name', async () => {
    await expect(ctx.repo.create({ name: '' })).rejects.toBeInstanceOf(ValidationError)
    await expect(ctx.repo.create({ name: '   ' })).rejects.toThrow('Name is required.')
    expect(await ctx.db.businesses.count()).toBe(0)
    expect(await ctx.db.outbox.count()).toBe(0)
  })

  it('enforces name and description maximum lengths at the boundary', async () => {
    await expect(ctx.repo.create({ name: 'a'.repeat(NAME_MAX_LENGTH) })).resolves.toBeDefined()
    await expect(ctx.repo.create({ name: 'a'.repeat(NAME_MAX_LENGTH + 1) })).rejects.toThrow(
      'at most 200',
    )
    await expect(
      ctx.repo.create({ name: 'ok', description: 'd'.repeat(DESCRIPTION_MAX_LENGTH) }),
    ).resolves.toBeDefined()
    const error = await ctx.repo
      .create({ name: 'ok', description: 'd'.repeat(DESCRIPTION_MAX_LENGTH + 1) })
      .catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ValidationError)
    expect((error as ValidationError).fieldErrors.description).toMatch('at most 2000')
  })

  it('rejects invalid updates without changing the record or outbox', async () => {
    const created = await ctx.repo.create({ name: 'Valid' })
    await expect(ctx.repo.update(created.id, { name: '' })).rejects.toBeInstanceOf(ValidationError)
    expect(await ctx.repo.get(created.id)).toEqual(created)
    expect(await ctx.db.outbox.count()).toBe(1)
  })

  it('reports multiple field errors together', () => {
    const errors = validateBusinessInput({ name: '', description: 'x'.repeat(2001) })
    expect(Object.keys(errors).sort()).toEqual(['description', 'name'])
  })
})

describe('archive and restore', () => {
  it('archives reversibly and restores to the active list', async () => {
    const created = await ctx.repo.create({ name: 'Seasonal' })
    const archived = await ctx.repo.archive(created.id)
    expect(archived.lifecycle_state).toBe('archived')
    expect(archived.deleted_at).toBeNull()
    expect(await ctx.repo.listActive()).toEqual([])
    expect(await ctx.repo.listArchived()).toEqual([archived])
    expect(await ctx.repo.get(created.id)).toEqual(archived)

    const restored = await ctx.repo.restore(created.id)
    expect(restored.lifecycle_state).toBe('active')
    expect(restored.pending_operation).toBe('restore')
    expect(await ctx.repo.listActive()).toEqual([restored])
    expect(await ctx.repo.listArchived()).toEqual([])
  })

  it('rejects invalid transitions', async () => {
    const created = await ctx.repo.create({ name: 'X' })
    await expect(ctx.repo.restore(created.id)).rejects.toBeInstanceOf(InvalidTransitionError)
    await ctx.repo.archive(created.id)
    await expect(ctx.repo.archive(created.id)).rejects.toBeInstanceOf(InvalidTransitionError)
  })
})

describe('soft delete', () => {
  it('retains a tombstone and hides it from normal lists', async () => {
    const created = await ctx.repo.create({ name: 'Closing' })
    const deleted = await ctx.repo.softDelete(created.id)
    expect(deleted.deleted_at).not.toBeNull()
    expect(deleted.lifecycle_state).toBe('active')
    expect(deleted.pending_operation).toBe('delete')
    expect(await ctx.db.businesses.count()).toBe(1)
    expect(await ctx.repo.get(created.id)).toEqual(deleted)
    expect(await ctx.repo.listActive()).toEqual([])
    expect(await ctx.repo.listArchived()).toEqual([])
    expect(await ctx.repo.listDeleted()).toEqual([deleted])
  })

  it('keeps lifecycle state separate when deleting an archived record', async () => {
    const created = await ctx.repo.create({ name: 'Old shop' })
    await ctx.repo.archive(created.id)
    const deleted = await ctx.repo.softDelete(created.id)
    expect(deleted.lifecycle_state).toBe('archived')
    expect(await ctx.repo.listArchived()).toEqual([])
  })

  it('blocks further mutation of a tombstone (no undelete in WP2)', async () => {
    const created = await ctx.repo.create({ name: 'Gone' })
    await ctx.repo.softDelete(created.id)
    for (const op of [
      () => ctx.repo.update(created.id, { name: 'Back' }),
      () => ctx.repo.archive(created.id),
      () => ctx.repo.restore(created.id),
      () => ctx.repo.softDelete(created.id),
    ]) {
      await expect(op()).rejects.toBeInstanceOf(InvalidTransitionError)
    }
    expect(await ctx.db.outbox.count()).toBe(2)
  })
})

describe('versioning', () => {
  it('increments the local version on every mutation without touching server_version', async () => {
    const created = await ctx.repo.create({ name: 'V' })
    const steps = [
      await ctx.repo.update(created.id, { name: 'V2' }),
      await ctx.repo.archive(created.id),
      await ctx.repo.restore(created.id),
      await ctx.repo.softDelete(created.id),
    ]
    expect(steps.map((s) => s.version)).toEqual([2, 3, 4, 5])
    expect(steps.every((s) => s.server_version === null)).toBe(true)
  })
})

describe('offline / no network', () => {
  it('performs all local CRUD without any network request', async () => {
    const fetchSpy = vi.fn(() => Promise.reject(new Error('network disabled')))
    const xhrSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    vi.stubGlobal('XMLHttpRequest', xhrSpy)
    vi.stubGlobal('WebSocket', xhrSpy)

    const created = await ctx.repo.create({ name: 'Offline' })
    await ctx.repo.update(created.id, { description: 'edited offline' })
    await ctx.repo.archive(created.id)
    await ctx.repo.restore(created.id)
    await ctx.repo.listActive()
    await ctx.repo.softDelete(created.id)

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(xhrSpy).not.toHaveBeenCalled()
  })
})

describe('persistence across reopen', () => {
  it('reads records written before the database was closed (simulated restart)', async () => {
    const created = await ctx.repo.create({ name: 'Durable' })
    const updated = await ctx.repo.update(created.id, { description: 'persisted' })
    ctx.db.close()

    const reopened = await openDatabase(ctx.name)
    const repo = createBusinessRepository(reopened)
    expect(await repo.get(created.id)).toEqual(updated)
    expect(await reopened.outbox.count()).toBe(2)
    reopened.close()
    ctx.db = new KitchAIDatabase(ctx.name)
  })
})

describe('storage failures', () => {
  it('reports unsupported IndexedDB', async () => {
    vi.stubGlobal('indexedDB', undefined)
    await expect(openDatabase('unsupported')).rejects.toMatchObject({ kind: 'unsupported' })
  })

  it('maps quota errors to a user-facing StorageError', () => {
    const quota = Object.assign(new Error('full'), { name: 'AbortError', inner: { name: 'QuotaExceededError' } })
    const mapped = toDomainError(quota)
    expect(mapped).toBeInstanceOf(StorageError)
    expect((mapped as StorageError).kind).toBe('quota')
  })

  it('surfaces a quota failure during write as StorageError and saves nothing', async () => {
    ctx.db.businesses.hook('creating', () => {
      const error = new Error('quota')
      error.name = 'QuotaExceededError'
      throw error
    })
    await expect(ctx.repo.create({ name: 'Too big' })).rejects.toMatchObject({ kind: 'quota' })
    expect(await ctx.db.businesses.count()).toBe(0)
    expect(await ctx.db.outbox.count()).toBe(0)
  })
})
