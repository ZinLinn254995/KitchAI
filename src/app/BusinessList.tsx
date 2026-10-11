import type { Business } from '../types'
import { StatusBadges } from './StatusBadges'

export type ListView = 'active' | 'archived' | 'deleted'

const EMPTY_MESSAGES: Record<ListView, string> = {
  active: 'No active businesses yet. Create one above.',
  archived: 'No archived businesses.',
  deleted: 'No deleted businesses.',
}

interface Props {
  view: ListView
  records: Business[] | undefined
  selectedId: string | null
  onSelect: (id: string) => void
}

export function BusinessList({ view, records, selectedId, onSelect }: Props) {
  if (!records) return <p className="muted">Loading…</p>
  if (records.length === 0) return <p className="muted">{EMPTY_MESSAGES[view]}</p>

  return (
    <ul className="record-list">
      {records.map((record) => (
        <li key={record.id}>
          <button
            type="button"
            className="record-row"
            aria-current={record.id === selectedId ? 'true' : undefined}
            onClick={() => onSelect(record.id)}
          >
            <span className="record-name">{record.name}</span>
            <StatusBadges record={record} />
          </button>
        </li>
      ))}
    </ul>
  )
}
