# KitchAI Project-Wide Roadmap

This document is the high-level, project-wide roadmap for KitchAI. It is a
proposal for owner and Prompt AI review, not an approval to implement any
phase. Detailed phase plans, work packages, coding tasks, and prompts may be
created only for a phase that is actively being planned and only after the
owner approves its complete scope and material decisions.

## Established Direction

The following inputs are established planning context:

- KitchAI is intended to become an offline-first, AI-enabled SaaS product for
  small food businesses.
- The initial operating model is one shop and one user.
- The MVP target is core business functionality plus Basic AI.
- AI quality is prioritized and API cost is acceptable within the owner's stated
  preference.
- Phase 1 must establish local-cloud synchronization and a working business
  data vertical slice.
- Phase 1 must establish identity, authentication, business ownership, and
  access-control foundations needed to protect cloud data.
- Full user-facing account management is deferred to a later phase.

These statements describe direction and requirements; they do not prove that
features are implemented or that a technology choice is approved. Product
requirements and unresolved decisions remain in [Product Foundation](PRODUCT_FOUNDATION.md)
and [Decisions](DECISIONS.md).

## Proposed Eight-Phase Structure

### P0 — Project and Documentation Foundation

**Purpose and outcomes:** Establish repository-readable product knowledge,
technical principles, planning governance, continuity guidance, and readiness
evidence.

**Proposed scope and deliverables:** Product foundation, conceptual data and
history guidance, provisional technical direction, decision register, Prompt AI
workflow, task registry, handoff records, and implementation-readiness audit.

**Non-goals:** Application code, schemas, migrations, infrastructure, detailed
Phase 1 tasks, or approval of provisional technical choices.

**Dependencies:** None. Existing P0 documentation is recorded as implemented
and verified according to [Project Status](../PROJECT_STATUS.md).

**Risks and unresolved decisions:** The repository may appear complete while
application behavior remains absent; owner decisions about money, history,
cost allocation, ownership, storage, and testing remain open.

**Completion criteria:** Documentation is internally linked, labels proposal
and approval state accurately, records evidence without fabrication, and leaves
no unapproved implementation task active.

**Contribution:** Enables safe planning for Core MVP, Basic AI MVP, and the
long-term SaaS objective.

### P1 — Offline-First Local-Cloud Foundation and Business Vertical Slice

**Purpose and outcomes:** Establish the first secure, testable end-to-end slice
of business data that works locally and can synchronize with the cloud.

**Proposed scope and deliverables:** Durable local persistence and integrity;
cloud persistence; stable identity and authentication foundations; business
ownership and access control; synchronization metadata and lifecycle;
retry/idempotency and duplicate prevention; conflict detection and handling;
security, recovery, and data-integrity tests; and one working business-data
vertical slice from local entry through cloud reconciliation.

Full account-management UI is deferred; this phase covers only the identity and
access foundations required to protect cloud data.

**Non-goals:** Complete product coverage, multi-business collaboration,
full account settings, polished account-management screens, all reporting,
advanced AI, or final integration catalog.

**Dependencies:** P0 documentation, owner approval of the complete Phase 1
plan, and owner decisions needed for identity, ownership boundaries, local
persistence, synchronization, conflict, recovery, and security behavior.

**Risks and unresolved decisions:** Final stack and cloud provider, offline
retention and recovery guarantees, conflict semantics, deletion propagation,
credential/session policy, and the exact vertical slice remain unresolved.

**Completion criteria:** The approved vertical slice is usable offline,
persists safely locally, authenticates cloud access, enforces business-level
ownership, synchronizes with retries without duplicates, exercises conflict and
recovery behavior, and passes the approved security and end-to-end checks.

**Contribution:** Required foundation for Core MVP and the long-term
AI-enabled SaaS product.

### P2 — Core Business Records and Cost Foundations

**Purpose and outcomes:** Expand the vertical slice into reliable reusable
business records and actual-cost capture.

**Proposed scope and deliverables:** Business-scoped categories, ingredients,
shared consumables, operating expenses, equipment/assets, menu products,
recipes, shopping plans, purchase history, and direct actual-cost tracking;
historical values and references remain understandable.

**Non-goals:** Multi-user collaboration, advanced accounting, speculative cost
allocation, broad integrations, or AI-generated financial writes without
approval.

**Dependencies:** P1 synchronization, identity, ownership, and data-integrity
foundations; owner approval of money, history, correction, category, and
shared-cost rules.

**Risks and unresolved decisions:** Currency and rounding, stock-on-hand
scope, archive/delete behavior, transaction corrections, and shared-cost
allocation are open.

**Completion criteria:** Approved workflows record and retrieve reusable
business data, purchases, recipes, and actual costs offline and online without
breaking historical meaning or ownership boundaries.

**Detailed planning record:** The proposed [Phase 2 Plan](phases/PHASE_2_PLAN.md)
documents WP2-01 through WP2-10, dependencies, acceptance criteria, and open
owner decisions. It does not authorize implementation.

**Contribution:** Core MVP business foundation.

### P3 — Sales, Expenses, Reporting, and Finance Separation

**Purpose and outcomes:** Complete the initial operating loop from purchases
and production through sales, expenses, and useful business understanding.

**Proposed scope and deliverables:** Sales entry with actual amounts and
discounts, business expenses, separate personal-finance boundaries, reports,
historical views, and approved correction/recovery behavior.

**Non-goals:** Tax/accounting compliance claims, unapproved allocation formulas,
shared business membership, or AI automation of financial changes.

**Dependencies:** P1 and P2; approved money representation, rounding,
historical correction, category reassignment, expense classification, and
reporting rules.

**Risks and unresolved decisions:** Gas and ambiguous expense classification,
report definitions, discount details, inventory implications, and accounting
treatment require owner decisions.

**Completion criteria:** The approved core workflows keep personal and business
records separate, preserve transaction history, calculate only supported actual
values, and produce validated reports.

**Detailed planning record:** The proposed [Phase 3 Plan](phases/PHASE_3_PLAN.md)
documents WP3-01 through WP3-08, dependencies, acceptance criteria, and open
owner decisions. It does not authorize implementation.

**Contribution:** Completes the Core MVP operating loop.

### P4 — Basic AI Assistant

**Purpose and outcomes:** Add an AI assistant that improves recording and
understanding without weakening manual control or data integrity.

**Proposed scope and deliverables:** AI-assisted capture, explanation,
search/summarization, and recommendations over approved business data;
explicit user review, validation, and confirmation before persisted financial
changes; quality and cost evaluation.

**Non-goals:** Autonomous financial mutations, unsupported estimates,
unsupervised accounting, or replacing manual entry.

**Dependencies:** P1-P3 data boundaries, history protection, authorization,
validation, and owner-approved AI confirmation rules.

**Risks and unresolved decisions:** Model quality, privacy, prompt/data
exposure, cost controls, hallucination handling, and acceptable confirmation
UX remain open.

**Completion criteria:** Basic AI scenarios meet approved quality checks,
respect access boundaries, disclose uncertainty, and cannot save financial
changes without the required validation and user confirmation.
**Contribution:** Delivers the Basic AI MVP while preserving the
Core MVP.

**Detailed planning record:** The proposed [Phase 4 Plan](phases/PHASE_4_PLAN.md)
documents WP4-01 through WP4-08, dependencies, acceptance criteria, risks, and
open owner decisions. It does not authorize implementation.

### P5 — Product Hardening and Installable Offline Experience

**Purpose and outcomes:** Make the core product dependable for regular use on
supported devices and network conditions.

**Proposed scope and deliverables:** PWA installation, caching and update
behavior, offline UX, observability, performance, accessibility, backup and
recovery workflows, security hardening, and broader automated/manual testing.

**Non-goals:** New major business domains, multi-user collaboration, or
unapproved integrations.

**Dependencies:** P1-P4 behavior and approved device, recovery, privacy, and
security requirements.

**Risks and unresolved decisions:** Browser storage limits, device loss,
service-worker updates, recovery-point expectations, and support burden.

**Completion criteria:** Supported devices can install and use the approved
workflows offline, recover according to the approved guarantee, and pass
security, accessibility, performance, and regression checks.

  **Contribution:** Hardens Core MVP and Basic AI MVP for real-world use.

  **Detailed planning record:** The proposed [Phase 5 Plan](phases/PHASE_5_PLAN.md)
  documents WP5-01 through WP5-08, dependencies, acceptance criteria, risks, and
  open owner decisions. It does not authorize implementation.

### P6 — Multi-User SaaS Readiness and Account Management

**Purpose and outcomes:** Extend the secure single-user foundation toward a
managed SaaS product and provide the deferred user-facing account experience.

**Proposed scope and deliverables:** Account management UI, profile and
session controls, business membership and roles if approved, invitations,
ownership transfer, tenant isolation, lifecycle/support tooling, and service
operational policies.

**Non-goals:** Assuming collaboration is required, adding roles without owner
approval, or changing single-user ownership semantics implicitly.

**Dependencies:** P1 identity/access foundations, P5 hardening, and explicit
owner decisions about multiple users, roles, invitations, ownership transfer,
privacy, retention, and billing posture.

**Risks and unresolved decisions:** Authorization complexity, privacy,
account recovery, abuse prevention, tenant isolation, and support operations.

**Completion criteria:** Approved account and membership workflows enforce
least privilege, isolate businesses and personal data, and pass security,
recovery, and lifecycle tests.

**Contribution:** Advances the long-term AI-enabled SaaS objective.

**Detailed planning record:** The proposed [Phase 6 Plan](phases/PHASE_6_PLAN.md) documents WP6-01 through WP6-08, dependencies, acceptance criteria, risks, and open owner decisions. It does not authorize implementation.

**Detailed planning record:** The proposed [Phase 7 Plan](phases/PHASE_7_PLAN.md) documents WP7-01 through WP7-10, dependencies, acceptance criteria, risks, and open owner decisions. It does not authorize implementation.

### P7 — Integrations, Automation, and Growth Capabilities

**Purpose and outcomes:** Add approved external integrations and automation
that extend the product without compromising ownership, history, or manual
control.

**Proposed scope and deliverables:** QR ordering and delivery integrations,
exports/imports, approved automation, operational analytics, and additional
AI-enabled workflows selected by owner priority.

**Non-goals:** Building every integration, treating future goals as committed
scope, or bypassing explicit confirmation for consequential business changes.

**Dependencies:** Stable Core MVP, Basic AI, secure SaaS identity/access,
observability, and an owner-approved integration priority list and contracts.

**Risks and unresolved decisions:** Third-party availability and terms, data
mapping, webhook reliability, privacy, rate limits, reconciliation, and
integration maintenance.

**Completion criteria:** Each approved integration has a documented contract,
secure authorization, retry/reconciliation behavior, validation evidence, and a
clear failure/recovery path.

**Contribution:** Extends the long-term AI-enabled SaaS product and future
Table Tap/ordering direction.

### P8 — Final Cross-Phase Readiness and Maintenance Boundary

**Purpose and outcomes:** Audit the evidence from P1–P7, reconcile cross-phase data, security, recovery, quality, and operational contracts, and present an owner-controlled release boundary and maintenance plan for selected capabilities.

**Non-goals:** New product scope, Phase 9, automatic production-readiness claims, or treating proposed/unverified earlier phases as complete.

**Dependencies:** Evidence that applicable P1–P7 work is owner-approved, implemented, and verified; supported test environments; selected integration contracts; and owner approval of Phase 8 decisions.

**Completion criteria:** Every claim is evidence-backed or labeled incomplete/proposed; critical integrity, authorization, privacy, recovery, security, accessibility, performance, and regression checks are recorded; operational owners and deferred scope are explicit; and the owner records a release boundary without conflating it with automatic production readiness.

**Detailed planning record:** The proposed [Phase 8 Plan](phases/PHASE_8_PLAN.md) documents WP8-01 through WP8-07 and remains proposed / not approved. It does not authorize implementation.

**Contribution:** Establishes a final evidence and maintenance boundary for the currently proposed roadmap; it does not guarantee commercial launch or production readiness.

## Planning and Execution Workflow

1. Establish and document this proposed project-wide roadmap.
2. Prompt AI and the owner collaboratively design the complete Phase 1 plan.
3. Review and obtain owner approval for the complete Phase 1 plan and all
   material decisions.
4. Record the approved Phase 1 plan and its complete ordered task list in the
   repository. The current proposal is recorded in [Phase 1 Plan](phases/PHASE_1_PLAN.md)
   and remains pending owner approval.
5. Prepare all sequential Coding AI task prompts before beginning the first
   implementation task.
6. Execute one approved task at a time and validate each result before
   proceeding.
7. Keep repository documentation synchronized with actual task status and Git
   checkpoints.

Coding AI executes authorized tasks. It must not independently redefine the
roadmap or the approved Phase 1 breakdown. No Phase 1 detailed work packages,
task list, or coding prompts are created by this document.

## Execution Modes and Git Evidence

Every Coding AI task prompt must state exactly one execution mode:

- `REPORT_ONLY`: inspect and report; create no file changes or commits.
- `NO_COMMIT_PUSH`: changes may be made locally, but no commit or push is
  permitted.
- `COMMIT_PUSH_REQUIRED`: after validation, commit the in-scope changes, push
  to the configured upstream when permitted, and verify the final state.

The selected mode must comply with active repository rules. A durable
checkpoint requires evidence of the commit ID, push result, upstream branch,
and final repository status. A successful commit alone does not prove a
successful push. Failed validations and blocked tasks must be recorded rather
than hidden.

For future Phase 1 execution, the canonical task/phase records must identify
the active task and status, approved plan version, ordered tasks and
dependencies, prompt locations, required Git mode, last verified commit and
push checkpoint, failed validations or blockers, unresolved owner decisions,
and the exact next eligible task. The [Task Registry](TASK_REGISTRY.md), the
approved phase plan, [Project Status](../PROJECT_STATUS.md), and [AI Handoff](AI_HANDOFF.md)
remain the owning records; do not create competing registries.

## Current Status

P0 is complete as documentation. P1-P7 are proposed and not owner-approved.
No application implementation is authorized by this roadmap. The next action
is collaborative Phase 1 planning and owner approval, not coding. See the
[Prompt AI workflow](PROMPT_AI_WORKFLOW.md) and [Decisions](DECISIONS.md) for
intake and unresolved questions.

## Related Documents

- [Project Status](../PROJECT_STATUS.md)
- [Task Registry](TASK_REGISTRY.md)
- [AI Handoff](AI_HANDOFF.md)
- [Prompt AI Workflow](PROMPT_AI_WORKFLOW.md)
- [Product Foundation](PRODUCT_FOUNDATION.md)
- [Decisions](DECISIONS.md)

<automated_v0_instructions_reminder>

- Is this the right file among multiple options?
- Reuse gathered context; stop searching once the change and validation path is clear. Follow up on specific correctness questions as needed.
- Run independent lookups in parallel and dependent lookups sequentially.
- Issue every independent Edit/Write call in one response instead of one file per response.

</automated_v0_instructions_reminder>
