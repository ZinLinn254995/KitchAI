# Phase 1 Backend Evaluation

**Status:** Documentation-only evaluation draft for WP-01. It is not a provider
selection, approval of the Phase 1 scope, authorization to implement, or evidence
that any backend behavior has been verified.

**Evaluation date:** 2026-10-11

## Purpose and decision boundary

D1-01 requires comparing Supabase with suitable managed-backend alternatives
before choosing a provider. This document evaluates Supabase, Firebase/Firestore,
and Appwrite against the same Phase 1 criteria. It does not select a provider.
Supabase remains a candidate only. The owner must approve the provider and the
remaining Phase 1 contracts before implementation prompts or coding tasks are
created.

The comparison is a planning aid based on documented product capabilities and
open questions. Capability descriptions are not proof that a particular design
will satisfy KitchAI. Any item marked **To verify** requires a current proof of
concept, provider documentation review, or an approved design decision.

This evaluation is traceable to all owner-selected Phase 1 directions: D1-01
(provider comparison), D1-02 (authentication), D1-03 (minimal record), D1-04
(conflict preservation), D1-05 (first setup/offline access), D1-06 (lifecycle and
recovery), D1-07 (browser/device support), and D1-08 (test/CI/production
boundary). The provider comparison itself is the D1-01/WP-01 deliverable; the
other directions supply the criteria and contracts that must remain open.

## Shared evaluation criteria

| Criterion | Phase 1 question | Evidence required before selection |
| --- | --- | --- |
| Offline-first | Can the app keep the proposed record usable locally and reconcile later without treating cloud availability as the local source of truth? | Local persistence design, sync protocol, restart/offline tests, storage and device limits |
| Authentication | Can the candidate support the minimum online sign-in/session foundation without forcing full account-management UI into Phase 1? | Supported sign-in methods, session lifecycle, expiry/revocation, recovery, trusted-device behavior |
| Owner/business access control | Can every cloud operation enforce owner and business boundaries server-side? | Authorization model, denied-access tests, tenant/business isolation, audit evidence |
| Conflict preservation | Can application-level sync detect concurrent edits and preserve both versions for inspection rather than silently overwriting or auto-resolving? | Sync design, version/change metadata, conflict fixtures, review/status contract |
| Backup/recovery | What managed backup, restore, export, outage, and data-loss guarantees exist, and what remains the application's responsibility? | Provider plan/docs, restore test, RPO/RTO assumptions, export and recovery procedure |
| Cost | What is charged for development, preview/test, production reads/writes, auth, storage, bandwidth, backups, and growth? | Current pricing, usage model, quotas, expected workload estimate, budget limits |
| Migration/exit | Can data and identity-related state be exported and moved without hidden coupling or unacceptable loss? | Export format, API/SDK portability, schema mapping, auth migration plan, deletion/exit procedure |
| Delivery and environments | Can isolated development, test/preview, and (if later approved) production environments be operated safely? | Environment model, secrets handling, CI integration, deployment authority, rollback plan |

## Candidate comparison

### Supabase

**What is documented or commonly available:** Supabase provides managed
Postgres, authentication, storage, and server-side access controls through
Postgres Row Level Security. It exposes standard SQL/Postgres concepts and APIs,
which may support portability better than a proprietary document model.

**Phase 1 fit considerations:**

- Offline-first is not supplied as a complete application sync policy. Local
  persistence, change tracking, retry/idempotency, conflict detection, competing
  version storage, and review status would need an explicit application design
  or separately verified sync layer.
- Auth can cover a minimum authenticated foundation, but sign-in method,
  session/token policy, expiry, revocation, recovery, and device behavior remain
  open for KitchAI.
- RLS may support server-enforced owner/business boundaries, but policies,
  service-role boundaries, tests, and query design must be written and verified.
- Conflict preservation is not established by Postgres or RLS alone. The
  application must define versioning, concurrent-write detection, preservation,
  and review semantics.
- Backup and recovery depend on the selected plan, configuration, and operating
  procedure. **To verify:** exact backup retention, point-in-time recovery,
  restore isolation, export completeness, and recovery evidence for the chosen
  plan.
- Cost depends on plan, database size, compute, egress, storage, auth usage,
  and backups. **To verify:** current pricing and a KitchAI workload estimate.
- Standard Postgres may simplify data export and migration, but auth metadata,
  storage objects, policies, extensions, provider APIs, and sync metadata can
  still create coupling. **To verify:** a complete export/import rehearsal.

**Assessment:** Strong candidate for relational ownership, RLS, and portability,
but it does not remove the need to design and test local-first synchronization,
conflict preservation, lifecycle, and recovery.

### Firebase / Firestore

**What is documented or commonly available:** Firebase provides managed
authentication and Firestore, a document database with client SDKs, security
rules, offline client caching/synchronization features, and event/server
integrations. Exact behavior varies by SDK, platform, configuration, and plan.

**Phase 1 fit considerations:**

- Firestore client SDK offline support may reduce basic client-sync plumbing,
  but it is not evidence that KitchAI's required conflict behavior is satisfied.
  **To verify:** whether concurrent edits preserve both competing versions and
  expose an inspectable review path rather than applying the SDK's default
  resolution behavior.
- Firebase Auth can provide sign-in/session primitives, but the selected sign-in
  method, token lifecycle, revocation, recovery, and trusted-device policy remain
  open.
- Firestore Security Rules can enforce document access conditions, but the
  owner/business data model and every access path require rules tests. Server
  environments and privileged SDKs must not bypass the intended boundary.
- Backup/export/restore availability, retention, scheduling, and restore
  granularity depend on configuration and plan. **To verify:** current provider
  terms, export completeness, restore test, and recovery guarantees.
- Costs can depend on document reads, writes, deletes, storage, network egress,
  auth, indexes, and backup/export usage. Query patterns and offline retries may
  materially affect cost. **To verify:** current pricing, quotas, and a workload
  model including retry and conflict cases.
- Firestore's document model and Firebase-specific auth/rules/indexes can create
  migration work. Export tooling may help, but it does not by itself prove a
  complete application and identity migration. **To verify:** data, indexes,
  security rules, auth accounts, files, and sync metadata exit plan.

**Assessment:** Strong candidate for managed client SDKs and offline primitives,
but default synchronization/conflict semantics must not be assumed to meet
KitchAI's requirement to preserve both versions. Rules, cost, backup, and exit
need focused evidence.

### Appwrite

**What is documented or commonly available:** Appwrite provides managed or
self-hostable backend services including authentication, databases, storage,
functions, and related APIs. Its deployment choices may offer more operational
control than a provider-only service, while also transferring more operations
responsibility when self-hosted.

**Phase 1 fit considerations:**

- Offline-first behavior and synchronization are not treated here as a complete
  Appwrite guarantee. **To verify:** available client/offline capabilities and
  whether an application-owned sync layer can preserve competing versions,
  retries, tombstones, and inspectable conflict states.
- Auth services may support the minimum foundation, but sign-in method, session
  policy, expiry/revocation, recovery, credential handling, and trusted devices
  remain open.
- Database permissions, API authentication, and server functions may support
  owner/business authorization, but the exact authorization model and privileged
  boundaries require a testable design.
- Conflict preservation, archive/delete semantics, tombstones, and lifecycle
  recovery remain application responsibilities unless a specific feature is
  verified for the required behavior.
- Managed backup/recovery, limits, and support vary by deployment model.
  Self-hosting can increase control but requires secure operations, backups,
  upgrades, monitoring, and recovery ownership. **To verify:** selected hosting
  model, backup/restore evidence, outage procedure, and operational cost.
- Cost includes service plan or hosting plus database, storage, bandwidth,
  functions, operations, and support. **To verify:** current pricing and the
  workload model for both managed and self-hosted options.
- APIs and export features may support migration, but service-specific auth,
  permissions, files, indexes, functions, and deployment configuration can still
  create exit work. **To verify:** full export/import rehearsal and identity
  migration boundary.

**Assessment:** Viable candidate where API breadth or self-hosting matters, but
its operational and offline/sync evidence must be established before treating it
as comparable to a managed relational or document-first choice.

## Cross-candidate findings

1. None of the three candidates, based on this draft alone, proves the complete
   KitchAI contract for offline use, ownership authorization, conflict
   preservation, lifecycle, and recovery.
2. Offline client support is not equivalent to KitchAI conflict preservation.
   The selected design must preserve both competing versions and expose an
   inspectable status/review path; silent provider defaults are insufficient.
3. Authentication and authorization are separate decisions. A provider's auth
   feature does not prove owner/business isolation without server-enforced rules,
   negative tests, and a clear privileged-server boundary.
4. Backup claims must distinguish provider-managed backup, application export,
   restore testing, and a user-facing recovery guarantee. No retention period or
   recovery promise is approved by this document.
5. Cost comparisons must use the same workload assumptions, including offline
   retries, conflict writes, reads, storage, bandwidth, auth, backups, and test
   environments.
6. Exit planning must include records, files, auth identities, authorization
   rules, indexes, functions, sync metadata, and operational configuration—not
   only a database dump.

## Required WP-01 evidence before a provider decision

- A dated comparison using current provider documentation and selected plan
  assumptions.
- A minimal threat and authorization model for owner/business access, including
  denied cross-business cases.
- A local-first and sync design showing stable IDs, retries/idempotency,
  concurrent-edit detection, preservation of both versions, and conflict review
  status.
- A lifecycle/recovery matrix covering archive, deletion, tombstones where
  needed, restore precedence, retention, privacy exceptions, and device loss.
- Isolated development and test/preview environment design, CI gates, secrets
  handling, test data, deployment authority, and rollback boundary.
- A representative cost model and an export/import or migration rehearsal plan.

## Owner decision record placeholder

The owner has not selected Supabase, Firebase/Firestore, Appwrite, or another
provider in this document. Before implementation, record the selected provider,
rejected alternatives, evidence reviewed, approved environment model, security
and authorization contract, recovery/retention guarantees, cost assumptions,
and migration/exit boundary in the canonical decision record.

## Relation to Phase 1 boundaries

This evaluation supports D1-01 and WP-01 only. It does not change
`PROJECT_STATUS.md`, `docs/DECISIONS.md`, `docs/TASK_REGISTRY.md`, or the Phase 1
scope. Phase 1 remains proposed/not approved; no implementation, schema,
migration, infrastructure, coding prompt, or runtime behavior is authorized.

## Sources for verification

- [Supabase documentation](https://supabase.com/docs)
- [Supabase pricing](https://supabase.com/pricing)
- [Firebase documentation](https://firebase.google.com/docs)
- [Firestore offline data](https://firebase.google.com/docs/firestore/manage-data/enable-offline)
- [Firebase pricing](https://firebase.google.com/pricing)
- [Appwrite documentation](https://appwrite.io/docs)
- [Appwrite pricing](https://appwrite.io/pricing)
- [Phase 1 Plan](phases/PHASE_1_PLAN.md)
- [Phase 1 Owner Review](PHASE_1_OWNER_REVIEW.md)
- [Decisions](DECISIONS.md)

**Document status:** Implemented as a documentation draft; not provider approval,
not Phase 1 approval, and not implementation authorization.
