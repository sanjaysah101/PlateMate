"use client";

import { AlertCircle, ArrowRight, RefreshCw, ShieldAlert, UtensilsCrossed } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodAuditResult, FriendProfile } from "@/lib/tabpfn-types";

import { TabPFNInspector } from "./tabpfn-inspector";

interface AuditDashboardProps {
  audit: FoodAuditResult;
  friend: FriendProfile;
  onOpenWaiterCard: () => void;
  onScanAnother: () => void;
}

export function AuditDashboard({
  audit,
  friend,
  onOpenWaiterCard,
  onScanAnother,
}: AuditDashboardProps) {
  const isDangerous = audit.overallSafety === "DANGEROUS";
  const isCaution = audit.overallSafety === "CAUTION";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Main Verdict Banner */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all ${
          isDangerous
            ? "border-rose-500/50 bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-background shadow-xl shadow-rose-500/10"
            : isCaution
              ? "border-amber-500/50 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-background shadow-xl shadow-amber-500/10"
              : "border-emerald-500/50 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-background shadow-xl shadow-emerald-500/10"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={`text-xs font-extrabold uppercase px-3 py-1 tracking-wider ${
                  isDangerous
                    ? "bg-rose-500 text-white"
                    : isCaution
                      ? "bg-amber-500 text-white"
                      : "bg-emerald-500 text-white"
                }`}
              >
                {isDangerous
                  ? "⛔ Strictly Dangerous for Alex"
                  : isCaution
                    ? "⚠️ Caution / Cross-Contamination Risk"
                    : "✅ Verified Safe for Alex"}
              </Badge>

              <Badge
                variant="outline"
                className="border-border text-xs text-muted-foreground font-mono"
              >
                TabPFN Confidence: {audit.confidencePct}%
              </Badge>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {audit.foodName}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                {isDangerous
                  ? `TabPFN identified high-risk allergen matches against ${friend.name}'s medical profile. Even micro-dosing poses severe reaction risks.`
                  : isCaution
                    ? `Potential facility cross-contact or derivative ambiguity detected. Needs kitchen confirmation.`
                    : `Zero matching allergen triggers or hidden derivatives found in the tabular in-context space. Safe for ${friend.name}.`}
              </p>
            </div>
          </div>

          {/* Quick Score Gauge */}
          <div className="flex flex-row md:flex-col items-center justify-between md:justify-center rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 text-center shrink-0 min-w-[140px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Calculated Risk
            </span>
            <div className="my-1 text-3xl sm:text-4xl font-black">
              <span
                className={
                  isDangerous ? "text-rose-500" : isCaution ? "text-amber-500" : "text-emerald-500"
                }
              >
                {audit.overallRiskScore}
              </span>
              <span className="text-xs text-muted-foreground font-normal">/100</span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {audit.tabpfnIngredients.length} ingredients evaluated
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={onOpenWaiterCard}
              className="gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20"
            >
              <ShieldAlert className="size-4" />
              Generate Server Safe Card
            </Button>

            <Button variant="outline" size="sm" onClick={onScanAnother} className="gap-1.5 text-xs">
              <RefreshCw className="size-3.5" />
              Scan Another Dish
            </Button>
          </div>

          <span className="text-xs text-muted-foreground italic">
            Prior Labs TabPFN In-Context Classification
          </span>
        </div>
      </div>

      {/* Allergen Red Flags Card */}
      {audit.allergenFlags.length > 0 && (
        <Card className="border-rose-500/30 bg-rose-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="size-5" />
              Allergen Flags & Trigger Derivatives ({audit.allergenFlags.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Ingredients in this food item that violate {friend.name}'s active safety rules:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {audit.allergenFlags.map((flag) => (
              <div
                key={`${flag.allergen}-${flag.foundIn}`}
                className="rounded-lg border border-rose-500/20 bg-background/80 p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-foreground text-sm">{flag.allergen}</span>
                    <Badge
                      variant="outline"
                      className="border-rose-500/40 text-rose-500 font-bold uppercase text-[10px]"
                    >
                      {flag.severity} RISK
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Triggered by ingredient:{" "}
                    <strong className="text-foreground">{flag.foundIn}</strong>
                  </p>
                  <p className="text-muted-foreground">{flag.riskDetails}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Safe Kitchen Swaps & Alternatives */}
      {audit.safeSubstitutions.length > 0 && (
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <UtensilsCrossed className="size-5" />
              Chef Safe Swaps & Substitutions
            </CardTitle>
            <CardDescription className="text-xs">
              How the restaurant kitchen or home cook can prepare this dish safely for {friend.name}
              :
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {audit.safeSubstitutions.map((swap) => (
              <div
                key={`${swap.originalIngredient}-${swap.safeAlternative}`}
                className="rounded-lg border border-emerald-500/20 bg-background/80 p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="line-through text-rose-500/80">{swap.originalIngredient}</span>
                    <ArrowRight className="size-3 text-muted-foreground" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {swap.safeAlternative}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{swap.notes}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* TabPFN Model Deep-Dive Component */}
      <TabPFNInspector audit={audit} />
    </div>
  );
}
