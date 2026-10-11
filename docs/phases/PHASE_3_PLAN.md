# KitchAI Phase 3 Plan — Proposed

**Status:** PROPOSED / NOT APPROVED. This planning document does not authorize implementation.

## A. Phase Overview

### Purpose and outcomes

Phase 3 completes the Core MVP operating loop after Phase 1's local/cloud and identity foundation and Phase 2's reusable records, purchases, recipes, and direct-cost foundation. It proposes sales capture, business expenses, personal-finance separation, reports, historical views, and explicit correction/recovery behavior so an owner can understand actual business activity without silent financial-history changes.

### Scope

- Actual sales entry: reusable menu selection, quantity, actual received amount, discount representation, date, and transaction history.
- Business operating-expense capture, including explicit classification for ambiguous cases such as gas.
- Separate personal-finance boundary and personal-expense records where the approved product scope requires them.
- Validated reports and historical views over approved actual values, with clear undetermined/unallocated states.
- Corrections, reversals, archive/deactivation, and recovery behavior that preserve original meaning.
- Offline/local-first persistence, authorized synchronization, conflict preservation, retry/idempotency, and evidence across these workflows using Phase 1/2 contracts.

### Non-goals

- Tax, accounting, legal, or compliance claims; invoicing or payment processing.
- Multi-user collaboration, roles, invitations, billing, or full account management.
- Stock-on-hand/inventory unless explicitly added through an owner-approved change.
- New shared-cost allocation formulas, estimated costs, or unsupported financial inference.
- AI-generated financial writes or external ordering/delivery integrations.
- Detailed Phase 4 planning or unrelated product redesign.

### Roadmap relationship

This is P3, following P1 and P2 and preceding Basic AI (P4), hardening (P5), account management (P6), and integrations (P7). The roadmap defines this phase as “Sales, Expenses, Reporting, and Finance Separation.” The roadmap is provisional; this plan remains a proposal.

### Assumptions and constraints

- Phase 1 and Phase 2 are plans, not evidence of implementation or completion.
- Their stable IDs, ownership/authentication, local persistence, sync, conflict, recovery, history, money, unit, and purchase contracts must be implemented and accepted before dependent work begins.
- Actual recorded values remain distinct from derived, unknown, estimated, and unallocated values.
- Recommendations in existing decision records are not approvals. Any change to product, money, privacy, or data lifecycle requires owner approval.

### Dependencies and risks

External dependencies are the approved cloud/auth/local persistence services and deployment/test environments selected in P1; no provider is currently approved. Risks include unclear discount semantics, expense classification, personal/business boundary leakage, reporting definitions, historical correction policy, and misleading reports when source data is missing or unallocated.

## B. Phase Entry Criteria

Implementation must not begin until all of the following are evidenced:

1. P1 and P2 are owner-approved, implemented, verified, and their acceptance evidence is available; plans alone do not satisfy this gate.
2. The P1/P2 interfaces for business ownership, authorization, stable IDs, local persistence, sync metadata, retries/idempotency, conflict preservation, recovery, historical values, purchase data, units, and actual-cost provenance are documented and testable.
3. Owner approval exists for Phase 3 scope and material decisions D3-01 through D3-09, or an explicit record identifies decisions that do not block particular WPs.
4. Currency, precision, rounding, discount input, correction/reversal, retention/archive, category/history, and shared-cost boundaries are settled for affected workflows.
5. Report definitions include source records, date ranges, aggregation/rounding, unknown/unallocated display, and refresh/sync semantics.
6. Supported browser/device and offline/reconnect test targets, cloud test environment, CI expectations, and release evidence are known.

Decisions that may remain open only if excluded from the affected WP include tax/accounting treatment, stock-on-hand, multi-user permissions, and external integrations. No WP may silently invent them.

## C. Work Package Breakdown

Dependency order: WP3-01; WP3-02 and WP3-03 may proceed in parallel after the contract; WP3-04 depends on both; WP3-05 depends on WP3-03; WP3-06 depends on WP3-02 through WP3-05; WP3-07 verifies the integrated phase; WP3-08 performs acceptance and handoff.

### WP3-01 — Phase Contract, Finance Boundaries, and Reporting Rules

**Purpose/value:** Establish an approved vocabulary and measurable contract before financial UI or calculations are built. **Scope:** sales, discount, business expense, personal expense, report, correction, reversal, unknown, unallocated, and historical-view rules; source-of-truth and date semantics; non-goals; traceability; open decisions. **Exclusions:** schema, UI, tax/accounting policy, and implementation. **Dependencies:** accepted P1/P2 contracts and product foundation. **Deliverables/data:** domain contract and decision matrix; no schema. **Offline/sync/history/security:** every future record is scoped, stable-ID based, historically interpretable, and uses existing local/sync/auth contracts. **Tests:** trace each rule to an objective acceptance check and confirm no unapproved rule is labeled approved. **Failure/edges:** mixed personal/business context, missing source values, timezone/date boundary, stale synced data. **Acceptance/evidence:** owner-approved contract identifies permitted actual/derived/unknown states, report inputs, correction semantics, and exclusions; reviewed decision links exist. **Risks/open:** D3-01, D3-02, D3-03, D3-04, D3-05, D3-06.

### WP3-02 — Sales Capture and Historical Sales

**Purpose/value:** Record actual sales quickly while preserving menu identity and transaction-time meaning. **Scope:** menu selection, quantity, actual amount received, approved discount representation, transaction date/time, notes if approved, validation, history, corrections/reversals, local persistence, authorized sync, retry/idempotency, and conflict preservation. **Exclusions:** payment processing, tax, invoicing, inventory consumption, AI writes. **Dependencies:** WP3-01; P1/P2 menu, money, history, sync contracts. **Data:** sales reference stable menu IDs and preserve transaction-time description, quantity, amount, discount, currency, and provenance. **Offline/sync:** create/read/edit according to approved correction policy offline; reconnect must not duplicate. **History/recovery:** original sales remain explainable; corrections are linked and recoverable. **Security:** business-scoped authorization; no personal data leakage. **Tests:** validation, duplicate retries, offline/reconnect, cross-business access, concurrent edits, historical menu-price changes, restart recovery. **Acceptance/evidence:** approved examples such as three items at 105 regular and 100 actual show the correct approved discount representation; unauthorized access fails; history remains readable after menu edits; test report is recorded. **Risks/open:** D3-02, D3-03, D3-05.

### WP3-03 — Business and Personal Expense Boundaries

**Purpose/value:** Capture real expenses without mixing business and personal finances. **Scope:** business expense entry, personal-expense boundary if approved, categories, actual amount/date/vendor or description where approved, gas/ambiguous classification, correction/archive behavior, and scoped history. **Exclusions:** tax/accounting, automatic classification, depreciation, allocation, and payment integrations. **Dependencies:** WP3-01; P1 ownership/auth; P2 categories/items/purchases/money. **Data:** expense records retain transaction-time values and explicit boundary/classification; ambiguous items remain unresolved rather than duplicated. **Offline/sync:** scoped local writes and idempotent sync with conflict preservation. **History/recovery:** corrections preserve original and recovery restores interpretable records. **Security:** server-side business/personal isolation and least privilege. **Tests:** boundary/isolation matrix, category changes, ambiguous gas, offline/retry/conflict/recovery, invalid amounts, date/time. **Acceptance/evidence:** a business expense cannot appear in personal reports and vice versa; gas is never auto-double-counted; actual values survive edits; automated test evidence is attached. **Risks/open:** D3-01, D3-04, D3-05, D3-06.

### WP3-04 — Reports and Historical Views

**Purpose/value:** Turn approved source records into understandable, reproducible business insight. **Scope:** approved sales/expense summaries, date filters, categories, actual-versus-derived/unknown/unallocated labels, historical views, source traceability, sync freshness/error state, and exact report rounding. **Exclusions:** unsupported forecasts, tax/accounting reports, stock valuation, hidden allocation, and reports over unauthorized data. **Dependencies:** WP3-01 through WP3-03 and P2 cost provenance. **Data:** reports are derived/read models or queries with source and calculation version; they must not rewrite source history. **Offline/sync:** cached local reports identify freshness and reconcile after sync; conflicts do not silently disappear. **History/recovery:** historical ranges remain explainable after master-data changes and corrections. **Security:** all filters and queries enforce business/personal scope server-side where cloud-backed. **Tests:** fixture totals, date boundaries, rounding, unknown/unallocated states, source drill-through, authorization, stale/offline/reconnect, corrected transactions. **Acceptance/evidence:** every displayed total can be traced to authorized source records and approved rules; unsupported values are labeled or omitted; repeat runs produce the approved result. **Risks/open:** D3-04, D3-06, D3-07.

### WP3-05 — Corrections, Recovery, and Lifecycle Integration

**Purpose/value:** Make correction and recovery safe across sales, expenses, and report history. **Scope:** linked correction/reversal flows, reasons/actor/time if approved, archive/deactivation, restore, deletion propagation/tombstones where inherited, recovery after interrupted sync, and audit display. **Exclusions:** final retention/privacy policy beyond approval, destructive deletion, and unrelated migration work. **Dependencies:** WP3-01 through WP3-04 plus P1/P2 recovery/history contracts. **Data lifecycle:** preserve originals, relationships, provenance, and stable IDs; distinguish correction from new transaction. **Offline/sync:** operations are idempotent, resumable, and conflict-preserving. **Security:** only authorized owner/context can correct or restore. **Tests:** interrupted writes, retries, duplicate corrections, concurrent correction, restore, historical report consistency, cross-boundary attempts. **Acceptance/evidence:** no approved correction silently erases original meaning; recovery produces one interpretable state; report history reflects approved semantics; evidence includes failure/recovery tests. **Risks/open:** D3-03, D3-05, D3-08.

### WP3-06 — Integrated Core Operating Loop

**Purpose/value:** Demonstrate purchases/records to sales/expenses to reports as one trustworthy flow. **Scope:** approved end-to-end local entry, sync/reconnect, authorization, reports, correction, and historical traceability. **Exclusions:** new business domains, AI, integrations, stock/accounting. **Dependencies:** WP3-01 through WP3-05 and accepted P1/P2 evidence. **Data/offline/history/security:** all inherited contracts remain intact; source records are immutable according to policy and derived reports are reproducible. **Tests:** end-to-end offline-first workflows, multiple businesses/personal boundary, conflicts, retries, restart, recovery, migration compatibility, accessibility/responsive behavior. **Acceptance/evidence:** a fresh test environment reproduces approved scenarios; no duplicate transactions, cross-boundary reads, silent history rewrites, or unsupported report claims; traceability matrix and test artifacts are stored. **Risks/open:** any unresolved decision that changes the loop blocks acceptance.

### WP3-07 — Automated Quality, Security, and Regression Evidence

**Purpose/value:** Prove the phase is safe to accept. **Scope:** unit, integration, end-to-end, authorization/isolation, offline/reconnect, sync/conflict, historical integrity, retry/recovery, accessibility, responsive, migration/compatibility, and regression suites; privacy-safe observability. **Exclusions:** claiming tests pass before execution, production load guarantees not approved, and sensitive payload logging. **Dependencies:** incrementally WP3-02–WP3-06; final integration after WP3-06. **Acceptance/evidence:** CI/local commands are documented; critical suites pass; failures are triaged; logs exclude credentials and financial payloads unless explicitly approved. **Risks/open:** target matrix and CI/deployment remain D3-09.

### WP3-08 — Phase Acceptance and Handoff

**Purpose/value:** Leave an auditable release boundary for the next approved phase. **Scope:** acceptance checklist, known limitations, evidence index, updated roadmap/status/registry/decisions/handoff, operational notes, rollback/recovery evidence, and owner approval record. **Exclusions:** Phase 4 planning, new implementation scope, and declaring completion from documentation alone. **Dependencies:** WP3-06 and WP3-07 plus owner decisions. **Acceptance/evidence:** all approved WPs are reviewed, tests pass, no critical data-loss/security defects remain, limitations are explicit, and owner accepts the phase with a recorded SHA/remote state.

## D. Cross-Cutting Requirements

All WPs must validate inputs and amounts; enforce business/personal authorization server-side; preserve stable IDs, transaction-time values, provenance, corrections, and auditability; support offline writes, reconnect, retry/backoff, idempotency and duplicate prevention; preserve conflicts for review; expose safe error/freshness states; remain accessible and responsive; avoid sensitive logs; maintain migration compatibility; and update documentation/operational handoff. No AI or report may silently mutate source financial records.

## E. Testing and Verification Strategy

Planned verification includes unit tests for money, discount, date, classification, report, and correction rules; integration tests for persistence/sync/auth; end-to-end offline/reconnect sales and expense flows; authorization and isolation tests; conflict/retry/recovery and duplicate tests; historical/master-data and migration tests; report fixture and provenance tests; accessibility/responsive checks; and regression coverage for accepted P1/P2 workflows. None of these tests are claimed as run by this planning task.

## F. Phase Acceptance Criteria

Phase 3 is accepted only when the owner-approved WPs are implemented and reviewed; required tests pass; P1/P2 interfaces remain compatible; sales, expenses, separation, reports, corrections, offline/reconnect, conflicts, retries, and recovery have evidence; no unresolved critical data-loss, privacy, or security defect remains; documentation and handoff are complete; and remaining limitations plus unapproved future scope are explicit. Documentation alone is insufficient.

## G. Handoff to Phase 4

After acceptance, Phase 4 may rely on authorized, historically traceable sales/expense/report source boundaries and validated read access to approved business data. It may use documented report/provenance contracts and confirmation gates, but must not assume AI may write financial data, that accounting/tax/inventory is complete, or that multi-user/integration work exists. Phase 4 scope is not planned here; its exact AI quality, privacy, cost, confirmation, and model decisions remain future owner work.

## Owner Decisions Register

All are **OPEN** unless an authoritative owner record approves them:

| ID | Decision question and why it matters | Options/trade-offs | Provisional option | Affected WPs/phases | Status |
| --- | --- | --- | --- | --- | --- |
| D3-01 | Exact personal-finance boundary and whether Phase 3 includes personal expense entry; determines isolation and scope. | Business-only is smaller; personal entry proves separation but expands privacy surface. | Keep personal boundary explicit; implement entry only if owner includes it. | WP3-01, WP3-03, WP3-04; P3/P6 | OPEN |
| D3-02 | Sales discount representation and validation; determines totals and history. | Actual total only is simple; rate/amount/both improve explanation but add validation. | Preserve actual amount plus approved discount provenance; do not infer unsupported rates. | WP3-01, WP3-02, WP3-04 | OPEN |
| D3-03 | Correction/reversal semantics and required audit fields; prevents silent financial edits. | Edit is simpler; linked reversal/correction is more traceable. | Preserve original and link explicit correction/reversal with reason, actor, and time if approved. | WP3-02, WP3-05; P3/P5 | OPEN |
| D3-04 | Report definitions, date/timezone, rounding, freshness, and unknown/unallocated display; prevents misleading totals. | Minimal summaries are bounded; rich drill-through improves trust but costs more. | Reports must identify source, date range, approved rounding, freshness, and undetermined values. | WP3-01, WP3-04, WP3-06 | OPEN |
| D3-05 | Expense classification for gas/ambiguous purchases; prevents double counting. | Manual explicit classification is safer; automation is faster but error-prone. | Preserve actual transaction and require explicit classification or leave unallocated. | WP3-03, WP3-05; P2/P3 | OPEN |
| D3-06 | Historical category/report behavior after reassignment or archive; determines stable history. | Live categories are simpler; snapshots preserve past meaning. | Preserve transaction-time category context for historical reports. | WP3-01, WP3-04, WP3-05 | OPEN |
| D3-07 | Report scope regarding direct costs, shared costs, and inventory; prevents unsupported claims. | Defer complex metrics; broader reports add value but need evidence. | Report direct actual/derived values only; label shared/unallocated and defer stock. | WP3-04, WP3-06; P2/P3 | OPEN |
| D3-08 | Retention, restore, deletion propagation, and recovery guarantees; determines lifecycle safety. | Strong preservation supports trust; deletion/privacy rules may conflict. | Inherit approved P1/P2 policy; no destructive behavior before approval. | WP3-05, WP3-08; P1-P5 | OPEN |
| D3-09 | Supported devices, cloud test/CI, and release evidence; determines verification boundary. | Narrow matrix is cheaper; broad matrix improves confidence. | Require an explicit supported matrix and repeatable CI/evidence before acceptance. | WP3-06–08; P3/P5 | OPEN |

## Related Documents

- [Roadmap](../ROADMAP.md)
- [Product Foundation](../PRODUCT_FOUNDATION.md)
- [Phase 1 Plan](PHASE_1_PLAN.md)
- [Phase 2 Plan](PHASE_2_PLAN.md)
- [Task Registry](../TASK_REGISTRY.md)
- [Decisions](../DECISIONS.md)
- [Project Status](../../PROJECT_STATUS.md)
- [AI Handoff](../AI_HANDOFF.md)

## Planning Boundary

This is a proposed planning baseline only. No coding prompts are created, no owner decision is approved by this document, and no application implementation is authorized.
