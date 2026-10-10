# AI Handoff Template

Copy and complete this template when handing work to another coding agent.

## Prompt AI Continuity

When preparing work for a coding agent, a Prompt AI should:

1. Read `README.md`, `PROJECT_STATUS.md`, and `docs/TASK_REGISTRY.md` first.
2. Read `AGENTS.md` and only the product documents relevant to the task.
3. Establish what is implemented, verified, incomplete, and unresolved from the
	repository documents; do not depend on Git history or the original discussion.
4. Continue the existing project discussion rather than restarting it.
5. Ask the owner only about material unresolved decisions.
6. Agree collaboratively with the owner on the next scope before generating
	coding tasks.
7. Break approved scope into small tasks for coding agents with limited usage.
8. Generate a coding prompt only after the owner and Prompt AI agree on the task.
9. Avoid repeating completed work or auditing the whole project without a
	concrete reason.

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