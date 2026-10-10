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

## Unresolved Questions

- What data model, local persistence technology, and backup/recovery approach
  will meet the offline-first requirement?
- What precise ownership and access model is needed if more than one user must
  access a business? The confirmed ability for one user to manage multiple
  businesses does not decide multi-user access.
- What transaction-time values and correction/audit history must be retained
  for each kind of purchase, sale, expense, and recipe-based cost record?
- How should categories that are referenced by historical records be archived,
  reassigned, or displayed? Exact deletion and archival behavior remains open.
- What currency, money representation/precision, and rounding rules should be
  used?
- When gas or similar inputs could be either a shared production consumable or
  an operating expense, how should the owner classify the actual use?
- How should local data synchronize across devices, and how will conflicts be
  handled?
- Should the provisional stack recommendation be adopted, and what
  authentication, hosting, privacy, and security requirements apply?
- Which QR ordering and delivery integrations are needed, and in what order?
- What allocation or accounting treatment, if any, should be used for shared
  consumables? No estimate or formula is approved.
- What precise deletion behavior should apply to categories, recipes, menus, and
  items? Safe deactivation or archival is preferred where appropriate, but exact
  behavior requires approval.
- What confirmation and validation flow is required before AI-assisted changes
  to financial records can be saved?
- How should discount details be entered beyond the confirmed sale example?
- What are the priority workflows and acceptance criteria for each capability?

These questions are prompts for future owner decisions, not requirements or
assumptions for agents to resolve independently.