# AI Handoff Template

Copy and complete this template when handing work to another coding agent.

Prompt AI assistants must use the [Prompt AI workflow](PROMPT_AI_WORKFLOW.md)
and [intake checklist](PROMPT_AI_INTAKE.md). Avoid copying their instructions
into task handoffs.

## Current Project Handoff

- **Exact active task:** P1-WP2 Local Data Foundation — implemented and
	verified locally under the [limited execution authorization](PHASE_1_EXECUTION_AUTHORIZATION.md).
- **Last confirmed checkpoint:** Checkpoint branch
	`v0/p1-wp2-local-data-foundation` (pushed by v0; see Git activity for the
	commit). `main` is unchanged; merge requires owner review.
- **Checks run:** `npx tsc --noEmit` clean; `npx vitest run` 28/28 pass;
	`npx vite build` succeeds; manual browser flow (validation, create, edit,
	archive, restore, delete, reload persistence) passed.
- **Incomplete work:** Owner review/merge of the WP2 branch. O1–O7 remain
	OWNER DECISION REQUIRED. WP3 (identity/access) is not started and still
	needs its own authorization.
- **Blockers:** Owner acceptance of the remaining Phase 1 packet scope for WP3+.
- **Next recommended action:** Review and merge the WP2 branch, then authorize
	WP3 ([prompt](prompts/P1-WP3.md)). Do not add sync, auth, or Supabase work
	under the WP2 authorization.


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
