# Phase 3 WP3.1 Implementation Plan

## Scope

Implement only the reusable inventory domain foundation and additive local data-model migration described by WP3.1. This slice covers exact quantity validation/arithmetic, canonical append-only stock movements, lot allocations, ownership/business scope contracts, and IndexedDB v2→v3 preservation. It does not implement purchasing, receiving, production UI, finished-goods workflows, physical-count UI, broad sync rollout, hosted provisioning, or production deployment.

## Source-to-change map

| Concern | Current source | Planned change |
| --- | --- | --- |
| Local database/versioning | `src/db/database.ts` | Add additive version 3 stores/indexes while preserving v1 data. |
| Existing domain types | `src/types/index.ts` | Add inventory contracts without changing Phase 2 business shapes. |
| Validation | `src/db/validation.ts` | Add exact six-decimal quantity/unit validation and arithmetic helpers in a focused module. |
| Tests | `src/db/*.test.ts` | Add boundary, serialization, migration, allocation, and invariant tests. |
| Remote Supabase | Integration schema unavailable in this environment | Do not invent or apply hosted schema/RLS changes; document this limitation. |

## Safety gates

- Preserve all existing v1/v2 stores and records; migration is additive and idempotent on reopen.
- Use exact scaled integers, never binary floating-point equality.
- Keep posted movements append-only; corrections are new linked events.
- Require explicit owner/business scope in contracts; server authorization remains deferred until the actual Supabase schema and authenticated server path are available.
- Stop and report if existing Phase 2 data cannot be represented without loss or rounding.

## Verification

Run focused domain and migration tests, then `npm test`, `npm run typecheck`, and `npm run build`. Review `git diff --check`, changed-file scope, and the final diff before documenting evidence.

This plan does not authorize Phase 3 completion, hosted provisioning, provider approval, or a production deployment.

## Evidence status

Prepared from repository inspection on 2026-10-13. Implementation and test results are recorded separately after execution.

## Related

- [Phase 3 plan](phases/PHASE_3_PLAN.md)
- [Phase 3 plan](phases/PHASE_3_PLAN.md)
- [Decision log](DECISIONS.md)
- [AI handoff](AI_HANDOFF.md)

## Current blocker

The inspected repository currently defines only IndexedDB schema version 1 in `src/db/database.ts`; the WP3.1 prompt requires a safe populated-v2→v3 migration and Phase 2 stores/fixtures. No v2 schema, Phase 2 ingredient/menu/recipe stores, Supabase schema, or authenticated server path is present in the current checkout. Implementing a v1→v3 migration or inventing missing stores would violate the prompt's preservation and stop-condition requirements, so implementation is paused pending the correct Phase 2 base or an owner-approved migration scope.
