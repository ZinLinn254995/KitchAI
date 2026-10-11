# Decisions and Open Questions

This register separates owner-provided project context from provisional plans.
Only explicit owner approval makes a proposal an approved decision.

## Confirmed Project Context

- Confirmed product requirements and business logic are recorded in the
  [product foundation](PRODUCT_FOUNDATION.md); that document is authoritative
  for scope and examples. Requirements describe intended behavior, not
  implemented functionality or an approved technical design.
- The project's offline-first direction is established. Storage technology,
  synchronization design, and related implementation details remain open.

## Technical Direction

These are confirmed architectural principles, not claims of implementation or
approval of a specific technology stack:

1. Local-first operation is the primary requirement.
2. The application must support installation as a Progressive Web App (PWA).
3. Locally stored records must remain available offline.
4. Records must use stable unique identifiers.
5. Important records must preserve historical values and relationships.
6. Records referenced by historical transactions must not be silently deleted
   or rewritten.
7. The data layer must accommodate future synchronization.
8. Online authentication, cloud persistence, backup, and multi-device
   synchronization are later implementation concerns.
9. Manual data entry must remain available independently of AI features.
10. Financial records and cost calculations must use explicitly recorded
    actual values, not estimates.

No database schema, implementation technology, synchronization algorithm,
accounting formula, or exact deletion behavior is approved by these principles.

## Provisional Plans

- The broad phase sequence in the [roadmap](ROADMAP.md) is provisional and is
  not an approved schedule or detailed implementation plan.

### Recommended Default Stack (Provisional)

For a future implementation, recommend React with TypeScript and Vite, CSS
Modules for styling, Dexie over browser IndexedDB for local persistence,
`vite-plugin-pwa` for PWA support, and Supabase (PostgreSQL and Auth) for a
future cloud service, deployed on Vercel. This combination uses a common,
incremental web toolchain; keeps routine records local and available offline;
and leaves a practical path to Google sign-in and cloud storage. Supabase does
not provide the application's offline-to-cloud synchronization policy by
itself; that remains a separate future design task.

This is a recommendation only. No framework, styling system, local database
library, PWA plugin, cloud provider, or hosting provider has been approved or
implemented.

## Phase 3 Planning Decisions Pending Owner Approval

The proposed Phase 3 plan is documented in [Phase 3 Plan](phases/PHASE_3_PLAN.md).
Its decision register covers personal/business finance boundaries, sales
discounts, correction semantics, report definitions, ambiguous expenses,
historical categories, report scope, retention/recovery, and verification scope.
All Phase 3 decisions remain OPEN unless an authoritative owner record approves
them.

## Phase 2 Planning Decisions Pending Owner Approval

The proposed Phase 2 plan is documented in [Phase 2 Plan](phases/PHASE_2_PLAN.md).
Its decision register covers business scope, money, units, lifecycle, purchase
corrections, history, partial purchases, inventory scope, assets, observations,
allocation, and evidence/release requirements. All Phase 2 decisions remain
open unless an authoritative owner record explicitly approves them.

## Phase 1 Planning Decisions Pending Owner Approval

The proposed Phase 1 plan is documented in [Phase 1 Plan](phases/PHASE_1_PLAN.md).
The following remain unresolved and must not be treated as approved technical
or business decisions: cloud backend/deployment; authentication/sign-in and
account-management boundary; simple-record fields and validation; conflict
review UI versus preservation/status only; first-time online setup versus
returning offline access; deletion propagation, tombstones, recovery, and
retention; browser/device support; and cloud test, CI, and production scope.
Each decision matters to the listed work packages and requires evidence and
explicit owner approval before implementation.

## Unresolved Questions

Recommendations below are proposals for owner review, not confirmed decisions.
The established principles remain authoritative; no recommendation may be
implemented as a business or financial rule without the approval stated below.

### 1. Money and Rounding

- **Established:** Financial records use explicitly recorded actual values; do
  not substitute estimates.
- **Open:** Supported currencies, amount representation and precision,
  calculation/transaction rounding, and display rules.
- **Recommended default (unapproved):** Store amounts in an exact
  currency-aware representation (integer minor units where appropriate,
  otherwise decimal-safe); show the currency explicitly and round only at
  owner-approved boundaries. This avoids binary floating-point surprises.
- **Trade-offs:** Currency minor units differ; calculation, line-item, and
  display rounding can produce different totals.
- **Safe to defer:** Only while no financial records are implemented; decide
  before accepting or reporting financial amounts.
- **Owner approval before implementation:** Yes, for supported currencies and
  business rounding/display rules.
- **Affected areas:** Product Foundation, purchase/sales/expense entry, cost
  calculations, reports, exports, and eventual storage representation.
- **Evidence needed:** Intended launch currencies, representative totals and
  discounts, and required display/report examples.

### 2. Historical Retention, Archive, Delete, and Recovery

- **Established:** Historical transactions and their necessary values and
  relationships must remain understandable; referenced records must not be
  silently deleted or rewritten.
- **Open:** Retention periods, archive/deactivation behavior, any permitted
  permanent deletion, and backup/restore guarantees.
- **Recommended default (unapproved):** Archive or deactivate unused referenced
  records; block permanent deletion while history depends on them; plan
  documented backup and restore before relying on local records.
- **Trade-offs:** History and backups consume storage and may retain data longer;
  deletion/recovery behavior affects privacy and user trust.
- **Safe to defer:** Exact retention and recovery implementation can wait, but
  destructive deletion must not be implemented before policy is approved.
- **Owner approval before implementation:** Yes, for retention, permanent
  deletion, archive visibility, and recovery guarantees.
- **Affected areas:** Product Foundation, record lifecycle, local storage,
  history views, backup/restore, and privacy policy.
- **Evidence needed:** Owner expectations for record retention, restore after
  device loss, and sensitive-data deletion scenarios.

### 3. Purchase and Sales Corrections

- **Established:** Purchases and sales are historical transactions whose
  recorded values must not silently change when current records change.
- **Open:** Whether corrections edit, reverse, or supersede a transaction; what
  reason, author, time, and original values must be retained.
- **Recommended default (unapproved):** Preserve the original and record a
  linked correction or reversal with an audit trail rather than silently
  overwriting the transaction.
- **Trade-offs:** Strong auditability adds workflow and reporting complexity;
  unrestricted edits are simpler but can obscure financial history.
- **Safe to defer:** Yes, until transaction correction workflows are designed;
  do not implement silent edits in the meantime.
- **Owner approval before implementation:** Yes, for correction semantics and
  required audit details.
- **Affected areas:** Product Foundation, purchase/sales entry, transaction
  history, reports, and audit behavior.
- **Evidence needed:** Examples of mistaken purchase/sale entries and what the
  owner needs to see afterward to trust and explain the correction.

### 4. Category Reassignment and Historical Reports

- **Established:** Categories organize reusable records and must not corrupt or
  erase historical transaction meaning.
- **Open:** Whether changing or archiving a category changes historical reports,
  and how reassignment is represented.
- **Recommended default (unapproved):** Preserve the category meaning recorded
  with each past transaction for historical reports; apply reassignment to
  future records unless the owner requests an explicit historical correction.
- **Trade-offs:** Historical reports remain stable but may differ from reports
  grouped by today's category structure.
- **Safe to defer:** Yes, before category editing and historical reporting are
  implemented.
- **Owner approval before implementation:** Yes, for historical report and
  reassignment semantics.
- **Affected areas:** Product Foundation, category management, purchase/sales/
  expense reports, and record history.
- **Evidence needed:** Example category changes and whether past reports should
  retain their prior grouping or reflect a corrected classification.

### 5. Shared Consumables and Unallocated Costs

- **Established:** Actual costs only; when true shared usage/allocation is
  unknown, do not invent a per-menu cost or formula.
- **Open:** How actual usage is observed and whether/how shared or other common
  costs may later be allocated across products.
- **Recommended default (unapproved):** Keep the actual purchase/expense
  recorded as unallocated and show per-menu cost as undetermined until actual
  allocation evidence and an owner-approved rule exist.
- **Trade-offs:** Avoids false precision but leaves some product costs
  incomplete and may limit comparisons.
- **Safe to defer:** Yes; actual purchase recording can be separate from any
  allocation or per-menu calculation.
- **Owner approval before implementation:** Yes, before allocating or
  publishing allocated costs; no approval is needed to preserve actual values.
- **Affected areas:** Product Foundation, purchasing, production records, recipe
  costing, expense handling, and reports.
- **Evidence needed:** Actual purchase/use/output records and whether leaving a
  cost unallocated is acceptable when usage cannot be measured.

### 6. Gas and Other Ambiguous Expense Classification

- **Established:** Business records are business-scoped and actual recorded
  costs must not be duplicated or guessed. Gas may be an operating expense or a
  shared production consumable depending on its use.
- **Open:** Classification criteria for gas and other items with multiple uses,
  including whether a purchase can be split when usage evidence exists.
- **Recommended default (unapproved):** Do not auto-classify from an item name;
  retain the actual transaction and let its business purpose/classification be
  explicitly recorded when known. Leave uncertain allocation unresolved rather
  than double-counting it.
- **Trade-offs:** Explicit classification needs user effort; automatic rules
  are faster but can misstate costs.
- **Safe to defer:** Yes, until expense and shared-consumable workflows are
  designed; preserve the actual purchase meanwhile.
- **Owner approval before implementation:** Yes, for classification and any
  split/allocation rules.
- **Affected areas:** Product Foundation, item categories, purchasing, expense
  records, and cost reports.
- **Evidence needed:** Real gas-use cases and whether any reliable evidence
  exists to split a purchase between operating and production use.

### 7. Business Ownership, Multi-User Access, and Permissions

- **Established:** One user may manage multiple businesses; personal and
  business finances must remain separate.
- **Open:** Whether a business can have multiple users, how membership and
  roles work, and how access to personal records is isolated.
- **Recommended default (unapproved):** Keep each business private to its
  managing user until shared access is explicitly needed; design future access
  around explicit business membership and least privilege rather than shared
  credentials.
- **Trade-offs:** Private-by-default limits collaboration; membership roles
  introduce authorization, invitation, and ownership-transfer complexity.
- **Safe to defer:** Yes, multi-user access can wait; business and personal
  ownership boundaries cannot be blurred in single-user work.
- **Owner approval before implementation:** Yes, before adding shared business
  access, roles, invitations, or ownership transfer.
- **Affected areas:** Product Foundation, account/business ownership,
  authentication, authorization, personal finance, and future synchronization.
- **Evidence needed:** Who besides the owner needs access, which business data
  they need, and whether any personal data should ever be shared.

### 8. Local Persistence and Future Synchronization

- **Established:** Local-first offline access is primary; locally stored records
  remain available offline, use stable IDs, and the data layer accommodates
  future synchronization. Cloud authentication, persistence, backup, and
  multi-device synchronization are later concerns.
- **Open:** Local persistence lifecycle/limits, ID generation details, minimum
  sync metadata, conflict resolution, deletion propagation, and backup timing.
- **Recommended default (unapproved):** Routine reads and writes must work
  without a network; use stable IDs independent of a server round trip and
  preserve enough timestamps/history to reconcile future sync. Defer network
  sync and conflict policy until separately designed.
- **Trade-offs:** Offline operation adds device-loss, storage-quota, and later
  conflict risks; synchronization metadata and reconciliation add complexity.
- **Safe to defer:** Sync and conflict handling are safe to defer; choosing and
  validating durable local persistence is not safe to defer before app use.
- **Owner approval before implementation:** The offline/local-first requirement
  is confirmed; yes, before locking a persistence technology or sync/conflict
  semantics beyond those principles.
- **Affected areas:** Technical Direction, Product Foundation, local data layer,
  PWA lifecycle, backup/recovery, authentication, and future sync.
- **Evidence needed:** Target devices/browsers, expected offline duration,
  acceptable recovery point after device loss, and concrete multi-device cases.

### Other Open Questions

- Is stock-on-hand inventory tracking in scope beyond reusable item records,
  purchases, and recorded production output? If so, define the required stock
  movements, adjustments, and units before designing that workflow.
- What application testing strategy and minimum verification evidence should be
  required for data, offline, and financial workflows?
- Should the [provisional stack recommendation](DECISIONS.md#recommended-default-stack-provisional)
  be adopted, and what hosting, privacy, and security requirements apply?
- Which QR ordering and delivery integrations are needed, and in what order?
- What confirmation and validation flow is required before AI-assisted changes
  to financial records can be saved?
- How should discount details work beyond the confirmed sales example?
- What are the priority workflows and acceptance criteria for each capability?

These questions are prompts for future owner decisions, not requirements or
assumptions for agents to resolve independently.
