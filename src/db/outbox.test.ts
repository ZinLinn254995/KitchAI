import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createBusinessRepository } from './businesses'
import { openDatabase } from './database'
import { listOperationsForRecord, listPendingOperations, recoverInFlightOperations } from './outbox'
import { setupStore } from './test-utils'

let ctx: Awaited<ReturnType<typeof setupStore>>

beforeEach(async () => {
  ctx = await setupStore()
})

afterEach(async () => {
  ctx.db.close()
  await ctx.db.delete()
})

describe('outbox entries', () => {
  it('appends exactly one entry per mutation with the matching operation type', async () => {
    const created = await ctx.repo.create({ name: 'Bakery' })
    await ctx.repo.update(created.id, { name: 'Bakery 2' })
    await ctx.repo.archive(created.id)
    await ctx.repo.restore(created.id)
    await ctx.repo.softDelete(created.id)

    const ops = await listOperationsForRecord(ctx.db, created.id)
    expect(ops.map((op) => op.operation_type)).toEqual([
      'create',
      'update',
      'archive',
      'restore',
      'delete',
    ])
    expect(ops.map((op) => op.record_version)).toEqual([1, 2, 3, 4, 5])
    for (const op of ops) {
      expect(op).toMatchObject({ record_id: created.id, status: 'pending', retry_count: 0 })
      expect(op.expected_version).toBeNull()
      expect(op.operation_id).toMatch(/^[0-9a-f-]{36}$/)
      expect(op.payload.version).toBe(op.record_version)
    }
    expect(new Set(ops.map((op) => op.operation_id)).size).toBe(5)
  })

  it('stores an immutable snapshot per operation', async () => {
    const created = await ctx.repo.create({ name: 'First' })
    await ctx.repo.update(created.id, { name: 'Second' })
    const [createOp, updateOp] = await listOperationsForRecord(ctx.db, created.id)
    expect(createOp.payload.name).toBe('First')
    expect(updateOp.payload.name).toBe('Second')
    expect(createOp.payload).not.toHaveProperty('sync_state')
  })

  it('uses server_version (not local version) as expected_version', async () => {
    const created = await ctx.repo.create({ name: 'Acked' })
    await ctx.db.businesses.update(created.id, { server_version: 7 })
    await ctx.repo.update(created.id, { name: 'Acked 2' })
    const ops = await listOperationsForRecord(ctx.db, created.id)
    expect(ops[1].expected_version).toBe(7)
    expect(ops[1].record_version).toBe(2)
  })

  it('keeps multiple pending edits recoverable in order', async () => {
    const created = await ctx.repo.create({ name: 'Edit 0' })
    for (let i = 1; i <= 5; i++) {
      await ctx.repo.update(created.id, { name: `Edit ${i}` })
    }
    const pending = await listPendingOperations(ctx.db)
    expect(pending).toHaveLength(6)
    expect(pending.map((op) => op.payload.name)).toEqual([
      'Edit 0',
      'Edit 1',
      'Edit 2',
      'Edit 3',
      'Edit 4',
      'Edit 5',
    ])
  })
})

describe('atomicity', () => {
  it('rolls back a create when the outbox write fails', async () => {
    ctx.db.outbox.hook('creating', () => {
      throw new Error('simulated outbox failure')
    })
    await expect(ctx.repo.create({ name: 'Orphan' })).rejects.toThrow()
    expect(await ctx.db.businesses.count()).toBe(0)
    expect(await ctx.db.outbox.count()).toBe(0)
  })

  it('rolls back update, archive, and delete when the outbox write fails', async () => {
    const created = await ctx.repo.create({ name: 'Stable' })
    const subscription = () => {
      throw new Error('simulated outbox failure')
    }
    ctx.db.outbox.hook('creating', subscription)

    await expect(ctx.repo.update(created.id, { name: 'Changed' })).rejects.toThrow()
    await expect(ctx.repo.archive(created.id)).rejects.toThrow()
    await expect(ctx.repo.softDelete(created.id)).rejects.toThrow()

    expect(await ctx.repo.get(created.id)).toEqual(created)
    expect(await ctx.db.outbox.count()).toBe(1)
    ctx.db.outbox.hook('creating').unsubscribe(subscription)
  })

  it('rolls back the outbox entry when the record write fails', async () => {
    const created = await ctx.repo.create({ name: 'Stable' })
    ctx.db.businesses.hook('updating', () => {
      throw new Error('simulated record failure')
    })
    ctx.db.businesses.hook('creating', () => {
      throw new Error('simulated record failure')
    })
    await expect(ctx.repo.update(created.id, { name: 'Changed' })).rejects.toThrow()
    expect(await ctx.db.outbox.count()).toBe(1)
    expect(await ctx.repo.get(created.id)).toEqual(created)
  })
})

describe('startup recovery', () => {
  it('returns abandoned in_flight entries to pending after reopen', async () => {
    const a = await ctx.repo.create({ name: 'A' })
    await ctx.repo.update(a.id, { name: 'A2' })
    const ops = await listOperationsForRecord(ctx.db, a.id)
    await ctx.db.outbox.update(ops[0].operation_id, { status: 'in_flight' })
    await ctx.db.outbox.update(ops[1].operation_id, { status: 'succeeded' })
    ctx.db.close()

    const reopened = await openDatabase(ctx.name)
    expect(await recoverInFlightOperations(reopened)).toBe(1)
    const after = await listOperationsForRecord(reopened, a.id)
    expect(after.map((op) => op.status)).toEqual(['pending', 'succeeded'])
    expect(await recoverInFlightOperations(reopened)).toBe(0)

    const repo = createBusinessRepository(reopened)
    expect((await repo.get(a.id))?.name).toBe('A2')
    ctx.db = reopened
  })
})
