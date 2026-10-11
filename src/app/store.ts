import { createBusinessRepository, type BusinessRepository } from '../db/businesses'
import { openDatabase, type KitchAIDatabase } from '../db/database'
import { recoverInFlightOperations } from '../db/outbox'

export interface LocalStore {
  db: KitchAIDatabase
  repo: BusinessRepository
  recoveredOperations: number
}

async function initStore(): Promise<LocalStore> {
  const db = await openDatabase()
  const recoveredOperations = await recoverInFlightOperations(db)
  return { db, repo: createBusinessRepository(db), recoveredOperations }
}

let storePromise: Promise<LocalStore> | undefined

/** Opens IndexedDB once per page load and runs startup outbox recovery. */
export function getStore(): Promise<LocalStore> {
  storePromise ??= initStore()
  return storePromise
}
