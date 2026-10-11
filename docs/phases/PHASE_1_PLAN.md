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

## Unresolved Owner Decisions

1. Cloud backend and deployment approach; matters because it blocks WP2–WP4; requires a documented comparison and owner approval.
2. Authentication/sign-in approach and the boundary between Phase 1 foundations and later account UI; blocks WP3/WP4; requires security and UX comparison.
3. Simple record fields, validation, and update/delete behavior; blocks WP2/WP6; requires representative workflow examples and owner approval.
4. Whether Phase 1 needs a user-facing conflict-resolution interface or only preservation/status; blocks WP5/WP6 acceptance; requires review workflow decision.
5. First-time online setup versus returning offline access; blocks identity/sync lifecycle; requires device/network scenarios.
6. Deletion propagation, tombstones, recovery, and retention; blocks sync/conflict/data-integrity behavior; requires lifecycle policy.
7. Initial browser/device support matrix; blocks storage and PWA validation; requires target-device evidence.
8. Cloud test environment, CI checks, and production deployment scope; blocks WP7/WP8 evidence; requires release-policy approval.

These are unresolved, not recommendations or approved technical decisions. No Coding AI prompts are generated by this proposal.

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
