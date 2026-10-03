# Copy-paste prompt

Use this when the AI can't load skills. If it can read files, attach the whole
`saas-design-system/` folder and keep the first line ("Follow the attached
skill…"). Fill in the **Project brief** first — everything else stays as is.

---

```text
You are a senior product designer and front-end engineer. Build the UI for the
product described in the brief below so it looks like a funded, production SaaS
(the quality bar of Linear, Vercel, Stripe) — not a template or a demo.

If a folder named saas-design-system is attached, follow its SKILL.md and
references exactly; they override anything below.

## Project brief
- Product name: <Notils | RentDera | …>
- One-line promise (hero headline idea): <…>
- Who uses it and their roles: <e.g. landlord, tenant, admin>
- Core objects: <e.g. properties, listings, bookings, payments>
- The 3 jobs each role comes to do: <…>
- Brand hue (OKLCH degrees): <e.g. 175 teal> · Logo idea: <…>
- Must-have screens: <landing, dashboard, list, detail, editor, settings, …>

## Stack
Next.js App Router + React + TypeScript strict, Tailwind CSS v4 (CSS-first) +
tw-animate-css, shadcn/ui components owned as source (check whether they are
Base UI — use the `render` prop and `nativeButton={false}` for links — or Radix —
use `asChild`), lucide-react, sonner, next-themes (attribute="class"), TanStack
Query, Geist Sans/Mono.

## Design system (non-negotiable)
1. Theme = semantic OKLCH tokens in globals.css: background, foreground, card,
   popover, primary, secondary, muted, accent, destructive, success, warning,
   border, input, ring, chart-1..5, sidebar-*. Light: background
   oklch(0.992 0.002 H), card white, foreground oklch(0.17 0.02 H), primary
   oklch(0.52 0.21 H), border oklch(0.915 0.008 H), muted-foreground
   oklch(0.5 0.02 H). Dark: background oklch(0.155 0.012 H), card
   oklch(0.19 0.014 H), primary oklch(0.7 0.16 H), border oklch(1 0 0 / 9%).
   H = brand hue; neutrals carry a whisper of it. Radius 0.625rem. Class-based
   dark mode. NEVER raw palette classes (bg-blue-500) or dark: colour overrides.
2. Type: page title text-2xl sm:text-3xl font-semibold tracking-tight;
   section title text-lg font-semibold; body text-sm; meta text-xs
   text-muted-foreground; stat labels text-xs uppercase tracking-wide; all
   numbers tabular-nums; marketing H1 text-4xl sm:text-5xl lg:text-6xl.
3. Spacing with gap only (pages gap-8, sections gap-4); size-* for squares;
   container mx-auto max-w-7xl px-4 sm:px-6.
4. Surfaces: bg-card + 1px border + rounded-xl; shadows only on floating
   elements; marketing sections alternate plain and bg-muted/30 border-y.
5. Every state designed: Skeleton loading, Empty (icon + sentence + action),
   toast errors with the server message, Spinner on pending buttons,
   AlertDialog for destructive actions.
6. Explain beside numbers: StatCard hints, short "how this is computed" notes,
   flag badges, ▲/▼ deltas in text-success / text-destructive.
7. Responsive + accessible: tables in overflow-x-auto; min-w-0 on flex/grid
   children; Dialog titles inside the popup; aria-label on icon buttons;
   visible focus rings; reduced-motion respected.

## Layouts to build first
- (site): sticky blurred header (logo, nav, theme toggle, Sign in / Get started
  or Dashboard + avatar menu, mobile Sheet) and a 4-column footer.
- (auth): split screen — form (max-w-sm) left, gradient brand panel with a
  quote and three benefit bullets right; demo-account buttons if useful.
- (app): shadcn Sidebar variant="inset" collapsible="icon" with role-based
  groups, contextual sub-nav inside a resource, account menu in the footer;
  sticky header with SidebarTrigger, breadcrumbs (no raw ids), a ⌘K command
  palette (wrap contents in <Command>), theme toggle.

## Shared components
PageHeader(eyebrow, title, description, actions), StatCard(label, value, hint,
icon), Section(title, description, actions), Cover (deterministic oklch
gradient from a record id + faint grid overlay), UserAvatar with tinted
initials fallback, AvatarStack, status badges with icons, Timeline,
CopyButton, formatting helpers (Intl dates, relative time, numbers, money).

## Page recipes
- Landing: hero with grid + blurred primary glow background, staggered
  fade-up text, gradient-clipped key phrase, two CTAs, trust checks, and a
  floating product mock built from real tokens (never a stock image) with
  floating proof chips; live stats strip; features grid with icon tiles; how
  it works steps; a deep-dive on the unique idea; real example cards; FAQ
  accordion; final CTA band on a gradient.
- Dashboard: PageHeader with date eyebrow + 4 StatCards + main/side-rail grid
  (xl:grid-cols-[1fr_380px]).
- List: toolbar (debounced search synced to the URL, filters, sort, count) +
  card grid or bordered table with row actions; bulk-selection tray.
- Detail: full-bleed cover hero, sticky tab bar, content + sticky action card
  that adapts to the viewer's state.
- Document editor (Notion-style): centred max-w-3xl, huge borderless title,
  properties block (icon + label | inline editable value), Tiptap block editor
  with a / menu and floating toolbar, debounced autosave with a status
  indicator.
- Work queue: two panes (searchable list | item + form), keyboard shortcuts.
- Analytics: KPI cards, charts on chart tokens, checklist, activity feed.
- Wizard: stepper, one card per step, review step.
- Settings: cards with their own Save, danger zone last, secrets shown once.

## Before you finish
Screenshot every page in light and dark at 1440px and 390px; fix anything
clipped, overflowing or misaligned. Grep for raw colour classes. Run
typecheck, lint and a production build.
```

---

## Starter briefs to edit

These are placeholders — replace them with what Notils and RentDera actually
are.

**RentDera** (if it is a rental marketplace): roles landlord / tenant / admin;
objects properties, listings, applications, leases, payments, maintenance
requests; hue 175 (teal) for trust and calm; hero mock = a listing card with a
"Rent received" proof chip and an occupancy mini-chart; must-have screens:
landing, search/browse listings (cards + map toggle), listing detail with a
booking/apply action card, landlord dashboard (occupancy, income, overdue),
tenant dashboard, application review queue (work-queue recipe), lease
document (document-editor recipe), settings.

**Notils** (fill in): product type, roles, objects, the three jobs, hue
(e.g. 250 blue or 70 amber), hero mock idea, must-have screens.
