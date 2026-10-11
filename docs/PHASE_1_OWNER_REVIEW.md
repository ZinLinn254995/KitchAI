# Phase 1 Owner-Decision Review

**Status:** Review artifact only. No Phase 1 scope, decision, or implementation is approved by this document.

## Purpose and proposed scope

The proposed Phase 1 goal is an offline-first, secure, testable local-to-cloud foundation with one working business-data vertical slice. It is intended to establish durable local persistence, cloud persistence, identity and authentication foundations, business ownership and access control, synchronization lifecycle, retry/idempotency, conflict preservation, recovery, security, and repeatable validation.

The proposed deliverable is one simple business record that can be created and edited offline, persist across restart, synchronize through an authorized cloud round trip, recover from interruptions, and preserve competing versions rather than silently overwriting data. Full account-management UI, broad business coverage, multi-user collaboration, advanced AI, reporting, and Phase 2 planning remain outside the proposed scope.

Canonical sources: [Phase 1 Plan](phases/PHASE_1_PLAN.md), [Roadmap](ROADMAP.md), [Product Foundation](PRODUCT_FOUNDATION.md), [Decisions](DECISIONS.md), [Project Status](../PROJECT_STATUS.md), [AI Handoff](AI_HANDOFF.md), and [Cross-Phase Plan Audit](CROSS_PHASE_PLAN_AUDIT.md).

## Proposed work packages and dependencies

| WP | Proposed outcome | Dependencies |
| --- | --- | --- |
| WP1 | Phase contract, architecture comparisons, boundaries, acceptance criteria, risks, and unresolved decisions | P0 documentation; precedes implementation planning |
| WP2 | Durable local persistence, offline simple-record CRUD, identity association, validation, migration, and restart persistence | WP1; sequencing with WP3 follows approved architecture |
| WP3 | Single-owner/single-business identity relationship, authentication, server-side authorization, isolation, and credential boundary | WP1; informs WP4 and WP6 |
| WP4 | Change tracking, pending sync, upload/download state, retry/backoff, idempotency, duplicate prevention, and diagnostics | Approved WP2/WP3 architecture |
| WP5 | Concurrent-edit detection, competing-version preservation, conflict lifecycle, interrupted-sync and restart recovery | WP4; conflict UX decision |
| WP6 | Integrated simple-record vertical slice across offline entry, authorization, sync, retry, conflict, and round trip | WP2–WP5 decisions and foundations |
| WP7 | Unit, integration, end-to-end, authorization, retry, conflict, offline/online, restart, migration, recovery, and safe-log validation | Runs throughout WP2–WP6; integrated after WP6 |
| WP8 | Acceptance checklist, evidence, setup/test instructions, limitations, residual risks, deferred work, and synchronized handoff records | WP6 and WP7 evidence |

The plan proposes WP1; WP2 and WP3 possibly in parallel; WP4; WP5; WP6; WP7 throughout and integrated after WP6; then WP8. This ordering is proposed, not authorized.

## Material owner decisions

The Phase 1 plan lists eight unresolved decisions without formal `D1-*` identifiers. The review references them as `P1-01` through `P1-08` for navigation only; these labels do not create or approve decision IDs. The source decision register likewise records the topics as open prose. If the owner wants canonical IDs, they must be added through an authoritative decision-register update.

### P1-01 — Which cloud backend and deployment approach should Phase 1 use?

- **Why it matters:** It constrains WP2–WP4 persistence, authentication integration, sync APIs, environments, testing, operations, and later migrations.
- **Options and trade-offs:** Use the provisional Supabase direction; compare and select another managed backend; or use a deliberately local/test-only cloud boundary. The provisional direction may reduce setup effort but remains unapproved; another provider may better fit requirements but adds comparison and migration cost; postponing selection blocks a real cloud round trip.
- **Recommendation:** Complete the required comparison and select the smallest managed backend that supports the approved identity, ownership, persistence, and test needs. This is a recommendation only.
- **Affected work and later phases:** WP1–WP4, WP6–WP8; all later phases inherit data, auth, hosting, and operational contracts.
- **Record for approval:** Provider, deployment environments, data ownership, supported capabilities, rejected alternatives, migration/exit assumptions, and owner/date/approval status.

### P1-02 — What authentication/sign-in foundation is required, and where does account UI remain deferred?

- **Why it matters:** WP3 must protect cloud operations without silently expanding Phase 1 into account management.
- **Options and trade-offs:** Email/password or another approved sign-in method; a minimal authenticated foundation with no account settings; or a broader account experience. Minimal scope reduces product surface but must still define session, recovery, and device behavior; broader UI improves self-service but conflicts with the stated deferral and expands security scope.
- **Recommendation:** Approve only the authentication and session foundation needed for authorized cloud access, with account-management UI explicitly deferred. This is a recommendation only.
- **Affected work and later phases:** WP3–WP6 and WP8; Phase 6 owns the deferred account-management experience.
- **Record for approval:** Allowed sign-in methods, session/token policy, recovery boundary, first-use behavior, trusted-device behavior, and explicit account-UI exclusions.

### P1-03 — What is the simple record: fields, validation, update, and delete behavior?

- **Why it matters:** WP2 and WP6 cannot define a testable schema, ownership, history, or sync contract without a concrete record.
- **Options and trade-offs:** A minimal generic record enables a narrow foundation but may prove less representative; a representative business record tests domain needs better but introduces more validation and history decisions; delete may be disabled, soft-deleted, or policy-controlled, each affecting tombstones and recovery.
- **Recommendation:** Select the smallest representative record that exercises ownership, offline editing, sync, and conflict behavior without importing Phase 2 financial scope. This is a recommendation only.
- **Affected work and later phases:** WP2, WP4–WP7; later business records must consume the approved identity, lifecycle, and history invariants.
- **Record for approval:** Field list, types/constraints, required examples, update semantics, delete/archive semantics, historical fields, and acceptance examples.

### P1-04 — Does Phase 1 require a user-facing conflict-resolution interface?

- **Why it matters:** WP5/WP6 acceptance differs materially between preserving competing versions with status and requiring an interactive resolution workflow.
- **Options and trade-offs:** Preservation/status only is narrower and safer for the foundation but defers resolution UX; a review UI improves usability but adds product, authorization, and testing scope; automatic merge is efficient only where rules are explicitly safe and approved.
- **Recommendation:** Preserve competing versions and expose an inspectable conflict status first; defer destructive or automatic resolution unless the owner specifies safe rules. This is a recommendation only.
- **Affected work and later phases:** WP5–WP8; future business and integration workflows must use the approved conflict contract.
- **Record for approval:** Required user-visible states, who may resolve, whether resolution is in Phase 1, prohibited silent behaviors, and representative concurrent-edit cases.

### P1-05 — What are the first-time-online setup and returning-offline access rules?

- **Why it matters:** Identity, device initialization, local ownership, session expiry, and sync lifecycle depend on whether a device starts online or returns without connectivity.
- **Options and trade-offs:** Require first online setup simplifies identity binding but prevents first use offline; allow offline-first setup improves availability but requires later claiming/merge rules; allow returning offline access only after prior authentication reduces risk but requires local session policy.
- **Recommendation:** Approve a narrow returning-offline scenario for an already initialized device and explicitly decide whether first-time setup must be online. This is a recommendation only.
- **Affected work and later phases:** WP2–WP6, recovery testing in WP7, and later device/account lifecycle work.
- **Record for approval:** First-use matrix, returning-device matrix, session-expiry behavior, local data visibility, claim/merge behavior, and failure messages.

### P1-06 — How should deletion propagation, tombstones, recovery, and retention work?

- **Why it matters:** Sync, conflict, restart recovery, backups, privacy handling, and historical protection cannot be tested consistently without lifecycle precedence.
- **Options and trade-offs:** Soft deletion/tombstones preserve sync knowledge but retain data; hard deletion is simpler but risks resurrection or broken history; archive/deactivate protects references but requires visibility rules; retention windows limit storage but can conflict with recovery and historical needs.
- **Recommendation:** Use an explicit lifecycle matrix before implementation, with non-destructive defaults for referenced records and tombstones where synchronization requires them. This is a recommendation only.
- **Affected work and later phases:** WP2, WP4–WP8; P2–P8 inherit lifecycle, recovery, history, and privacy contracts.
- **Record for approval:** State transitions, tombstone duration, archive visibility, permanent-delete authority, restore precedence, retention period, device-loss behavior, and privacy exception handling.

### P1-07 — Which browser and device support matrix is in scope?

- **Why it matters:** Local storage limits, PWA behavior, authentication, sync, and WP7 evidence depend on supported browsers, platforms, and connectivity conditions.
- **Options and trade-offs:** Desktop-first is narrower and easier to validate; mobile browser/PWA support better matches field use but increases storage and UX coverage; broad support increases reach and test cost.
- **Recommendation:** Select a small explicit launch matrix based on the owner's real operating devices, then label all other environments unsupported rather than implicitly compatible. This is a recommendation only.
- **Affected work and later phases:** WP2, WP4–WP8; Phase 5 later hardens installation, performance, and support coverage.
- **Record for approval:** Browser versions, operating systems, screen classes, install expectations, storage/network assumptions, and test environments.

### P1-08 — What cloud test environment, CI checks, and production-deployment scope are allowed?

- **Why it matters:** WP7/WP8 need reproducible evidence and a clear boundary between local development, preview/test data, and production.
- **Options and trade-offs:** Local-only checks are inexpensive but cannot prove cloud behavior; preview/staging improves confidence but needs environment and data controls; production deployment proves more operational behavior but risks user data and premature release.
- **Recommendation:** Require isolated test/preview environments and CI checks before any production scope; keep production deployment explicitly out unless separately approved. This is a recommendation only.
- **Affected work and later phases:** WP1, WP3–WP8; Phase 5 and Phase 8 inherit release and operational evidence requirements.
- **Record for approval:** Environments, test-data policy, CI gates, secrets/logging policy, deployment authority, rollback boundary, and production exclusion or approval.

## Scope exclusions and prerequisites

To avoid silently expanding Phase 1:

- Do not implement full account settings, profile management, invitations, roles, multi-user collaboration, billing, or ownership transfer.
- Do not implement the broad ingredient/menu/recipe/purchase/sales/expense domains, accounting rules, reporting, advanced AI, or third-party integrations.
- Do not infer a database schema, provider, authentication method, deletion algorithm, conflict merge rule, retention guarantee, or device guarantee from a recommendation.
- Require owner approval of the complete Phase 1 scope and material decisions before creating coding prompts or implementation tasks.
- Before implementation, record the approved vertical-slice contract, lifecycle/conflict/authorization invariants, test environments, acceptance baseline, and exclusions in the canonical documents.
- The repository currently has documentation only; no application behavior, schema, migration, or test evidence is established. The cross-phase audit's roadmap placement defect is remediated but final checks and checkpoint status remain separate evidence.

## Proposed owner approval record

```text
Phase: P1 — Offline-First Local-Cloud Foundation and Business Vertical Slice
Decision: [OWNER TO COMPLETE: APPROVE / REVISE / REJECT]
Approved scope: [OWNER TO COMPLETE]
Approved work packages: [OWNER TO COMPLETE]
Approved material decisions: [OWNER TO COMPLETE; reference canonical IDs or explicitly state new IDs]
Approved exclusions: [OWNER TO COMPLETE]
Required changes before implementation: [OWNER TO COMPLETE]
Evidence/acceptance baseline: [OWNER TO COMPLETE]
Owner: [OWNER TO COMPLETE]
Decision date: [OWNER TO COMPLETE]
Authoritative record location: [OWNER TO COMPLETE]

This record becomes authoritative only when completed by the owner and
synchronized into the governing decision, status, registry, roadmap, and
handoff documents as applicable.
```

**Explicit boundary:** This review organizes evidence and questions for owner review. It approves no decision, closes no open item, authorizes no coding task, and does not mark Phase 1 or any other phase complete.

## Review limitations and discrepancies

- The Phase 1 plan provides eight numbered unresolved topics but does not assign formal `D1-*` identifiers. This document therefore uses temporary `P1-01`–`P1-08` review labels only and does not alter the decision register.
- The source documents describe a proposed stack recommendation but require a comparison before provider commitment; no provider or authentication choice is treated here as approved.
- The repository documentation records no implementation or runtime evidence, so this review cannot establish feasibility, security, sync correctness, or production readiness.
- Any conflict between this review and the canonical product, roadmap, decision, status, or phase documents must be resolved by an authoritative owner update; this artifact is not the source of truth.

## Related documents

- [Phase 1 Plan](phases/PHASE_1_PLAN.md)
- [Roadmap](ROADMAP.md)
- [Product Foundation](PRODUCT_FOUNDATION.md)
- [Decisions](DECISIONS.md)
- [Project Status](../PROJECT_STATUS.md)
- [AI Handoff](AI_HANDOFF.md)
- [Cross-Phase Plan Audit](CROSS_PHASE_PLAN_AUDIT.md)

**Review artifact status:** Implemented as documentation; owner approval remains blank and Phase 1 remains proposed/not approved. This document does not authorize implementation.
