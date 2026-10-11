# Project Status

**Last updated:** 2026-10-11

## P1-WP2 Local Data Foundation — implemented

Under the [limited execution authorization](docs/PHASE_1_EXECUTION_AUTHORIZATION.md),
P1-WP2 is **implemented** and **verified locally**:

- Vite + React + TypeScript scaffold with Dexie/IndexedDB persistence
  (`src/db/`), a Business record with create, edit, archive, restore, and
  soft delete (tombstone retained, no purge), shared validation, and an
  outbox that records each mutation atomically with the record and recovers
  interrupted operations at startup.
- Minimal development UI (`src/app/`) showing active/archived/deleted views,
  pending-sync state, and storage/validation errors.
- **Checks:** `tsc --noEmit` clean; `vitest` 28/28 passing (fake-indexeddb);
  `vite build` succeeds; browser flow exercised (validation error, create,
  edit, archive, restore, delete, reload persistence).
- **Not done / out of scope:** cloud sync, Supabase, authentication (WP3),
  conflict UI, production deployment. O1–O7 remain open.
- **Git state:** implementation commit `acc5fe6` on branch
  `v0/p1-wp2-local-data-foundation`; not merged to `main` (owner review
  pending). P1-WP3 is not started and requires separate authorization.

Sections below marked **(historical)** record the pre-WP2 state and are kept
for audit context only.

## Phase 1 approval packet — planning consolidation

The owner authorized ChatGPT to make and recommend technical planning
decisions on their behalf. A consolidated [Phase 1 Approval Packet](docs/PHASE_1_APPROVAL_PACKET.md)
has been created with recommended decisions for backend provider (Supabase),
authentication, authorization, local persistence, sync, conflict handling,
lifecycle, browser matrix, and CI. Seven material decisions requiring owner
judgment (permanent deletion, privacy erasure, local encryption, offline
duration, Supabase Pro plan, additional browsers, production deployment)
remain explicitly marked as OWNER DECISION REQUIRED. The packet does not
authorize implementation by itself. P1-WP2 was separately authorized and is
implemented (see above); cloud schemas, migrations, infrastructure, and all
other Phase 1 work packages remain unstarted.


## Current State (historical, pre-WP2)

- **Implemented:** P0.1 documentation foundation and P0.2 product knowledge
  documentation are present. P0.3 Prompt AI continuity guides are implemented
  and pushed to `origin/main`. P0.4 technical foundation documentation is
  implemented, locally verified, and pushed to `origin/main`. P0.5 conceptual
  data-model and historical-protection documentation is implemented and pushed
  to `origin/main`. P0.6 decision-readiness documentation and checkpoint rules
  are implemented and pushed to `origin/main`.
- **Verified:** P0.1 through P0.3 documentation checks passed. P0.4 principle,
  stack, handoff, status, link, scope, and whitespace checks passed. P0.5
  relationship, history, cost, decision, link, scope, and whitespace checks
  passed. P0.6 decision coverage, approval labeling, link, status, scope, and
  whitespace checks passed. Before WP2, no application behavior was verified.
- **Incomplete:** Provisional roadmap phases; the proposed Phase 1 through
  Phase 8 breakdowns are pending complete owner approval. Since this snapshot,
  P1-WP2 has been implemented; P1-WP3 and later remain unauthorized.

These labels are distinct: implemented work exists, verified work has passed a
stated check, and incomplete work remains unfinished or unchecked.

## Current Task

The [Phase 1 Approval Packet](docs/PHASE_1_APPROVAL_PACKET.md) consolidates
Phase 1 planning into one document with recommended technical decisions and
owner gates. It covers all 13 required sections: objective/scope, backend
comparison (Supabase recommended), identity/session/authz model, minimal
record contract, local persistence, sync/retry/idempotency, conflict
detection/preservation/resolution, lifecycle/archive/deletion/tombstones,
browser/device matrix, CI/environments/secrets, acceptance matrix (P1-A01
through P1-A13), WP1–WP8 readiness, and risks/assumptions/decision record.

Seven material decisions remain OWNER DECISION REQUIRED: permanent deletion
and tombstone retention (O1), privacy-related erasure (O2), local data
encryption (O3), maximum offline duration (O4), Supabase Pro plan (O5),
additional browser requirements (O6), and production deployment authorization
(O7). These cannot be resolved by technical recommendation alone.

Phase 5 through Phase 8 planning documentation remains proposed and documentation-only;
  it does not authorize implementation. The proposed [Phase 5 Plan](docs/phases/PHASE_5_PLAN.md)
  contains WP5-01 through WP5-08 and remains proposed / not approved. The proposed
  [Phase 6 Plan](docs/phases/PHASE_6_PLAN.md) contains WP6-01 through WP6-08 and
  remains proposed / not approved. The proposed [Phase 7 Plan](docs/phases/PHASE_7_PLAN.md)
  contains WP7-01 through WP7-10 and remains proposed / not approved. The proposed
  [Phase 8 Plan](docs/phases/PHASE_8_PLAN.md) contains WP8-01 through WP8-07 and
  remains proposed / not approved. Proposed Phase 1 through Phase 8 planning
  documents remain pending owner approval.

**(Historical — P0.7 audit, pre-WP2.)** P0.7 is an implementation-readiness
audit only; it does not authorize implementation. At audit time the repository
was not ready for application implementation: the root contained
documentation and `.git` only, and targeted inspection found no application
source, configuration, schema, migration, or test files. The documentation
audit checks passed; at that time no application behavior was implemented or
verified. This no longer describes the WP2 branch, which contains the local
data foundation described at the top of this file.

**Evidence labels (historical):** Requirements below are confirmed by existing
documentation, not application behavior. Application functionality implemented
and verified by repository evidence at audit time: none. Proposed stack choices remain unapproved;
unresolved items require owner decisions. Cloud authentication, persistence,
backup, and multi-device sync are deferred and not applicable to an
implementation task in the current scope.

## P0.7 Readiness Findings (historical, pre-WP2)

| Area | Evidence-based finding |
| --- | --- |
| Product scope and core workflows | Confirmed by existing documentation; documented but not implemented. Workflow acceptance criteria and order are unresolved. |
| Multiple businesses and finance separation | Confirmed requirements; documented but not implemented or behavior-verified. |
| Ingredients, categories, menus, recipes, purchasing, sales, expenses, costs | Concepts are documented but not implemented. Stock-on-hand inventory behavior is unresolved. |
| Offline and synchronization | Local-first/offline/PWA principles are confirmed and documented, not implemented. Sync/conflict requirements and durable-storage choice are unresolved; cloud services are deferred. |
| Money and accounting | Unresolved owner decisions: currency, precision, rounding, and accounting rules. Recommendations are not approved. |
| History and record lifecycle | Preservation baseline is confirmed and documented, not implemented. Correction, archive/delete, retention, recovery, and historical category-report behavior are unresolved. |
| Shared costs and gas | Actual-only costing is confirmed and documented, not implemented. Allocation and ambiguous expense classification are unresolved. |
| Stack, data model, testing | Stack is proposed but not approved; data model/schema and application testing approach are unresolved. No architecture or behavior is implemented. |
| Phase/task readiness | Not ready: no approved phase breakdown, coding task, dependencies, or implementation acceptance criteria exist. |

**Disposition:** The P0 documentation foundation is complete, but Phase 0 is
not ready to close as an implementation-ready foundation. Before
implementation, the owner must approve the next scope and
its phase breakdown. Resolve the money/history/cost/ownership questions that
materially affect those workflows; Prompt AI can then propose tasks and
acceptance criteria. See the
[task registry](docs/TASK_REGISTRY.md), [decisions](docs/DECISIONS.md),
[roadmap](docs/ROADMAP.md), and [Prompt AI workflow](docs/PROMPT_AI_WORKFLOW.md).

P0.7 audit documentation is implemented, locally verified, and pushed to
`origin/main`.

## Sources of Truth

- Product context and scope: [project overview](docs/PROJECT_OVERVIEW.md)
- Confirmed requirements and product logic: [product foundation](docs/PRODUCT_FOUNDATION.md)
- Confirmed technical direction and provisional stack: [decisions register](docs/DECISIONS.md)
- Prompt AI process: [workflow](docs/PROMPT_AI_WORKFLOW.md) and [intake checklist](docs/PROMPT_AI_INTAKE.md)
- Readiness evidence: this P0.7 audit and the canonical [product foundation](docs/PRODUCT_FOUNDATION.md)
- Provisional sequencing: [roadmap](docs/ROADMAP.md)
- Work hierarchy and active task: [task registry](docs/TASK_REGISTRY.md)
- Approved decisions and open questions: [decisions](docs/DECISIONS.md)
