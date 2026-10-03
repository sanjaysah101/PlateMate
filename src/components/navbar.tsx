"use client";

import { Award, Heart, ShieldAlert, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface NavbarProps {
  friend: FriendProfile;
  onOpenProfile: () => void;
  onOpenWaiterCard: () => void;
}

export function Navbar({ friend, onOpenProfile, onOpenWaiterCard }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 via-amber-500 to-emerald-500 shadow-lg shadow-rose-500/20 text-xl font-bold text-white ring-1 ring-white/20">
            🥗
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-foreground">
                Plate<span className="text-rose-500">Mate</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="size-2.5" />
                TabPFN Tabular AI
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Hacktoberfest 2026 • Challenge 1: Build for a Friend
            </p>
          </div>
        </div>

        {/* Center / Hackathon Badge */}
        <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1 text-xs text-muted-foreground shadow-xs">
          <Award className="size-3.5 text-amber-500" />
          <span>
            Dev Challenge: <strong>Build for a Friend</strong>
          </span>
          <span className="text-border">•</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Prior Labs TabPFN Category
          </span>
        </div>

        {/* Actions & Friend Status Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenWaiterCard}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold border-rose-500/30 text-foreground hover:bg-rose-500/10 hover:border-rose-500/50"
          >
            <ShieldAlert className="size-3.5 text-rose-500" />
            Waiter Safe Card
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenProfile}
            className="flex items-center gap-2 rounded-full border border-border bg-card/80 hover:bg-card px-3 py-1.5 shadow-xs transition-all hover:border-rose-500/40"
          >
            <span className="text-base select-none">{friend.avatar}</span>
            <div className="text-left text-xs leading-tight">
              <div className="font-extrabold text-foreground flex items-center gap-1">
                {friend.name}
                <Heart className="size-3 fill-rose-500 text-rose-500" />
              </div>
              <div className="text-[10px] text-muted-foreground">
                {friend.rules.filter((r) => r.severity === "severe").length} Severe Rules
              </div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
