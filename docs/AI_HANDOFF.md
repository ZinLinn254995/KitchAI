# AI Handoff Template

Copy and complete this template when handing work to another coding agent.

Prompt AI assistants must use the [Prompt AI workflow](PROMPT_AI_WORKFLOW.md)
and [intake checklist](PROMPT_AI_INTAKE.md). Avoid copying their instructions
into task handoffs.

## Current Project Handoff

- **Exact active task:** Phase 1 Approval Packet created. The
	[Phase 1 Approval Packet](PHASE_1_APPROVAL_PACKET.md) consolidates all
	planning into one document with recommended technical decisions (Supabase
	backend, email/password auth, RLS authorization, Dexie local persistence,
	outbox sync, optimistic concurrency conflict handling, soft-delete with
	tombstones) and seven material decisions marked OWNER DECISION REQUIRED.
- **Last confirmed checkpoint:** Phase 1 Approval Packet created as
	documentation. Repository contains documentation only; no application
	source, config, schema, migration, or test files exist.
- **Incomplete work:** Owner must review and accept the Phase 1 Approval
	Packet. Seven material decisions (O1–O7) require owner judgment:
	permanent deletion/retention, privacy erasure, local encryption, offline
	duration, Supabase Pro plan, additional browsers, production deployment.
	After owner acceptance, coding prompts for WP2–WP8 must be created in
	dependency order. Proposed Phase 1 through Phase 8 planning documents
	remain pending owner approval.
  - **Blockers:** Owner review and acceptance of the Phase 1 Approval Packet;
	resolution of O1–O7 material decisions; then coding prompt creation
	before implementation begins.
- **Next recommended action:** Owner reviews the
	[Phase 1 Approval Packet](PHASE_1_APPROVAL_PACKET.md), resolves decisions
	O1–O7, and accepts or revises the packet. Then create coding prompts for
	WP2 (local persistence) and WP3 (auth/RLS) as the first implementation
	tasks. Do not begin implementation until the owner accepts the packet.


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
