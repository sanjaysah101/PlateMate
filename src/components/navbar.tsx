"use client";

import { Award, Heart, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface NavbarProps {
  friend: FriendProfile;
  onOpenProfile: () => void;
  onOpenWaiterCard: () => void;
}

export function Navbar({ friend, onOpenProfile, onOpenWaiterCard }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-500 shadow-md shadow-rose-500/20 text-xl font-bold text-white">
            🥗
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-foreground">
                Plate<span className="text-rose-500">Mate</span>
              </span>
              <Badge
                variant="outline"
                className="hidden border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:inline-flex gap-1 items-center"
              >
                <Sparkles className="size-3" />
                TabPFN Powered
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Hacktoberfest 2026: Build for a Friend
            </p>
          </div>
        </div>

        {/* Center / Challenge Badge */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
          <Award className="size-3.5 text-amber-500" />
          <span>
            Dev Challenge #1: <strong>Build for a Friend</strong>
          </span>
          <span className="text-border">•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            Prior Labs TabPFN Category
          </span>
        </div>

        {/* Actions & Friend Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenWaiterCard}
            className="hidden sm:inline-flex gap-1.5 text-xs font-semibold"
          >
            <ShieldCheck className="size-3.5 text-rose-500" />
            Waiter Safe Card
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenProfile}
            className="flex items-center gap-2 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-full"
          >
            <span className="text-base">{friend.avatar}</span>
            <div className="text-left text-xs leading-none">
              <span className="font-bold text-foreground flex items-center gap-1">
                {friend.name}
                <Heart className="size-3 fill-rose-500 text-rose-500" />
              </span>
              <span className="text-[10px] text-muted-foreground">
                {friend.rules.length} Active Rules
              </span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
