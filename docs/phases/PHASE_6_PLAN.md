# KitchAI Phase 6 Plan — Proposed

**Status:** PROPOSED / NOT APPROVED. This planning document does not authorize implementation.

## A. Purpose and expected outcomes

Phase 6 extends the secure single-user foundation toward a managed SaaS product and delivers the deferred user-facing account experience. It defines account/profile/session controls, business membership only if the owner approves collaboration, tenant isolation, invitations, ownership transfer, lifecycle/support operations, and the policies needed to operate these capabilities safely.

Expected outcomes are an owner-approved contract for account management and business access; explicit boundaries between personal and business data; least-privilege membership behavior where approved; recoverable account and membership lifecycle workflows; and operational evidence that access changes do not expose, duplicate, rewrite, or delete business history.

Earlier phases are planning proposals, not implementation evidence. No dependency below may be treated as complete until its acceptance evidence exists.

## B. Scope, non-goals, assumptions, and constraints

**In scope:** account/profile management; session and device controls; authentication recovery boundaries; business selection and ownership boundaries; membership, invitations, roles, and ownership transfer only if approved; tenant isolation; account/business lifecycle; support and abuse controls; privacy and retention policies; audit and security evidence; and regression testing against offline, sync, history, AI, recovery, and PWA behavior.

**Non-goals:** assuming collaboration is required; inventing roles or permissions; changing single-user ownership semantics implicitly; billing or paid plans; broad integrations; new business domains; autonomous financial writes; detailed Phase 7 planning; or implementation before owner approval.

**Constraints:** preserve stable IDs, historical transaction meaning, personal/business separation, local-first operation, synchronization idempotency, conflict preservation, recovery provenance, AI confirmation gates, and least privilege. Account UI must not be the only authorization boundary. Membership changes must not silently rewrite historical records or retroactively change their ownership meaning.

**Provisional assumptions:** the initial operating model remains one user and one business at a time; collaboration may be optional; the existing identity foundation is the authority for authentication behavior; and account-management UX must work with approved offline/degraded behavior without claiming that cloud-only changes succeeded before confirmation.

## C. Dependencies and entry criteria

Phase 6 depends on accepted P1 identity/access and synchronization foundations, accepted P2–P4 data and AI contracts, and accepted P5 install/update, recovery, security, observability, and release evidence. Entry requires:

1. Owner approval of the complete Phase 6 scope and material decisions D6-01 through D6-10, or explicit exclusions for affected WPs.
2. Evidence for the identity/session, business ownership, authorization, history, sync/conflict, recovery, and PWA contracts on which this plan relies.
3. An owner-approved answer on whether shared business access is needed at all.
4. An approved privacy, retention, deletion, account-recovery, support-access, and abuse-response policy.
5. A test environment and release/rollback path capable of exercising multiple identities and isolated businesses without using production data.
6. A documented authorization model and data-classification boundary for profile, personal finance, business data, diagnostics, invitations, and audit records.

## D. Dependency-ordered work packages

Dependency order: WP6-01; WP6-02 and WP6-03 may follow the identity contract; WP6-04 depends on WP6-02; WP6-05 depends on WP6-03 and, if approved, WP6-04; WP6-06 depends on WP6-02–WP6-05; WP6-07 validates the integrated release; WP6-08 records acceptance and handoff.

### WP6-01 — SaaS Account and Authorization Contract

**Purpose/business value:** establish the exact account, business, membership, privacy, and lifecycle boundaries before implementation. **Scope:** supported account journeys, authority matrix, data classification, threat model, approval gates, support boundaries, and traceability to prior decisions. **Prerequisites:** accepted P1–P5 contracts. **Deliverables:** approved-scope candidate, authority matrix, lifecycle/state diagrams, decision log, and test traceability. **Exclusions:** choosing unapproved providers or implementing collaboration. **Tests:** every protected operation maps to an actor, resource, decision, and negative case. **Risks:** ambiguous ownership causes data leakage or irreversible lifecycle behavior. **Acceptance:** owner-approved contract or explicitly documented exclusions; no material permission is inferred from UI.

### WP6-02 — Account, Profile, Session, and Recovery Management

**Purpose/business value:** let users understand and control their account and active sessions safely. **Scope:** profile identity fields, sign-in/out, session/device listing and revocation, credential/recovery boundaries, account status, reauthentication for sensitive actions, and offline/degraded messaging. **Prerequisites:** WP6-01 and accepted identity foundation. **Deliverables:** account-management contract, session lifecycle behavior, recovery runbook, privacy copy, and evidence. **Exclusions:** adding OAuth, social login, or account methods not explicitly approved; exposing credentials; billing. **Tests:** authorization, session revocation, expiry, reauthentication, recovery failure, multi-tab/offline behavior, and sensitive-data redaction. **Risks:** recovery or revocation can strand users or leave stale access. **Acceptance:** only the account owner can perform approved controls; revoked sessions cannot access protected resources; incomplete cloud operations are clearly reported and recoverable.

### WP6-03 — Business Context and Tenant Isolation

**Purpose/business value:** make business selection and ownership boundaries explicit and prevent cross-business or personal-data access. **Scope:** business context selection, creation/rename/archive boundaries if approved, per-query/resource authorization, personal-finance isolation, stable identifiers, and migration compatibility. **Prerequisites:** WP6-01 and accepted P1 ownership/access contract. **Deliverables:** isolation contract, resource matrix, negative-test fixtures, and lifecycle behavior. **Exclusions:** shared membership, invitations, or ownership transfer unless separately approved. **Tests:** cross-business reads/writes, guessed IDs, stale context, deleted/archived context, sync replay, and offline context changes. **Risks:** client-only scoping or stale context can expose or mutate another business. **Acceptance:** every business-scoped operation enforces server/data-layer ownership; personal records remain isolated; no test identity can access another tenant's data.

### WP6-04 — Membership, Roles, Invitations, and Ownership Transfer

**Purpose/business value:** add collaboration only if the owner confirms it is needed and defines least-privilege rules. **Scope:** membership lifecycle, role permissions, invitation expiry/revocation, acceptance, removal, ownership transfer, pending/offline states, and audit history. **Prerequisites:** WP6-01, WP6-03, and explicit approval of collaboration. **Deliverables:** role matrix, invitation/transfer contract, notification/privacy rules, and evidence. **Exclusions:** inventing default roles, shared credentials, implicit access, or changing historical authorship/ownership. **Tests:** invite abuse, replay/expiry, wrong recipient, privilege escalation, removal during offline work, transfer failure/rollback, and concurrent membership changes. **Risks:** a role mistake can expose all business data; transfer can strand or orphan a business. **Acceptance:** only approved roles and actors can grant/revoke access; every change is auditable; failure preserves prior access state and history; no collaboration is implemented if approval is absent.

### WP6-05 — Account and Business Lifecycle, Privacy, and Support Operations

**Purpose/business value:** provide safe deactivation, deletion, retention, export/recovery, support access, and abuse handling. **Scope:** account/business states, deletion and retention boundaries, export/restore interaction, support impersonation prohibition or approval, rate/abuse controls, and user-visible consequences. **Prerequisites:** WP6-01–WP6-04 as applicable and approved privacy/recovery policy. **Deliverables:** lifecycle runbook, support policy, retention matrix, audit requirements, and operational checks. **Exclusions:** silent hard deletion, unapproved retention promises, or support access without explicit authorization. **Tests:** cancel/retry, pending deletion, recovery within policy, expired recovery, linked historical records, support boundary, and abuse response. **Risks:** deletion can destroy history or conflict with recovery obligations. **Acceptance:** lifecycle outcomes are deterministic, authorized, reversible where promised, and preserve required historical records; retention and deletion evidence matches approved policy.

### WP6-06 — Security, Audit, and Operational Integration

**Purpose/business value:** demonstrate that account and tenant features remain secure in production operations. **Scope:** authorization enforcement, audit events, privacy-safe telemetry, anomaly/abuse signals, rate limits where approved, secret/session handling, alert ownership, and release/rollback integration. **Prerequisites:** WP6-02–WP6-05 and accepted P5 security/observability baseline. **Deliverables:** security test suite, audit schema/retention contract, operational dashboards or reports, incident runbook, and remediation record. **Exclusions:** logging credentials or financial payloads; replacing history with telemetry; unsupported compliance claims. **Tests:** tenant escape attempts, CSRF/session misuse as applicable, replay, rate/abuse cases, audit tampering, log redaction, and rollback. **Risks:** operational access or logs become a secondary data-leak path. **Acceptance:** critical security and isolation checks pass; audit events are attributable and privacy-safe; alerts and incident ownership are documented.

### WP6-07 — Cross-Phase Regression and Release Evidence

**Purpose/business value:** prove account features do not regress offline-first business operation or AI safeguards. **Prerequisites:** WP6-02–WP6-06. **Deliverables:** identity/device/browser/network matrix, regression results, migration/update evidence, known-limitations list, release candidate, and rollback rehearsal. **Exclusions:** new product domains or Phase 7 integrations. **Tests:** offline entry, sync retry/conflict, historical reads, recovery/restore, PWA update, AI confirmation, multi-business isolation, session changes, and membership changes where approved. **Acceptance:** approved workflows pass without unauthorized access, duplicate writes, history corruption, or false success states; failures are triaged and visible.

### WP6-08 — Phase Acceptance and Handoff

**Purpose/business value:** record owner acceptance and preserve a precise boundary for future integrations and automation. **Prerequisites:** WP6-01–WP6-07. **Deliverables:** acceptance checklist, evidence index, updated status/registry/roadmap/decisions/handoff, support notes, limitations, and verified Git state. **Exclusions:** detailed Phase 7 breakdown or unapproved scope. **Tests:** documentation/link/status/whitespace checks and evidence reconciliation. **Acceptance:** owner approval identifies accepted account scope, decisions, evidence, limitations, and unresolved future work; Phase 6 remains proposed until that approval is recorded.

## E. Cross-cutting requirements

All WPs must enforce authorization at the applicable data/service boundary; isolate personal, business, membership, audit, and diagnostic data; preserve transaction-time history and stable IDs; make sync and lifecycle operations idempotent; surface conflicts; prevent stale clients from bypassing access changes; and fail closed on uncertain authorization. Account and membership changes must be auditable without logging secrets or unnecessary business payloads. Offline UX must distinguish locally completed work from cloud-confirmed account changes.

## F. Failure and edge cases

Cover expired sessions, revoked sessions in another tab/device, offline sign-out or membership changes, stale business context, two users changing membership concurrently, duplicate/replayed invitations, wrong-recipient acceptance, transfer interruption, owner deletion, inaccessible recovery contact, account lockout, compromised session, guessed tenant IDs, archived business access, device loss, restore after revocation, clock/time-zone differences, provider outage, support misuse, quota/rate exhaustion, and logs containing sensitive data.

## G. Testing and verification requirements

Planned evidence includes unit and integration tests for policy decisions and lifecycle state machines; negative authorization tests for every protected resource; multi-identity tenant-isolation tests; session/recovery and invitation/transfer tests where approved; offline/reconnect/retry/conflict tests; history and restore regression; PWA/browser/device checks; privacy-safe logging checks; accessibility and responsive account UX checks; abuse/rate-limit checks; security review; and repeatable CI/release/rollback evidence. This plan claims none of these tests have run.

## H. Owner decision register

All entries remain **OPEN** unless an authoritative owner record explicitly approves them.

| ID | Decision question and why it matters | Options/trade-offs | Provisional recommendation | Affected WPs/phases | Status |
| --- | --- | --- | --- | --- | --- |
| D6-01 | Is shared business access required for the product? | Keep single-user simplicity; add collaboration cost and exposure. | Defer collaboration unless a concrete owner use case requires it. | WP6-01, WP6-04; P6/P7 | OPEN |
| D6-02 | Which account/profile fields and self-service controls are required? | Minimal fields reduce privacy/support burden; richer controls improve self-service. | Start with identity, session visibility/revocation, and only necessary profile fields. | WP6-01–02 | OPEN |
| D6-03 | What authentication, reauthentication, and recovery policy is required? | Strong recovery improves security but may increase lockout/support work. | Require explicit recovery guarantees and reauthentication for sensitive changes. | WP6-01–02, WP6-06 | OPEN |
| D6-04 | If collaboration is approved, which roles and permissions exist? | One role is simple; granular roles reduce exposure but increase complexity. | Use the smallest explicit role matrix; deny by default. | WP6-01, WP6-03–04 | OPEN |
| D6-05 | How are invitations, expiry, revocation, and notification privacy handled? | Long-lived invites are convenient but risky; short-lived invites add friction. | Prefer expiring, revocable, single-purpose invitations with minimal disclosure. | WP6-04, WP6-06 | OPEN |
| D6-06 | Who may transfer ownership and what happens on failure or owner loss? | Restricting transfer protects control; flexible transfer aids continuity. | Require explicit confirmation, auditability, and recoverable failure before transfer. | WP6-03–05 | OPEN |
| D6-07 | What account/business deletion, retention, export, and recovery guarantees apply? | Longer retention protects recovery/history; deletion supports privacy but risks loss. | Approve per-record lifecycle and recovery policy before destructive actions. | WP6-01, WP6-05; P5/P6 | OPEN |
| D6-08 | What support, abuse, and emergency-access boundaries are allowed? | More support access aids recovery but increases insider/privacy risk. | Default to no hidden impersonation; use attributable, least-privilege support actions. | WP6-01, WP6-05–06 | OPEN |
| D6-09 | What privacy and audit retention applies to account/membership events? | More audit history aids investigation; longer retention increases exposure. | Store minimum necessary attributable events with approved retention and access. | WP6-05–06 | OPEN |
| D6-10 | What release and operational ownership is required for SaaS account changes? | Informal ownership is faster; named ownership reduces response gaps. | Require named owners, alerts, rollback, and incident procedures before release. | WP6-06–08; P6/P7 | OPEN |

## I. Phase-level acceptance criteria

Phase 6 remains **PROPOSED / NOT APPROVED** until the owner approves the complete scope and applicable decisions. Completion requires: account and session controls meet the approved contract; every business and personal resource is isolated by enforced authorization; collaboration is either explicitly implemented to the approved role/invitation/transfer contract or explicitly excluded; lifecycle, retention, recovery, and support behavior match approved policy; audit and telemetry are attributable and privacy-safe; offline/sync/history/recovery/PWA/AI regression evidence passes; security, accessibility, and operational checks pass; rollback is rehearsed; limitations and remaining risks are documented; and owner acceptance identifies the evidence.

## J. Risks and external dependencies

Risks include authorization drift, tenant escape, account lockout, compromised sessions, invitation abuse, ownership orphaning, privacy leakage, deletion/history conflict, stale offline clients, recovery mismatch, support burden, and operational complexity. External dependencies include accepted earlier-phase behavior, an identity/auth provider, secure cloud/data boundaries, deployment and CI, notification delivery if approved, and owner decisions. No provider, billing model, compliance claim, role model, or collaboration requirement is approved by this plan.

## K. Handoff boundary to Phase 7

Phase 7 may build on an accepted account and authorization contract, documented tenant isolation, lifecycle/recovery policy, audit/operational baseline, and release evidence. The existing roadmap describes Phase 7 as integrations, automation, and growth capabilities; this plan does not define its work packages, priorities, providers, or contracts. Any QR ordering, delivery, import/export, automation, analytics, or additional AI workflow requires separate owner-approved scope and integration decisions.

## Related documents

- [Roadmap](../ROADMAP.md)
- [Product Foundation](../PRODUCT_FOUNDATION.md)
- [Phase 1 Plan](PHASE_1_PLAN.md)
- [Phase 2 Plan](PHASE_2_PLAN.md)
- [Phase 3 Plan](PHASE_3_PLAN.md)
- [Phase 4 Plan](PHASE_4_PLAN.md)
- [Phase 5 Plan](PHASE_5_PLAN.md)
- [Task Registry](../TASK_REGISTRY.md)
- [Decisions](../DECISIONS.md)
- [Project Status](../../PROJECT_STATUS.md)
- [AI Handoff](../AI_HANDOFF.md)

## Planning boundary

This is a proposed planning baseline only. No coding prompts are created, no owner decision is approved by this document, and no application implementation is authorized.

## Related owner decision record

The Phase 6 decision register is summarized in [Decisions](../DECISIONS.md). D6-01 through D6-10 remain OPEN unless explicit owner approval is recorded.

## Source note

The Phase 6 purpose is derived from the P6 section of the roadmap: multi-user SaaS readiness and account management. Because the roadmap explicitly leaves collaboration and roles conditional, this plan preserves that uncertainty and treats shared access as an optional, approval-gated branch rather than an assumed requirement.

## Final status

**PROPOSED / NOT APPROVED.**

No application implementation, schema, migration, runtime configuration, dependency change, or production behavior is included in this document.
