---
name: saas-design-system
description: Build production-grade SaaS web apps that look like Linear, Vercel or Stripe — a token-based OKLCH theme with true light/dark, a sidebar workspace with breadcrumbs and a ⌘K palette, a marketing landing page, analytics dashboards, data tables, Notion-style documents, wizards and settings. Use when creating or restyling any product UI (Next.js/React + Tailwind v4 + shadcn/ui) that must look professional, not like a demo — including new projects such as dashboards, admin consoles, marketplaces, rental or booking platforms, and note-taking or productivity apps.
---

# SaaS design system

A complete, opinionated recipe for shipping product UI that reads as a real,
funded SaaS — calm, dense where it matters, consistent in light and dark.
Proven on a full platform (public site, workspace, admin console, editor).

Read this file first, then open the reference you need:

| Reference | Use it for |
| --- | --- |
| `references/theme.css` | The exact tokens, motion and rich-text CSS. Copy verbatim, then rebrand by hue. |
| `references/app-shell.md` | Root layout, sidebar workspace, header + breadcrumbs, ⌘K palette, public header/footer, auth split screen. |
| `references/components.md` | The small shared components every page uses (PageHeader, StatCard, Section, covers, avatars, CopyButton…). |
| `references/page-recipes.md` | Layout specs for every common screen: landing, dashboard, list/table, detail, document editor, wizard, settings, analytics, empty/404. |
| `references/pitfalls.md` | Bugs that silently ruin the look (and how to avoid them). Read before finishing. |

## Stack (default — adapt if the project differs)

- Next.js App Router + React + TypeScript (strict).
- Tailwind CSS v4 (CSS-first, no `tailwind.config.js`) + `tw-animate-css`.
- shadcn/ui components, owned as source. On **Base UI** use the `render` prop
  (`<Button nativeButton={false} render={<Link href="/x" />}>`); on **Radix**
  use `asChild`. Check which one the project uses before writing a trigger.
- `lucide-react` icons, `sonner` toasts, `next-themes` (`attribute="class"`),
  TanStack Query for client data, Geist Sans/Mono fonts.
- Components needed (add with the shadcn CLI): sidebar, breadcrumb, command,
  dialog, alert-dialog, sheet, dropdown-menu, popover, tooltip, tabs, table,
  card, badge, button, input, textarea, select, switch, checkbox, radio-group,
  toggle-group, slider, field, label, avatar, progress, skeleton, spinner,
  empty, alert, accordion, separator, scroll-area, kbd, chart, sonner.

## The seven rules that make it look professional

1. **Tokens only.** Every colour is a semantic token: `bg-background`,
   `bg-card`, `text-muted-foreground`, `bg-primary`, `text-success`,
   `bg-warning/40`, `border`, `bg-chart-2`… Never `bg-blue-500`, never
   `dark:bg-…` overrides. Light and dark then stay in step automatically.
   Data-driven decoration (a cover gradient from a record's hue) is the only
   inline colour allowed.
2. **One type scale, used consistently.**
   Page title `text-2xl sm:text-3xl font-semibold tracking-tight text-balance` ·
   section title `text-lg font-semibold tracking-tight` · card title
   `text-base font-semibold` · body `text-sm` (app) / `text-base sm:text-lg`
   (marketing) · meta `text-xs text-muted-foreground` · stat labels
   `text-xs font-medium uppercase tracking-wide text-muted-foreground` ·
   numbers always `tabular-nums`. Marketing H1 `text-4xl sm:text-5xl lg:text-6xl`.
3. **Space with gap, not margins.** Pages are `flex flex-col gap-8`; sections
   `gap-4`; cards `gap-3`. Grids: `grid gap-3 sm:grid-cols-2 lg:grid-cols-4`
   for stats, `gap-4 md:grid-cols-2` for cards, `xl:grid-cols-[1fr_380px]`
   for main + side rail. Use `size-*` for squares. Never `space-y-*`.
4. **Surfaces, not boxes.** Cards are `bg-card` with a 1px `border` and
   `rounded-xl`; shadows only for floating things (`shadow-lg` popovers,
   `shadow-2xl ring-1 ring-foreground/10` for hero mockups). Muted bands
   (`bg-muted/30 border-y`) separate marketing sections. Radius base 0.625rem.
5. **Every state is designed.** Loading → `Skeleton` shaped like the content;
   empty → `Empty` with icon, one-sentence explanation and a primary action;
   errors → toast with the server's message (or an `Alert` when it blocks the
   page); pending buttons → `Spinner` + `disabled`; destructive → `AlertDialog`
   that names the consequence.
6. **Explain beside the number.** Analytics and admin screens pair each figure
   with a hint (`StatCard hint`), a short "how this is computed" note, badges
   for flagged states, and ▲/▼ deltas coloured with `text-success` /
   `text-destructive`. Calm density beats decoration.
7. **Responsive and accessible by default.** Mobile-first; wide tables scroll
   inside `overflow-x-auto`, never the page. Every flex/grid child that can
   hold a table gets `min-w-0`. Dialogs/sheets have a Title (sr-only if
   hidden), icon-only buttons have `aria-label`, focus rings stay visible,
   motion respects `prefers-reduced-motion`.

## Workflow

1. **Theme first.** Copy `references/theme.css` into the global stylesheet,
   choose the brand hue (see the header of that file), wire fonts and
   `ThemeProvider attribute="class" defaultTheme="system"`.
2. **Shells second.** Build the three layouts from `references/app-shell.md`
   before any page: public site (header + footer), auth split screen, and the
   signed-in workspace (sidebar + header + ⌘K). Route groups: `(site)`,
   `(auth)`, `(app)`.
3. **Shared components third** (`references/components.md`): PageHeader,
   StatCard, Section, cover/gradient, avatar with initials fallback, status
   badge, CopyButton, formatting helpers (dates, relative time, numbers).
4. **Then pages**, each from its recipe in `references/page-recipes.md`. Write
   one reference page completely (usually the dashboard) and make every other
   page match its patterns.
5. **Verify** (below) — in a real browser, both themes, desktop and mobile.

## Brand personality knobs

Keep the structure; change only these per product:

- **Hue** (theme), **logo mark** (a squircle: either `bg-primary` with a
  simple 2px-stroke glyph, or a dark gradient with a crisp white glyph and one
  accent colour — see components.md), **voice** of headlines.
- **Hero visual**: always a product mock built in JSX from real tokens (a
  dashboard card, a table, a listing card) — never a stock image. Add one or
  two small floating "proof" chips around it (e.g. "Payment received",
  "Certificate verified").
- **Cover art for records** (events, listings, notes): a deterministic
  gradient from a hue derived from the record id (`coverStyle(hue)` in
  components.md), with initials or an icon on top when there's no image.

## Done checklist

- [ ] No raw palette classes or `dark:` colour overrides (`grep -rE "bg-(red|blue|green|gray|slate|zinc)-[0-9]"`).
- [ ] Every page: loading skeleton, empty state, error toast, pending buttons.
- [ ] Screenshots in light **and** dark at 1440px and 390px — nothing clipped,
      no horizontal page scroll, tab bars sit above their content.
- [ ] Keyboard: ⌘K opens the palette; dialogs trap focus; Esc closes.
- [ ] Numbers use `tabular-nums`; deltas coloured with tokens; dates formatted
      consistently (`Intl.DateTimeFormat`, relative times for recency).
- [ ] Typecheck, lint and a production build pass (a typecheck alone won't catch CSS issues).
- [ ] Re-read `references/pitfalls.md`.
