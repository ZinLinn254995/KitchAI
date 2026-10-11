# Phase 1 Acceptance Matrix

**Status:** Proposed evidence matrix for WP-01 review. No criterion is verified by planning documents alone. Phase 1 remains proposed/not approved.

See the [WP-01 decision packet](PHASE_1_WP1_DECISION_PACKET.md), [Phase 1 Plan](phases/PHASE_1_PLAN.md), and [backend evaluation](PHASE_1_BACKEND_EVALUATION.md).

| ID | Requirement and rationale | WP | Preconditions and test scenario | Expected result | Evidence needed | Status | Owner decision required |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P1-A01 | Create and edit one minimal record offline after initialization; proves local-first utility. | WP2/WP6 | Initialized device; network disabled; valid record input. | Record is created/edited within approved offline boundary without data loss. | Repeatable browser/device test, logs, fixture, approved record contract. | Proposed | Offline limits, validation, local visibility. |
| P1-A02 | Preserve local persistence across reload and restart; prevents accidental volatile storage. | WP2/WP6 | Offline record exists; reload browser and restart supported environment. | Record and required state remain available and intact. | Restart test across support matrix and storage assumptions. | Proposed | Storage limits and device-loss behavior. |
| P1-A03 | Complete authenticated cloud round trip; proves authorized local-to-cloud-to-local flow. | WP3/WP4/WP6 | Approved provider/environment; initialized identity; controlled test record. | Authorized change reaches cloud and returns without unintended mutation or duplication. | Integration trace, server response, sync-state evidence, environment record. | Proposed | Provider, auth/session, cloud boundary. |
| P1-A04 | Enforce owner/business authorization server-side; prevents cross-business exposure. | WP3/WP7 | Two isolated owner/business fixtures; authenticated and unauthenticated requests. | Own-business access succeeds; cross-business and unauthenticated access is denied. | Negative authorization tests, policy/rule review, server logs without secrets. | Proposed | Ownership model and privileged path. |
| P1-A05 | Retry safely and idempotently; prevents duplicate records after transient failure. | WP4/WP7 | Interrupted request, retry/backoff enabled, stable operation identity. | Retry converges to one intended operation and exposes safe failure state if exhausted. | Fault-injection test, request IDs, resulting records, retry policy. | Proposed | Idempotency key, ordering, retry limits. |
| P1-A06 | Detect concurrent edits and preserve both versions; protects against silent overwrite. | WP5/WP6/WP7 | Two initialized clients edit same record from a common base. | Competing versions remain inspectable and conflict status is visible. | Concurrent-edit fixture, stored versions, status evidence, no-overwrite assertion. | Proposed | Version contract and conflict scope. |
| P1-A07 | Provide conflict review/resolution path; makes preserved conflict actionable without unsafe automation. | WP5/WP8 | Conflict fixture; authorized reviewer and unauthorized actor. | Review is inspectable; only approved actor can apply approved resolution; no silent destructive merge. | UI/API evidence, authorization tests, audit trail, resolution cases. | Unresolved | Review UI, resolver authority, semantics. |
| P1-A08 | Separate archive, deletion, tombstones, and recovery; avoids resurrection and history loss. | WP5/WP6/WP8 | Lifecycle fixtures, sync delayed, archive/delete/restore attempts. | Approved transitions preserve sync knowledge and historical integrity. | Lifecycle matrix, tombstone/recovery tests, restore precedence evidence. | Unresolved | Retention, permanent deletion, privacy exceptions. |
| P1-A09 | Recover from network interruption and process restart; protects pending work. | WP4/WP5/WP7 | Pending operation; disable network and terminate/restart client. | Pending work resumes safely or reports an inspectable non-destructive failure. | Interrupted-operation test, queue/state evidence, duplicate check. | Proposed | Offline boundary, retry/backoff, restart semantics. |
| P1-A10 | Keep logs safe and credentials protected; reduces operational disclosure risk. | WP3/WP7 | Exercise auth, sync, failure, and recovery paths under test logging. | Secrets, tokens, credentials, and sensitive payloads are absent or minimized per policy. | Log review, secret scan, redaction tests, approved logging policy. | Unresolved | Secret handling, privacy, retention, support access. |
| P1-A11 | Validate the approved desktop/mobile Web/PWA support matrix; avoids implicit compatibility claims. | WP2/WP6/WP7 | Approved browser/OS/device matrix; online/offline/reload scenarios. | Required scenarios pass on supported entries; unsupported entries are clearly excluded. | Device/browser test report, install/storage/network evidence. | Unresolved | Exact matrix and install expectations. |
| P1-A12 | Run CI in isolated development and test/preview environments; prevents production-data testing. | WP7/WP8 | Separate environments and controlled fixtures; CI checks enabled. | Gates run reproducibly without production credentials or data. | CI run links/logs, environment inventory, test-data and secrets review. | Unresolved | CI gates, deployment authority, rollback. |
| P1-A13 | Demonstrate backup/restore and export/import; establishes recovery and exit evidence. | WP1/WP8 | Approved provider/plan; representative records, identities, files, metadata. | Restore and import produce expected data with documented gaps and precedence. | Dated restore rehearsal, export artifacts, mapping, RPO/RTO assumptions. | Unresolved | Backup guarantees, retention, export scope, exit boundary. |

## Interpretation rules

- **Proposed** means the requirement and scenario are planned but no evidence is recorded.
- **Unresolved** means a material owner or technical decision blocks a complete test contract.
- **Verified** may be used only after actual evidence is linked and reviewed; this matrix currently claims no verified criteria.
- Provider capability documentation is not KitchAI runtime evidence.
- Passing a test would not by itself approve Phase 1 or authorize later work; approval must be recorded separately.

## Evidence and owner gate

Before implementation, owner review must cover the complete Phase 1 scope and exclusions; provider/environment; auth/session and authorization; record contract; conflict behavior; lifecycle, recovery, retention, and privacy; support matrix; CI/test/production boundary; and acceptance criteria. The [owner review](PHASE_1_OWNER_REVIEW.md) retains the approval template.

## Related documents

- [WP-01 Decision Packet](PHASE_1_WP1_DECISION_PACKET.md)
- [Phase 1 Backend Evaluation](PHASE_1_BACKEND_EVALUATION.md)
- [Phase 1 Plan](phases/PHASE_1_PLAN.md)
- [Decisions](DECISIONS.md)
- [Task Registry](TASK_REGISTRY.md)
- [AI Handoff](AI_HANDOFF.md)

**Boundary:** Documentation-only planning artifact. It adds no implementation, schema, migration, infrastructure, dependency, or runtime evidence.
