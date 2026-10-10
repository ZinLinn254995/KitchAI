# Product Foundation

This document preserves owner-confirmed product requirements and business
logic for future contributors, including agents working from a repository ZIP.
It is product intent, not evidence that features exist or technical designs
have been approved.

## Confirmed Requirements

### Product Direction

- KitchAI is a food business management application with an AI assistant.
- Initial users include small food production businesses, night-market vendors,
  and street-food sellers.
- It must keep business and personal financial records separate.
- Long-term direction includes integration with the owner's future Table Tap
  digital menu and QR ordering system, and delivery applications. These
  integrations and any paid product plans are goals, not implemented features.

### Businesses and Records

- A user can manage multiple businesses. Each business maintains its own
  relevant menus, ingredients, categories, recipes, purchasing records,
  expenses, and sales records.
- Personal finances remain separate from business finances.
- Reuse an ingredient or menu record within a business when it appears in
  multiple places; do not duplicate it solely because of that reuse.

### Item Groups and Reusable Records

The intended groups are Direct Ingredients, Shared Consumables, Operating
Expenses, and Equipment and Assets. Each group supports configurable categories
and reusable item records. Examples include raw quail, rice, seaweed, packaging,
oil, salt, gas, rent, transportation, pans, trays, signs, and tables. These are
examples, not a complete fixed catalogue.

### Menus, Recipes, and History

- Menus are reusable product records. A menu can have a recipe that references
  existing ingredient records, not duplicate ingredient names.
- A menu may have a selling price and sales records.
- Changes to recipes, menus, or categories must not silently corrupt historical
  transactions.
- Historical purchases, sales, expenses, and other recorded transactions must
  remain understandable. Removing a category, recipe, menu, or item must not
  silently erase dependent history; preserve necessary historical references
  and recorded values.

### Costs and Purchases

- Direct costs can be calculated from known quantities and purchase prices.
- Shared consumables such as oil, salt, and gas may be used across menus. The
  owner wants to record purchase quantities and prices, then record actual
  production output when a consumable is used up.
- Operating expenses include items such as rent and transportation. Equipment
  and assets include items such as pans, trays, signs, and tables.
- Do not invent shared-consumable usage, estimated product costs, an allocation
  formula, or accounting treatment. Keep recorded actual costs distinct from
  costs not yet determined.
- Users select existing business items for a shopping cart. Each planned cart
  entry references its existing item record. At purchase time, the user can
  quickly record actual purchased quantity and price.
- Preserve purchase history rather than creating an ingredient record for every
  purchase. A planned shopping item is not a completed purchase transaction.

### Sales and Discounts

The owner's example: a quail menu regularly sells for 35 baht each, so three
normally cost 105 baht. If three are recorded as sold for 100 baht, the discount
is 5 baht. The desired quick sales entry includes menu selection, quantity, a
discount option, and the actual selling amount. This example does not settle
the input workflow for every future discount.

### AI Assistant

- The application will have a dedicated AI Assistant page to help users record
  and understand business data.
- Manual data entry must remain available.
- Do not assume AI-generated changes to financial records can be saved without
  user confirmation and appropriate validation.

## Provisional Proposals

- Safe deactivation or archival is preferred where appropriate to protect
  history. The precise deletion and archival behavior is not yet approved.
- Future integrations and paid product plans express direction only; timing,
  scope, and implementation are not approved here.

## Unresolved Decisions

- What storage and data model will support the requirements, and how should
  backup and recovery work?
- What exact deletion, deactivation, archival, and historical-reference rules
  should apply to each record type?
- How should shared consumable usage be accounted for, if at all, without
  inventing estimates?
- What validations and confirmation steps must precede saving AI-assisted
  financial changes?
- What discount-entry behavior beyond the recorded example should be supported?
- Which workflows and integrations take priority, and what acceptance criteria
  apply to them?

Do not resolve these questions by inferring a schema, technology, synchronization
algorithm, accounting formula, or detailed UI behavior.