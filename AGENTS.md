# Gamenight — notes for AI agents

Gamenight is an Expo (React Native + web) app with a Supabase backend, built by a team of three who are learning as they go. The full picture is in [`docs/README.md`](./docs/README.md); the folder map is below.

## Where files belong

Every new or moved file must live in the folder whose job matches what the file does.

| Path                   | What belongs here                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| repo root (`/`)        | Project-wide config and instruction files: `README.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`, tool configs, dotfiles. No app code |
| `app/`                 | Screens and layouts only. Expo Router turns every file here into a route, so nothing else goes here                                   |
| `src/components/`      | Reusable UI components (`Button`, `Card`, `Input`, …), one component per file, file name in PascalCase                                |
| `src/theme/`           | Design tokens (`tokens.ts`) and the theme provider. Colors, spacing, radii and type sizes live only here                              |
| `assets/`              | Images and other static files bundled with the app (icons, splash, favicon)                                                           |
| `supabase/migrations/` | Versioned SQL that changes the database. Never edit a migration that is already on `main`; add a new one                              |
| `supabase/`            | Supabase config (`config.toml`). Ad-hoc SQL snippets are not committed                                                                |
| `docs/`                | Spec, roadmap, status and task list, mockups                                                                                          |
| `docs/playbook/`       | Recipes: how to do each kind of task, one Markdown file per kind                                                                      |
| `docs/scripts/`        | Python import scripts for docs data                                                                                                   |
| `.github/`             | CI workflows and issue/PR templates                                                                                                   |
| `.husky/`              | Git hooks (pre-commit, commit-msg)                                                                                                    |
| `.vscode/`             | Shared editor settings and the team spell-check dictionary                                                                            |
| `app-example/`         | Expo's demo code, kept for reference. Not part of the app: nothing may import from it                                                 |

## Review guidelines

CI already runs ESLint, Prettier and the TypeScript check on every PR, so don't comment on formatting, lint warnings or type errors. Focus on the two things below, and treat both as **P1** so they are always reported.

### 1. Architecture: is every changed file in the right place?

For **every file the PR adds, moves or renames**, whatever its type, check it against the folder map above and leave a comment saying whether it is in the right place. If it isn't, name the folder it should move to and say why in one sentence. For example: a `Button.tsx` under `app/` should be in `src/components/`, because `app/` is only for screens.

Also flag:

- A screen file in `app/` that defines its own reusable component instead of putting it in `src/components/`.
- Raw hex colors, font sizes or spacing numbers outside `src/theme/tokens.ts`; components should read them from the theme.
- Any import from `app-example/`.
- A file whose kind has no home in the map yet (for example the first Supabase client or the first custom hook). Don't guess a folder: say that the team should pick one and add it to this table in the same PR.

### 2. Efficiency: can the code be simpler or do less work?

Point out, with a short suggested rewrite where it helps:

- Code that duplicates something that already exists in `src/components/` or `src/theme/`.
- Work repeated on every render that doesn't need to be (objects or styles rebuilt each time, effects that run more often than needed, missing dependency arrays).
- Logic that can be written in fewer, clearer lines, or state that can be derived from other state instead of stored.
- Database queries that fetch more rows or columns than the screen uses.

### How to write the comments

Two of the three authors are new to JavaScript and React. Explain each finding in plain words: what is wrong, why it matters, and what to change. Keep each comment short, and don't report a finding you aren't sure about.
