import { createBusinessRepository } from './businesses'
import { KitchAIDatabase } from './database'

let counter = 0

/** Fresh isolated database plus a repository with a deterministic, strictly increasing clock. */
export async function setupStore(name = `kitchai-test-${++counter}-${Date.now()}`) {
  const db = new KitchAIDatabase(name)
  await db.open()
  let tick = Date.parse('2026-01-01T00:00:00.000Z')
  const now = () => new Date((tick += 1000))
  const repo = createBusinessRepository(db, { now })
  return { db, repo, name, now }
}
