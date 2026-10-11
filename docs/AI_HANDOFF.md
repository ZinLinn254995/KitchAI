# AI Handoff Template

Copy and complete this template when handing work to another coding agent.

Prompt AI assistants must use the [Prompt AI workflow](PROMPT_AI_WORKFLOW.md)
and [intake checklist](PROMPT_AI_INTAKE.md). Avoid copying their instructions
into task handoffs.

## Current Project Handoff

- **Exact active task:** No task is active. P0.7, Implementation Readiness
	Audit, is complete, documentation-only, locally verified, and pushed.
- **Last confirmed checkpoint:** Branch `main` was clean and synchronized with
	`origin/main` after the P0.7 audit. The inspected repository contains no
	application source, config, schema, migration, or test files.
- **Incomplete work:** Application implementation remains unstarted. Proposed
Phase 1 through Phase 7 planning documents are recorded in [Phase 1 Plan](phases/PHASE_1_PLAN.md),
  [Phase 2 Plan](phases/PHASE_2_PLAN.md), [Phase 3 Plan](phases/PHASE_3_PLAN.md),
  [Phase 4 Plan](phases/PHASE_4_PLAN.md), [Phase 5 Plan](phases/PHASE_5_PLAN.md),
  [Phase 6 Plan](phases/PHASE_6_PLAN.md), [Phase 7 Plan](phases/PHASE_7_PLAN.md),
  and [Phase 8 Plan](phases/PHASE_8_PLAN.md), but none is owner-approved; no
  coding task is ready and the stack remains
  provisional.
  - **Blockers:** Complete owner approval of earlier phases before implementation,
  then review and approve the complete proposed phase scope and material decisions
  before any implementation.
- **Next recommended action:** Record and review owner-selected Phase 1
planning directions D1-01 through D1-08 dated 2026-10-11. Remaining blockers are
provider comparison, auth/session details, record constraints, conflict review,
offline/device boundaries, lifecycle/recovery policy, browser/device matrix,
and CI/test/production boundaries. Do not create implementation prompts or
start coding until the owner approves the complete Phase 1 scope, exclusions,
material details, dependencies, and acceptance criteria.


## Task

- **ID and title:**
- **Acceptance criteria:**
- **Current state:** Implemented / verified / incomplete

## Read First

- Current task or issue:
- Relevant project files:
- Relevant code/tests, if applicable:

## Scope

- **In scope:**
- **Out of scope:**
- **Confirmed decisions:**
- **Provisional assumptions:**
- **Unresolved questions:**

## Work and Evidence

- **Changes made:**
- **Checks run and results:**
- **Known gaps or risks:**
- **Git checkpoint:** branch, commit, and confirmed remote status (or blocker)

## Next Action

- Smallest next step:
