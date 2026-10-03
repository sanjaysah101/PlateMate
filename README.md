# platemate

A production-ready Next.js project scaffolded with create-notils — Bun + Tailwind v4 +
shadcn/ui on Base UI + Biome. Every file is yours to edit.

## Getting started

```sh
bun install
bun dev
```

Open http://localhost:3000.

## Quality gate

```sh
bun lint
bun typecheck
bun build
```

## What's included

- `ui` — shadcn/ui component kit on Base UI, with the Tailwind v4 theme
- `api-client` — Platform-neutral HTTP transport core (createHttpClient, HttpError)

This is a fresh app — no example pages or demo flows. Add capabilities as you need them.

## Structure

- `src/app` — routes (App Router)
- `src/components/ui` — shadcn/ui components (Base UI)
- `src/lib/utils.ts` — the `cn()` helper
- `src/app/globals.css` — the theme (tokens + dark mode)

Add or update UI components from the project root:

```sh
bun run ui:add button
```

## Environments

One environment, configured in `.env.local`. `.env.example` is **the only
committed env file** — the reference list of every variable this project reads,
with no real values; every other `.env*` file is gitignored.

Read the active environment from one place:

```ts
import { environment, isProduction } from "@/env";
```

Resolution lives in `src/env.ts`. To add development/staging/production later,
change that one file and add the matching `.env.<name>` files — nothing that
imports `environment` needs to change.

## Adding capabilities

```sh
bun run notils list           # what's available, what's installed
bun run notils add auth-ui    # add a capability to this project
```

This runs [`@notils/cli`](https://www.npmjs.com/package/@notils/cli), installed here
as a devDependency so this project has its own copy. Everything it writes is your
source; delete the directory to remove a capability.

It was installed at `latest`, so your lockfile pinned whichever version was current
when you installed. To pick up newer CLI releases:

```sh
bun update @notils/cli
```

## AI agent context

This project ships the `notils-project` skill (`.agents/skills/notils-project/`) —
its specification: architecture, layout, rules, and patterns. AI coding agents read
it automatically.

Skills for the libraries in this stack are maintained by their own authors. Install
them with the [`skills`](https://www.npmjs.com/package/skills) CLI:

```sh
bunx skills add shadcn-ui/ui   # shadcn/ui component + composition rules
bunx skills find <query>       # search for more
bunx skills list               # what's installed
```

See `AGENTS.md` for architecture, conventions, and setup notes (also read by AI coding agents).

---

_Generated with [create-notils](https://github.com/notils/create-notils) v0.7.0._
