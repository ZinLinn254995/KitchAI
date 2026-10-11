import { use, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { BusinessDetail } from './BusinessDetail'
import { BusinessForm } from './BusinessForm'
import { BusinessList, type ListView } from './BusinessList'
import { getStore } from './store'

const VIEWS: { id: ListView; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'archived', label: 'Archived' },
  { id: 'deleted', label: 'Deleted' },
]

export function App() {
  const { db, repo, recoveredOperations } = use(getStore())
  const [view, setView] = useState<ListView>('active')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const records = useLiveQuery(
    () =>
      view === 'active'
        ? repo.listActive()
        : view === 'archived'
          ? repo.listArchived()
          : repo.listDeleted(),
    [repo, view],
  )
  const selected = useLiveQuery(
    () => (selectedId ? repo.get(selectedId) : undefined),
    [repo, selectedId],
  )
  const pendingCount = useLiveQuery(() => db.outbox.where('status').equals('pending').count(), [db])

  return (
    <main className="shell">
      <header className="app-header">
        <h1>KitchAI</h1>
        <p className="muted">
          Local data foundation (development build). Records are saved on this device only; cloud
          sync is not implemented yet.
        </p>
        <p className="status-line" aria-live="polite">
          {pendingCount ?? 0} operation{pendingCount === 1 ? '' : 's'} queued locally
          {recoveredOperations > 0 && ` · ${recoveredOperations} interrupted operation(s) recovered`}
        </p>
      </header>

      <section aria-labelledby="create-heading" className="panel">
        <h2 id="create-heading">New business</h2>
        <BusinessForm
          submitLabel="Create"
          resetOnSuccess
          onSubmit={async (input) => {
            const created = await repo.create(input)
            setView('active')
            setSelectedId(created.id)
          }}
        />
      </section>

      <section aria-labelledby="records-heading" className="panel">
        <h2 id="records-heading">Records</h2>
        <div role="tablist" aria-label="Record views" className="tabs">
          {VIEWS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={view === item.id}
              className="tab"
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <BusinessList
          view={view}
          records={records}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </section>

      {selected && (
        <BusinessDetail
          key={selected.id}
          record={selected}
          repo={repo}
          onClose={() => setSelectedId(null)}
        />
      )}
    </main>
  )
}
