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

## Conceptual Data Relationships

These relationships describe ownership and references, not a database schema,
cardinality beyond confirmed product needs, or a finalized accounting model.

1. **User and personal finance:** A user's personal income and expenses belong
   to a personal finance boundary, separate from every business's financial
   records. Personal Expenses categories organize those records.
2. **User and businesses:** A user can manage multiple businesses. Each
   business owns or scopes its own categories, reusable items, menu products,
   recipes, purchasing records, expenses, and sales. Whether multiple users can
   access one business is unresolved.
3. **Businesses and reusable categories:** Categories organize and classify
  records within their business or personal-finance boundary. Reuse category
  records rather than copying a category for each item or transaction; a
  category is not a copy of an item or transaction.
4. **Businesses and reusable ingredients/items:** Direct Ingredients (food
   ingredients and packaging), Shared Consumables, Operating Expenses, and
   Equipment and Assets are conceptual groups. Reusable item records are
   business-scoped; examples include ingredients, oil, salt, seasoning, gas,
   rent, transportation, pans, trays, signs, tables, and chairs. The groups
   and examples are not a fixed catalogue.
5. **Businesses and menu products:** A menu product is a reusable record
   belonging to its business. Reuse its stable ID in recipes and sales rather
   than making a duplicate for each use or transaction.
6. **Menu products and recipes:** A menu product may reference its recipe.
   Recipe history or the values needed to interpret a past transaction must
   remain available when the current recipe changes.
7. **Recipes and ingredients:** Recipe entries reference existing ingredient
   records by stable ID; they do not create duplicate ingredient names.
8. **Shopping cart and items:** A planned cart entry references an existing
   business item. It is planning data, not a completed purchase.
9. **Purchases and items:** Purchase history references the existing item and
   preserves transaction-time values needed to understand what was bought,
   including actual quantity, unit, price, date, and other necessary recorded
   values. A purchase is a historical transaction, not a live view of the
   item's current values.
10. **Sales and menu products:** Sales history references the sold product and
    preserves the sold product's identity, quantity, actual selling price or
    amount, discount when applicable, date, and other necessary transaction
    values. A sale is historical, not a live view of today's menu or price.
11. **Shared consumables and menus:** One shared consumable may support
    production across multiple menus. Record purchases and actual usage or
    production observations when known. If an allocation is unknown, do not
    invent a per-menu quantity or cost.
12. **Operating expenses:** Business expenses such as rent, transportation,
    gas, and other operating costs belong to the relevant business and retain
    their actual recorded transaction values.
13. **Equipment and assets:** Records such as pans, trays, signs, tables, and
    chairs belong to the relevant business. Their financial/accounting
    treatment is not decided here.
14. **Personal expenses:** Personal expense records and their categories remain
    in the user's personal-finance boundary and must not be mixed into business
    financial records.

## Historical Record Protection

### Baseline Principles

- Reusable entities use stable unique IDs when referenced. Record creation and
  update timestamps where appropriate; a transaction date is distinct from an
  record's audit timestamps.
- Preserve historical transaction values and the relationships needed to
  understand them. Changes to a current ingredient, recipe, menu, price, or
  category must not silently rewrite a past purchase, sale, or expense.
- Keep transaction-time descriptions and values needed for historical display
  even if the referenced record is later renamed, changed, or no longer used.
  A historical reference does not imply that the current record must remain
  editable or active forever.
- Referenced records and categories must not be silently deleted in a way that
  breaks purchase or sales history. If an item or menu is no longer used, its
  historical transactions remain understandable and its ID must not be reused
  for a different entity.
- A correction to a recorded financial transaction must not silently erase the
  original meaning. The correction/audit workflow remains undecided.

### Provisional Handling and Open Decisions

Archiving or deactivation may be safer than deletion for records that are no
longer used, but this is a provisional preference, not an approved deletion
policy. Exact delete/archive behavior, category reassignment and historical
display behavior, required transaction-time fields, correction history, and
retention rules require owner review. Do not infer a schema or deletion
algorithm from these baseline principles.

## Cost and Financial Data Boundaries

- Record actual costs only; do not store estimated or guessed costs as facts.
- Direct ingredients may have calculable recipe quantities and costs when the
  required quantities and actual purchase values are known.
- Shared consumables such as oil, salt, seasoning, and gas may be recorded as
  purchased amounts and prices, then reconciled with actual use or production
  records when known.
- If exact shared-cost allocation is unknown, leave the per-menu cost
  undetermined rather than fabricating a precise value.
- Purchases and sales are historical transactions with their own recorded
  values; they are not computed solely from the current item or menu record.
- Currency, money representation/precision, and rounding rules remain
  unresolved. No shared-consumable allocation formula or accounting treatment
  is established here.

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