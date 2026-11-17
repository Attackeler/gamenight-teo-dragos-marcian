# Where we are

> **Last checked: 2026-11-17**, against GitHub (`Attackeler/gamenight-teo-denis`) and every branch. Update this page in the weekly sync — it should take two minutes.

## In one sentence

The foundations and DevOps are done and merged (including the pre-commit hook fix), and so is the first half of the design system (Phase 2): tokens, fonts, the theme provider and the component drafts are all on `main`, on Expo SDK 58. Dragos and Marcian are set up and have repo access. Next: they finish the Step 0 leftovers while Teo starts the rest of Phase 2 with the theme-provider fix (1.T1).

## The picture

```text
Phase 0  Foundations           ██████████  done   (merged, PRs #1–#2)
Phase 1  DevOps                █████████░  done   (merged, PRs #3–#9, #11, #13, #15, #18–#20) — leftovers: two npm scripts, two stray files
Phase 2  Design system         █████░░░░░  in progress — tokens, theme, drafts merged (PR #12); fixes + components next
Phase 3  Database schema       ░░░░░░░░░░  not started
Phase 4  Login  → v0.1.0       ░░░░░░░░░░  not started
```

## What's where

| Place           | What's in it                                                                                                                                                                                                                                                                                        | State                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `main` (GitHub) | Expo SDK 58 app, local Supabase, CI (lint + prettier + typecheck), Husky + commitlint + lint-staged on every commit, Makefile, issue + PR templates, these docs, design tokens + Inter fonts + `ThemeProvider` + drafts of `AppText`, `Button`, `Card`, weekly Expo update check, npm audit patches | ✅ last merge 2026-11-06 (PR #21). **Protected:** PR + 1 approving review + the `check-run` CI check |

Besides `main`, the only branch on GitHub is `chore/expo-auto-update`: PR #22 (Expo 58.0.25) is open and waiting for a review. Every old branch has been merged and deleted.

There are **no issues, no tags, no tests, and no database tables** yet (`supabase/migrations/` is empty).

**Expo updates:** every Monday the `Expo update` workflow checks for a new Expo release and opens a PR (`chore/expo-auto-update`) when there is one. Review it like any other PR; a new SDK (first number changes) can need code changes, so try it on a phone first.

## Known problems (each one is a task in [`TASKS.md`](./TASKS.md))

| Problem                                                                                                                                                                                                    | Task owner |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `ThemeProvider`: on first launch storage is empty, so the mode becomes `null` (not "system"); the toggle only flips light ↔ dark; the "Toggle theme" button on the home screen isn't wired to anything yet | Teo        |
| `docs/scripts/__pycache__/*.pyc` is committed to git                                                                                                                                                       | Dragos     |
| Stray `supabase/snippets/Untitled query 554.sql`                                                                                                                                                           | Dragos     |
| `npm run format` calls `prettier:fix` as a command (broken); `npm run reset-project` points at a deleted folder                                                                                            | Marcian    |

## The next three things (in order)

1. **Dragos & Marcian:** the Step 0 leftovers in [`TASKS.md`](./TASKS.md): 0.D2/0.M2 (local-env recipe), 0.D3, 0.D4, 0.M3, 0.M4.
2. **Teo:** 1.T1, fix the theme provider (1.D3 waits for it), then review the Step 0 PRs.
3. **Everyone:** sync on Thursday 2026-11-19.
