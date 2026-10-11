# Task Registry

## Hierarchy

Work is organized as **Project → Phase → Work Package → Coding Task**:

- **Phase:** broad project stage, such as P0.
- **Work Package:** cohesive outcome within a phase, such as P1.1.
- **Coding Task:** independently actionable, checkable work item, such as P1.1a.

Identifiers retain their parent prefix. Register active work at task level; do
not pre-decompose provisional future phases.

## Plan Authority

- [Roadmap](ROADMAP.md) is the owner-controlled, high-level phase source; its
	provisional phase themes are not approved implementation scope.
- A detailed phase breakdown is maintained in
	`docs/phases/<PHASE_ID>_PLAN.md` only when that phase is being planned. It
	distinguishes proposal from owner approval and contains approved outcomes,
	work packages, and coding-task contracts.
- This registry indexes task IDs, parent IDs, approval, dependencies, lifecycle
	status, and checkpoint evidence. Detailed behavior stays in the approved
	phase plan and canonical product documents.
- Task prompts are created only for approved tasks at
	`docs/prompts/<TASK_ID>.md` and linked here or from the phase plan. No phase
	breakdowns or coding prompts currently exist; P0.1–P0.6 history remains
	complete and unchanged.

No implementation phase is active and no approved phase breakdown exists. Proposed
Phase 1, Phase 2, Phase 3, and Phase 4 planning baselines are recorded in [Phase 1 Plan](phases/PHASE_1_PLAN.md),
[Phase 2 Plan](phases/PHASE_2_PLAN.md), [Phase 3 Plan](phases/PHASE_3_PLAN.md),
and [Phase 4 Plan](phases/PHASE_4_PLAN.md). None is owner-approved and none
creates coding tasks or prompts. The cross-phase
governance documentation update is complete; it has no phase/task ID and does not
create P0.7. Its completion and checkpoint are recorded in [Project Status](../PROJECT_STATUS.md)
and [AI Handoff](AI_HANDOFF.md). Owner-approved phase planning follows the
[Prompt AI workflow](PROMPT_AI_WORKFLOW.md).

### Proposed Phase 3 Planning Deliverable

| ID | Work package | Status | Approval |
| --- | --- | --- | --- |
| P3-PLAN | Phase 3 planning baseline | Planned: documentation drafted; not implemented | Owner approval required |

The proposed Phase 3 plan defines WP3-01 through WP3-08. They remain planned,
not ready, because the phase and its material decisions are not owner-approved.
No coding prompts exist for these WPs.

## Repeatable Coding Task Contract

Each decomposed coding task includes, where relevant: unique task ID and parent
phase/work package; lifecycle status and separate owner-approval state;
objective and exact permitted scope; prerequisites and dependencies; required
behavior and constraints; acceptance criteria; focused validation steps; files
or areas expected to change; explicit exclusions; and a task-specific prompt
or clear prompt reference.

Track these completion facts independently: implementation state, local checks
and results, commit ID, and confirmed remote branch/push state or blocker. Use
lifecycle states **planned**, **ready**, **in progress**, **blocked**,
**completed**, or **verified**; neither a generated prompt nor a commit alone
implies validation or successful publication. Preserve historical P0 rows as
recorded rather than retrofitting them to this contract.

For new tasks, **planned** means proposed but not ready to implement; **ready**
means the task is owner-approved and its prerequisites are met; **in progress**
means implementation has started; **blocked** records an impediment; **completed**
means implementation is done; and **verified** means acceptance checks passed.
Commit and remote push are separate checkpoint facts for every state.

## Historical Phase Tasks

P0.1–P0.6 below record completed foundation tasks. Do not reopen or renumber
them without a concrete discrepancy.

| ID | Work package | Task | Status |
| --- | --- | --- | --- |
| P0.1 | WP0.1 Documentation foundation | Establish initial project documentation | Complete: implemented, validated, and pushed to origin/main |
| P0.2 | WP0.2 Product knowledge | Capture confirmed product requirements and agent continuity | Implemented and locally verified: required-content, link, scope, continuity, and whitespace checks passed |
| P0.3 | WP0.3 Prompt AI continuity | Establish ZIP-readable Prompt AI workflow and intake checklist | Complete: implemented, locally verified, and pushed to origin/main |
| P0.4 | WP0.4 Technical foundation | Record confirmed architecture principles and provisional stack recommendation | Complete: implemented, locally verified, and pushed to origin/main |
| P0.5 | WP0.5 Data model foundation | Document conceptual relationships and historical-record protection | Complete: documentation implemented, locally verified, and pushed to origin/main |
| P0.6 | WP0.6 Decision readiness | Organize remaining foundation decisions with recommendations and owner-approval gates | Complete: implemented, locally verified, and pushed to origin/main |
| P0.7 | WP0.7 Implementation readiness audit | Assess documented and repository evidence for implementation readiness | Complete: audit documented, locally verified, and pushed to origin/main; application is not implementation-ready |

Update task status only when evidence supports it. Project-wide implementation
and verification state belongs in [project status](../PROJECT_STATUS.md).
