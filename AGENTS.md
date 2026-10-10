# Agent Working Rules

These rules apply to all coding agents working in KitchAI.

## Start With the Task

- Read the current task and its acceptance criteria first, then read this file
  and only the project documents relevant to that task.
- Inspect the specific code, tests, and Git state that the task can affect. Do
  not audit the entire project by default.
- Keep changes within the task scope. Do not implement provisional roadmap
  items or make unresolved product or technical choices without approval.

## Code and Documentation

- Follow existing conventions and prefer the smallest change that addresses the
  task. Do not add application code or framework setup to documentation-only
  tasks.
- Validate behavior with the narrowest relevant check available. Report what
  was checked and what remains unverified; never imply that unrun checks passed.
- Keep documentation concise and authoritative. Update the owning document
  rather than copying the same detail across multiple files.
- Label work accurately as **implemented**, **verified**, or **incomplete**.
  Implemented means present; verified means supported by a stated check; do not
  mark incomplete work verified.
- Treat roadmap items as provisional and decisions as approved only when the
  owner explicitly approves them. Record unresolved questions as unresolved.

## Git Checkpoints

- Before editing, inspect the branch, worktree, remotes, and relevant history.
- Preserve existing user changes. Do not overwrite unrelated work, expose
  secrets, or stage unrelated files.
- After scoped changes pass their checks, create a recoverable Git checkpoint:
  commit the task changes and push the current branch when permitted. If the
  environment requires review, use a checkpoint branch and pull request.
- Confirm the commit and remote result before reporting success. Never claim a
  commit, push, or pull request exists without evidence. If blocked, leave local
  work intact and report the exact state and next recovery step.