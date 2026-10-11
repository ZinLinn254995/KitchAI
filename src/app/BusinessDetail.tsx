import { useState } from 'react'
import type { BusinessRepository } from '../db/businesses'
import { toDomainError } from '../db/errors'
import type { Business } from '../types'
import { BusinessForm } from './BusinessForm'
import { StatusBadges } from './StatusBadges'

interface Props {
  record: Business
  repo: BusinessRepository
  onClose: () => void
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString()
}

export function BusinessDetail({ record, repo, onClose }: Props) {
  const [editing, setEditing] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const isDeleted = record.deleted_at !== null

  async function run(action: () => Promise<unknown>) {
    setActionError(null)
    setBusy(true)
    try {
      await action()
    } catch (error) {
      setActionError(toDomainError(error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section aria-labelledby="detail-heading" className="panel">
      <div className="detail-header">
        <h2 id="detail-heading">{record.name}</h2>
        <button type="button" className="button" onClick={onClose}>
          Close
        </button>
      </div>
      <StatusBadges record={record} />

      {editing ? (
        <BusinessForm
          initial={record}
          submitLabel="Save changes"
          onCancel={() => setEditing(false)}
          onSubmit={async (input) => {
            await repo.update(record.id, input)
            setEditing(false)
          }}
        />
      ) : (
        <>
          <p className="description">{record.description ?? <em className="muted">No description</em>}</p>
          <dl className="meta">
            <dt>ID</dt>
            <dd>
              <code>{record.id}</code>
            </dd>
            <dt>Created</dt>
            <dd>{formatTime(record.created_at)}</dd>
            <dt>Updated</dt>
            <dd>{formatTime(record.updated_at)}</dd>
            <dt>Local version</dt>
            <dd>{record.version}</dd>
            {isDeleted && (
              <>
                <dt>Deleted</dt>
                <dd>{formatTime(record.deleted_at!)}</dd>
              </>
            )}
          </dl>

          {isDeleted ? (
            <p className="muted">
              This record is a deletion tombstone. It is retained locally and cannot be edited.
            </p>
          ) : (
            <div className="actions">
              <button type="button" className="button" disabled={busy} onClick={() => setEditing(true)}>
                Edit
              </button>
              {record.lifecycle_state === 'active' ? (
                <button type="button" className="button" disabled={busy} onClick={() => run(() => repo.archive(record.id))}>
                  Archive
                </button>
              ) : (
                <button type="button" className="button" disabled={busy} onClick={() => run(() => repo.restore(record.id))}>
                  Restore
                </button>
              )}
              <button
                type="button"
                className="button button-danger"
                disabled={busy}
                onClick={() => {
                  if (window.confirm(`Delete "${record.name}"? It will be hidden from your lists.`)) {
                    void run(() => repo.softDelete(record.id))
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}

      {actionError && (
        <p role="alert" className="banner banner-error">
          {actionError}
        </p>
      )}
    </section>
  )
}
