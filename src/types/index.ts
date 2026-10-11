export type LifecycleState = 'active' | 'archived'

export type SyncState = 'pending' | 'synced' | 'conflict'

export type OperationType = 'create' | 'update' | 'archive' | 'restore' | 'delete'

export type OutboxStatus = 'pending' | 'in_flight' | 'succeeded' | 'failed' | 'conflict'

export const LIFECYCLE_STATES: readonly LifecycleState[] = ['active', 'archived']
export const OPERATION_TYPES: readonly OperationType[] = [
  'create',
  'update',
  'archive',
  'restore',
  'delete',
]

/** Reserved for WP5 conflict preservation; WP2 never populates it. */
export type ConflictData = Record<string, unknown>

export interface Business {
  id: string
  /** Null until WP3 binds an authenticated owner. Local-only records are never uploaded. */
  owner_id: string | null
  name: string
  description: string | null
  lifecycle_state: LifecycleState
  created_at: string
  updated_at: string
  /** Local record version; incremented on every mutation. */
  version: number
  /** Last cloud-acknowledged version; reserved for WP4. */
  server_version: number | null
  /** Non-null marks a soft-delete tombstone. Independent of lifecycle_state. */
  deleted_at: string | null
  sync_state: SyncState
  pending_operation: OperationType | null
  conflict_data: ConflictData | null
}

/** Business fields captured in an outbox payload (excludes local sync metadata). */
export type BusinessSnapshot = Pick<
  Business,
  | 'id'
  | 'owner_id'
  | 'name'
  | 'description'
  | 'lifecycle_state'
  | 'created_at'
  | 'updated_at'
  | 'version'
  | 'deleted_at'
>

export interface OutboxEntry {
  operation_id: string
  record_id: string
  operation_type: OperationType
  payload: Readonly<BusinessSnapshot>
  /** Last-known server version (record.server_version), not the local version. */
  expected_version: number | null
  /** Local record version produced by this operation; orders a record's queued operations. */
  record_version: number
  created_at: string
  retry_count: number
  status: OutboxStatus
}

export interface BusinessInput {
  name: string
  description?: string | null
}
