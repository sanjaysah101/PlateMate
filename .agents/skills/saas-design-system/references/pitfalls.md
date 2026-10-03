# Pitfalls that silently ruin the look

Each of these happened on a real build and passed typecheck. Check them
before you call a UI done.

1. **Base UI orientation selectors.** Some generated shadcn components (tabs,
   separator, slider, toggle-group, scroll-area, field) style with
   `data-horizontal:` / `data-vertical:`. Base UI only renders
   `data-orientation="horizontal|vertical"`, so those rules never match —
   tab bars render *beside* their content instead of above it, separators lose
   their size. Fix once in the kit:
   `sed -E 's/data-horizontal/data-[orientation=horizontal]/g; s/data-vertical/data-[orientation=vertical]/g'`.
   Verify by inspecting the rendered HTML, not the source.

2. **`min-w-0` on flex/grid children.** A wide table inside a flex child
   pushes the whole page wider than the viewport (buttons on the right get
   cut off). Give the workspace inset and the content column `min-w-0`, and put
   tables in `overflow-x-auto`.

3. **Command palette must be wrapped.** With cmdk, `CommandInput`/`CommandList`
   must render inside `<Command>`. If the kit's `CommandDialog` doesn't add it,
   wrap the contents yourself or the app crashes with
   "Cannot read properties of undefined (reading 'subscribe')".

4. **Dialog titles inside the popup.** The (sr-only) `DialogTitle` must sit
   inside `DialogContent`, or screen readers get an unlabelled dialog.

5. **Wrong `cn` import.** Generated components sometimes import `cn` from an
   npm package literally called `cn`. It must come from your own
   `lib/utils` (clsx + tailwind-merge). Grep for `from "cn"`.

6. **Animations need `tw-animate-css`.** Without `@import "tw-animate-css"`
   dropdowns, dialogs and tooltips pop instead of animating.

7. **Tailwind can't see your classes.** Tailwind v4 only generates classes
   from scanned files: add `@source` lines for every package/folder that has
   components, or styles silently vanish in production. Always run a real
   production build.

8. **Fake numbers on the landing page.** Mock data must use the product's real
   scales and units (a 1–5 rating shows 4.35, not 8.7). Judges and customers
   notice.

9. **Percentages over 100% or ids in the UI.** "102% of teams" and a breadcrumb
   reading "Prj_o7qe1w09ojzn" look like bugs. Phrase counts as "41 from 40
   teams", and replace record ids with page names.

10. **Hydration and theme flash.** Use `suppressHydrationWarning` on `<html>`,
    `next-themes` with `attribute="class"` and `disableTransitionOnChange`, and
    never read `window`/`localStorage` during render.

11. **Raw colours creep in.** Search before finishing:
    `grep -rnE "(bg|text|border)-(red|blue|green|yellow|gray|slate|zinc|neutral)-[0-9]"`
    and `grep -rn "dark:"` in app code. Replace with tokens.

12. **Print and dark mode.** Printable pages (certificates, invoices) need
    `print:` styles that force light colours and hide the site chrome.
