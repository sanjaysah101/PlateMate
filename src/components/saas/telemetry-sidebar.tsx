"use client";

import Image from "next/image";

import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Cpu,
  ShieldAlert,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodAuditResult, FriendProfile } from "@/lib/tabpfn-types";

interface TelemetrySidebarProps {
  audit: FoodAuditResult | null;
  friend: FriendProfile;
  dishImage?: string;
  onOpenWaiterCard: () => void;
}

export function TelemetrySidebar({
  audit,
  friend,
  dishImage = "/dishes/pad_thai.jpg",
  onOpenWaiterCard,
}: TelemetrySidebarProps) {
  if (!audit) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground space-y-2 bg-card">
        <Cpu className="size-5 text-muted-foreground mx-auto" />
        <p className="font-medium text-foreground">Awaiting In-Context Diagnostic</p>
        <p>Select any dish or enter ingredients to evaluate with TabPFN.</p>
      </div>
    );
  }

  const isDangerous = audit.overallSafety === "DANGEROUS";
  const isCaution = audit.overallSafety === "CAUTION";

  // Score arc calculation for circular gauge
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (audit.overallRiskScore / 100) * circumference;

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Main Safety Diagnosis Card */}
      <Card className="border-border bg-card shadow-2xs overflow-hidden">
        <CardHeader className="p-4 pb-3 border-b border-border bg-muted/20">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground uppercase tracking-wide text-[11px]">
              Safety Verdict
            </span>
            <span className="font-mono text-muted-foreground text-[11px]">
              Confidence: <strong className="text-foreground">{audit.confidencePct}%</strong>
            </span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <div className="relative size-12 rounded-md overflow-hidden border border-border shrink-0 bg-muted">
              <Image
                src={dishImage}
                alt={audit.foodName}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-semibold text-sm text-foreground truncate">{audit.foodName}</h3>
              <div>
                <span
                  className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    isDangerous
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : isCaution
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {isDangerous ? (
                    <ShieldAlert className="size-3" />
                  ) : isCaution ? (
                    <AlertTriangle className="size-3" />
                  ) : (
                    <ShieldCheck className="size-3" />
                  )}
                  {isDangerous ? "Severe Hazard" : isCaution ? "Caution / Trace" : "Verified Safe"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Circular SVG Gauge & Risk Index */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3">
            <div className="space-y-0.5 text-xs">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Calibrated Risk Index
              </span>
              <div className="text-2xl font-semibold tabular-nums">
                <span
                  className={
                    isDangerous
                      ? "text-destructive"
                      : isCaution
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                  }
                >
                  {audit.overallRiskScore}
                </span>
                <span className="text-xs text-muted-foreground font-normal"> / 100</span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Evaluated for: <strong className="text-foreground">{friend.name}</strong>
              </div>
            </div>

            <div className="relative size-18 shrink-0 flex items-center justify-center">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 100 100"
                role="img"
                aria-label="Allergen Risk Gauge"
              >
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-muted"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`transition-all duration-700 ease-out ${
                    isDangerous
                      ? "stroke-destructive"
                      : isCaution
                        ? "stroke-amber-500"
                        : "stroke-emerald-500"
                  }`}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold tabular-nums text-foreground">
                  {audit.overallRiskScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Quick Server Card CTA */}
          <Button
            size="sm"
            onClick={onOpenWaiterCard}
            className="w-full h-8 text-xs font-medium gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-2xs"
          >
            <ShieldAlert className="size-3.5" />
            Generate Server Dining Pass
          </Button>
        </CardContent>
      </Card>

      {/* 2. Allergen Triggers Alert */}
      {audit.allergenFlags.length > 0 && (
        <Card className="border-destructive/30 bg-card shadow-2xs">
          <CardHeader className="p-3.5 pb-2 border-b border-border/80">
            <CardTitle className="text-xs font-semibold text-destructive flex items-center gap-1.5 uppercase tracking-wide">
              <AlertCircle className="size-3.5" />
              Active Allergen Triggers ({audit.allergenFlags.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 space-y-2 text-xs">
            {audit.allergenFlags.map((flag) => (
              <div
                key={`${flag.allergen}-${flag.foundIn}`}
                className="rounded-md border border-destructive/20 bg-destructive/5 p-2.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-xs">{flag.allergen}</span>
                  <span className="text-[10px] font-semibold uppercase text-destructive">
                    {flag.severity}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">Source: {flag.foundIn}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{flag.riskDetails}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 3. Kitchen Safe Substitutions */}
      {audit.safeSubstitutions.length > 0 && (
        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-3.5 pb-2 border-b border-border/80">
            <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <UtensilsCrossed className="size-3.5 text-primary" />
              Recommended Kitchen Swaps ({audit.safeSubstitutions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 space-y-2 text-xs">
            {audit.safeSubstitutions.map((swap) => (
              <div
                key={`${swap.originalIngredient}-${swap.safeAlternative}`}
                className="rounded-md border border-border bg-muted/20 p-2.5 space-y-1"
              >
                <div className="flex items-center gap-1.5 font-medium text-xs">
                  <span className="line-through text-destructive/80">
                    {swap.originalIngredient}
                  </span>
                  <ArrowRight className="size-3 text-muted-foreground" />
                  <span className="text-foreground font-semibold">{swap.safeAlternative}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">{swap.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
