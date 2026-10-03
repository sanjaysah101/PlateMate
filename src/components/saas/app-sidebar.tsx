"use client";

import {
  Award,
  ChevronRight,
  Cpu,
  FileText,
  Heart,
  Scan,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface AppSidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  friend: FriendProfile;
  onOpenProfile: () => void;
  onOpenWaiterCard: () => void;
}

export function AppSidebar({
  currentView,
  onSelectView,
  friend,
  onOpenProfile,
  onOpenWaiterCard,
}: AppSidebarProps) {
  const navItems = [
    {
      id: "scanner",
      label: "Diagnostic Scanner",
      icon: Scan,
      badge: "Live",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      id: "tabpfn-lab",
      label: "TabPFN Neural Lab",
      icon: Cpu,
      badge: "Prior Labs",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
    },
    {
      id: "allergen-vault",
      label: "Allergen Defense Rules",
      icon: ShieldCheck,
      badge: `${friend.rules.length} Active`,
      badgeColor: "bg-muted text-muted-foreground border-border",
    },
    {
      id: "dining-passport",
      label: "Dining Passports",
      icon: FileText,
      badge: "5 Langs",
      badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    },
    {
      id: "hackathon",
      label: "DEV Challenge #1",
      icon: Award,
      badge: "$250 + $200",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-border/70 bg-card/50 backdrop-blur-xl flex flex-col justify-between h-screen sticky top-0 select-none overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col gap-6 p-4">
        {/* Workspace Brand / Friend Switcher */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-1 ring-white/20">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-foreground flex items-center gap-1.5">
                PlateMate
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-muted text-muted-foreground">
                  v1.0
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                Dietary Safety AI
              </span>
            </div>
          </div>
        </div>

        {/* Friend Active Anchor Card */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-full text-left rounded-xl border border-border/80 bg-background/50 hover:bg-background p-2.5 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full bg-rose-500/10 flex items-center justify-center text-sm border border-rose-500/20">
                {friend.avatar}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground group-hover:text-rose-500 transition-colors flex items-center gap-1">
                  {friend.name}
                  <Heart className="size-2.5 fill-rose-500 text-rose-500" />
                </span>
                <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                  Celiac & Anaphylaxis
                </span>
              </div>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Nav Links */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
            Workspace
          </div>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm nav-active-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-6 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        isActive ? "bg-primary-foreground/15" : "bg-muted/80 group-hover:bg-muted"
                      }`}
                    >
                      <Icon
                        className={`size-3.5 ${
                          isActive ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? "border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom User / Status Panel */}
      <div className="p-4 border-t border-border/60 space-y-3">
        {/* TabPFN Telemetry Status */}
        <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5 text-[11px] space-y-1.5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-gentle-ping" />
              TabPFN Model v2
            </span>
            <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded px-1">
              Live
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Prior Labs tabular engine active. Local-first privacy.
          </p>
        </div>

        {/* Quick Server Card Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenWaiterCard}
          className="w-full text-xs font-semibold gap-1.5 border-rose-500/30 hover:bg-rose-500/10 text-foreground"
        >
          <ShieldAlert className="size-3.5 text-rose-500" />
          Server Safe Card
        </Button>
      </div>
    </aside>
  );
}
