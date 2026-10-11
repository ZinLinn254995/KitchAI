import type { Business } from '../types'

export function StatusBadges({ record }: { record: Business }) {
  return (
    <span className="badges">
      {record.deleted_at !== null && <span className="badge badge-deleted">Deleted</span>}
      {record.lifecycle_state === 'archived' && (
        <span className="badge badge-archived">Archived</span>
      )}
      {record.sync_state === 'pending' && (
        <span className="badge badge-pending">Pending sync ({record.pending_operation})</span>
      )}
      {record.sync_state === 'conflict' && <span className="badge badge-deleted">Conflict</span>}
    </span>
  )
}
