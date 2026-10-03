"use client";

import { ShieldAlert, Zap } from "lucide-react";

import { CommandSearch } from "@/components/saas/command-search";
import { Button } from "@/components/ui/button";
import type { SampleFoodItem } from "@/lib/food-database";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface AppTopbarProps {
  currentView: string;
  friend: FriendProfile;
  onOpenProfile: () => void;
  onOpenWaiterCard: () => void;
  onNewScan: () => void;
  onSelectPreset: (item: SampleFoodItem) => void;
  onSelectView: (view: string) => void;
}

const VIEW_LABELS: Record<string, string> = {
  scanner: "Food Diagnostic Scanner",
  "tabpfn-lab": "TabPFN Neural Lab",
  "allergen-vault": "Allergen Defense Rules",
  "dining-passport": "Dining Passports",
  hackathon: "DEV Hacktoberfest 2026",
};

export function AppTopbar({
  currentView,
  friend,
  onOpenProfile,
  onOpenWaiterCard,
  onNewScan,
  onSelectPreset,
  onSelectView,
}: AppTopbarProps) {
  return (
    <header className="h-14 border-b border-border/70 bg-card/70 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-30 gap-4">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs min-w-0 shrink-0">
        <span className="text-muted-foreground font-medium hidden sm:inline">PlateMate</span>
        <span className="text-border hidden sm:inline">/</span>
        <span className="font-semibold text-foreground truncate">
          {VIEW_LABELS[currentView] ?? "Food Diagnostic Scanner"}
        </span>
      </div>

      {/* Center: Live Command Search */}
      <div className="flex-1 flex justify-center">
        <CommandSearch
          friend={friend}
          onSelectPreset={onSelectPreset}
          onSelectView={onSelectView}
        />
      </div>

      {/* Right: Status Pills & Primary CTAs */}
      <div className="flex items-center gap-2 shrink-0">
        {/* TabPFN Operational Status */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>TabPFN Ready</span>
        </div>

        {/* Active Friend Avatar Button */}
        <button
          type="button"
          onClick={onOpenProfile}
          title={`Manage ${friend.name}'s allergy profile`}
          className="flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/50 hover:bg-muted px-2.5 py-1.5 text-xs font-semibold transition-all hover:border-border hover:shadow-sm"
        >
          <span className="text-sm leading-none">{friend.avatar}</span>
          <span className="hidden xl:inline text-foreground">{friend.name}</span>
        </button>

        {/* Server Card CTA */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenWaiterCard}
          className="h-8 gap-1.5 text-xs font-semibold border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50"
        >
          <ShieldAlert className="size-3.5" />
          <span className="hidden sm:inline">Waiter Card</span>
        </Button>

        {/* New Audit Action */}
        <Button
          size="sm"
          onClick={onNewScan}
          className="h-8 gap-1.5 text-xs font-semibold shadow-xs"
        >
          <Zap className="size-3.5" />
          <span className="hidden sm:inline">New Audit</span>
        </Button>
      </div>
    </header>
  );
}
