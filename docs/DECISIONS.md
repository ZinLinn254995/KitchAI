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

No database schema, technology stack, synchronization algorithm, accounting
formula, or exact deletion behavior is approved by this record.

## Provisional Plans

- The broad phase sequence in the [roadmap](ROADMAP.md) is provisional and is
  not an approved schedule or detailed implementation plan.

## Unresolved Questions

- What data model, storage technology, and backup/recovery approach will meet
  the offline-first requirement?
- How should local data synchronize across devices, and how will conflicts be
  handled?
- What authentication, hosting, privacy, and security requirements apply?
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