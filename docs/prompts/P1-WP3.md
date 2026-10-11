# WP3 — Identity and Access-Control Foundation: Implementation Prompt

**Task ID:** P1-WP3
**Parent:** Phase 1, WP3
**Status:** Planned — not implementation-ready until owner accepts the [Phase 1 Approval Packet](../PHASE_1_APPROVAL_PACKET.md)
**Execution mode:** COMMIT_PUSH_REQUIRED (after validation)
**Prerequisites:** Owner acceptance of Phase 1 Approval Packet; WP1 complete; WP2 recommended but WP3 can proceed in parallel after WP1

## Objective

Implement the authentication foundation and server-enforced owner/business
authorization using Supabase Auth and PostgreSQL Row Level Security (RLS).
Establish email/password sign-in, session management, and RLS policies that
deny cross-business and unauthenticated access at the database level.

## Scope

- Install and configure `@supabase/supabase-js` client.
- Create the `businesses` table in Supabase via migration (using
  `apply_migration` MCP tool).
- Enable RLS and create four policies (SELECT, INSERT, UPDATE, DELETE) scoped
  to `authenticated` role with `auth.uid() = owner_id`.
- Implement sign-up, sign-in, and sign-out functions using Supabase Auth
  (email/password).
- Implement session state management (detect authenticated/unauthenticated).
- Implement first-setup online requirement: first sign-in requires network;
  after initialization, offline use continues from local data (WP2).
- Create a minimal auth UI: sign-in form, sign-up form, sign-out button, and
  auth-state display.
- Write negative authorization tests verifying cross-business denial.
- Ensure the Supabase service role key is never exposed to the client.

## Non-goals

- Account-management UI, profile settings, password reset email.
- OAuth/social login (Phase 6).
- Multi-user invitations or roles (Phase 6).
- Cloud sync engine (WP4).
- Conflict resolution (WP5).
- PWA service worker (Phase 5).
- Production deployment.

## Dependencies

- WP1 (Phase 1 Approval Packet) owner-accepted.
- Supabase project provisioned (URL and anon key in `.env`).
- WP2 local persistence (recommended — WP3 can proceed in parallel, but
  integration with local data requires WP2).

## Required Behavior and Constraints

1. **Supabase client configuration:**
   - Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env`.
   - Never import or reference the service role key in client code.
   - Create a single Supabase client instance and export it.

2. **Database migration (via `apply_migration` MCP tool):**

   ```sql
   CREATE TABLE IF NOT EXISTS businesses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
     description TEXT CHECK (description IS NULL OR char_length(description) <= 2000),
     lifecycle_state TEXT NOT NULL DEFAULT 'active' CHECK (lifecycle_state IN ('active', 'archived')),
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     version INTEGER NOT NULL DEFAULT 1
   );

   ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "select_own_businesses" ON businesses FOR SELECT
     TO authenticated USING (auth.uid() = owner_id);

   CREATE POLICY "insert_own_businesses" ON businesses FOR INSERT
     TO authenticated WITH CHECK (auth.uid() = owner_id);

   CREATE POLICY "update_own_businesses" ON businesses FOR UPDATE
     TO authenticated USING (auth.uid() = owner_id)
     WITH CHECK (auth.uid() = owner_id);

   CREATE POLICY "delete_own_businesses" ON businesses FOR DELETE
     TO authenticated USING (auth.uid() = owner_id);
   ```

3. **Auth functions:**
   - `signUp(email, password)`: calls Supabase Auth; returns session or error.
   - `signIn(email, password)`: calls Supabase Auth; returns session or error.
   - `signOut()`: calls Supabase Auth; clears local session.
   - `getSession()`: returns current session or null.
   - `onAuthStateChange(callback)`: subscribes to auth state changes.

4. **Session behavior:**
   - Session (access token + refresh token) stored by Supabase client in
     localStorage.
   - On reconnect after offline expiry, prompt user to re-authenticate.
   - While offline with expired session, local data (WP2) remains accessible
     for reads; cloud operations are queued (WP4).

5. **First-setup requirement (D1-05):**
   - First sign-in requires online connectivity.
   - After initialization, the device may operate offline.
   - The application detects first-time setup by checking if local data exists
     and if a valid session has ever been established.

6. **Security constraints:**
   - The Supabase anon key is safe for client-side use (it only grants access
     permitted by RLS policies).
   - The service role key bypasses RLS and must never appear in client code,
     environment files committed to git, or documentation.
   - No credentials, tokens, or sensitive payloads in logs.

7. **RLS test verification:**
   - Create two test users (user A and user B) in Supabase Auth.
   - User A creates a business; user B attempts to read, update, and delete
     user A's business — all must be denied by RLS.
   - Unauthenticated requests to the businesses table must be denied.
   - User A can read, update, and delete only their own businesses.

## Acceptance Criteria

| ID | Criterion | Verification |
| --- | --- | --- |
| AC-WP3-01 | User can sign up with email/password | Manual test; verify session created |
| AC-WP3-02 | User can sign in with email/password | Manual test; verify session created |
| AC-WP3-03 | User can sign out; session cleared | Manual test; verify no session |
| AC-WP3-04 | Auth state changes propagate to UI | Manual test; UI updates on sign-in/sign-out |
| AC-WP3-05 | RLS denies unauthenticated access to businesses | SQL test: anon role SELECT returns 0 rows |
| AC-WP3-06 | RLS denies cross-business access (user B cannot read user A's data) | Integration test with two authenticated users |
| AC-WP3-07 | RLS denies cross-business UPDATE and DELETE | Integration test with two authenticated users |
| AC-WP3-08 | User can insert a business with their own owner_id | Integration test; verify row inserted |
| AC-WP3-09 | User cannot insert a business with another user's owner_id | Integration test; verify INSERT denied by WITH CHECK |
| AC-WP3-10 | No service role key in client code | Grep source for service_role; verify .env not committed |

## Verification Commands

```bash
npm install
npx tsc --noEmit
npx vitest run
npx vite build
```

RLS policy verification (via `execute_sql` MCP tool):

```sql
-- Test 1: Anon role cannot read
SET ROLE anon;
SELECT count(*) FROM businesses;  -- Expected: error or 0 rows

-- Test 2: Authenticated user A can read own
-- (Run as user A's JWT)
SELECT count(*) FROM businesses WHERE owner_id = auth.uid();

-- Test 3: Authenticated user B cannot read user A's
-- (Run as user B's JWT)
SELECT count(*) FROM businesses WHERE owner_id = '<user_A_id>';  -- Expected: 0
```

## Security Tests

- Grep all source files for `service_role` or `SERVICE_ROLE` — must find zero
  matches in client code.
- Verify `.env` is in `.gitignore` and not tracked.
- Verify no tokens or passwords appear in console.log or error messages.
- Verify RLS policies are enabled (query `pg_tables` for `rowsecurity` = true).
- Verify negative tests: unauthenticated and cross-user access is denied.

## Failure Cases

- Supabase project unreachable: surface network error; local data (WP2) still
  available for reads.
- Sign-up fails (email already exists): surface Supabase error message.
- Sign-in fails (wrong password): surface Supabase error message.
- Session expired offline: queue cloud operations; prompt re-auth on reconnect.
- RLS policy accidentally grants broader access: negative tests catch this;
  fix policy before proceeding.
- `auth.users(id)` foreign key constraint fails: ensure `owner_id` is set
  correctly from `auth.uid()` on insert.

## Rollback Guidance

- RLS policies and table creation are migrations applied via `apply_migration`.
  To revert: disable RLS, drop policies, drop table (only in development/test
  environment — never in production).
- Code changes: Git revert to previous commit.
- Supabase Auth test users: can be deleted via Supabase Dashboard or API.
- No production data to protect in Phase 1.

## Expected Files

- `src/lib/supabase.ts` — Supabase client configuration
- `src/lib/auth.ts` — Auth functions (signUp, signIn, signOut, getSession)
- `src/hooks/useAuth.ts` — React hook for auth state
- `src/components/AuthForm.tsx` — Minimal sign-in/sign-up form
- `src/types/auth.ts` — Auth-related TypeScript types
- `src/lib/auth.test.ts` — Unit tests for auth functions
- `src/lib/rls.test.ts` — Integration tests for RLS policies
- Migration SQL (applied via `apply_migration` MCP tool, not a file in the repo)

## Completion Report

After implementation, report:
- Files created/modified
- Migration applied (table name, policies created)
- Test results (pass/fail counts)
- RLS negative test results (cross-user denial verified)
- `tsc --noEmit` result
- `vite build` result
- Git commit ID and branch
- Confirmation that service role key is not in client code
- Any deviations from this prompt and why
- Any blockers or remaining issues
