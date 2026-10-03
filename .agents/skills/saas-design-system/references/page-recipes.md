# Page recipes

Layout specs for the screens almost every SaaS needs. Each lists structure,
the classes that carry the look, and the states to design. Swap the domain
nouns (events → listings, notes, properties…).

---

## 1. Marketing landing page

Container everywhere: `mx-auto w-full max-w-7xl px-4 sm:px-6`. Sections
alternate plain and `bg-muted/30 border-y`, each `py-20 sm:py-28`, anchors get
`scroll-mt-20`. Section heading = centred eyebrow (`text-primary text-sm
font-semibold tracking-wide`) + H2 `text-3xl sm:text-4xl font-semibold
tracking-tight text-balance` + muted lead `text-base sm:text-lg`, max-w-2xl.

1. **Hero** — `relative isolate overflow-hidden border-b`, two background
   layers (both `-z-10`, `aria-hidden`):
   - a 44px grid from `var(--border)` lines masked with
     `[mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]`;
   - a blurred glow: `absolute -top-40 left-1/2 h-[36rem] w-[64rem]
     -translate-x-1/2 rounded-full opacity-30 blur-3xl` with
     `radial-gradient(closest-side, var(--primary), transparent),
     radial-gradient(closest-side at 80% 60%, var(--chart-2), transparent)`.

   Grid `lg:grid-cols-[1.05fr_1fr] gap-14 pt-16 pb-20 sm:pt-24 lg:pb-28`.
   Left column, staggered `animate-fade-up` (0/80/160/240/320ms delays):
   a pill (`rounded-full border bg-background/70 px-3 py-1 text-xs backdrop-blur`
   with a `size-1.5 rounded-full bg-success` dot) → H1
   `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance`
   with the key phrase in `bg-linear-to-r from-primary to-chart-2 bg-clip-text
   text-transparent` → lead `text-lg text-muted-foreground max-w-xl` with one
   phrase in `text-foreground font-medium` → primary + outline buttons
   (`size="lg" className="h-10 px-4"`, arrow icon on primary) → three
   `Check text-success` trust points.
   Right column: the **product mock** in `animate-float` — a card
   `rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10` with a fake
   browser bar (three `size-2.5 rounded-full bg-foreground/15` dots + a mono
   URL), real-looking rows built from tokens, and 1–2 floating proof chips
   (`absolute rounded-xl border bg-card p-3 shadow-lg`) overlapping its edges.
2. **Live stats strip** — `bg-muted/30 border-b`, a centred "● Live on this
   instance" eyebrow, then 4–6 big numbers `text-4xl font-semibold
   tabular-nums` with muted labels. Pull real counts if you can.
3. **Features grid** — 3 columns on desktop; each card: `size-10 rounded-lg
   bg-primary/10 text-primary` icon tile, `font-semibold` title, `text-sm
   text-muted-foreground` body. 9–15 features; group or highlight 2–3 hero
   features as wider cards.
4. **How it works** — 4–5 numbered steps in a row (stack on mobile): number
   badge, title, one sentence, joined by a subtle line.
5. **Deep-dive** — two columns: copy + bullet proof points on one side, an
   explanatory visual on the other (a before/after table, a chart built with
   tokens). This is where the product's unique idea is sold.
6. **Live examples** — 3 real record cards (cover gradient banner, title,
   status badge, meta) linking into the product.
7. **FAQ** — `Accordion` in a `rounded-xl border px-5` box, triggers
   `py-4 text-base hover:no-underline`, max-w-3xl centred.
8. **Final CTA band** — a rounded-3xl cover-gradient panel with white H2,
   one line, primary (white) + outline buttons, and an install/code snippet
   if relevant.

## 2. Dashboard (home after sign-in)

`PageHeader` (eyebrow = today's date, "Welcome back, <first name>",
actions: secondary + primary) → 4 `StatCard`s in `grid-cols-2 lg:grid-cols-4`
→ `xl:grid-cols-[1fr_380px]`: main column with the user's primary objects as
cards (`md:grid-cols-2`, each with a cover banner `h-20`, title + status badge,
one meta line, next milestone); side rail with a compact list ("Your
projects", "Recent activity") of `Card py-4` rows with a status badge and an
action button. Show an `Empty` with a CTA for every empty section.

## 3. List / index page (records, listings, users)

`PageHeader` + primary action → a toolbar row: search input with icon
(debounced, synced to `?q=` with `router.replace`), filter chips or `Select`s,
sort select, result count `text-sm text-muted-foreground` → either:
- **cards grid** `gap-4 sm:grid-cols-2 lg:grid-cols-3` for visual objects
  (cover, title, tagline `line-clamp-2`, up to 3 tag chips + "+n", meta row), or
- **table** in a `rounded-xl border` card with `overflow-x-auto`: header
  `text-muted-foreground text-xs`, rows `hover:bg-muted/50`, first column bold
  + link, numbers right-aligned `tabular-nums`, statuses as badges, actions in
  a `…` `DropdownMenu` at the row end.
Optional selection mode → a sticky bottom tray
(`fixed inset-x-0 bottom-4 mx-auto w-fit rounded-full border bg-card shadow-lg`)
with the selected count and the bulk action.

## 4. Public detail page (a record people browse)

Full-bleed cover hero (`text-white`, status pill, H1 `text-4xl sm:text-5xl`,
tagline `text-white/85`, meta row with icons `text-white/80`, owner action
button `variant="secondary"`) → sticky tab bar under the site header
(`sticky top-16 border-b bg-background/90 backdrop-blur`; tabs are links with
`border-b-2 border-transparent` and `border-primary text-foreground` when
active) → content `grid lg:grid-cols-[1fr_340px] gap-10`: main = rich text,
sections with titles; side = a sticky "Your next step" action card that adapts
to the viewer's state (signed out / eligible / already in / owner), then key
facts, timeline, share link with CopyButton.

## 5. Resource console (admin area for one record)

Sidebar switches to contextual mode (see app-shell). A compact header row:
`size-12 rounded-xl` cover tile + name + status badges + next milestone +
"Public page ↗" button. Sub-pages follow recipe 2/3/8 patterns. The overview
page adds a **"Next steps" checklist card**: progress bar, each step a row
with a check circle (`text-success` when done, struck-through label) and the
first undone step highlighted (`bg-muted/50 rounded-lg`) with a "Next" link.

## 6. Document editor (Notion-style)

Centred document `max-w-3xl` with generous whitespace:
- slim sticky top bar: back link, breadcrumb, save status ("Saving…",
  "Saved · just now", "Unsaved", "Error — retry") with a coloured dot, Preview,
  the primary action (Submit/Publish), a `…` menu;
- optional cover band (image or `coverStyle`) with "Change cover";
- **title** as an auto-growing borderless textarea `text-[2.5rem]
  font-semibold leading-tight placeholder:text-muted-foreground/40`;
- borderless subtitle input `text-lg text-muted-foreground`;
- **properties block**: rows `grid grid-cols-[140px_1fr] items-center gap-2
  py-1.5`, left = icon + label `text-sm text-muted-foreground`, right = inline
  editable value (select, tag input with chips + ×, URL input that validates on
  blur, avatars, countdown);
- divider, then the block editor (Tiptap): `/` command menu (icon tile + title
  + description rows, ↑↓ Enter), floating selection toolbar (bold, italic,
  underline, strike, code, highlight, link with inline input, list, to-do,
  quote), markdown shortcuts, placeholder "Type / for blocks".
- **Autosave**: debounce ~800ms, send only changed fields, keep a queued save
  if one is in flight, ⌘S saves now, warn on unload with unsaved changes;
  never write server responses back into fields the user is typing in.
- Locked state (past a deadline / no permission): read-only rendering + an
  `Alert` with a lock icon explaining why.

## 7. Focused work console (review queue, inbox, triage)

Two panes `lg:grid-cols-[320px_1fr] gap-6`: left = searchable list with
All / To do / Done segmented filter, status dot per row, selected row
`bg-accent`; right = the item (header, links as outline buttons with icons,
content) and the action form. Form rows: label + weight badge + description on
the left, a 1–5 segmented control on the right (tiles with a number and a tiny
label "Poor…Excellent"). Keyboard hints in `Kbd` ("1–5 to mark · ↑↓ to move ·
⌘↵ save & next"), a live computed result, a progress bar ("12 of 20 done")
above. On mobile the list becomes a Select.

## 8. Analytics / overview dashboard

KPI StatCards (8 is fine in two rows of 4; each with a hint like "102 of 134"
plus a thin progress bar when it's a completion metric) → chart row
`lg:grid-cols-3`: time series (bar/area), category breakdown (horizontal
bars), and a checklist or "who's behind" table → activity feed (avatar/icon,
human-readable action, actor, relative time) with "View all". Charts use
`--chart-1..5`, light gridlines, value labels on bars, no 3D, no pie charts
with more than 4 slices. Always state the unit and the time window.

## 9. Results / ranking table

Status card on top (icon tile + "Results are public"/"Hidden" + badge +
explanation + the toggle action) → summary stats → `Tabs` (Ranking ·
Breakdown · Calibration…) → each tab opens with a one-paragraph plain-English
explanation, then the table: rank, item (title + subtitle), category, counts,
the raw and adjusted values `tabular-nums` (the adjusted one `font-medium`),
Δ column with `↑ 4` (`text-success`) / `↓ 3` (`text-destructive`) / `— 0`,
award badges. Podium for the top 3 on public pages (middle card taller,
trophy icon, rank badge circles).

## 10. Wizard (create flow)

Stepper at top (numbered circles joined by lines; done = `bg-primary`,
current = ring) → one card per step with a short heading and 3–6 fields →
footer with Back (ghost) and Continue (primary); last step is a review summary
with "Create". Live previews where it helps (URL slug preview, cover colour
preview). Validate per step; show server errors inline (e.g. "slug taken").

## 11. Settings

Left tabs or top tabs (Profile · Account · API tokens · Billing…). Each area
is a stack of Cards, each card = title + description + fields + its own
footer with Save (disabled until dirty). Danger zone last: a card with
`border-destructive/40`, a destructive button, and a type-the-name
`AlertDialog`. Secrets (API tokens) are shown once in a mono box with
CopyButton and a usage example (`curl …`).

## 12. Auth, 404 and errors

Auth: see app-shell. 404: centred `Empty`-style block with a large muted
number or icon, one sentence, "Go home" + "Browse …" buttons. Permission
denied inside the app: `Empty` with a lock icon explaining who can see it.

## 13. Embeddable widget

A bare route (no header/footer), transparent body, compact grid, `?theme=` and
`?limit=` params, links open in a new tab, a tiny "Powered by" link, and a
`postMessage` of its height so a host script can auto-size the iframe.
