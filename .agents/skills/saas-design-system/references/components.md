# Shared components

Small pieces every page reuses. Put them in `components/` and import them
everywhere — duplicated one-off copies are how a design drifts.

## PageHeader · StatCard · Section

```tsx
export function PageHeader({ title, description, actions, eyebrow }: {
  title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; eyebrow?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        {eyebrow && <div className="text-muted-foreground text-sm">{eyebrow}</div>}
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1>
        {description && <p className="text-muted-foreground max-w-2xl text-sm text-pretty sm:text-base">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon }: {
  label: string; value: React.ReactNode; hint?: React.ReactNode; icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="gap-0 py-4">
      <CardContent className="flex flex-col gap-1 px-4">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-medium tracking-wide uppercase">
          {label}{Icon && <Icon className="size-4" />}
        </div>
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        {hint && <div className="text-muted-foreground text-xs">{hint}</div>}
      </CardContent>
    </Card>
  );
}

export function Section({ title, description, actions, children }: {
  title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
```

Usage pattern for a page:

```tsx
<>
  <PageHeader eyebrow="Monday, 28 September" title="Welcome back, Pat"
    description="Everything you're part of, in one place." actions={<>…buttons…</>} />
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{/* 4× StatCard */}</div>
  <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
    <div className="flex flex-col gap-8">{/* main Sections */}</div>
    <div className="flex flex-col gap-8">{/* side rail Sections */}</div>
  </div>
</>
```

## Cover gradients (records without images)

A deterministic, data-driven gradient — the one place inline colour is fine.

```tsx
export function hueOf(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

export function coverStyle(hue: number): React.CSSProperties {
  return {
    backgroundImage: `radial-gradient(120% 120% at 0% 0%, oklch(0.72 0.16 ${hue}) 0%, transparent 55%),
      radial-gradient(120% 120% at 100% 100%, oklch(0.6 0.2 ${(hue + 60) % 360}) 0%, transparent 60%),
      linear-gradient(135deg, oklch(0.45 0.18 ${hue}), oklch(0.32 0.12 ${(hue + 30) % 360}))`,
  };
}

export function Cover({ hue, className, children }: { hue: number; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={coverStyle(hue)}>
      {/* faint grid overlay */}
      <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{
        backgroundImage: "linear-gradient(to right, rgb(255 255 255/.15) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255/.15) 1px, transparent 1px)",
        backgroundSize: "28px 28px" }} />
      {children}
    </div>
  );
}
```

Use it for: hero bands on detail pages (`text-white`, title `text-4xl sm:text-5xl`),
card banners (`h-20`), list thumbnails (`size-10 rounded-lg`), and initials
placeholders (`text-3xl font-semibold text-white/90` centred).

## Avatar with initials fallback

```tsx
export function UserAvatar({ name, image, className }: { name?: string | null; image?: string | null; className?: string }) {
  const hue = hueOf(name ?? "");
  return (
    <Avatar className={cn("size-8", className)}>
      {image ? <AvatarImage src={image} alt="" /> : null}
      <AvatarFallback className="text-xs font-medium"
        style={{ background: `oklch(0.9 0.05 ${hue})`, color: `oklch(0.35 0.08 ${hue})` }}>
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
```

`AvatarStack`: `flex -space-x-2`, each avatar `size-7 ring-2 ring-background`,
then a `+n` bubble (`bg-muted text-muted-foreground`).

## Logo mark

A squircle (`rounded-lg`, or an SVG `rect rx="7.5"` on a 32-unit viewBox) in one
of two styles:
- **Simple:** `bg-primary text-primary-foreground grid size-7 place-items-center rounded-lg shadow-sm`
  with a 2–2.4px-stroke, round-capped SVG glyph.
- **Premium:** a dark gradient squircle (`#0f172a → #090d16`) with a 12% white
  inner ring, a crisp white glyph, and a single accent colour (e.g. emerald).

Next to it: the wordmark `font-semibold tracking-tight text-[1.05rem]`.

## Status and phase badges

Map a status to a variant **and** a lucide icon, so status reads without colour:
active/open → `default` (primary) with a live icon; finished → `secondary`
with `CheckCircle2`; draft → `outline`; problems → `destructive`. Keep the
label short ("Submissions open", "Results published").

## Countdown / relative time

`"Submission deadline in 3 days"`, re-rendering each minute; absolute dates on
hover or as a second line. Use `Intl.RelativeTimeFormat` and
`Intl.DateTimeFormat`; never hand-format dates.

## Timeline

`ol.relative.flex.flex-col.gap-5.border-l.pl-5`; each item a dot
`absolute -left-[1.6rem] top-1 size-3 rounded-full border-2` (filled
`border-primary bg-primary` when past, `border-border bg-background` when not),
a label (muted when future) and a `text-xs` date + relative time.

## CopyButton

```tsx
export function CopyButton({ value, label = "Copy", iconOnly = false }: { value: string; label?: string; iconOnly?: boolean }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => { if (!copied) return; const t = setTimeout(() => setCopied(false), 1500); return () => clearTimeout(t); }, [copied]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); }
    catch { toast.error("Couldn't access the clipboard — select the text instead"); }
  };
  const icon = copied ? <Check className="text-success" /> : <Copy />;
  return iconOnly
    ? <Button type="button" size="icon-sm" variant="ghost" aria-label={label} onClick={copy}>{icon}</Button>
    : <Button type="button" size="sm" variant="outline" onClick={copy}>{icon} {copied ? "Copied" : label}</Button>;
}
```

## Empty state

```tsx
<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon"><Compass /></EmptyMedia>
    <EmptyTitle>No bookings yet</EmptyTitle>
    <EmptyDescription>When guests book one of your listings, it shows up here.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent><Button nativeButton={false} render={<Link href="/listings/new" />}>Add a listing</Button></EmptyContent>
</Empty>
```

Title states the fact; description says what to do next; one primary action.

## Formatting helpers

`formatDate`, `formatDateTime`, `formatRange` (Intl `formatRange`),
`relativeTime`, `formatNumber(n, digits)`, `formatMoney` (Intl currency),
`initials`, `pluralize(n, "review")`. Show "—" for missing values, never
"null", "NaN" or "undefined".
