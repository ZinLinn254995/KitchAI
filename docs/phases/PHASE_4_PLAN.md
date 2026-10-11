# KitchAI Phase 4 Plan — Proposed

**Status:** PROPOSED / NOT APPROVED. This planning document does not authorize implementation.

## A. Phase purpose and outcomes

Phase 4 adds the Basic AI Assistant after the Core MVP business records, sales, expenses, reports, history, authorization, and synchronization contracts are implemented and accepted. The outcome is an AI-assisted way to capture, explain, search, summarize, and recommend over approved business data while preserving manual control, source history, privacy, and financial integrity.

The phase must improve understanding and reduce recording effort without allowing an AI response to silently mutate financial records.

## B. Scope

- AI-assisted capture of proposed business records and structured field values for review.
- Explanations and summaries of authorized business data, with source and freshness context.
- Search and question answering over approved business records and reports.
- Recommendations and anomaly prompts that are clearly labeled as suggestions.
- Explicit review, validation, and confirmation before any persisted financial change.
- Model quality, privacy, cost, observability, failure, and recovery evidence.
- Offline-safe behavior for manual entry and clear online/degraded behavior for AI features.

## C. Non-goals and constraints

- Autonomous financial mutations, silent edits, unsupervised accounting, tax advice, or unsupported estimates.
- AI-generated facts presented as actual recorded values.
- Replacing manual entry or making the product unusable when AI/network access fails.
- New business domains, multi-user collaboration, billing, external integrations, or Phase 5 hardening.
- Treating Phase 1–3 plans as implemented; all dependencies require actual owner-approved acceptance evidence.
- No model/provider, prompt format, retention policy, or production deployment is approved by this proposal.

## D. Entry criteria and required approvals

Implementation is blocked until:

1. Phases 1–3 are owner-approved, implemented, verified, and their acceptance evidence is available.
2. Stable IDs, business/personal authorization, historical values, report provenance, sync/conflict/recovery, and correction contracts are documented and testable.
3. The owner approves this complete Phase 4 scope and material decisions D4-01 through D4-08, or explicitly excludes affected WPs.
4. The owner approves AI confirmation rules, permitted data sources, privacy/retention boundaries, quality threshold, cost budget, and supported online/offline behavior.
5. A test environment, supported device/browser matrix, safe observability policy, and repeatable verification commands exist.

## E. Dependency order

WP4-01 establishes the contract and approval gates. WP4-02 defines the authorized data/context boundary. WP4-03 and WP4-04 may proceed after WP4-01 and WP4-02. WP4-05 depends on capture and validation contracts. WP4-06 integrates search, explanation, and recommendation behavior. WP4-07 validates quality, security, cost, failure, and regression behavior. WP4-08 performs owner acceptance and handoff.

## F. Work packages

### WP4-01 — AI Phase Contract and Safety Boundary

**Purpose/value:** Define what the assistant may do and prevent AI scope from weakening Core MVP guarantees.

**Scope:** Approved scenarios; vocabulary for suggestion, source fact, derived value, unknown, and confirmation; permitted outputs; non-goals; human-review boundaries; traceability; error and uncertainty presentation; decision register.

**Exclusions:** Provider selection, prompt implementation, schema changes, autonomous writes, and UI implementation.

**Dependencies:** Accepted Phases 1–3 and Product Foundation.

**Deliverables:** Approved scenario matrix, safety contract, data-flow boundary, quality/cost objectives, and decision links.

**Validation/acceptance:** Every proposed scenario has an allowed output, prohibited behavior, review requirement, source boundary, failure behavior, and objective acceptance check. No proposal is labeled approved without owner evidence.

**Risks:** Ambiguous scope can turn assistance into unapproved automation.

### WP4-02 — Authorized Data, Privacy, and Context Boundary

**Purpose/value:** Ensure prompts and retrieval expose only data the requesting user may access.

**Scope:** Business/personal separation, server-side authorization, permitted records/reports, minimum necessary context, source citations/provenance, redaction, retention, prompt-injection/data-poisoning handling, and safe logs.

**Exclusions:** Multi-user roles, broad data export, provider account administration, and new authorization architecture.

**Dependencies:** WP4-01 and accepted P1–P3 authorization/history contracts.

**Deliverables:** Context allowlist, authorization test matrix, privacy/retention rules, provenance contract, and threat model.

**Validation/acceptance:** Unauthorized or cross-business context is rejected; every answer identifies its permitted source scope; secrets and disallowed personal data are absent from prompts and logs; hostile record content cannot expand authority.

**Risks:** Over-broad retrieval, prompt injection, retention mismatch, and leakage in diagnostics.

### WP4-03 — AI-Assisted Capture and Review

**Purpose/value:** Reduce manual recording effort while keeping the user responsible for persisted data.

**Scope:** Convert user input into a proposed structured record; field validation; confidence/uncertainty; missing-field prompts; source text retention where approved; editable review; explicit confirm/cancel; rejection and retry states; manual fallback.

**Exclusions:** Direct database writes from model output, inferred financial facts, unsupported amounts, automatic classification, and autonomous corrections.

**Dependencies:** WP4-01, WP4-02, accepted P2/P3 record contracts, and approved confirmation policy.

**Deliverables:** Capture contract, validation/error matrix, review/confirmation flow, and audit evidence for proposed versus persisted values.

**Validation/acceptance:** Model output remains a non-persisted proposal until validation and explicit user confirmation; invalid, incomplete, uncertain, or contradictory values are blocked or clearly surfaced; cancellation leaves source records unchanged; manual entry works when AI is unavailable.

**Risks:** Hallucinated fields, confirmation fatigue, duplicate submissions, and accidental financial mutation.

### WP4-04 — Explanations, Search, and Summaries

**Purpose/value:** Help owners understand approved business activity without presenting unsupported conclusions as facts.

**Scope:** Authorized natural-language questions, summaries, report explanations, historical/source traceability, date/freshness context, unknown/unallocated labeling, and safe no-answer behavior.

**Exclusions:** Tax/accounting advice, forecasting presented as fact, unsupported inventory claims, unrestricted semantic search, and write actions.

**Dependencies:** WP4-01/02 and accepted P2/P3 report/provenance contracts.

**Deliverables:** Scenario catalog, answer/source contract, freshness/error states, and evaluation fixtures.

**Validation/acceptance:** Answers are reproducible from authorized source data and approved calculations; unsupported or missing evidence is disclosed; date ranges and stale/offline data are visible; no answer changes source data.

**Risks:** Misleading summaries, stale context, source omission, and ambiguous questions.

### WP4-05 — Recommendations and Confirmed Change Proposal

**Purpose/value:** Surface useful next actions while preserving manual and financial control.

**Scope:** Owner-approved recommendation types; evidence and rationale; proposed changes represented as reviewable diffs; validation; confirmation; idempotency; cancellation; correction/history integration.

**Exclusions:** Autonomous writes, automatic pricing/accounting/allocation decisions, bulk mutation without review, and recommendations based on unauthorized data.

**Dependencies:** WP4-02, WP4-03, accepted correction/history contracts, and explicit D4-04 approval.

**Deliverables:** Recommendation contract, diff/confirmation behavior, audit trail, and duplicate/retry handling.

**Validation/acceptance:** A recommendation cannot persist a financial change without explicit confirmation; the user can inspect affected records and provenance; rejected or expired proposals do not mutate data; confirmed changes pass the same domain validation and history rules as manual changes.

**Risks:** Recommendation overreach, duplicate confirmation, stale proposals, and misleading certainty.

### WP4-06 — Assistant Experience and Degraded Operation

**Purpose/value:** Make AI useful without making core workflows depend on network or model availability.

**Scope:** Assistant page/entry points, loading/error/uncertainty states, accessible review controls, offline/manual fallback, retry/cancel, stale-result handling, rate/cost feedback where approved, and responsive behavior.

**Exclusions:** PWA installation/hardening, full account settings, multi-user UX, and unrelated redesign.

**Dependencies:** WP4-03 through WP4-05 and accepted P1 local-first behavior.

**Deliverables:** User-facing interaction contract, accessibility states, degraded-mode matrix, and support-facing failure messages.

**Validation/acceptance:** Core manual records remain usable with no network or AI service; users can distinguish source facts, suggestions, and confirmed changes; interrupted requests do not create partial writes; keyboard and assistive-technology review paths work.

**Risks:** Network dependence, unclear state transitions, accessibility gaps, and excessive retries/cost.

### WP4-07 — Quality, Security, Cost, and Regression Evidence

**Purpose/value:** Prove the assistant is accurate enough, bounded enough, and safe enough to release.

**Scope:** Golden scenario evaluation, structured-output validation, authorization/privacy tests, prompt-injection tests, hallucination/uncertainty tests, confirmation bypass tests, retry/idempotency, offline/degraded behavior, latency/cost measurement, accessibility, and P1–P3 regression.

**Exclusions:** Claiming model quality from anecdotal examples, production guarantees not measured, credential logging, and acceptance without owner thresholds.

**Dependencies:** WP4-02 through WP4-06; tests run incrementally and integrated before acceptance.

**Deliverables:** Repeatable test/evaluation suite, quality and cost report, threat findings, privacy-safe observability, and known-limitations list.

**Validation/acceptance:** Critical security and data-integrity tests pass; quality metrics meet owner-approved thresholds or are explicitly rejected; cost and failure behavior are measured; no critical confirmation bypass, cross-business access, or silent mutation remains; results are reproducible from documented fixtures.

**Risks:** Model/version drift, unstable evaluations, hidden provider costs, and insufficient adversarial coverage.

### WP4-08 — Phase Acceptance and Handoff

**Purpose/value:** Create an auditable release boundary for future hardening and SaaS work.

**Scope:** Acceptance checklist, evidence index, limitations, rollout/rollback and model-change notes, updated roadmap/status/registry/decisions/handoff, and owner approval record.

**Exclusions:** Phase 5 planning, new model scope, unapproved provider commitments, and declaring completion from documentation alone.

**Dependencies:** WP4-06, WP4-07, and all required owner decisions.

**Validation/acceptance:** Approved scenarios pass their checks; no critical privacy, security, data-loss, or confirmation defect remains; source/history contracts remain intact; limitations and future exclusions are documented; owner acceptance records the verified SHA and remote state.

## G. Cross-cutting requirements

All WPs must preserve business/personal authorization, stable IDs, historical source values, provenance, correction semantics, offline manual operation, idempotent retries, conflict/recovery behavior, safe logs, accessible controls, and migration compatibility. AI output is untrusted input: validate and sanitize it server-side. AI must not invent actual costs, sales, expenses, inventory, or accounting conclusions. Model failures must fail closed for writes and fail clearly for reads.

## H. Testing and verification

Required evidence includes unit tests for parsing, validation, uncertainty, provenance, and confirmation; integration tests for authorization and context construction; end-to-end capture/review/confirm and search flows; adversarial prompt-injection and cross-boundary tests; retry/duplicate/interrupted-request tests; offline/manual fallback tests; historical/report regression tests; accessibility/responsive checks; model quality fixtures; cost/latency measurements; and documented model/version/evaluation reproducibility. This planning document claims none of these tests have run.

## I. Phase acceptance criteria

Phase 4 is accepted only when the owner-approved scenarios and decisions are implemented and reviewed; authorized context is enforced; AI suggestions and source facts are distinguishable; no financial mutation occurs without validation and explicit confirmation; manual/offline workflows remain available; quality, privacy, security, cost, failure, accessibility, and regression evidence meet approved thresholds; and handoff documentation records limitations and verified release state.

## J. Material owner decisions

All entries remain **OPEN** unless an authoritative owner record approves them.

| ID | Question and why it matters | Options/trade-offs | Provisional recommendation | Affected WPs/phases | Status |
| --- | --- | --- | --- | --- | --- |
| D4-01 | Which Basic AI scenarios are launch-critical? | Narrow capture/search is safer; broad assistant scope adds value and evaluation cost. | Start with a small owner-approved scenario set. | WP4-01, WP4-03–06; P4/P5 | OPEN |
| D4-02 | Which business records and reports may enter AI context? | Broad context improves answers; minimum necessary context reduces privacy risk. | Use an explicit allowlist with source/provenance. | WP4-02, WP4-04; P1–P4 | OPEN |
| D4-03 | What privacy, retention, and provider-processing rules apply? | Retain context for quality/debugging; minimize retention for privacy. | Default to minimum retention and privacy-safe logs. | WP4-02, WP4-07; P4/P5/P6 | OPEN |
| D4-04 | Which outputs require validation and confirmation before saving? | Read-only answers are lower risk; proposed changes need review and add friction. | Require confirmation for every persisted financial or business-record change. | WP4-01, WP4-03, WP4-05; P4 | OPEN |
| D4-05 | What quality, uncertainty, and abstention thresholds are acceptable? | Strict abstention protects trust; permissive answers improve coverage but risk error. | Define scenario-specific thresholds and safe abstention. | WP4-01, WP4-04, WP4-07 | OPEN |
| D4-06 | What model/provider and change-control policy is approved? | One stable model eases evaluation; provider flexibility reduces lock-in but increases drift. | Pin evaluated model/version and re-evaluate changes. | WP4-01, WP4-07; P4/P5 | OPEN |
| D4-07 | What cost, rate, latency, and abuse limits apply? | Higher budgets improve quality; limits protect operating cost and availability. | Set per-user/request budgets, rate limits, and clear failure states. | WP4-06, WP4-07; P4/P5 | OPEN |
| D4-08 | What offline/degraded assistant behavior is required? | Online-only AI simplifies design; manual fallback preserves core operation. | Keep manual entry fully available and make AI failure non-destructive. | WP4-03, WP4-06; P1/P4/P5 | OPEN |

## K. Risks and external dependencies

Risks include hallucination, prompt injection, private-data leakage, stale or incomplete data, model drift, provider outage, unpredictable cost, latency, accessibility failures, confirmation fatigue, and accidental duplicate writes. External dependencies include the approved AI gateway/provider and model availability, accepted P1–P3 contracts, test fixtures, deployment/CI environments, and owner decisions. No provider credential or model is selected by this proposal.

## L. Handoff boundary to Phase 5

Phase 5 may harden the approved assistant and core workflows using documented AI scenario, provenance, confirmation, evaluation, observability, and degraded-mode contracts. Phase 5 must not assume autonomous financial writes, accounting/tax capability, multi-user access, broad integrations, or that quality thresholds remain valid after model/provider changes. No detailed Phase 5 plan is created here.

## Related documents

- [Roadmap](../ROADMAP.md)
- [Product Foundation](../PRODUCT_FOUNDATION.md)
- [Phase 1 Plan](PHASE_1_PLAN.md)
- [Phase 2 Plan](PHASE_2_PLAN.md)
- [Phase 3 Plan](PHASE_3_PLAN.md)
- [Task Registry](../TASK_REGISTRY.md)
- [Decisions](../DECISIONS.md)
- [Project Status](../../PROJECT_STATUS.md)
- [AI Handoff](../AI_HANDOFF.md)

## Planning boundary

This is a proposed planning baseline only. No coding prompts are created, no owner decision is approved by this document, and no application implementation is authorized.
