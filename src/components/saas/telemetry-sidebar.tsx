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
      <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground space-y-2">
        <Cpu className="size-6 text-muted-foreground mx-auto" />
        <p className="font-semibold text-foreground">Awaiting In-Context Diagnostic</p>
        <p>Select any dish or input ingredient text on the left to trigger TabPFN evaluation.</p>
      </div>
    );
  }

  const isDangerous = audit.overallSafety === "DANGEROUS";
  const isCaution = audit.overallSafety === "CAUTION";

  // Score arc calculation for circular gauge
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (audit.overallRiskScore / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Top Main Diagnosis Card */}
      <Card
        className={`border overflow-hidden transition-all duration-300 shadow-md ${
          isDangerous
            ? "border-rose-500/50 bg-gradient-to-br from-rose-950/20 via-card to-card"
            : isCaution
              ? "border-amber-500/50 bg-gradient-to-br from-amber-950/20 via-card to-card"
              : "border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-card to-card"
        }`}
      >
        <CardHeader className="p-4 pb-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              TabPFN Safety Verdict
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              Confidence: <strong>{audit.confidencePct}%</strong>
            </span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <div className="relative size-14 rounded-xl overflow-hidden border border-border/80 shrink-0">
              <Image src={dishImage} alt={audit.foodName} fill className="object-cover" />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-extrabold text-sm text-foreground truncate">{audit.foodName}</h3>
              <div>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                    isDangerous
                      ? "bg-rose-600 text-white"
                      : isCaution
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-600 text-white"
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
          {/* Circular SVG Gauge & Risk Breakdown */}
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3.5">
            <div className="space-y-1 text-xs">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Risk Index
              </span>
              <div className="text-xl font-black">
                <span
                  className={
                    isDangerous
                      ? "text-rose-500"
                      : isCaution
                        ? "text-amber-500"
                        : "text-emerald-500"
                  }
                >
                  {audit.overallRiskScore}
                </span>
                <span className="text-xs text-muted-foreground font-normal"> / 100</span>
              </div>
              <div className="text-[10px] text-muted-foreground">
                For patient: <strong>{friend.name}</strong>
              </div>
            </div>

            <div className="relative size-20 shrink-0 flex items-center justify-center">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 100 100"
                role="img"
                aria-label="Allergen Risk Gauge"
              >
                <title>Allergen Risk Gauge</title>
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-muted/40"
                  strokeWidth="7"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`transition-all duration-700 ease-out ${
                    isDangerous
                      ? "stroke-rose-500"
                      : isCaution
                        ? "stroke-amber-500"
                        : "stroke-emerald-500"
                  }`}
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-foreground">{audit.overallRiskScore}%</span>
              </div>
            </div>
          </div>

          {/* Quick Server Card CTA */}
          <Button
            size="sm"
            onClick={onOpenWaiterCard}
            className="w-full h-8 text-xs font-bold gap-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs"
          >
            <ShieldAlert className="size-3.5" />
            Generate Server Dining Card
          </Button>
        </CardContent>
      </Card>

      {/* Allergen Triggers Alert */}
      {audit.allergenFlags.length > 0 && (
        <Card className="border-rose-500/30 bg-card shadow-xs">
          <CardHeader className="p-3.5 pb-2 border-b border-border/50">
            <CardTitle className="text-xs font-bold text-rose-500 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertCircle className="size-3.5" />
              Active Allergen Triggers ({audit.allergenFlags.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 space-y-2 text-xs">
            {audit.allergenFlags.map((flag) => (
              <div
                key={`${flag.allergen}-${flag.foundIn}`}
                className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-xs">{flag.allergen}</span>
                  <span className="text-[10px] font-bold uppercase text-rose-500">
                    {flag.severity}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">Found in: {flag.foundIn}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{flag.riskDetails}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Chef Substitutions */}
      {audit.safeSubstitutions.length > 0 && (
        <Card className="border-emerald-500/30 bg-card shadow-xs">
          <CardHeader className="p-3.5 pb-2 border-b border-border/50">
            <CardTitle className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
              <UtensilsCrossed className="size-3.5" />
              Kitchen Swaps ({audit.safeSubstitutions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 space-y-2 text-xs">
            {audit.safeSubstitutions.map((swap) => (
              <div
                key={`${swap.originalIngredient}-${swap.safeAlternative}`}
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 space-y-1"
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span className="line-through text-rose-500/70">{swap.originalIngredient}</span>
                  <ArrowRight className="size-3 text-muted-foreground" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {swap.safeAlternative}
                  </span>
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
