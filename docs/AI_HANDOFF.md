# AI Handoff Template

Copy and complete this template when handing work to another coding agent.

Prompt AI assistants must use the [Prompt AI workflow](PROMPT_AI_WORKFLOW.md)
and [intake checklist](PROMPT_AI_INTAKE.md). Avoid copying their instructions
into task handoffs.

## Current Project Handoff

- **Exact active task:** Phase 1 Approval Packet created and WP2/WP3
	implementation prompts prepared. The [Phase 1 Approval Packet](PHASE_1_APPROVAL_PACKET.md)
	consolidates all planning with recommended technical decisions. The
	[WP2 prompt](prompts/P1-WP2.md) and [WP3 prompt](prompts/P1-WP3.md) are
	created as documentation only — not implementation-ready.
- **Last confirmed checkpoint:** Branch `phase-1-approval-packet`, commit
	`034fc7d`. Repository contains documentation only; no application source,
	config, schema, migration, or test files exist. Remote push blocked — no
	GitHub authentication available in the environment.
- **Incomplete work:** Owner must review and accept the Phase 1 Approval
	Packet. Seven material decisions (O1–O7) require owner judgment:
	permanent deletion/retention, privacy erasure, local encryption, offline
	duration, Supabase Pro plan, additional browsers, production deployment.
	After owner acceptance, WP2 and WP3 prompts become implementation-ready.
	WP4–WP8 prompts will be created after WP2 and WP3 are implemented.
  - **Blockers:** Owner review and acceptance of the Phase 1 Approval Packet;
	resolution of O1–O7 material decisions; GitHub authentication for remote
	push.
- **Next recommended action:** Owner reviews the
	[Phase 1 Approval Packet](PHASE_1_APPROVAL_PACKET.md), resolves decisions
	O1–O7, and accepts or revises the packet. Then implement WP2
	([prompt](prompts/P1-WP2.md)) and WP3 ([prompt](prompts/P1-WP3.md)) as the
	first implementation tasks. Do not begin implementation until the owner
	accepts the packet.


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
