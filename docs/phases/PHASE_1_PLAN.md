# Phase 1 Plan — Proposed Work Breakdown

**Status:** Proposed planning baseline; pending complete owner approval. This document does not authorize implementation.

## Planning Inputs

Owner-provided inputs are: long-term AI platform with possible SaaS expansion; offline-first operation; quality prioritized over API cost; initial one-owner/one-business model; Core + Basic AI MVP direction; local-to-cloud sync foundation; identity and access-control foundation; Web/PWA target; one simple business record as the first vertical slice; conflict detection with competing versions preserved for review. Cloud backend selection requires comparison before provider commitment.

## Proposed Scope

Phase 1 establishes a secure, testable local-to-cloud foundation and one vertical slice. Full account-management UI, broad business domains, advanced AI, multi-user collaboration, and Phase 2 planning are out of scope.

## Work Packages and Dependencies

### WP1 — Phase Contract and Architecture Decisions

Define objectives, boundaries, non-goals, dependencies, local/cloud responsibilities, synchronization lifecycle, cloud-backend and authentication comparisons, ownership/security boundaries, acceptance criteria, risks, assumptions, and unresolved owner decisions. **Completion:** alternatives, trade-offs, dependencies, and approval questions are documented well enough for an informed implementation decision. WP1 precedes implementation planning.

### WP2 — Local Data Foundation

Define and implement only after approval: durable Web/PWA-appropriate local persistence; offline create/read/update for the simple record; stable identity and ownership association; validation and integrity; schema evolution/migrations; persistence across reload and restart. **Completion:** the record remains usable offline and survives restart with persistence and integrity tests. Depends on WP1; sequencing with WP3 follows the approved architecture.

### WP3 — Identity and Access-Control Foundation

Define the single-owner/single-business model; local-to-authenticated identity relationship; server-side authentication and authorization; cross-business isolation; credential/token protection; and the boundary between required foundations and deferred account UI. **Completion:** protected cloud operations enforce authorization server-side. Depends on WP1 and informs WP4/WP6.

### WP4 — Cloud Sync Foundation

Provide local change tracking, pending sync, upload/download state, retry/backoff, idempotency, duplicate-request handling, connectivity recovery, and observable diagnostic errors. **Completion:** the simple record syncs without duplicate records under retry. Depends on approved WP2/WP3 architecture.

### WP5 — Conflict Detection and Recovery

Define concurrent-edit detection, preserve competing versions, conflict status and resolution lifecycle, interrupted/partial sync handling, network-failure recovery, and restart recovery. Record whether a user-facing conflict-resolution interface is required in Phase 1. **Completion:** competing versions are not silently discarded or overwritten. Depends on WP4 and unresolved owner approval for conflict UX.

### WP6 — Working Vertical Slice

Define the simple record's minimum fields and validation; support offline creation/editing; authorized cloud sync and retrieval; identity/access control; retries; conflict behavior; and a local-to-cloud-to-local round trip. **Completion:** the integrated slice demonstrates the agreed offline-first workflow and essential security/conflict behavior. Depends on WP2–WP5 decisions and foundations.

### WP7 — Security, Automated Testing, and Failure Validation

Test incrementally throughout WP2–WP6 and integrate after WP6: unit, integration, and end-to-end coverage; unauthorized and cross-business access; duplicate/retry/concurrent edits; conflict preservation; offline/online transitions; restart, migration, and recovery; safe credential-free logs; and data integrity. **Completion:** critical success/failure paths have repeatable tests and documented results.

### WP8 — Phase Acceptance and Handoff

Complete the end-to-end acceptance checklist, documentation and verification evidence, developer setup/test instructions, limitations, residual risks, deferred work, and synchronized updates to roadmap, status, registry, decisions, and handoff. Record the next eligible task. **Completion:** a fresh AI session can understand the documented plan, evidence, unresolved decisions, and next authorization without this conversation. Depends on WP6 and WP7 evidence.

The intended dependency order is WP1; WP2 and WP3 (possibly parallel after WP1); WP4; WP5; WP6; WP7 throughout and integrated after WP6; then WP8. Material dependencies must be recorded rather than assuming strictly isolated execution.

## Owner-selected planning directions — 2026-10-11

The owner selected D1-01 through D1-08 as planning directions. They replace the
outdated presentation of the topics as wholly unselected, but do not approve a
provider, authentication method, complete Phase 1 scope, implementation, or
runtime behavior. Remaining material details are open:

- **D1-01:** Compare Supabase with managed alternatives before provider choice;
  document capabilities, environments, security/access, recovery, cost,
  migration, and exit.
- **D1-02:** Build only the minimum auth/session and server-enforced owner/
  business authorization foundation; defer account UI, profiles, and invites.
  Sign-in, sessions, expiry/revocation, credentials, recovery, and trusted
  devices remain open.
- **D1-03:** Use the proposed minimal record fields; types, validation, updates,
  history, and archive/delete transitions remain open.
- **D1-04:** Detect edits, preserve both versions, and expose inspectable conflict
  status/review; exact UI, resolution, authorization, and cases remain open.
- **D1-05:** Require online first setup/sign-in/ownership binding; allow defined
  offline use after initialization. Expiry, device loss, visibility, and limits
  remain open.
- **D1-06:** Separate archive and deletion; define tombstones, recovery,
  retention, backups, permanent deletion, and privacy exceptions without
  inventing guarantees.
- **D1-07:** Target desktop/mobile Web/PWA with a small tested support matrix;
  exact versions, devices, install, storage/network, and environments remain open.
- **D1-08:** Isolate development and test/preview with CI; production stays out
  unless separately approved. Gates, test data, secrets/logging, authority, and
  rollback remain open.

WP1 must compare and document the D1-01 alternatives and remaining contracts.
WP2/WP3 depend on approved persistence, identity, and authorization details;
WP4/WP5 depend on approved lifecycle and conflict contracts; WP6 depends on
WP2–WP5; WP7 acceptance depends on the D1-07/D1-08 matrix and environments;
WP8 records evidence and remaining risks. These dependencies remain proposed and
no Coding AI prompts are generated until the complete phase is approved.

## Acceptance Baseline

Phase 1 is not approved or complete until the owner approves the complete scope and material decisions, the vertical slice works offline and across an authorized round trip, authorization is enforced server-side, retries are idempotent, conflicts preserve competing versions, recovery paths are tested, and WP8 evidence is recorded.

## Next Authorized Action

Prompt AI and the owner collaboratively review this proposed structure, resolve material decisions, and approve or revise the complete Phase 1 plan. Until then, no Phase 1 implementation task is authorized.

## Related Records

- [Roadmap](../ROADMAP.md)
- [Task Registry](../TASK_REGISTRY.md)
- [Decisions](../DECISIONS.md)
- [Project Status](../../PROJECT_STATUS.md)
- [AI Handoff](../AI_HANDOFF.md)
