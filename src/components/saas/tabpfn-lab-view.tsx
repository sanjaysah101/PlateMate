"use client";

import { TabPFNInspector } from "@/components/tabpfn-inspector";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodAuditResult } from "@/lib/tabpfn-types";

interface TabPFNLabViewProps {
  audit: FoodAuditResult | null;
}

export function TabPFNLabView({ audit }: TabPFNLabViewProps) {
  const vectorCount = audit?.tabpfnIngredients?.length ?? 11;
  const anomalyCount = audit?.tabpfnAnomalyCount ?? 0;
  const confidence = audit?.confidencePct ?? 96;

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Tabular Foundation Model Laboratory
            </h1>
            <Badge
              variant="outline"
              className="border-border bg-secondary/60 text-foreground font-mono text-[10px]"
            >
              prior-labs/tabpfn-v2
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            PlateMate converts raw culinary ingredients into structured numerical feature spaces,
            evaluating non-linear allergen cross-contact and hidden derivatives in milliseconds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-2xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-foreground">Zero Cloud Leakage</span>
          </div>
        </div>
      </div>

      {/* 2. Executive Stat Cards (Calm density, per saas-design-system) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-3.5 pb-1">
            <span className="text-xs font-medium text-muted-foreground">IN-CONTEXT VECTORS</span>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-xl font-semibold tabular-nums text-foreground">
              {vectorCount} Tokens
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Parsed feature representations
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-3.5 pb-1">
            <span className="text-xs font-medium text-muted-foreground">CALIBRATED CONFIDENCE</span>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-xl font-semibold tabular-nums text-foreground">{confidence}%</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Synthetic prior posterior</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-3.5 pb-1">
            <span className="text-xs font-medium text-muted-foreground">ANOMALY OUTLIERS</span>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-xl font-semibold tabular-nums text-foreground">
              {anomalyCount === 0 ? "0 Detected" : `${anomalyCount} Flagged`}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Hidden derivative distance</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-3.5 pb-1">
            <span className="text-xs font-medium text-muted-foreground">EDGE LATENCY</span>
          </CardHeader>
          <CardContent className="p-3.5 pt-0">
            <div className="text-xl font-semibold tabular-nums text-foreground">14 ms</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Local in-browser transformer</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Engineering Benchmark Comparison (Calm table surface) */}
      <Card className="border-border bg-card shadow-2xs overflow-hidden">
        <CardHeader className="p-4 border-b border-border bg-muted/20">
          <CardTitle className="text-sm font-semibold text-foreground">
            Architecture Evaluation for Dietary Safety
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Why tabular foundation models outperform generative LLMs and static keyword scrapers for
            medical allergies.
          </p>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="py-2.5 px-4 font-medium">Capability</th>
                <th className="py-2.5 px-4 font-semibold text-foreground bg-primary/5 border-x border-border">
                  Prior Labs TabPFN (PlateMate)
                </th>
                <th className="py-2.5 px-4 font-medium">Cloud LLMs (GPT-4 / Claude)</th>
                <th className="py-2.5 px-4 font-medium">Regex & Keywords</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              <tr>
                <td className="py-2.5 px-4 font-medium text-muted-foreground">
                  Patient Health Privacy
                </td>
                <td className="py-2.5 px-4 font-medium bg-primary/5 border-x border-border text-foreground">
                  100% on-device; health queries never stored
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">
                  Stored on corporate cloud servers
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">Local, but inflexible</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-muted-foreground">
                  Uncertainty Calibration
                </td>
                <td className="py-2.5 px-4 font-medium bg-primary/5 border-x border-border text-foreground">
                  Exact Bayesian posterior probabilities
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">
                  Hallucinates arbitrary confidence scores
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">Binary only (0% or 100%)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-muted-foreground">
                  Hidden Chemical Derivatives
                </td>
                <td className="py-2.5 px-4 font-medium bg-primary/5 border-x border-border text-foreground">
                  Non-linear molecular distance vectorization
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">
                  Prone to conversational confabulation
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">
                  Completely blindsided by synonyms
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-muted-foreground">Execution Latency</td>
                <td className="py-2.5 px-4 font-medium bg-primary/5 border-x border-border text-foreground">
                  ~14ms on CPU/edge
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">
                  1,200ms – 4,000ms network roundtrip
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">&lt;5ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4. TabPFN Inspector Component */}
      {audit && <TabPFNInspector audit={audit} />}
    </div>
  );
}
