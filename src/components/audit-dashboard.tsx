"use client";

import Image from "next/image";

import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Cpu,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodAuditResult, FriendProfile } from "@/lib/tabpfn-types";

import { TabPFNInspector } from "./tabpfn-inspector";

interface AuditDashboardProps {
  audit: FoodAuditResult;
  friend: FriendProfile;
  dishImage?: string;
  onOpenWaiterCard: () => void;
  onScanAnother: () => void;
}

export function AuditDashboard({
  audit,
  friend,
  dishImage = "/dishes/pad_thai.jpg",
  onOpenWaiterCard,
  onScanAnother,
}: AuditDashboardProps) {
  const isDangerous = audit.overallSafety === "DANGEROUS";
  const isCaution = audit.overallSafety === "CAUTION";

  // Score arc calculation for circular gauge
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (audit.overallRiskScore / 100) * circumference;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* High-Impact Diagnostic Cockpit Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 transition-all duration-300 shadow-2xl ${
          isDangerous
            ? "border-rose-500/60 bg-gradient-to-br from-rose-950/30 via-card to-card shadow-rose-500/10"
            : isCaution
              ? "border-amber-500/60 bg-gradient-to-br from-amber-950/30 via-card to-card shadow-amber-500/10"
              : "border-emerald-500/60 bg-gradient-to-br from-emerald-950/30 via-card to-card shadow-emerald-500/10"
        }`}
      >
        {/* Subtle ambient lighting */}
        <div
          className={`pointer-events-none absolute -right-20 -top-20 size-80 rounded-full blur-3xl opacity-20 ${
            isDangerous ? "bg-rose-500" : isCaution ? "bg-amber-500" : "bg-emerald-500"
          }`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left: Dish Preview + Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-2xl">
            {/* Dish Thumbnail */}
            <div className="relative size-28 sm:size-32 rounded-2xl overflow-hidden border-2 border-border/80 shrink-0 shadow-md">
              <Image src={dishImage} alt={audit.foodName} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md">
                  {audit.category.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Verdict text */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-sm ${
                    isDangerous
                      ? "bg-rose-600 text-white"
                      : isCaution
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-600 text-white"
                  }`}
                >
                  {isDangerous ? (
                    <ShieldAlert className="size-3.5" />
                  ) : isCaution ? (
                    <AlertTriangle className="size-3.5" />
                  ) : (
                    <ShieldCheck className="size-3.5" />
                  )}
                  {isDangerous
                    ? "Severe Hazard For Alex"
                    : isCaution
                      ? "Caution / Shared Facility Risk"
                      : "Verified Safe For Alex"}
                </span>

                <span className="text-xs font-mono text-muted-foreground">
                  TabPFN Confidence: <strong>{audit.confidencePct}%</strong>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {audit.foodName}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isDangerous
                  ? `Prior Labs' TabPFN evaluated chemical vectors and flagged acute allergic triggers against ${friend.name}'s active Celiac / Anaphylaxis medical rules.`
                  : isCaution
                    ? `TabPFN identified potential cross-contamination on shared lines or fryer oil. Requires confirmation with kitchen staff.`
                    : `Zero matching allergen triggers or hidden derivatives identified in the in-context tabular feature space. Safe for ${friend.name}.`}
              </p>
            </div>
          </div>

          {/* Right: Circular SVG Risk Gauge */}
          <div className="flex items-center gap-6 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md p-5 shrink-0 self-start lg:self-auto shadow-sm">
            <div className="relative size-24 shrink-0 flex items-center justify-center">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 100 100"
                role="img"
                aria-label="Calculated Allergen Risk Score"
              >
                <title>Calculated Allergen Risk Score</title>
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-muted/40"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`transition-all duration-1000 ease-out ${
                    isDangerous
                      ? "stroke-rose-500"
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
                <span
                  className={`text-2xl font-black ${
                    isDangerous
                      ? "text-rose-500"
                      : isCaution
                        ? "text-amber-500"
                        : "text-emerald-500"
                  }`}
                >
                  {audit.overallRiskScore}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Risk Index
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-bold text-foreground">TabPFN Metrics</div>
              <div className="text-[11px] text-muted-foreground">
                Evaluated: <strong>{audit.tabpfnIngredients.length} ingredients</strong>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Anomalies:{" "}
                <strong
                  className={audit.tabpfnAnomalyCount > 0 ? "text-amber-500" : "text-emerald-500"}
                >
                  {audit.tabpfnAnomalyCount} flagged
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="default"
              size="default"
              onClick={onOpenWaiterCard}
              className="gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-500/25 px-5 rounded-xl"
            >
              <ShieldAlert className="size-4" />
              Generate Server Safe Card
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onScanAnother}
              className="gap-1.5 text-xs rounded-xl"
            >
              <RefreshCw className="size-3.5" />
              Scan Another Dish
            </Button>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Cpu className="size-3.5 text-emerald-500" />
            <span>Prior Labs In-Context Tabular Model</span>
          </div>
        </div>
      </div>

      {/* Allergen Red Flags Alert Cards */}
      {audit.allergenFlags.length > 0 && (
        <Card className="border-rose-500/40 bg-gradient-to-br from-card to-rose-500/5 shadow-md">
          <CardHeader className="pb-3 border-b border-rose-500/20">
            <CardTitle className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="size-5" />
              Identified Allergen Triggers ({audit.allergenFlags.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Ingredients in this food item that directly violate {friend.name}'s active medical
              profile:
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3">
            {audit.allergenFlags.map((flag) => (
              <div
                key={`${flag.allergen}-${flag.foundIn}`}
                className="rounded-xl border border-rose-500/30 bg-background/70 p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-foreground text-sm">{flag.allergen}</span>
                    <Badge
                      variant="outline"
                      className="border-rose-500/50 text-rose-500 font-extrabold uppercase text-[10px]"
                    >
                      {flag.severity} DANGER
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Triggered by component:{" "}
                    <strong className="text-foreground">{flag.foundIn}</strong>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{flag.riskDetails}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Safe Kitchen Swaps & Alternatives */}
      {audit.safeSubstitutions.length > 0 && (
        <Card className="border-emerald-500/40 bg-gradient-to-br from-card to-emerald-500/5 shadow-md">
          <CardHeader className="pb-3 border-b border-emerald-500/20">
            <CardTitle className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <UtensilsCrossed className="size-5" />
              Chef Safe Kitchen Substitutions
            </CardTitle>
            <CardDescription className="text-xs">
              Recommended culinary swaps allowing {friend.name} to safely enjoy this meal:
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3">
            {audit.safeSubstitutions.map((swap) => (
              <div
                key={`${swap.originalIngredient}-${swap.safeAlternative}`}
                className="rounded-xl border border-emerald-500/30 bg-background/70 p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="line-through text-rose-500/80">{swap.originalIngredient}</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                      {swap.safeAlternative}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{swap.notes}</p>
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
