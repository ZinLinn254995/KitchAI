# WP2 — Local Data Foundation: Implementation Prompt

**Task ID:** P1-WP2
**Parent:** Phase 1, WP2
**Status:** Planned — not implementation-ready until owner accepts the [Phase 1 Approval Packet](../PHASE_1_APPROVAL_PACKET.md)
**Execution mode:** COMMIT_PUSH_REQUIRED (after validation)
**Prerequisites:** Owner acceptance of Phase 1 Approval Packet; WP1 complete

## Objective

Implement durable local persistence using Dexie (IndexedDB wrapper) with offline
create, read, update, and archive/delete for the minimal business record. Data
must persist across browser reload and environment restart. Include sync metadata
(outbox and sync_state) for later WP4 integration.

## Scope

- Install and configure Dexie (`dexie`) as the local persistence layer.
- Define a local database schema mirroring the cloud `businesses` table plus
  sync metadata fields.
- Implement CRUD functions: create, read (single + list), update, archive,
  soft-delete (tombstone), and restore.
- Implement local validation: name required (1–200 chars), description optional
  (max 2000 chars), lifecycle_state in ('active', 'archived').
- Generate stable UUIDs for each new record (use `crypto.randomUUID()`).
- Maintain `sync_state` ('synced', 'pending', 'conflict') and
  `pending_operation` (null, 'create', 'update', 'archive', 'delete') on each
  local write.
- Maintain an outbox store for pending sync operations (used by WP4 later).
- Ensure data persists across browser reload and restart (IndexedDB durability).
- Set up the Vite + React + TypeScript project structure if not already present.
- Create a minimal UI to exercise CRUD operations (not polished — enough to
  test persistence and validate behavior).

## Non-goals

- Cloud synchronization (WP4).
- Conflict resolution UI (WP5).
- Authentication or RLS policies (WP3).
- Full account-management UI.
- Production deployment.
- PWA service worker or manifest (Phase 5).
- Polished design or complete UX.

## Dependencies

- WP1 (Phase 1 Approval Packet) owner-accepted.
- Vite + React + TypeScript project setup.
- Dexie npm package.

## Required Behavior and Constraints

1. **Local database schema (Dexie):**

   ```
   businesses:
     - id (UUID, PK)
     - owner_id (UUID)
     - name (string, NOT NULL)
     - description (string, nullable)
     - lifecycle_state (string: 'active' | 'archived')
     - created_at (ISO string)
     - updated_at (ISO string)
     - version (number, default 1)
     - sync_state (string: 'synced' | 'pending' | 'conflict')
     - pending_operation (string: null | 'create' | 'update' | 'archive' | 'delete')
     - conflict_data (object, nullable)

   outbox:
     - operation_id (UUID, PK)
     - record_id (UUID)
     - operation_type (string: 'create' | 'update' | 'archive' | 'delete')
     - payload (object)
     - expected_version (number)
     - created_at (ISO string)
     - retry_count (number, default 0)
     - status (string: 'pending' | 'in_flight' | 'succeeded' | 'failed' | 'conflict')
   ```

2. **CRUD operations write to local IndexedDB only** (no network calls).

3. **Every local write sets `sync_state = 'pending'`** and records the
   `pending_operation` type. A corresponding entry is added to the outbox store.

4. **Validation rejects:** empty name, name > 200 chars, description > 2000
   chars, invalid lifecycle_state. Surface validation errors to the UI.

5. **Archive** sets `lifecycle_state = 'archived'` and creates an outbox entry
   with `operation_type = 'archive'`.

6. **Delete** creates a tombstone entry (a record in `businesses` with
   `lifecycle_state` set to a tombstone indicator or a separate tombstone
   field) and an outbox entry with `operation_type = 'delete'`. The record's
   `id` is never reused.

7. **Restore** reverses archive (sets `lifecycle_state = 'active'`) and creates
   an outbox entry.

8. **`version`** increments on every update. `updated_at` is set to current
   ISO timestamp on every update.

9. **Restart recovery:** On application load, read all data from IndexedDB.
   Reset any outbox entries with `status = 'in_flight'` to `status = 'pending'`.
   Local data is immediately available without waiting for sync.

10. **No secrets or credentials in code.** The `.env` file is gitignored.

## Acceptance Criteria

| ID | Criterion | Verification |
| --- | --- | --- |
| AC-WP2-01 | Create a business record offline; it appears in the list | Manual test in browser with network disabled |
| AC-WP2-02 | Edit a business record offline; changes persist | Manual test; reload browser; record shows updated values |
| AC-WP2-03 | Record persists across full browser restart | Close browser; reopen; navigate to app; record is present |
| AC-WP2-04 | Archive a record; it disappears from active list but remains readable | Manual test; verify lifecycle_state = 'archived' |
| AC-WP2-05 | Delete a record; tombstone is created; id is not reused | Manual test; verify tombstone entry in IndexedDB |
| AC-WP2-06 | Restore an archived record; it reappears in active list | Manual test; verify lifecycle_state = 'active' |
| AC-WP2-07 | Validation rejects empty name and oversize fields | Unit test with Vitest |
| AC-WP2-08 | Outbox entry is created for every write operation | Unit test; inspect outbox store in Dexie |
| AC-WP2-09 | In-flight outbox entries reset to pending on restart | Unit test simulating restart |
| AC-WP2-10 | `version` increments on each update | Unit test |

## Verification Commands

```bash
npm install
npx tsc --noEmit
npx vitest run
npx vite build
```

All commands must exit 0. Vitest must show all tests passing.

## Security Tests

- Verify no credentials or API keys appear in source code.
- Verify `.env` is not tracked by git.
- Verify no network calls are made during offline CRUD operations.

## Failure Cases

- IndexedDB quota exceeded: surface a user-visible error message.
- IndexedDB unavailable (private browsing in some browsers): detect and warn.
- Browser data clearing: data is lost; user must re-sync from cloud (WP4).
- Concurrent tabs writing to the same record: Dexie handles IndexedDB
  transactions; last write wins locally. Conflict detection is at sync time
  (WP5), not at local-write time.

## Rollback Guidance

- Local-only changes; clear IndexedDB to reset all data.
- Git revert to previous commit if code changes need to be undone.
- No cloud database changes in this task.

## Expected Files

- `package.json` — dependencies (dexie, react, vite, typescript, vitest)
- `vite.config.ts` — Vite configuration
- `tsconfig.json` — TypeScript configuration
- `src/db/database.ts` — Dexie database definition and schema
- `src/db/businesses.ts` — CRUD functions for business records
- `src/db/outbox.ts` — Outbox helper functions
- `src/db/validation.ts` — Validation functions
- `src/types/index.ts` — TypeScript types for Business, OutboxEntry
- `src/App.tsx` — Minimal UI to exercise CRUD
- `src/main.tsx` — React entry point
- `index.html` — HTML entry point
- `vitest.config.ts` — Vitest configuration
- `src/db/businesses.test.ts` — Unit tests for CRUD and validation
- `src/db/outbox.test.ts` — Unit tests for outbox operations

## Completion Report

After implementation, report:
- Files created/modified
- Test results (pass/fail counts)
- `tsc --noEmit` result
- `vite build` result
- Git commit ID and branch
- Any deviations from this prompt and why
- Any blockers or remaining issues
