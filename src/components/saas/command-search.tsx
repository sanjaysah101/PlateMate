"use client";

import { useEffect, useRef, useState } from "react";

import { Award, Cpu, FileText, Scan, Search, ShieldAlert, ShieldCheck, X } from "lucide-react";

import { SAMPLE_FOOD_DATABASE, type SampleFoodItem } from "@/lib/food-database";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface CommandSearchProps {
  friend: FriendProfile;
  onSelectPreset: (item: SampleFoodItem) => void;
  onSelectView: (view: string) => void;
}

const NAV_ITEMS = [
  { id: "scanner", label: "Diagnostic Scanner", icon: Scan, desc: "Run TabPFN food safety audit" },
  { id: "tabpfn-lab", label: "TabPFN Neural Lab", icon: Cpu, desc: "Explore model architecture" },
  {
    id: "allergen-vault",
    label: "Allergen Defense Rules",
    icon: ShieldCheck,
    desc: "Manage allergy rules",
  },
  {
    id: "dining-passport",
    label: "Dining Passports",
    icon: FileText,
    desc: "Multilingual waiter cards",
  },
  { id: "hackathon", label: "DEV Challenge #1", icon: Award, desc: "View hackathon submission" },
];

const RISK_COLOR = {
  SAFE: "text-emerald-500",
  CAUTION: "text-amber-500",
  DANGEROUS: "text-rose-500",
} as const;

const RISK_BG = {
  SAFE: "bg-emerald-500/10 border-emerald-500/20",
  CAUTION: "bg-amber-500/10 border-amber-500/20",
  DANGEROUS: "bg-rose-500/10 border-rose-500/20",
} as const;

export function CommandSearch({ friend, onSelectPreset, onSelectView }: CommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const q = query.toLowerCase().trim();

  const filteredNav = q
    ? NAV_ITEMS.filter((n) => n.label.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q))
    : NAV_ITEMS.slice(0, 3);

  const filteredDishes = q
    ? SAMPLE_FOOD_DATABASE.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.cuisineOrBrand.toLowerCase().includes(q) ||
          d.cuisine.toLowerCase().includes(q) ||
          d.rawIngredients.toLowerCase().includes(q) ||
          d.riskHighlights.some((r) => r.toLowerCase().includes(q))
      )
    : SAMPLE_FOOD_DATABASE.slice(0, 3);

  const allergenResults = q
    ? friend.rules.filter(
        (r) =>
          r.allergenName.toLowerCase().includes(q) ||
          r.allergenId.toLowerCase().includes(q) ||
          r.notes.toLowerCase().includes(q)
      )
    : [];

  const hasResults =
    filteredNav.length > 0 || filteredDishes.length > 0 || allergenResults.length > 0;

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-lg border border-border/80 bg-background/60 hover:bg-background px-3 py-1.5 text-xs text-muted-foreground w-72 shadow-2xs transition-all hover:border-border hover:shadow-sm group"
      >
        <Search className="size-3.5 shrink-0 group-hover:text-foreground transition-colors" />
        <span className="flex-1 text-left">Search dishes, allergens, views...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Command Palette Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close command palette"
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm cursor-default w-full h-full"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="fixed left-1/2 top-[12%] z-50 w-full max-w-[560px] -translate-x-1/2 rounded-2xl border border-border/80 bg-card shadow-2xl ring-1 ring-black/5 overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search dishes, allergens, navigation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-border bg-muted/60 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto py-2">
              {!hasResults && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results found for "{query}"
                </p>
              )}

              {/* Navigation */}
              {filteredNav.length > 0 && (
                <div className="px-2 pb-2">
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    {q ? "Navigation" : "Quick Navigation"}
                  </p>
                  {filteredNav.map((nav) => {
                    const Icon = nav.icon;
                    return (
                      <button
                        key={nav.id}
                        type="button"
                        onClick={() => {
                          onSelectView(nav.id);
                          setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted/60 transition-colors group"
                      >
                        <div className="size-7 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Icon className="size-3.5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-xs truncate">
                            {nav.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">{nav.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Dishes */}
              {filteredDishes.length > 0 && (
                <div className="px-2 pb-2">
                  {filteredNav.length > 0 && <div className="my-1 border-t border-border/40" />}
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    {q ? "Dishes" : "Sample Dishes"}
                  </p>
                  {filteredDishes.map((dish) => {
                    const verdict = dish.expectedVerdictForAlex;
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        onClick={() => {
                          onSelectPreset(dish);
                          onSelectView("scanner");
                          setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted/60 transition-colors group"
                      >
                        <div
                          className={`size-7 rounded-md border flex items-center justify-center shrink-0 text-[10px] font-black ${RISK_BG[verdict]}`}
                        >
                          <span className={RISK_COLOR[verdict]}>
                            {verdict === "DANGEROUS" ? "✕" : verdict === "CAUTION" ? "⚠" : "✓"}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-xs truncate">
                            {dish.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {dish.cuisineOrBrand} · {dish.cuisine}
                          </p>
                        </div>
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${
                            verdict === "DANGEROUS"
                              ? "bg-rose-600 text-white"
                              : verdict === "CAUTION"
                                ? "bg-amber-500 text-white"
                                : "bg-emerald-600 text-white"
                          }`}
                        >
                          {verdict}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Allergens */}
              {allergenResults.length > 0 && (
                <div className="px-2 pb-2">
                  <div className="my-1 border-t border-border/40" />
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    Allergen Rules
                  </p>
                  {allergenResults.map((rule) => (
                    <button
                      key={rule.allergenId}
                      type="button"
                      onClick={() => {
                        onSelectView("allergen-vault");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted/60 transition-colors"
                    >
                      <div className="size-7 rounded-md bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                        <ShieldAlert className="size-3.5 text-rose-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-xs">{rule.allergenName}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{rule.notes}</p>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${
                          rule.severity === "severe"
                            ? "bg-rose-500/15 text-rose-500"
                            : rule.severity === "moderate"
                              ? "bg-amber-500/15 text-amber-600"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {rule.severity}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-border/60 px-4 py-2 flex items-center gap-3 text-[10px] text-muted-foreground bg-muted/20">
              <span>
                <kbd className="rounded border border-border bg-background px-1 font-mono">↵</kbd>{" "}
                to select
              </span>
              <span>
                <kbd className="rounded border border-border bg-background px-1 font-mono">↑↓</kbd>{" "}
                navigate
              </span>
              <span>
                <kbd className="rounded border border-border bg-background px-1 font-mono">Esc</kbd>{" "}
                dismiss
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
