"use client";

import {
  ChevronRight,
  Cpu,
  Languages,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
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
  const primaryNav = [
    {
      id: "scanner",
      label: "Diagnostic Scanner",
      icon: Scan,
      badge: "Real-time",
    },
    {
      id: "tabpfn-lab",
      label: "TabPFN AI Lab",
      icon: Cpu,
      badge: "v2 Active",
    },
    {
      id: "allergen-vault",
      label: "Allergen Rules",
      icon: ShieldCheck,
      badge: `${friend.rules.length} rules`,
    },
    {
      id: "dining-passport",
      label: "Dining Passports",
      icon: Languages,
      badge: "5 langs",
    },
  ];

  const secondaryNav = [
    {
      id: "hackathon",
      label: "Challenge Brief",
      icon: Sparkles,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col justify-between h-screen sticky top-0 select-none overflow-hidden transition-colors">
      {/* Top Section */}
      <div className="flex flex-col gap-5 p-4">
        {/* Workspace Brand Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-xs">
              <ShieldCheck className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-foreground flex items-center gap-1.5">
                PlateMate
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  Pro
                </span>
              </span>
              <span className="text-[11px] text-muted-foreground font-normal">
                Dietary Safety Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Active Profile Pill / Switcher */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-full text-left rounded-lg border border-border bg-card/60 hover:bg-card p-2.5 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                {friend.avatar || <User className="size-3.5" />}
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {friend.name}
                </span>
                <span className="text-[10px] text-muted-foreground truncate">
                  Celiac · Peanut Anaphylaxis
                </span>
              </div>
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>
        </button>

        {/* Primary Workspace Navigation */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground">WORKSPACE</div>

          <nav className="space-y-0.5">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs transition-colors relative ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.75 rounded-r bg-primary" />
                  )}
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground bg-secondary/80"
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

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground">
            DOCUMENTATION
          </div>

          <nav className="space-y-0.5">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs transition-colors relative ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.75 rounded-r bg-primary" />
                  )}
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-2.5 bg-sidebar/50">
        {/* TabPFN Engine Status */}
        <div className="rounded-lg border border-border bg-card/60 p-2.5 text-[11px] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              TabPFN In-Context Engine
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">v2.0</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-snug">
            Synthetic prior transformer running locally on device.
          </p>
        </div>

        {/* Server Card Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenWaiterCard}
          className="w-full text-xs font-medium gap-1.5 h-8 border-border bg-card hover:bg-secondary text-foreground"
        >
          <ShieldAlert className="size-3.5 text-primary" />
          <span>Server Dining Pass</span>
        </Button>
      </div>
    </aside>
  );
}
