"use client";

import { Plus, ShieldAlert } from "lucide-react";

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

const VIEW_TITLES: Record<string, string> = {
  scanner: "Food Diagnostic Scanner",
  "tabpfn-lab": "TabPFN Intelligence Laboratory",
  "allergen-vault": "Allergen Defense Rules",
  "dining-passport": "Multilingual Dining Passports",
  hackathon: "DEV Hacktoberfest 2026 Project Brief",
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
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-30 gap-4">
      {/* Left: Clean Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs min-w-0 shrink-0">
        <span className="text-muted-foreground font-medium hidden sm:inline">PlateMate</span>
        <span className="text-border hidden sm:inline">/</span>
        <span className="font-semibold text-foreground truncate">
          {VIEW_TITLES[currentView] ?? "Diagnostic Scanner"}
        </span>
      </div>

      {/* Center: Command Search */}
      <div className="flex-1 max-w-md mx-auto">
        <CommandSearch
          friend={friend}
          onSelectPreset={onSelectPreset}
          onSelectView={onSelectView}
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Engine Ready Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>TabPFN Ready</span>
        </div>

        {/* Profile Avatar Pill */}
        <button
          type="button"
          onClick={onOpenProfile}
          title={`Edit allergy rules for ${friend.name}`}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card hover:bg-secondary px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer"
        >
          <span className="text-sm">{friend.avatar || "👤"}</span>
          <span className="hidden md:inline text-foreground">{friend.name}</span>
        </button>

        {/* Waiter Card Secondary Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenWaiterCard}
          className="h-8 gap-1.5 text-xs font-medium border-border hover:bg-secondary text-foreground"
        >
          <ShieldAlert className="size-3.5 text-muted-foreground" />
          <span className="hidden sm:inline">Waiter Card</span>
        </Button>

        {/* Primary New Audit Action */}
        <Button
          size="sm"
          onClick={onNewScan}
          className="h-8 gap-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
        >
          <Plus className="size-3.5" />
          <span>New Audit</span>
        </Button>
      </div>
    </header>
  );
}
