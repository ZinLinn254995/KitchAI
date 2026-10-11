import Dexie from 'dexie'
import type { Business, BusinessSnapshot, OperationType, OutboxEntry } from '../types'
import type { KitchAIDatabase } from './database'
import { toDomainError } from './errors'

function snapshotOf(record: Business): Readonly<BusinessSnapshot> {
  return Object.freeze({
    id: record.id,
    owner_id: record.owner_id,
    name: record.name,
    description: record.description,
    lifecycle_state: record.lifecycle_state,
    created_at: record.created_at,
    updated_at: record.updated_at,
    version: record.version,
    deleted_at: record.deleted_at,
  })
}

export function buildOutboxEntry(
  record: Business,
  operationType: OperationType,
  operationId: string,
  createdAt: string,
): OutboxEntry {
  return {
    operation_id: operationId,
    record_id: record.id,
    operation_type: operationType,
    payload: snapshotOf(record),
    expected_version: record.server_version,
    record_version: record.version,
    created_at: createdAt,
    retry_count: 0,
    status: 'pending',
  }
}

/**
 * Startup recovery: an `in_flight` entry left behind by a closed tab or crash is
 * returned to `pending` so WP4 can retry it. Returns the number recovered.
 */
export async function recoverInFlightOperations(db: KitchAIDatabase): Promise<number> {
  try {
    return await db.outbox.where('status').equals('in_flight').modify({ status: 'pending' })
  } catch (error) {
    throw toDomainError(error)
  }
}

/** All queued operations for a record in the order they were produced. */
export async function listOperationsForRecord(
  db: KitchAIDatabase,
  recordId: string,
): Promise<OutboxEntry[]> {
  return db.outbox
    .where('[record_id+record_version]')
    .between([recordId, Dexie.minKey], [recordId, Dexie.maxKey])
    .toArray()
}

export async function listPendingOperations(db: KitchAIDatabase): Promise<OutboxEntry[]> {
  const entries = await db.outbox.where('status').equals('pending').toArray()
  return entries.sort(
    (a, b) => a.created_at.localeCompare(b.created_at) || a.record_version - b.record_version,
  )
}
