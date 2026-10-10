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
- Validate changes before committing. Every work attempt, including incomplete
  or blocked work, should leave a recoverable GitHub checkpoint whenever access
  and permissions allow: commit only reviewed, in-scope progress and push the
  current upstream branch when safe. If review is required, use a checkpoint
  branch and pull request.
- If interrupted or near a usage limit, checkpoint safe validated progress and
  update the task status and handoff with exact local/remote state and the next
  recovery action where the environment allows.
- If checks fail or a push is blocked, preserve the work and any local commit;
  report the failure and recovery step instead of claiming a remote checkpoint.
- Never force-push, rewrite shared history, or overwrite unrelated changes.
- Confirm the commit and remote result before reporting success. Never claim a
  commit, push, or pull request exists without evidence. If blocked, leave local
  work intact and report the exact state and next recovery step.