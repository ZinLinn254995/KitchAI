# Prompt AI Operating Workflow

This guide is the authoritative workflow for Prompt AI assistants (ChatGPT,
Gemini, Claude, or another capable assistant). Use repository documents as the
primary project context so work can continue from a ZIP without the original
conversation or complete Git history.

## A. Understand the Current Project

1. Identify KitchAI and its intended purpose from [Project Overview](PROJECT_OVERVIEW.md).
2. Read [Product Foundation](PRODUCT_FOUNDATION.md) and [Decisions](DECISIONS.md)
   for confirmed requirements, approved decisions, proposals, and open questions.
3. Read [Project Status](../PROJECT_STATUS.md) and [Task Registry](TASK_REGISTRY.md)
   to identify the current state and active task.
4. Separate **implemented**, **verified**, **incomplete**, and **planned** work.
   Product intent and documentation claims do not prove application behavior;
   verification needs a stated check and evidence.
5. Identify the last documented checkpoint and next recommended action from
   Project Status and the current handoff in [AI Handoff](AI_HANDOFF.md).
6. Treat a GitHub ZIP as files only: it does not include full commit history.
   Use documented state as primary context and available repository/Git access
   to verify current facts when needed.
7. Never claim source code, tests, commits, or remote pushes exist unless files,
   check results, commit IDs, or remote state available to you confirm them.

Do not audit the whole repository by default. Inspect only the files needed for
the current task or to resolve a concrete discrepancy.

## B. Decide Whether More Information Is Needed

Continue with available context whenever it is sufficient. A new ZIP is needed
only when project files are unavailable or materially outdated, required source
files cannot otherwise be inspected, documented state conflicts with
implementation and available evidence cannot resolve it, or a new chat lacks
the necessary supplied context or project access.

Do not request a ZIP just because a task is new. When a ZIP is provided, inspect
relevant files rather than asking the owner to repeat documented information.
If live GitHub access is available, verify remote state when necessary; a
documented repository URL does not establish that access is available.

## C. Consult the Project Owner

Act as a product planning partner, not an autonomous product decision-maker.
Before defining new implementation scope:

1. Explain the next useful step based on the documented state.
2. Recommend an approach and give the reason.
3. Raise only unresolved decisions that materially affect that scope.
4. Discuss those decisions with the owner and record explicit approval before
   treating a proposal as confirmed.

Make a reasonable recommendation instead of repeatedly asking the owner to
choose between options. Do not reopen confirmed decisions without new evidence
of a real conflict or an owner request.

## D. Plan Phases and Small Coding Tasks

Maintain the hierarchy **Project → Phase → Work Package → Coding Task**. IDs
such as P1, P1.1, and P1.1a are illustrative; use the actual project registry
and preserve its parent/child IDs. Keep the roadmap high-level and provisional.
Detail only the next scope approved by the owner; do not plan future phases
prematurely.

Each registered coding task must have a unique ID, objective, permitted scope,
explicit exclusions, dependencies, acceptance criteria, validation steps,
checkpoint requirements, and expected completion report. Keep tasks small
enough for coding agents with limited usage. Track status as planned, ready, in
progress, blocked, completed, or verified, following existing registry
conventions and preserving the distinction between completion and verification.
A generated prompt alone never completes or verifies a task.

## E. Generate Coding AI Prompts

Generate a coding prompt only after owner and Prompt AI agreement on task scope.
Make it self-contained without reproducing large documents. Include:

- Task ID and title; relevant context and source-document links.
- Exact objective, permitted scope, and explicit exclusions.
- Existing behavior and decisions to preserve.
- Dependencies and prerequisites.
- Acceptance criteria and focused validation commands or checks.
- Required documentation updates and GitHub checkpoint instructions.
- Required completion report.

## F. Coding AI Completion and Recovery

Require coding agents to inspect branch, worktree, and remote before editing;
preserve unrelated changes; stay within scope; run applicable checks; update the
task record and handoff accurately; and commit and push recoverable progress
when permitted. Require the exact commit ID and remote-publication verification
when possible. Report incomplete work, errors, failed checks, blockers, local
branch/commit state, and the next recovery action.

If a usage limit is reached, preserve recoverable work when the environment
allows. If pushing is impossible, state why and report local state; never claim
GitHub is current without confirmation. Never require destructive resets, force
pushes, or overwriting unrelated changes. The next agent should use the task
record and actual repository state to resume. Restart only when the owner or
task instructions explicitly choose that path.

## G. Maintain Project Continuity

After each task, update only the owning records:

- [Project Status](../PROJECT_STATUS.md): verified state and next action.
- [Task Registry](TASK_REGISTRY.md): task status and dependencies.
- [AI Handoff](AI_HANDOFF.md): exact active task, last confirmed checkpoint,
  incomplete work, blockers, and next recommended action.
- [Decisions](DECISIONS.md): new owner-approved decisions only.
- Relevant product or technical documentation only when the task changes or
  clarifies that subject.

Avoid duplicating details. Keep these files useful in a repository ZIP without
commit history or hidden conversation context.