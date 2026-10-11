# Phase 1 Approval Packet — KitchAI

**Status:** Planning consolidation and recommendation packet. This document
recommends technical decisions the owner authorized ChatGPT to make. It does
not claim runtime behavior is implemented or verified. This packet is not an
implementation authorization, and owner acceptance of the packet as a whole
remains pending.

**Current implementation status (post-planning note):** After this packet was
written, the owner granted a separate, limited
[execution authorization](PHASE_1_EXECUTION_AUTHORIZATION.md) for P1-WP2 only.
P1-WP2 has been implemented and verified locally on branch
`v0/p1-wp2-local-data-foundation`; its pull request is not yet merged to
`main`. P1-WP3 has not started and requires separate owner authorization.
WP4–WP8 are not authorized. O1–O7 remain OWNER DECISION REQUIRED. The
readiness assessments in Section 12 are planning-time snapshots unless a
current-status note says otherwise.

**Date:** 2026-10-11

**Authority:** The owner authorized ChatGPT to make and recommend technical
planning decisions on their behalf. Routine technical decisions below are
marked **DECIDED** with rationale. Genuinely material decisions requiring owner
judgment (legal, financial, privacy, account-ownership, production-deployment)
are marked **OWNER DECISION REQUIRED**.

---

## 1. Phase 1 Objective, Scope, Exclusions, Dependencies, and Definition of Done

### Objective

Establish a secure, testable offline-first local-to-cloud foundation with one
working business-data vertical slice: a single business record that can be
created and edited offline, persist across restart, synchronize through an
authorized cloud round trip, recover from interruptions, and preserve competing
versions rather than silently overwriting data.

### Scope

- Durable local persistence for one minimal business record (Web/PWA).
- Cloud persistence with server-enforced owner/business authorization.
- Authentication and session foundation (minimum, not full account UI).
- Synchronization metadata, retry/backoff, idempotency, and restart recovery.
- Concurrent-edit detection with competing-version preservation and review.
- Archive, deletion, tombstone, restore, and lifecycle boundary.
- Browser/device support matrix and PWA installability.
- Isolated development and test/preview environments with CI.
- One integrated vertical slice demonstrating all above.

### Exclusions

- Full account-management UI, profile settings, multi-user invitations, roles,
  billing, or ownership transfer (Phase 6).
- Broad business domains: ingredients, menus, recipes, purchases, sales,
  expenses, reports, AI assistant (Phases 2–4).
- Multi-user collaboration or shared business access (Phase 6).
- Advanced AI features (Phase 4).
- Production deployment (unless separately authorized).
- Third-party integrations: QR ordering, delivery (Phase 7).

### Dependencies

- P0 documentation foundation (complete).
- Owner-selected planning directions D1-01 through D1-08 (selected 2026-10-11).
- Backend provider decision (recommended below).
- No earlier phase implementation evidence is required (Phase 1 is first).

### Definition of Done

Phase 1 is done when:

1. The approved vertical slice works offline: create, read, update the minimal
   business record without network connectivity on an initialized device.
2. The record persists across browser reload and environment restart.
3. Authenticated cloud round trip succeeds: local change reaches cloud and
   returns without unintended mutation or duplication.
4. Server-side authorization denies cross-business and unauthenticated access.
5. Retry after transient failure converges to one intended operation (no
   duplicates).
6. Concurrent edits from two clients preserve both competing versions and
   expose an inspectable conflict status.
7. Archive and deletion are distinct; tombstones work where sync requires;
   restore preserves history.
8. CI runs in isolated environments; no production credentials or data leak.
9. Backup/restore and export/import evidence is recorded.
10. All acceptance matrix scenarios (P1-A01 through P1-A13) have evidence or
    documented owner-approved exceptions.

---

## 2. Backend Comparison and Recommendation

### Evaluation Method

Each candidate was evaluated against KitchAI Phase 1 constraints: offline-first
PWA, server-enforced owner/business authorization, concurrent-edit preservation,
backup/restore, cost, portability/exit, and operational burden. Evidence is
drawn from current provider documentation and third-party comparisons (October
2026).

### Comparison Matrix

| Criterion | Supabase | Firebase/Firestore | Appwrite |
| --- | --- | --- | --- |
| **Data model** | PostgreSQL (relational, SQL, joins, foreign keys) | Document database (NoSQL, hierarchical collections) | Document database backed by MariaDB |
| **Server-enforced authorization** | Row Level Security (RLS) — SQL policies on every row; mature, testable, auditable | Security Rules — declarative per-document rules; less expressive than SQL for relational constraints | Document-level permissions via API labels; less granular than RLS or Security Rules for complex ownership |
| **Offline-first** | No built-in offline sync; application must design local persistence, change tracking, and conflict handling | Built-in offline persistence with optimistic writes; SDK handles local caching and automatic sync on reconnect | No built-in offline sync; application must design own offline layer |
| **Conflict handling** | Application-defined: full control over versioning, conflict detection, and preservation of both versions. No silent auto-resolution | SDK applies last-write-wins by default; custom conflict resolution requires manual metadata and transaction design. Risk of silent overwrite if not carefully overridden | Application-defined: same as Supabase — full control but no built-in primitives |
| **Authentication** | Auth with email/password, OAuth, magic links, custom claims via JWT. Session management via refresh tokens. 50K MAU free, 100K on Pro | Firebase Auth with email/password, OAuth, phone. Robust and widely used. Tight coupling to Google identity ecosystem | Auth with email/password, OAuth, JWT. 75K MAU free tier. Less ecosystem maturity than Firebase |
| **Backup/restore** | Point-in-time recovery (PITR): 7-day retention on Pro, 30-day on Enterprise. Manual pg_dump export anytime. Standard Postgres tooling | Scheduled backups on Blaze plan; limited PITR. Export via gcloud. Less granular than Postgres PITR | Self-hosted: full control over backups. Cloud: limited backup tooling compared to Supabase PITR |
| **Export/portability** | Standard Postgres — pg_dump, SQL exports, any Postgres tool. Highest portability | Proprietary document format; export via gcloud but schema and indexes need recreation. Moderate exit cost | MariaDB-backed; export possible but Appwrite-specific metadata, permissions, and functions create coupling |
| **Cost (entry)** | Free: 500MB DB, 50K MAU. Pro $25/mo: 8GB DB, 100K MAU, PITR. Usage-based beyond | Free Spark: 1GB storage, 50K reads/day. Blaze: pay-as-you-go. Offline listeners charged on reconnect after 30 min | Free: 75K MAU, unlimited projects. Pro $15/mo per member. Self-host: infrastructure cost only |
| **Operational burden** | Managed: low. No infrastructure to maintain. Dashboard for DB, auth, storage, functions | Managed: lowest. Google handles everything. But vendor lock-in is highest | Managed cloud: low. Self-hosted: high — must manage infrastructure, security patches, upgrades |
| **Realtime** | Realtime via Postgres logical replication (row-level changes) | Realtime via SDK listeners (document/collection level) | Realtime via WebSocket pub/sub (explicit events) |
| **Edge functions** | Deno Edge Functions (server-side logic) | Cloud Functions (Node.js, Python, etc.) | Cloud Functions (multiple runtimes) |
| **PWA suitability** | No PWA-specific tooling; application builds its own. No limitation | No PWA-specific tooling; application builds its own. No limitation | No PWA-specific tooling; application builds its own. No limitation |

### Key Findings

1. **Conflict preservation:** Supabase and Appwrite require application-level
   conflict design, which is exactly what KitchAI needs — no silent overwrite.
   Firebase's default last-write-wins behavior is a risk that requires careful
   override. KitchAI's requirement to preserve both competing versions is
   safest with a provider that does not impose its own resolution.

2. **Authorization:** Supabase RLS provides the most expressive, testable, and
   auditable server-enforced authorization model for owner/business isolation.
   SQL policies can express "owner_id = auth.uid()" directly and be tested with
   negative cases. Firebase Security Rules are capable but less relational.
   Appwrite's permission model is coarser for complex ownership boundaries.

3. **Portability and exit:** Supabase uses standard PostgreSQL. Data export via
   `pg_dump` produces portable SQL. Migration to any Postgres-compatible system
   is straightforward. Firebase and Appwrite create more coupling through
   proprietary document models and platform-specific metadata.

4. **Backup/restore:** Supabase Pro offers PITR with 7-day retention, plus
   manual `pg_dump` at any tier. Firebase's backup is less granular. Appwrite
   self-hosted gives full control but transfers operational responsibility.

5. **Offline-first:** None of the three provide a complete offline-first sync
   solution that meets KitchAI's conflict-preservation requirement. Firebase
   reduces basic plumbing but its default resolution conflicts with KitchAI's
   requirement. Supabase and Appwrite both require an application-owned sync
   layer, which is the correct approach for controlled conflict handling.

6. **Cost:** All three have viable free tiers for development. Supabase Pro at
   $25/month is the most cost-effective managed option for a small business app
   with PITR and 8GB storage. Firebase's per-read pricing can become expensive
   with offline listener reconnections. Appwrite's per-member pricing ($15/mo
   per member) scales differently.

### Recommendation

**DECIDED: Supabase is the recommended backend provider for Phase 1.**

**Rationale:**

- **Relational data model with RLS** provides the strongest server-enforced
  owner/business authorization for KitchAI's multi-business, ownership-scoped
  data model. SQL policies are expressive, auditable, and testable with
  negative cases.
- **No imposed conflict resolution** — the application owns conflict detection
  and preservation, which is exactly what D1-04 requires. Firebase's default
  last-write-wins is a liability.
- **Standard PostgreSQL** maximizes portability and minimizes exit cost.
  `pg_dump` exports are universally portable. No proprietary lock-in.
- **PITR backup** on Pro plan provides tested, granular recovery.
- **Managed service** with low operational burden — no infrastructure to
  maintain, which suits a Phase 1 foundation.
- **Auth foundation** supports email/password (KitchAI's confirmed starting
  point) with JWT custom claims for authorization.
- **A Supabase project is already provisioned** for this repository, reducing
  setup friction.

**Trade-offs accepted:**

- No built-in offline sync — the application must design its own local
  persistence and sync layer. This is actually preferable for KitchAI because
  it gives full control over conflict preservation.
- Realtime via logical replication is less granular than Firebase's document
  listeners for Phase 1, but realtime is not a Phase 1 requirement.

**Limitation:** This recommendation is based on provider documentation and
third-party comparisons, not a hands-on proof of concept. The first
implementation task should verify RLS policy behavior, auth flow, and
pg_dump export with a minimal test.

---

## 3. Identity, Session, and Authorization Model

### Identity Model

**DECIDED: Email/password authentication via Supabase Auth.**

- Email/password is the confirmed starting point (per project decisions).
- No OAuth/social login in Phase 1 (deferred to Phase 6).
- Email confirmation stays OFF for Phase 1 (per Supabase guidance for
  development).
- Each user has a `user_id` (Supabase auth.uid()).

### Session Model

**DECIDED: JWT-based sessions with refresh tokens (Supabase Auth default).**

- Access token: short-lived JWT containing `auth.uid()`.
- Refresh token: used to obtain new access tokens without re-authentication.
- Session persists in local storage for offline use on initialized devices.
- Session expiry: Supabase default (1 hour access token, refresh on use).
- Revocation: refresh token can be revoked server-side; application checks
  session validity on reconnect.

**First-setup requirement (D1-05):** First sign-in requires online
connectivity. After initialization, the device may operate offline within
the approved boundary. When the session expires offline, the application
continues to serve local data but marks cloud operations as pending until
reconnection and re-authentication.

### Authorization Model

**DECIDED: Server-enforced owner/business authorization via RLS.**

Data model (Phase 1 minimal):

```
users (Supabase Auth manages identity)
  ↓ auth.uid()
businesses
  - id (UUID, PK)
  - owner_id (UUID, FK → auth.users.id)
  - name (TEXT, NOT NULL)
  - description (TEXT, nullable)
  - lifecycle_state (TEXT: 'active' | 'archived')
  - created_at (TIMESTAMPTZ)
  - updated_at (TIMESTAMPTZ)
  - version (INTEGER, optimistic concurrency)
```

RLS policies (one per CRUD verb, scoped to authenticated):

```sql
-- SELECT: owner can read only their businesses
CREATE POLICY "select_own_businesses" ON businesses FOR SELECT
  TO authenticated USING (auth.uid() = owner_id);

-- INSERT: owner can create businesses for themselves
CREATE POLICY "insert_own_businesses" ON businesses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

-- UPDATE: owner can update only their businesses
CREATE POLICY "update_own_businesses" ON businesses FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- DELETE: owner can delete only their businesses
CREATE POLICY "delete_own_businesses" ON businesses FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);
```

**Key principles:**

- Every query is scoped by `auth.uid() = owner_id` at the database level.
- The service role key is never exposed to the client; it is used only in
  Edge Functions for privileged operations.
- Cross-business access is denied by RLS, not by client-side filtering.
- Negative tests verify that authenticated user A cannot read, write, or
  delete user B's businesses.

### Deferred Account Features

The following are explicitly out of Phase 1 scope:

- Profile management UI
- Password reset email (can be added if owner requests)
- Session management UI (listing/revoking sessions)
- Multi-device session visibility
- Account deletion workflow (Phase 6)
- OAuth/social login (Phase 6)
- Multi-user invitations (Phase 6)

---

## 4. Minimal Business-Record Contract and Lifecycle

### Record Contract

**DECIDED: The minimal business record is a `businesses` table with:**

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Stable unique identifier |
| `owner_id` | UUID | NOT NULL, FK → `auth.users.id` | Ownership binding |
| `name` | TEXT | NOT NULL, 1–200 chars | Business name |
| `description` | TEXT | nullable, max 2000 chars | Optional description |
| `lifecycle_state` | TEXT | NOT NULL, default `'active'` | `'active'` or `'archived'` |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `now()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, default `now()` | Last modification timestamp |
| `version` | INTEGER | NOT NULL, default 1 | Optimistic concurrency counter |

### Update Semantics

- `updated_at` is set to `now()` on every update.
- `version` is incremented on every update. The client sends the expected
  `version` with each update; if the server's current `version` does not
  match, the update is rejected as a conflict (see Section 7).

### Lifecycle States

```
active  ─��archive──→  archived
archived ──restore──→  active
active  ──delete───→  [tombstone] (if sync requires)
archived ──delete───→  [tombstone] (if sync requires)
```

**DECIDED:**

- **Archive** sets `lifecycle_state = 'archived'`. The record remains readable
  for history but is excluded from active lists by default. Archive is
  reversible.
- **Delete** in Phase 1: soft-delete via tombstone record for sync awareness.
  Permanent deletion is not implemented in Phase 1. The record's `id` is never
  reused.
- **Restore** reverses archive, setting `lifecycle_state = 'active'`.
- **Tombstone:** when a record is deleted, a tombstone entry marks the
  deletion timestamp so other devices know the record was intentionally
  deleted, not missing due to sync failure.

**OWNER DECISION REQUIRED:**

- Permanent deletion authority and retention period (how long tombstones are
  kept before permanent removal).
- Privacy-related deletion (e.g., GDPR-style right to erasure) — this is a
  legal/privacy decision.

---

## 5. Local Persistence and Offline-First Behavior

### Local Persistence Technology

**DECIDED: Dexie (IndexedDB wrapper) for local persistence.**

- Dexie provides a typed, promise-based API over IndexedDB.
- IndexedDB is available in all modern browsers and persists across restarts.
- Dexie supports schema versioning and migrations.
- Data is stored locally and available offline without network.

### Local Data Schema

The local database mirrors the cloud `businesses` table plus sync metadata:

```
local_businesses:
  - id (UUID, PK)
  - owner_id (UUID)
  - name (TEXT)
  - description (TEXT, nullable)
  - lifecycle_state (TEXT)
  - created_at (TIMESTAMPTZ)
  - updated_at (TIMESTAMPTZ)
  - version (INTEGER)
  - sync_state (TEXT: 'synced' | 'pending' | 'conflict')
  - pending_operation (TEXT: null | 'create' | 'update' | 'archive' | 'delete')
  - conflict_data (JSON, nullable)
```

### Offline Behavior

1. **After initial online setup:** The user signs in online. Local data is
   populated from cloud. The device is now initialized.
2. **Offline create:** User creates a business record. It is saved locally
   with `sync_state = 'pending'`, `pending_operation = 'create'`. It is
   immediately visible in the UI.
3. **Offline update:** User edits a business. Local record is updated,
   `sync_state = 'pending'`, `pending_operation = 'update'`.
4. **Offline read:** All reads come from local IndexedDB. No network needed.
5. **Reconnect:** Pending operations are synced to cloud (see Section 6).
6. **Session expiry offline:** The application continues serving local data.
   Cloud operations are queued. On reconnect, if the session is expired, the
   user is prompted to re-authenticate before pending operations sync.

### Offline Boundary

**DECIDED:** Offline use is permitted for create, read, and update on an
initialized device. Archive and delete are permitted offline but marked
pending. No new device initialization is possible offline (D1-05).

**OWNER DECISION REQUIRED:** Maximum offline duration before forced
reconnection, and local data visibility rules (should local data be encrypted
at rest?).

---

## 6. Cloud Synchronization, Retry, Idempotency, and Restart Recovery

### Sync Architecture

**DECIDED: Outbox-pattern synchronization with idempotent operations.**

The local database maintains a pending-operation queue (the "outbox"). Each
pending operation has:

- `operation_id` (UUID, stable — used as idempotency key)
- `record_id` (UUID, the affected business record)
- `operation_type` (`create`, `update`, `archive`, `delete`)
- `payload` (JSON, the data to send)
- `expected_version` (INTEGER, for optimistic concurrency)
- `created_at` (TIMESTAMPTZ)
- `retry_count` (INTEGER)
- `status` (`pending`, `in_flight`, `succeeded`, `failed`, `conflict`)

### Sync Flow

1. **Reconnect detected:** Application checks network availability.
2. **Re-authenticate if needed:** If session expired, prompt user.
3. **Process outbox:** For each pending operation in order:
   a. Mark `status = 'in_flight'`.
   b. Send to cloud with `operation_id` as idempotency key.
   c. On success: mark `status = 'succeeded'`, update local `sync_state = 'synced'`.
   d. On conflict (version mismatch): mark `status = 'conflict'`, preserve
      both versions (see Section 7).
   e. On transient failure: increment `retry_count`, apply backoff.
   f. On permanent failure: mark `status = 'failed'`, surface to user.
4. **Pull remote changes:** Fetch updates from cloud that originated on other
   devices. Apply to local database if no local conflict.

### Retry and Backoff

**DECIDED: Exponential backoff with jitter.**

- Initial delay: 1 second
- Multiplier: 2
- Maximum delay: 30 seconds
- Maximum retries: 5
- Jitter: random 0–50% of calculated delay
- After max retries: operation is marked `failed` and surfaced to the user
  for manual action.

### Idempotency

**DECIDED: `operation_id` (UUID) serves as the idempotency key.**

- Each operation is generated with a unique UUID on creation.
- The cloud endpoint checks if an operation with this ID has already been
  processed. If so, it returns the original result without re-applying.
- This prevents duplicate records when a request succeeds but the response
  is lost (e.g., network drops after server processes the request).

Implementation approach: The Supabase client will include the `operation_id`
in the request. An Edge Function or database trigger can deduplicate by
checking a `processed_operations` table. For Phase 1, the application can
also check if a record with the same `id` already exists before inserting.

### Acknowledgements

- Cloud operations return the updated record (including new `version` and
  `updated_at`).
- The local database updates the record with the cloud-returned values.
- `sync_state` is set to `synced` only after the acknowledgement is received
  and applied.

### Restart Recovery

- On application restart, the outbox is read from IndexedDB.
- Any operations with `status = 'in_flight'` are reset to `pending` (the
  operation may or may not have been processed; the idempotency key ensures
  safety either way).
- Pending operations are processed on next reconnect.
- Local data is available immediately from IndexedDB — no blocking on sync.

---

## 7. Conflict Detection, Preservation, Review, and Resolution

### Conflict Detection

**DECIDED: Optimistic concurrency via `version` field.**

- Every update includes the client's expected `version`.
- The server compares the expected `version` with the current `version` in the
  database.
- If they match, the update applies and `version` is incremented.
- If they differ, a conflict is detected. The server returns the current
  version and rejects the update.

### Conflict Preservation

When a conflict is detected:

1. The server returns the current cloud version of the record.
2. The local database stores both versions:
   - The local (competing) version remains in `local_businesses`.
   - The cloud version is stored in `conflict_data` (JSON).
3. `sync_state` is set to `'conflict'`.
4. The outbox operation is marked `status = 'conflict'`.
5. Both versions are preserved — neither is discarded or overwritten.

### Conflict Review

**DECIDED: Phase 1 provides conflict status visibility and manual resolution.**

- The UI displays a conflict indicator on records with `sync_state = 'conflict'`.
- The user can view both versions (local and cloud).
- The user can choose to:
  - **Keep local:** Re-apply the local version as a new update (with the
    cloud's `version` as the expected version).
  - **Keep cloud:** Discard the local version and accept the cloud version.
  - **Merge:** Edit the record and submit a new version (manual merge).

### Resolution Authorization

- Only the authenticated owner can resolve conflicts for their own business
  records.
- RLS ensures no cross-business conflict resolution is possible.

### Prohibited Behaviors

- No silent overwrite of either version.
- No automatic merge or resolution without user action.
- No data loss — both versions are always available until the user resolves.

---

## 8. Archive, Deletion, Tombstones, Restoration, Retention, Backup, Export, and Privacy

### Archive

- **Action:** Set `lifecycle_state = 'archived'`.
- **Visibility:** Archived records are excluded from active lists but remain
  readable for history.
- **Reversibility:** Fully reversible via restore.
- **Sync:** Archived state syncs to cloud and other devices.

### Deletion

**DECIDED: Soft-delete with tombstones in Phase 1.**

- **Action:** Mark the record as deleted via a tombstone entry.
- **Tombstone content:** `record_id`, `deleted_at`, `deleted_by` (owner_id).
- **Sync purpose:** Other devices learn the record was intentionally deleted,
  not missing due to sync failure.
- **ID reuse:** The record's `id` is never reused.
- **Permanent deletion:** Not implemented in Phase 1. Tombstones persist
  indefinitely in Phase 1.

**OWNER DECISION REQUIRED:**

- Permanent deletion authority (who can permanently remove a tombstone).
- Retention period for tombstones before permanent cleanup.
- Privacy-related deletion (right to erasure) — legal/privacy decision.

### Restoration

- **Archive restore:** Set `lifecycle_state = 'active'`. Syncs normally.
- **Delete restore (within retention):** If the tombstone exists and retention
  has not expired, the record can be restored. This is a Phase 1 capability
  for soft-deleted records.
- **Restore precedence:** If both a local and cloud restore request exist,
  the first to succeed wins; the second is a no-op (idempotent).

### Backup

**DECIDED: Two-tier backup strategy.**

1. **Provider-managed:** Supabase PITR on Pro plan (7-day retention). This is
   the primary cloud backup mechanism.
2. **Application export:** `pg_dump` or Supabase Dashboard export for
   on-demand full database dumps. These can be stored externally.

**OWNER DECISION REQUIRED:** Whether to enable Supabase Pro for PITR in
Phase 1 or rely on manual `pg_dump` exports during development.

### Export

- **Data export:** `pg_dump` produces a portable SQL file containing all
  tables, policies, and data.
- **Application-level export:** The application can provide a JSON export of
  business records for user-facing data portability (future enhancement).
- **Phase 1 minimum:** `pg_dump` is available as the export mechanism.

### Privacy-Related Deletion

**OWNER DECISION REQUIRED:** This is a legal/privacy decision that cannot be
resolved by technical recommendation. The owner must decide:

- Whether a user can request permanent erasure of all their data.
- How this interacts with historical preservation requirements.
- What legal jurisdiction's privacy rules apply (e.g., GDPR, Thai PDPA).
- Whether erasure removes tombstones or only active records.

---

## 9. Supported Browser/Device Test Matrix

**DECIDED: Minimal, explicit matrix targeting desktop and mobile Chrome and
Safari, plus Firefox on desktop.**

| Platform | Browser | Version | Install (PWA) | Test Priority |
| --- | --- | --- | --- | --- |
| Desktop (macOS) | Chrome | Latest 2 major | Yes | P0 |
| Desktop (macOS) | Safari | Latest 2 major | Yes | P0 |
| Desktop (macOS) | Firefox | Latest 2 major | Limited | P1 |
| Desktop (Windows) | Chrome | Latest 2 major | Yes | P0 |
| Desktop (Windows) | Edge | Latest 2 major | Yes | P1 |
| Mobile (iOS) | Safari | Latest 2 major | Yes | P0 |
| Mobile (Android) | Chrome | Latest 2 major | Yes | P0 |

**Rationale:**

- Chrome and Safari cover the majority of desktop and mobile users.
- Safari on iOS is critical for mobile PWA testing.
- Firefox and Edge are secondary but should not break.
- "Latest 2 major" means the current and previous major version.

**Storage assumptions:**

- IndexedDB is available and persistent in all tested browsers.
- Estimated per-record storage: < 1KB. Phase 1 volume is minimal.
- No storage quota issues expected in Phase 1.

**OWNER DECISION REQUIRED:** Whether specific older browser versions or
additional platforms (e.g., Samsung Internet, Opera) are required based on
the owner's actual user base.

---

## 10. Development/Test/Preview Environments, CI, Secrets, Deployment, and Rollback

### Environment Isolation

**DECIDED: Three environments.**

1. **Local development:** Developer machine. Uses local `.env` with
   development Supabase project credentials. Vite dev server.
2. **Preview/test:** Supabase preview project (separate from production).
   Used for CI and integration testing. Data is test fixtures only.
3. **Production:** Supabase production project. **Not deployed in Phase 1
   unless separately authorized.**

### CI Requirements

**DECIDED: CI runs on PR creation and merge to main.**

- **Type checking:** `tsc --noEmit` (once TypeScript is set up).
- **Linting:** ESLint with recommended rules.
- **Build:** `vite build` must succeed.
- **Unit tests:** Vitest (once test files exist).
- **Integration tests:** Supabase local emulator or preview project.
- **Link validation:** Markdown link checker for documentation.

**No production credentials in CI.** CI uses preview/test environment
credentials stored as CI secrets (not in `.env`).

### Secret Handling

- `.env` is gitignored (already configured).
- No credentials, API keys, or service role keys in documentation or code.
- CI secrets are stored in the CI provider's secret management.
- The Supabase service role key is never exposed to the client.

### Deployment Boundary

**DECIDED: No production deployment in Phase 1.**

- The application builds and runs in local development and preview/test.
- Production deployment requires separate owner authorization.
- Vercel hosting is the provisional recommendation for future deployment
  (deferred).

### Rollback

- **Code rollback:** Git revert to previous commit. Standard Git workflow.
- **Database rollback:** Supabase PITR (Pro plan) or `pg_restore` from
  `pg_dump` backup.
- **Schema migrations:** Applied via Supabase MCP `apply_migration` tool.
  Migrations are forward-only; no destructive rollbacks in Phase 1.

---

## 11. Acceptance Matrix

This acceptance matrix consolidates and updates the existing proposed scenarios
from `PHASE_1_ACCEPTANCE_MATRIX.md`. Each criterion includes the recommended
test approach and evidence required.

| ID | Requirement | Test Scenario | Expected Result | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| P1-A01 | Create/edit one record offline after initialization | Initialize device online; disable network; create and edit a business record | Record is created/edited locally without data loss | Browser test, local DB inspection, fixture | Proposed |
| P1-A02 | Persist across reload and restart | Offline record exists; reload browser; restart environment | Record and sync state remain intact | Restart test across support matrix | Proposed |
| P1-A03 | Authenticated cloud round trip | Initialized identity; controlled test record; create offline, reconnect | Authorized change reaches cloud and returns without duplication | Integration trace, server response, sync-state evidence | Proposed |
| P1-A04 | Server-enforced owner/business authorization | Two isolated owner fixtures; authenticated and unauthenticated requests | Own-business access succeeds; cross-business and unauthenticated denied | Negative authorization tests, RLS policy review, server logs | Proposed |
| P1-A05 | Retry safely and idempotently | Interrupted request; retry enabled; stable operation_id | Retry converges to one operation; no duplicate records | Fault-injection test, operation IDs, resulting records | Proposed |
| P1-A06 | Detect concurrent edits and preserve both versions | Two clients edit same record from common base | Both versions remain inspectable; conflict status visible | Concurrent-edit fixture, stored versions, status evidence | Proposed |
| P1-A07 | Conflict review/resolution path | Conflict fixture; authorized reviewer and unauthorized actor | Review is inspectable; only owner can resolve; no silent destructive merge | UI evidence, authorization tests, audit trail | Proposed |
| P1-A08 | Separate archive, deletion, tombstones, and recovery | Lifecycle fixtures; archive, delete, restore attempts | Approved transitions preserve sync knowledge and historical integrity | Lifecycle matrix, tombstone/recovery tests | Proposed |
| P1-A09 | Recover from network interruption and restart | Pending operation; disable network; terminate/restart client | Pending work resumes safely or reports non-destructive failure | Interrupted-operation test, queue/state evidence | Proposed |
| P1-A10 | Keep logs safe and credentials protected | Exercise auth, sync, failure, and recovery paths | Secrets, tokens, and sensitive payloads absent from logs | Log review, secret scan, redaction tests | Proposed |
| P1-A11 | Validate browser/device support matrix | Approved browser/OS/device matrix; online/offline/reload scenarios | Required scenarios pass on supported entries; unsupported excluded | Device/browser test report | Proposed |
| P1-A12 | CI in isolated environments | Separate environments; CI checks enabled; controlled fixtures | Gates run reproducibly without production credentials | CI run links, environment inventory | Proposed |
| P1-A13 | Backup/restore and export/import | Representative records; pg_dump export; restore to test project | Restore produces expected data with documented gaps | Dated restore rehearsal, export artifacts | Proposed |

### Interpretation Rules

- **Proposed:** Requirement and scenario are planned; no evidence recorded.
- **Verified:** Only after actual evidence is linked and reviewed.
- No criterion is marked verified by this packet.
- Passing a test does not by itself authorize Phase 2.

---

## 12. Work-Package Readiness: WP1–WP8

### WP1 — Phase Contract and Architecture Decisions

- **Scope:** Define objectives, boundaries, local/cloud responsibilities,
  provider comparison, auth/authorization model, conflict/lifecycle contracts,
  acceptance criteria, risks, and unresolved decisions.
- **Non-goals:** Application code, schema, migrations, runtime behavior.
- **Dependencies:** P0 documentation; owner-selected D1-01 through D1-08.
- **Deliverables:** This approval packet, backend evaluation, decision packet,
  acceptance matrix.
- **Acceptance criteria:** Alternatives documented; recommendations made;
  owner gates identified; no unapproved rule labeled approved.
- **Verification:** Markdown link check; document consistency review.
- **Risks:** Insufficient evidence for provider claims; material decisions
  deferred to owner.
- **Rollback/recovery:** Documentation-only; no runtime rollback needed.
- **Readiness:** **Planning-ready.** This packet fulfills WP1. Owner review
  and acceptance moves it to implementation-ready.

### WP2 — Local Data Foundation

- **Scope:** Dexie/IndexedDB local persistence; offline CRUD for the minimal
  business record; stable IDs; local validation; persistence across reload
  and restart; sync metadata (outbox, sync_state).
- **Non-goals:** Cloud sync (WP4), conflict resolution UI (WP5), full account
  UI.
- **Dependencies:** WP1 approved.
- **Deliverables:** Local database schema; Dexie configuration; CRUD
  functions; validation; restart persistence tests.
- **Acceptance criteria:** P1-A01, P1-A02, P1-A11 (offline portion).
- **Verification:** Vitest unit tests; browser restart test; IndexedDB
  inspection.
- **Risks:** IndexedDB quota limits (minimal for Phase 1); browser-specific
  IndexedDB behavior.
- **Rollback/recovery:** Local-only; clear IndexedDB to reset.
- **Readiness (planning-time snapshot):** **Blocked** on WP1 owner acceptance.
- **Current status:** Implemented and verified locally under the separate
  limited [execution authorization](PHASE_1_EXECUTION_AUTHORIZATION.md);
  pull request merge to `main` pending owner review.

### WP3 — Identity and Access-Control Foundation

- **Scope:** Supabase Auth email/password; session management; RLS policies
  for owner/business isolation; cross-business denial; credential boundary;
  first-setup online requirement.
- **Non-goals:** Account UI, profile management, password reset email,
  OAuth, multi-user.
- **Dependencies:** WP1 approved.
- **Deliverables:** Auth integration; RLS policies; session handling;
  negative authorization tests.
- **Acceptance criteria:** P1-A03 (auth portion), P1-A04, P1-A10.
- **Verification:** Supabase local/preview test; negative auth tests;
  log/secret scan.
- **Risks:** Session expiry offline; RLS policy gaps.
- **Rollback/recovery:** RLS policies are forward-only migrations; revert via
  Git + migration.
- **Readiness (planning-time snapshot):** **Blocked** on WP1 owner acceptance.
- **Current status:** Not started; requires separate owner authorization.

### WP4 — Cloud Sync Foundation

- **Scope:** Outbox pattern; pending-operation queue; retry with exponential
  backoff and jitter; idempotency via operation_id; acknowledgements;
  connectivity recovery; diagnostic errors.
- **Non-goals:** Conflict resolution (WP5); full realtime subscriptions.
- **Dependencies:** WP2 and WP3 approved and implemented.
- **Deliverables:** Sync engine; outbox processing; retry logic;
  idempotency checks; connectivity detection.
- **Acceptance criteria:** P1-A03 (sync portion), P1-A05, P1-A09.
- **Verification:** Fault-injection tests; interrupted-request tests;
  duplicate-prevention tests.
- **Risks:** Race conditions in outbox processing; edge cases in retry
  exhaustion.
- **Rollback/recovery:** Outbox is local; clear to reset. Cloud operations
  are idempotent.
- **Readiness:** **Blocked** on WP2 and WP3.

### WP5 — Conflict Detection and Recovery

- **Scope:** Optimistic concurrency via version field; concurrent-edit
  detection; both-version preservation; conflict status visibility; manual
  resolution (keep local, keep cloud, merge); interrupted-sync recovery;
  restart recovery.
- **Non-goals:** Automatic merge rules; AI-assisted resolution.
- **Dependencies:** WP4 approved and implemented.
- **Deliverables:** Conflict detection logic; conflict storage; conflict
  review UI; resolution flows; recovery tests.
- **Acceptance criteria:** P1-A06, P1-A07, P1-A08 (conflict portion).
- **Verification:** Concurrent-edit fixtures; conflict preservation tests;
  authorization tests on resolution.
- **Risks:** Conflict UI complexity; edge cases in version mismatch.
- **Rollback/recovery:** Conflicts are preserved locally; no data loss.
- **Readiness:** **Blocked** on WP4.

### WP6 — Working Vertical Slice

- **Scope:** Integrate WP2–WP5 into one end-to-end flow: offline entry →
  local persistence → reconnect → authenticated sync → conflict handling →
  cloud round trip → local update with cloud-acknowledged data.
- **Non-goals:** New features beyond the minimal business record.
- **Dependencies:** WP2, WP3, WP4, WP5 approved and implemented.
- **Deliverables:** Integrated vertical slice; end-to-end test scenarios.
- **Acceptance criteria:** P1-A01 through P1-A09 (integrated).
- **Verification:** End-to-end browser test; offline/reconnect test;
  multi-device simulation.
- **Risks:** Integration issues across WP boundaries; timing-sensitive sync
  behavior.
- **Rollback/recovery:** Full Git revert; clear local DB; reset preview
  project.
- **Readiness:** **Blocked** on WP2–WP5.

### WP7 — Security, Automated Testing, and Failure Validation

- **Scope:** Unit, integration, end-to-end tests; unauthorized and
  cross-business access tests; duplicate/retry tests; concurrent-edit tests;
  conflict preservation tests; offline/online transition tests; restart and
  recovery tests; safe-log validation; data integrity checks.
- **Non-goals:** Production load testing; penetration testing (Phase 5).
- **Dependencies:** Runs throughout WP2–WP6; integrated after WP6.
- **Deliverables:** Test suites; CI configuration; test evidence;
  documented results.
- **Acceptance criteria:** P1-A04, P1-A05, P1-A06, P1-A09, P1-A10, P1-A12.
- **Verification:** CI pipeline runs; all critical tests pass.
- **Risks:** Flaky tests; browser-specific failures; CI environment
  differences.
- **Rollback/recovery:** Tests are non-destructive; CI can be re-run.
- **Readiness:** **Blocked** on WP2–WP6 (partial tests can start with WP2).

### WP8 — Phase Acceptance and Handoff

- **Scope:** Acceptance checklist; evidence index; developer setup/test
  instructions; limitations; residual risks; deferred work; synchronized
  updates to status, registry, decisions, handoff, roadmap.
- **Non-goals:** Phase 2 planning; new scope.
- **Dependencies:** WP6 and WP7 evidence.
- **Deliverables:** Acceptance record; handoff document; updated canonical
  documents.
- **Acceptance criteria:** P1-A01 through P1-A13 all have evidence or
  owner-approved exceptions.
- **Verification:** Document consistency checks; evidence reconciliation.
- **Risks:** Undiscovered gaps during acceptance; incomplete evidence.
- **Rollback/recovery:** Documentation-only; no runtime rollback.
- **Readiness:** **Blocked** on WP6 and WP7.

### Dependency Summary

```
WP1 (this packet) → owner acceptance
  ├── WP2 (local persistence) ─┐
  ├── WP3 (auth/RLS) ─────────┤
  │                            ├── WP4 (sync) ──→ WP5 (conflict) ──→ WP6 (vertical slice)
  │                            │                                          │
  │                            │                    WP7 (testing, throughout) │
  │                            │                                          │
  │                            │                                          ↓
  └──────────────────────────────────────────────────────────────→ WP8 (acceptance)
```

---

## 13. Risks, Assumptions, Unresolved Material Decisions, and Decision Record

### Risks

| ID | Risk | Mitigation |
| --- | --- | --- |
| R1 | Supabase RLS policy gap allows cross-business access | Negative authorization tests in WP3/WP7; RLS policy review |
| R2 | IndexedDB data loss on browser data clearing | User education; cloud sync restores data on re-auth |
| R3 | Offline session expiry blocks sync | Queue operations; prompt re-auth on reconnect |
| R4 | Retry exhaustion leaves operations failed | Surface failed operations to user; manual retry |
| R5 | Conflict resolution UI is too complex for Phase 1 | Keep resolution simple: keep local / keep cloud / merge |
| R6 | Browser-specific IndexedDB behavior | Test across support matrix; use Dexie for abstraction |
| R7 | Supabase free tier project pauses after inactivity | Use Pro plan for persistent development; or reconnect |
| R8 | Idempotency key collision (UUID) | UUID v4 collision probability is negligible |
| R9 | Provider documentation changes between planning and implementation | Verify key claims during WP2/WP3 implementation |

### Assumptions

| ID | Assumption | Impact if Wrong |
| --- | --- | --- |
| A1 | IndexedDB is sufficient for Phase 1 data volume | Minimal; Phase 1 has very few records |
| A2 | Supabase Auth email/password meets Phase 1 needs | Would require OAuth integration (Phase 6 scope) |
| A3 | Dexie provides adequate IndexedDB abstraction | Could switch to direct IndexedDB or alternative |
| A4 | Supabase free/Pro tier is sufficient for development | Would need to upgrade plan or switch provider |
| A5 | Vite is the appropriate build tool | Confirmed by project technology preferences |
| A6 | One owner and one business is the correct Phase 1 model | Confirmed by owner-selected D1-03 |

### Unresolved Material Decisions (OWNER DECISION REQUIRED)

| ID | Decision | Why It's Material | Recommendation |
| --- | --- | --- | --- |
| O1 | Permanent deletion authority and tombstone retention period | Affects data lifecycle, privacy, and storage | Defer permanent deletion to Phase 6; keep tombstones indefinitely in Phase 1 |
| O2 | Privacy-related deletion (right to erasure) | Legal/privacy decision with regulatory implications | Consult legal counsel; not resolvable by technical recommendation |
| O3 | Local data encryption at rest | Privacy/security decision; affects device-loss risk | Recommend encrypting sensitive fields if business data contains PII; defer full encryption to Phase 5 |
| O4 | Maximum offline duration before forced reconnection | Affects sync conflict risk and data freshness | Recommend no hard limit in Phase 1; surface stale data indicator |
| O5 | Supabase Pro plan for PITR in Phase 1 | Cost decision ($25/month) | Recommend Pro for development safety; owner decides based on budget |
| O6 | Additional browser/platform requirements | Affects test scope and support burden | Current matrix covers major browsers; owner confirms based on user base |
| O7 | Production deployment authorization | Phase 1 is development/test only; production is a separate decision | Defer to explicit owner authorization after Phase 1 acceptance |

### Decision Record

| ID | Decision | Status | Decided By | Date | Rationale |
| --- | --- | --- | --- | --- | --- |
| D-01 | Backend provider: Supabase | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | RLS, Postgres portability, PITR, no imposed conflict resolution, managed service, project already provisioned |
| D-02 | Auth method: email/password | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Confirmed starting point per project decisions; minimal scope for Phase 1 |
| D-03 | Session model: JWT + refresh tokens | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Supabase Auth default; supports offline session and reconnect re-auth |
| D-04 | Authorization: RLS with auth.uid() = owner_id | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Server-enforced; testable; auditable; denies cross-business access at DB level |
| D-05 | Local persistence: Dexie/IndexedDB | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Persistent across restart; typed API; schema versioning; all modern browsers |
| D-06 | Sync: Outbox pattern with idempotent operations | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Prevents duplicates; supports retry; restart-safe; application-owned conflict control |
| D-07 | Retry: Exponential backoff with jitter, max 5 retries | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Standard pattern; prevents thundering herd; bounded retry |
| D-08 | Conflict: Optimistic concurrency via version field | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Simple, effective; preserves both versions; no silent overwrite |
| D-09 | Conflict resolution: Manual (keep local / keep cloud / merge) | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | No automatic destructive resolution; user stays in control (D1-04) |
| D-10 | Lifecycle: Archive (reversible) + soft-delete (tombstone) | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Distinct archive/delete (D1-06); tombstones for sync; no permanent deletion in Phase 1 |
| D-11 | Browser matrix: Chrome, Safari, Firefox, Edge (latest 2 major) | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Covers majority of users; explicit and testable (D1-07) |
| D-12 | CI: tsc, ESLint, Vite build, Vitest, link check | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Standard web toolchain; isolated from production (D1-08) |
| D-13 | No production deployment in Phase 1 | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Phase 1 is foundation; production requires separate authorization |
| D-14 | Backup: Supabase PITR + pg_dump | DECIDED (recommended) | ChatGPT (owner-authorized) | 2026-10-11 | Provider-managed PITR for point-in-time recovery; pg_dump for portable export |
| O1 | Permanent deletion and tombstone retention | OWNER DECISION REQUIRED | — | — | Legal/privacy implications; cannot be resolved by technical recommendation |
| O2 | Privacy-related deletion (right to erasure) | OWNER DECISION REQUIRED | — | — | Legal/regulatory decision |
| O3 | Local data encryption at rest | OWNER DECISION REQUIRED | — | — | Security/privacy trade-off |
| O4 | Maximum offline duration | OWNER DECISION REQUIRED | — | — | Affects data freshness and conflict risk |
| O5 | Supabase Pro plan for development | OWNER DECISION REQUIRED | — | — | Cost decision |
| O6 | Additional browser/platform requirements | OWNER DECISION REQUIRED | — | — | Depends on owner's user base |
| O7 | Production deployment authorization | OWNER DECISION REQUIRED | — | — | Separate from Phase 1 scope |

---

## Related Documents

- [Phase 1 Plan](phases/PHASE_1_PLAN.md)
- [Phase 1 WP1 Decision Packet](PHASE_1_WP1_DECISION_PACKET.md)
- [Phase 1 Acceptance Matrix](PHASE_1_ACCEPTANCE_MATRIX.md)
- [Phase 1 Backend Evaluation](PHASE_1_BACKEND_EVALUATION.md)
- [Phase 1 Owner Review](PHASE_1_OWNER_REVIEW.md)
- [Decisions](DECISIONS.md)
- [Task Registry](TASK_REGISTRY.md)
- [Project Status](../PROJECT_STATUS.md)
- [AI Handoff](AI_HANDOFF.md)
- [Roadmap](ROADMAP.md)
- [Product Foundation](PRODUCT_FOUNDATION.md)

---

**Boundary:** This is a documentation-only planning artifact. It recommends
technical decisions the owner authorized ChatGPT to make. It does not claim
runtime behavior is implemented or verified. No application code, schema,
migration, infrastructure, or runtime behavior is authorized until the owner
accepts this packet and implementation tasks are created per repository
workflow.
