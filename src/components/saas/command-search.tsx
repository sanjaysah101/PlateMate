"use client";

import { useEffect, useRef, useState } from "react";

import { Cpu, Languages, Scan, Search, ShieldAlert, ShieldCheck, Sparkles, X } from "lucide-react";

import { SAMPLE_FOOD_DATABASE, type SampleFoodItem } from "@/lib/food-database";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface CommandSearchProps {
  friend: FriendProfile;
  onSelectPreset: (item: SampleFoodItem) => void;
  onSelectView: (view: string) => void;
}

const NAV_ITEMS = [
  {
    id: "scanner",
    label: "Diagnostic Scanner",
    icon: Scan,
    desc: "Run real-time culinary safety audit",
  },
  {
    id: "tabpfn-lab",
    label: "TabPFN AI Lab",
    icon: Cpu,
    desc: "Explore in-context feature vectors",
  },
  {
    id: "allergen-vault",
    label: "Allergen Rules",
    icon: ShieldCheck,
    desc: "Manage sensitivity matrix and banned words",
  },
  {
    id: "dining-passport",
    label: "Dining Passports",
    icon: Languages,
    desc: "Multilingual emergency server cards",
  },
  {
    id: "hackathon",
    label: "Challenge Brief",
    icon: Sparkles,
    desc: "View architectural documentation",
  },
];

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
    : NAV_ITEMS.slice(0, 4);

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
        className="hidden md:flex items-center gap-2 rounded-md border border-border bg-card hover:bg-secondary px-3 py-1.5 text-xs text-muted-foreground w-72 shadow-2xs transition-colors group cursor-pointer"
      >
        <Search className="size-3.5 shrink-0 group-hover:text-foreground transition-colors" />
        <span className="flex-1 text-left truncate">Search dishes, allergens, rules...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.2 font-mono text-[10px] text-muted-foreground">
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
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-xs cursor-default w-full h-full"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="fixed left-1/2 top-[12%] z-50 w-full max-w-[540px] -translate-x-1/2 rounded-xl border border-border bg-card shadow-xl overflow-hidden animate-fade-slide-in">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search dishes, allergens, navigation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[380px] overflow-y-auto py-2">
              {!hasResults && (
                <p className="px-4 py-8 text-center text-xs text-muted-foreground">
                  No matches found for &ldquo;{query}&rdquo;
                </p>
              )}

              {/* Navigation */}
              {filteredNav.length > 0 && (
                <div className="px-2 pb-2">
                  <p className="px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    {q ? "NAVIGATION" : "QUICK JUMP"}
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
                        className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-secondary transition-colors group cursor-pointer"
                      >
                        <div className="size-6 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
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
                  {filteredNav.length > 0 && <div className="my-1 border-t border-border" />}
                  <p className="px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    {q ? "DISHES" : "CURATED DISHES"}
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
                        className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-secondary transition-colors group cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-xs truncate">
                            {dish.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {dish.cuisineOrBrand} · {dish.cuisine}
                          </p>
                        </div>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 ${
                            verdict === "DANGEROUS"
                              ? "bg-destructive/10 text-destructive border border-destructive/20"
                              : verdict === "CAUTION"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
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
                  <div className="my-1 border-t border-border" />
                  <p className="px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    ALLERGEN RULES
                  </p>
                  {allergenResults.map((rule) => (
                    <button
                      key={rule.allergenId}
                      type="button"
                      onClick={() => {
                        onSelectView("allergen-vault");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <div className="size-6 rounded-md bg-destructive/10 flex items-center justify-center shrink-0">
                        <ShieldAlert className="size-3.5 text-destructive" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-xs">{rule.allergenName}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{rule.notes}</p>
                      </div>
                      <span
                        className={`text-[9px] font-medium px-1.5 py-0.5 rounded uppercase shrink-0 ${
                          rule.severity === "severe"
                            ? "bg-destructive/10 text-destructive"
                            : rule.severity === "moderate"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
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

            {/* Footer keyboard hints */}
            <div className="border-t border-border px-4 py-2 flex items-center gap-3 text-[10px] text-muted-foreground bg-muted/20">
              <span>
                <kbd className="rounded border border-border bg-background px-1 font-mono">↵</kbd>{" "}
                select
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
