# KitchAI Phase 2 Plan — Proposed

**Status:** Proposed planning document; pending owner approval. This plan does not authorize implementation.

## Phase Contract

### Objective
Expand the approved Phase 1 local/cloud, identity, ownership, synchronization, conflict, and recovery foundation into reusable business records and a direct actual-cost foundation for the Core MVP.

### Scope
Business-scoped categories and reusable items; direct ingredients; shared consumables; operating expenses; equipment/assets; menu products and recipes; shopping plans and reusable cart entries; purchase history; direct actual-cost foundations; and the integration, history, synchronization, authorization, testing, and handoff evidence needed for these records.

### Non-goals
Multi-user collaboration; full account management; formal accounting, tax, depreciation, or inventory claims; speculative shared-cost allocation; AI-generated financial writes; broad external integrations; and any Phase 1 behavior not already approved.

### Preconditions and gates
Phase 2 cannot begin until Phase 1 is owner-approved, its acceptance evidence is complete, its synchronization and recovery contracts are available, and the owner approves the Phase 2 scope and material decisions in this document. Proposals below must not be treated as approved schema, accounting, or allocation rules.

### Phase 1 interfaces relied upon
Phase 2 records must use Phase 1 stable identities, business ownership and authorization, local durable persistence, synchronization metadata/lifecycle, idempotent retries, conflict preservation, and recovery semantics. Phase 2 must not duplicate or weaken those contracts; it must define how each entity participates in them.

## Dependency Order

WP2-01 establishes the contract and gates. WP2-02 establishes reusable categories and item identity. WP2-03 depends on WP2-02. WP2-04 depends on WP2-02. WP2-05 depends on WP2-02 and WP2-03. WP2-06 depends on WP2-02 and WP2-03. WP2-07 depends on WP2-02, WP2-03, and WP2-06. WP2-08 depends on WP2-03 and WP2-07. WP2-09 depends on WP2-03, WP2-04, WP2-07, and WP2-08 but must not implement allocation. WP2-10 integrates all approved work and evidence. Each WP remains proposed until the complete phase is approved.

## Work Packages

### WP2-01 — Phase Contract and Business Rules

**Objective/outcome:** Establish the approved Phase 2 objective, vocabulary, boundaries, assumptions, dependencies, and gates.

**Value:** Prevents coding against ambiguous financial, historical, ownership, or inventory behavior.

**In scope:** Scope/non-goals; business terminology; Phase 1 dependency map; entity boundary map; measurable acceptance baseline; unresolved decision register; and implementation blockers.

**Non-goals:** Schema, migrations, UI, accounting policy, or implementation tasks before approval.

**Dependencies:** Approved Phase 1 plan and product foundation.

**Rules and entities:** Define business, category, reusable item, menu product, recipe, shopping plan, cart entry, purchase, expense, asset, and usage-observation terms without finalizing storage shape.

**Cross-cutting requirements:** Every future record is business-scoped, has a stable identity, participates in offline persistence/sync/conflict/recovery, and is authorized server-side. Historical values must not be silently rewritten.

**Testing/acceptance:** `AC2-01-01` owner can trace every WP to scope and dependencies; `AC2-01-02` all material open decisions are registered; `AC2-01-03` no proposed rule is labeled approved.

**Deliverables/risks:** Phase contract and updated decision links. Blocked by missing Phase 1 approval or unresolved decisions that change the phase boundary.

### WP2-02 — Business Categories and Reusable Item Foundation

**Objective/outcome:** Define reusable, business-scoped master data and category relationships.

**Value:** Avoids duplicate items and cross-business leakage.

**In scope:** Categories; direct ingredients; shared consumables; equipment/assets; menu-related and expense-related master records as appropriate; ownership, references, lifecycle, archival, restoration, reassignment, validation, and duplicate prevention.

**Non-goals:** Multi-business collaboration, automatic catalog merges, inventory balances, or destructive deletion policy without approval.

**Dependencies:** WP2-01 and Phase 1 ownership/auth/persistence.

**Proposed relationships:** A business owns categories and reusable records; recipes, cart entries, purchases, expenses, and assets reference stable records; historical transactions retain transaction-time values.

**Rules:** Reject cross-business references and duplicate identity aliases where policy requires; archived records remain readable where history depends on them; IDs are never reused.

**Offline/sync/security:** Offline writes queue under the owning business; sync is idempotent; concurrent edits preserve versions; all reads/writes are authorization-scoped.

**Testing/acceptance:** `AC2-02-01` reuse works without duplicate master records; `AC2-02-02` cross-business access is rejected; `AC2-02-03` archive/restore behavior follows approved policy; `AC2-02-04` conflict and recovery preserve references.

**Deliverables/risks:** Domain contract and validation matrix. Blocked by ownership, lifecycle, and category-history decisions.

### WP2-03 — Direct Ingredients and Shared Consumables

**Objective/outcome:** Preserve the distinction between directly recipe-used ingredients and consumables shared across activities.

**Value:** Enables direct costs without false allocation precision.

**In scope:** Business rules, references, units, quantity precision, conversion boundaries, purchase linkage, and actual usage/production observations.

**Non-goals:** Invented allocation, estimated usage, stock balances, or accounting treatment.

**Dependencies:** WP2-02 and approved unit/money decisions.

**Rules:** Direct ingredients may support recipe quantities; shared consumables may record purchase and observed use/output; observed facts remain distinct from estimates and derived values; incompatible units are rejected or explicitly unresolved.

**Offline/sync/security:** Observations and master-data changes are durable offline records with stable IDs, scoped sync, conflict preservation, and recovery.

**Testing/acceptance:** `AC2-03-01` the two groups remain distinguishable; `AC2-03-02` precision and conversion behavior matches approved rules; `AC2-03-03` unknown usage is never fabricated; `AC2-03-04` history remains interpretable after item changes.

**Deliverables/risks:** Unit and observation contract. Blocked by unit, precision, and shared-usage decisions.

### WP2-04 — Operating Expenses and Equipment/Assets

**Objective/outcome:** Keep operating expense records distinct from equipment/assets and define their Phase 2 lifecycle.

**Value:** Supports reliable business records without silently claiming accounting treatment.

**In scope:** Expense and asset identity, categories, dates, actual amounts where approved, references, lifecycle/history, and relationship to purchases.

**Non-goals:** Depreciation, tax, capitalization, accounting ledgers, or stock-on-hand.

**Dependencies:** WP2-02 and approved money/lifecycle decisions.

**Rules:** A record is not both an expense and asset by inference; ambiguous use is recorded explicitly; historical transactions retain actual values and classification context.

**Offline/sync/security:** Same Phase 1 local-first, authorization, idempotency, conflict, and recovery contracts.

**Testing/acceptance:** `AC2-04-01` expense and asset records cannot be conflated; `AC2-04-02` unsupported accounting outputs are absent; `AC2-04-03` corrections/archive preserve history and ownership.

**Deliverables/risks:** Boundary and lifecycle contract. Blocked by equipment scope, classification, and money decisions.

### WP2-05 — Menu Products and Recipe Relationships

**Objective/outcome:** Define reusable menu products and recipes referencing existing ingredients while preserving historical meaning.

**Value:** Supports repeatable production and direct costing without duplicated ingredients.

**In scope:** Product/recipe relationships, quantities and units, version/history representation, selling-price references where approved, validation of missing/archived/incompatible records, and historical snapshots or equivalent preserved values.

**Non-goals:** Sales workflows, AI recipe generation, inventory consumption, or unapproved cost formulas.

**Dependencies:** WP2-02, WP2-03, and approved history/unit/money decisions.

**Rules:** Recipe entries reference stable ingredient IDs; changes do not rewrite prior records; missing or incompatible references block or require explicit correction; archived references remain understandable.

**Offline/sync/security:** Versioned recipe edits sync with conflict preservation and business authorization; historical reads do not depend only on current master data.

**Testing/acceptance:** `AC2-05-01` no ingredient duplication occurs; `AC2-05-02` recipe history remains readable after edits; `AC2-05-03` invalid references are rejected or surfaced; `AC2-05-04` concurrent edits are preserved.

**Deliverables/risks:** Recipe/history contract. Blocked by snapshot/history and unit decisions.

### WP2-06 — Shopping Plans and Reusable Shopping Cart

**Objective/outcome:** Separate planned shopping entries from completed purchases while reusing existing business items.

**Value:** Makes planning quick without corrupting purchase history.

**In scope:** Plan and cart identity, item selection, planned quantity, editing, categories, completion/cancellation, duplicate prevention, and linkage to later purchases.

**Non-goals:** Treating a plan as proof of purchase, stock accounting, supplier integrations, or automatic price assumptions.

**Dependencies:** WP2-02, WP2-03, and Phase 1 sync/recovery.

**Rules:** Planned quantity and purchased quantity are distinct; completion may create or link a purchase only through explicit action; cancellation preserves appropriate history; duplicate entries follow approved policy.

**Offline/sync/security:** Offline edits reconcile idempotently; ownership is enforced; conflicts preserve competing plan/cart states; recovery does not turn plans into purchases.

**Testing/acceptance:** `AC2-06-01` existing item references are reused; `AC2-06-02` plan/purchase distinction survives sync; `AC2-06-03` duplicate and cancellation behavior follows approval; `AC2-06-04` cross-business references fail.

**Deliverables/risks:** Planning-to-purchase contract. Blocked by duplicate, cancellation, and partial-purchase decisions.

### WP2-07 — Purchase Transactions and Purchase History

**Objective/outcome:** Record actual purchases and preserve meaningful history independent of current master data.

**Value:** Provides trustworthy price and quantity evidence for operations and direct costs.

**In scope:** Purchase and line-item identity, item references, transaction-time descriptions, quantities, units, prices, dates, partial purchases, corrections, cancellation, and historical references.

**Non-goals:** Stock-on-hand unless separately approved, supplier/accounting integrations, or silent edits.

**Dependencies:** WP2-02, WP2-03, WP2-06, and money/history decisions.

**Rules:** A purchase is historical; planned values are not actuals; corrections preserve original meaning; cancellation semantics are explicit; current item/category/recipe changes cannot rewrite transaction values.

**Offline/sync/security:** Transactions are business-scoped, durable offline, retry-idempotent, conflict-safe, and recoverable; sensitive logs exclude credentials.

**Testing/acceptance:** `AC2-07-01` actual quantity/price/date are retained; `AC2-07-02` partial purchase behavior is explicit; `AC2-07-03` correction/cancellation preserves audit meaning; `AC2-07-04` history survives master-data changes.

**Deliverables/risks:** Purchase contract and migration/recovery evidence. Blocked by money, correction, cancellation, partial-purchase, and inventory decisions.

### WP2-08 — Direct Actual-Cost Foundation

**Objective/outcome:** Use known actual purchase quantities and prices to support direct ingredient cost calculations without overstating certainty.

**Value:** Gives businesses useful cost evidence while preserving actual-versus-derived distinctions.

**In scope:** Inputs, formulas only after approval, unit conversion, precision, rounding, provenance, historical calculation interpretation, and unknown/undetermined states.

**Non-goals:** Accounting-grade costing, shared allocation, tax, depreciation, estimates presented as facts, or stock valuation.

**Dependencies:** WP2-03, WP2-07, and approved money/unit/history decisions.

**Rules:** Actual recorded costs are immutable facts; derived costs identify source records and calculation version; unavailable or incompatible inputs yield undetermined results rather than guesses; rounding occurs only at approved boundaries.

**Offline/sync/security:** Derived values must be reproducible after sync and history changes; source and calculation provenance remain scoped and recoverable.

**Testing/acceptance:** `AC2-08-01` actual and derived values are distinguishable; `AC2-08-02` precision/conversion/rounding matches approval; `AC2-08-03` missing data never creates false precision; `AC2-08-04` historical results remain explainable.

**Deliverables/risks:** Cost-input and provenance contract. Blocked by currency, precision, unit, and historical-cost decisions.

### WP2-09 — Shared-Consumable Usage and Cost Boundaries

**Objective/outcome:** Record observed shared-consumable usage while explicitly deferring unsupported allocation.

**Value:** Captures useful operational facts without inventing per-product costs.

**In scope:** Observation records, quantities, dates, production/output references where known, provenance, unallocated costs, and reporting boundaries.

**Non-goals:** Allocation formulas, estimated depletion, per-menu cost claims, or accounting treatment.

**Dependencies:** WP2-03, WP2-04, WP2-07, WP2-08, and owner allocation decision.

**Rules:** Observed use is separate from purchase and estimate; unknown allocation remains unknown/unallocated; no report may imply a calculated product cost without approved evidence.

**Offline/sync/security:** Observations use Phase 1 stable IDs, scoped authorization, conflict preservation, idempotent sync, and recovery.

**Testing/acceptance:** `AC2-09-01` observed and estimated values cannot be confused; `AC2-09-02` unallocated costs remain explicit; `AC2-09-03` no unsupported allocation is emitted; `AC2-09-04` observations remain auditable after sync.

**Deliverables/risks:** Observation and reporting-boundary contract. Blocked by measurement and allocation decisions.

### WP2-10 — Integration, Historical Integrity, and Phase Acceptance

**Objective/outcome:** Integrate approved WPs and prove the Phase 2 records work safely offline and online.

**Value:** Converts separate contracts into an auditable, recoverable business workflow.

**In scope:** Dependency integration; authorization; unit, money, history, sync, conflict, recovery, migration, and end-to-end tests; documentation traceability; known limitations; and handoff.

**Non-goals:** New scope discovered during integration, unapproved policy changes, or claiming unsupported accounting/inventory behavior.

**Dependencies:** WP2-01 through WP2-09 and complete Phase 1 evidence.

**Acceptance:** `AC2-10-01` all approved workflows pass offline/local persistence and authorized sync tests; `AC2-10-02` retries do not duplicate; `AC2-10-03` conflicts and recovery preserve data; `AC2-10-04` history survives master-data changes; `AC2-10-05` no cross-business access succeeds; `AC2-10-06` documentation, migration, and rollback evidence are complete; `AC2-10-07` owner accepts unresolved limitations explicitly.

**Deliverables/risks:** Updated roadmap, status, registry, decisions, handoff, test evidence, and release checklist. Phase acceptance is blocked by any missing owner approval, failed critical test, unverified recovery path, or undocumented limitation.

## Material Decision Register

All entries are **OPEN** unless an authoritative owner record changes them. Owner approval is required for each decision before the affected WP becomes implementation-ready.

| ID | Question | Options and trade-offs | Provisional direction | Status | Approver |
| --- | --- | --- | --- | --- | --- |
| D2-01 | Single business or multi-business now? | Single business narrows scope; multi-business matches long-term requirements but expands isolation/testing. | Keep Phase 2 one business per user while preserving business-scoped IDs and boundaries. | OPEN | Owner |
| D2-02 | Currency, precision, rounding, history? | Minor units are safe for fixed currencies; decimal-safe values support variable precision; boundaries affect totals/history. | Explicit currency and exact representation; approve rounding boundaries before money entry. | OPEN | Owner |
| D2-03 | Units and conversions? | Fixed supported units are predictable; broad conversion adds complexity and errors. | Start with an approved unit catalogue and explicit conversion compatibility. | OPEN | Owner |
| D2-04 | Archive/delete/restore/reassign master data? | Archive protects history; deletion improves privacy but risks references; reassignment can alter reports. | Prefer archive/deactivate and stable IDs; prohibit silent history rewrite. | OPEN | Owner |
| D2-05 | Purchase correction/cancellation? | Edit is simple; linked correction/reversal preserves audit meaning; cancellation semantics vary. | Preserve original and record explicit correction/cancellation reason and actor. | OPEN | Owner |
| D2-06 | Historical recipe and cost interpretation? | Snapshot preserves meaning; live references are simpler but unstable; versioning adds storage. | Preserve transaction-time values and recipe/cost provenance. | OPEN | Owner |
| D2-07 | Partial purchases and planned versus actual? | One purchase per plan is simple; partial lines model reality but add workflow. | Keep planned and actual quantities separate; support partials only if approved. | OPEN | Owner |
| D2-08 | Stock-on-hand scope? | Include now for operational value; defer to avoid inventory complexity. | Defer stock-on-hand unless owner expands scope with movement rules. | OPEN | Owner |
| D2-09 | Equipment/assets behavior? | Simple records are bounded; depreciation/capitalization creates accounting scope. | Records, categories, history, and lifecycle only; defer accounting behavior. | OPEN | Owner |
| D2-10 | Shared-consumable observations? | Manual actual observations are trustworthy; estimates are faster but risk false precision. | Record observed quantities/output with provenance; do not infer use. | OPEN | Owner |
| D2-11 | Shared-cost allocation? | Allocate by approved evidence/formula; leave unallocated to avoid false precision. | Leave unknown costs unallocated until an owner-approved rule exists. | OPEN | Owner |
| D2-12 | Testing, recovery, migration, release evidence? | Minimal tests reduce effort but increase risk; comprehensive evidence costs more but protects history. | Require automated unit/integration/e2e coverage plus migration and recovery evidence for critical paths. | OPEN | Owner |

## Phase Acceptance and Handoff

Phase 2 is proposed, not approved or complete, until the owner approves the contract and material decisions, each approved WP is implemented and verified, Phase 1 interfaces remain intact, and WP2-10 evidence is recorded. The next Coding AI must receive an owner-approved task prompt with one WP/task scope, dependencies, exclusions, acceptance criteria, validation commands, and the required Git execution mode. No prompts or coding tasks are created by this proposal.

## Related Documents

- [Roadmap](../ROADMAP.md)
- [Task Registry](../TASK_REGISTRY.md)
- [Decisions](../DECISIONS.md)
- [Product Foundation](../PRODUCT_FOUNDATION.md)
- [Phase 1 Plan](PHASE_1_PLAN.md)
- [Project Status](../../PROJECT_STATUS.md)
- [AI Handoff](../AI_HANDOFF.md)

> This document records proposals for collaborative owner review. It does not approve Phase 2, create implementation authority, or replace the canonical decisions register.
