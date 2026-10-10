# Task Registry

## Hierarchy

Work is organized as **Phase → Work Package → Task**:

- **Phase:** broad project stage, such as P0.
- **Work Package:** cohesive outcome within a phase, such as WP0.1.
- **Task:** independently actionable, checkable work item, such as P0.1.

Identifiers retain their parent prefix. Register active work at task level; do
not pre-decompose provisional future phases.

## Active Tasks

| ID | Work package | Task | Status |
| --- | --- | --- | --- |
| P0.1 | WP0.1 Documentation foundation | Establish initial project documentation | Complete: implemented, validated, and pushed to origin/main |
| P0.2 | WP0.2 Product knowledge | Capture confirmed product requirements and agent continuity | Implemented and locally verified: required-content, link, scope, continuity, and whitespace checks passed |

Update task status only when evidence supports it. Project-wide implementation
and verification state belongs in [project status](../PROJECT_STATUS.md).