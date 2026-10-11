# Phase 1 WP-01 Decision Packet

**Status:** Documentation-only planning packet for owner review. It is not provider approval, Phase 1 approval, implementation authorization, or evidence of runtime behavior.

**Date:** 2026-10-11

## Purpose and boundaries

WP-01 converts the [backend evaluation](PHASE_1_BACKEND_EVALUATION.md) into a traceable decision packet. It records recommendations, dependencies, risks, and evidence needs without selecting Supabase, Firebase/Firestore, Appwrite, or another provider. Phase 1 remains proposed/not approved.

**In scope:** provider comparison, local/cloud responsibilities, identity and authorization requirements, one minimal record, offline/sync/conflict/lifecycle requirements, support and CI boundaries, and owner gates.

**Out of scope:** application code, schemas, migrations, infrastructure, dependencies, runtime behavior, full account UI, invitations, multi-user collaboration, broad business domains, production deployment, and coding prompts.

Owner-selected directions D1-01 through D1-08 are planning inputs only. Recommendations here are not decisions; unresolved items require explicit owner approval in the canonical records.

## Assumptions, dependencies, and risks

- The proposed first slice is one owner, one business, and one minimal business record.
- WP-01 precedes WP2-WP8 implementation planning; no implementation task is ready.
- WP2/WP3 depend on approved persistence, identity, and authorization details; WP4/WP5 depend on approved sync, conflict, and lifecycle contracts; WP6 depends on WP2-WP5; WP7 depends on support and environment decisions; WP8 records evidence.
- Risks include provider mismatch, insecure ownership boundaries, data loss during conflict or recovery, duplicate retries, device/storage variance, unbounded cost, and provider lock-in.

## Trace of owner-selected directions

| ID | Selected direction | Remaining details |
| --- | --- | --- |
| D1-01 | Compare Supabase with suitable managed alternatives before choosing a provider. | Capabilities, environments, security/access, recovery, cost, migration, exit. |
| D1-02 | Minimum auth/session foundation and server-enforced owner/business authorization; defer account UI. | Sign-in, sessions, expiry/revocation, credentials, recovery, trusted devices. |
| D1-03 | Minimal record: stable ID, name, optional description, timestamps, owner ID, lifecycle state. | Types, constraints, validation, updates, history, archive/delete transitions. |
| D1-04 | Detect concurrent edits, preserve both versions, expose review status; no silent overwrite. | Review UI, resolution semantics, authorization, acceptance cases. |
| D1-05 | Online first setup/sign-in/ownership binding; offline use after initialization. | Expiry/revocation, device loss, visibility, offline limits. |
| D1-06 | Separate archive/deletion; define tombstones, recovery, retention, backup, permanent deletion, privacy exceptions. | All lifecycle precedence and guarantees. |
| D1-07 | Desktop/mobile Web/PWA with a small tested support matrix. | Browser/OS versions, devices, install, storage/network, test environments. |
| D1-08 | Isolated development and test/preview with CI; production excluded unless approved. | Gates, test data, secrets/logging, deployment authority, rollback. |

## Candidate comparison and evidence boundary

The [backend evaluation](PHASE_1_BACKEND_EVALUATION.md) compares all candidates using the same criteria: offline-first behavior, authentication, server-enforced owner/business access, conflict preservation, backup/recovery, cost, migration/exit, and environment delivery. Capability descriptions are not proof of KitchAI fit.

| Candidate | Provisional fit | Evidence still required |
| --- | --- | --- |
| Supabase | Postgres, Auth, and RLS may support ownership and export portability. | Plan backup/restore, policy tests, offline/sync design, cost model, complete export/import rehearsal. |
| Firebase/Firestore | Auth, security rules, document APIs, and client offline primitives may reduce basic sync work. | Competing-version preservation beyond default resolution, rules/privileged-path tests, restore/export evidence, retry cost, identity/data exit. |
| Appwrite | Auth, database, storage, functions, APIs, and possible self-hosting may provide control. | Offline/sync and conflict evidence, permission tests, hosting operations, backup/restore, cost, export/import, identity migration. |

No candidate is approved. Selection requires current evidence, comparable workload/cost assumptions, security and recovery review, and explicit owner approval.

## Proposed responsibility boundary

**Local, proposed:** durable Web/PWA storage; offline create/read/update; stable IDs; local validation; pending-operation state; retry metadata; connectivity state; and conflict indicators.

**Cloud, proposed:** authenticated identity; server-enforced owner/business authorization; shared persistence; sync endpoints; server validation; conflict/version metadata; backup/export facilities; and safe operational boundaries.

The exact storage technology, sync protocol, authority rules, encryption, limits, and failure semantics remain unresolved.

## Proposed contracts

**Minimal record:** stable ID, business name, optional description, created-at and updated-at timestamps, owner ID, and lifecycle state. Types, requiredness, constraints, clock/source rules, update/history semantics, archive visibility, deletion transitions, and tombstones are open. No schema is authorized.

**Authentication and authorization:** online first setup/sign-in and ownership binding; authenticated cloud access; server-enforced owner/business checks; denial tests for unauthenticated, expired/revoked, malformed, and cross-business requests. Sign-in method, session/token policy, credential handling, recovery, trusted devices, and privileged-server boundaries remain open.

**Offline and sync:** after initialization, offline use must remain within an approved boundary. Define durable pending operations, connectivity state, bounded retry/backoff, idempotency, ordering, acknowledgment, restart recovery, interrupted-operation recovery, and safe observable errors. Exact algorithms and limits remain open.

**Conflicts:** detect concurrent edits using an approved version/change contract; preserve both versions; expose inspectable conflict status/review; never silently discard, overwrite, or destructively auto-resolve. Reviewer authority, resolution UI, and audit semantics remain open.

**Lifecycle and recovery:** archive and deletion are distinct. Define state transitions, tombstones where sync needs deletion knowledge, restore precedence, retention, backup scope, permanent-deletion authority, recovery evidence, and privacy exceptions. Do not invent periods or guarantees.

**Support and environments:** approve a small desktop/mobile Web/PWA browser/device matrix with storage, installation, network, and test assumptions. Isolate development and test/preview environments; define CI gates, controlled test data, secret-safe logs, deployment authority, and rollback. Production is excluded unless separately approved.

## Cost, recovery, export, and exit

Compare equivalent development, preview/test, and projected production usage: reads/writes, retries, conflict records, storage, bandwidth/egress, authentication, backups, quotas, and operational effort. Use current pricing and a stated workload model; no cost or availability guarantee is established.

Recovery evidence must distinguish provider backups from application exports and tested restores. Require configured backup scope/retention, isolated restore rehearsal, data-loss assumptions, and a recovery procedure. Exit evidence must cover records, files, identities, authorization rules, indexes/functions, sync metadata, configuration, and deletion, with an import rehearsal or explicit gap analysis.

## Acceptance and owner gates

The [acceptance matrix](PHASE_1_ACCEPTANCE_MATRIX.md) defines proposed scenarios and evidence. Before implementation, the owner must approve complete Phase 1 scope/exclusions; provider/environment; auth/session and authorization; record contract; conflict behavior; lifecycle/recovery/retention/privacy; support matrix; CI/test/production boundary; and WP acceptance criteria.

Open questions are the provider and plan; sign-in/session policy; record constraints and timestamps; conflict review/resolution; offline/device-loss/storage limits; lifecycle/backup/retention/privacy; support matrix and CI gates; workload budget; and export/import/exit evidence.

## Related documents

- [Phase 1 Backend Evaluation](PHASE_1_BACKEND_EVALUATION.md)
- [Phase 1 Acceptance Matrix](PHASE_1_ACCEPTANCE_MATRIX.md)
- [Phase 1 Plan](phases/PHASE_1_PLAN.md)
- [Phase 1 Owner Review](PHASE_1_OWNER_REVIEW.md)
- [Decisions](DECISIONS.md)
- [Task Registry](TASK_REGISTRY.md)
- [AI Handoff](AI_HANDOFF.md)
- [Project Status](../PROJECT_STATUS.md)

**Final boundary:** This is a documentation-only WP-01 artifact. It changes no canonical approval, selects no provider, claims no verified behavior, and authorizes no implementation.
