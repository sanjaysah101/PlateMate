# App shell — the three layouts

Build these before any page. Route groups keep them separate:

```
app/
  layout.tsx          root: fonts, ThemeProvider, QueryProvider, TooltipProvider, Toaster
  (site)/layout.tsx   public: SiteHeader + <main> + SiteFooter
  (auth)/layout.tsx   split screen: form left, brand panel right
  (app)/layout.tsx    signed-in workspace: Sidebar + Inset(Header + content)
```

Examples use Base UI's `render` prop. On Radix replace
`render={<Link href="/x" />}` + `nativeButton={false}` with `asChild` and a
child `<Link>`.

## Root layout

```tsx
import { Geist, Geist_Mono } from "next/font/google";
const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <QueryProvider>
            <TooltipProvider delay={200}>{children}</TooltipProvider>
            <Toaster richColors position="bottom-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Metadata: `title: { default: "<Product> — <one-line promise>", template: "%s · <Product>" }`.

## Signed-in workspace

```tsx
// (app)/layout.tsx — server component
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await loadViewer();                    // null when signed out
  if (!viewer) redirect(`/login?next=${encodeURIComponent(pathFromHeaders)}`);
  return (
    <ViewerProvider viewer={viewer}>
      <SidebarProvider>
        <AppSidebar viewer={viewer} />
        <SidebarInset className="min-w-0">                 {/* min-w-0 is essential */}
          <AppHeader viewer={viewer} />
          <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ViewerProvider>
  );
}
```

To get the requested path into a server layout, set an `x-pathname` request
header in middleware/proxy and read it with `headers()`.

### Sidebar

`<Sidebar collapsible="icon" variant="inset">` — the inset variant gives the
floating rounded content panel that makes it feel premium.

- **Header:** a `size="lg"` menu button with the logo mark (`size-8`), product
  name (semibold) and a muted second line (e.g. "Organizer workspace").
- **Content:** labelled groups, 2–4 items each, every item with a lucide icon,
  `tooltip` (shown when collapsed) and `isActive` from the pathname (exact match
  for index routes, prefix match otherwise). Build the groups from the user's
  role, e.g. Overview · <Primary job> · <Secondary job> · Admin · Account.
- **Contextual mode:** inside a resource console (`/manage/<id>/…`) swap the
  groups for that resource's sections, topped by "← All <resources>" and
  "View public page ↗".
- **Footer:** the account menu as a `size="lg"` button — avatar, name, email,
  `ChevronsUpDown` — opening a dropdown (Dashboard, Public profile, Settings,
  API tokens, Theme submenu Light/Dark/System, destructive Sign out).
- `<SidebarRail />` for drag-to-collapse.

### Header

`sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur md:rounded-t-xl`

`SidebarTrigger` · vertical `Separator h-4` · `Breadcrumb` built from the URL
(map segments to labels; replace record ids like `prj_x8f…` with a word such as
"Editor"; on mobile show only the last crumb) · right side: the search button
and a theme toggle.

### ⌘K command palette

- Desktop trigger: outline button `w-64 justify-start text-muted-foreground`
  with a search icon, "Search or jump to…", and `<Kbd className="ml-auto">⌘K</Kbd>`.
  Mobile: ghost icon button with `aria-label="Search"`.
- `keydown` listener toggles on `(metaKey || ctrlKey) && key === "k"`.
- Groups: every sidebar destination, then live records (fetched when opened),
  then "More" (docs, tools). Each item has an icon and a `value` that includes
  its group name for better fuzzy matching.
- **Wrap the palette contents in `<Command>` inside `<CommandDialog>`** (see
  pitfalls).

## Public site

```tsx
<div className="flex min-h-svh flex-col">
  <SiteHeader />
  <main className="flex flex-1 flex-col">{children}</main>
  <SiteFooter />
</div>
```

**Header:** `sticky top-0 z-40 border-b bg-background/80 backdrop-blur
supports-[backdrop-filter]:bg-background/60`, inner
`mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6`. Logo · nav links
(`text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm`) ·
right: theme toggle, then either "Dashboard" (outline, sm) + avatar menu, or
"Sign in" (ghost) + "Get started" (primary). Mobile: a `Sheet` from the right
with the same links and full-width buttons.

**Footer:** `border-t bg-muted/30`, a 4-column grid
`md:grid-cols-[1.4fr_repeat(3,1fr)]` (brand + one-line description, then
Product / Developers / Account link columns), and a bottom bar with © and a
small tagline, `text-xs text-muted-foreground`.

## Auth split screen

```tsx
<div className="grid min-h-svh lg:grid-cols-2">
  <div className="flex flex-col gap-6 p-6 md:p-10">
    <Logo />
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  </div>
  <BrandPanel className="hidden text-white lg:flex" />   {/* gradient cover + quote + 3 benefit bullets */}
</div>
```

Forms: H1 `text-2xl font-semibold tracking-tight` + muted one-liner, then
`FieldGroup` of `Field`s, a full-width primary submit with a spinner while
pending, a `FieldSeparator` ("Or …"), secondary options, and a centred
`FieldDescription` linking to the other auth page. Carry `?next=` through and
only accept relative paths (`startsWith("/") && !startsWith("//")`).

For demos, one-click "demo account" buttons (outline, 2-column grid, role icon
each) under the separator are a strong first impression.
