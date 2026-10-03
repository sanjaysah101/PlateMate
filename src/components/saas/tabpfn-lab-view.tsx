"use client";

import { Layers, Sparkles, Terminal } from "lucide-react";

import { TabPFNInspector } from "@/components/tabpfn-inspector";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodAuditResult } from "@/lib/tabpfn-types";

interface TabPFNLabViewProps {
  audit: FoodAuditResult | null;
}

export function TabPFNLabView({ audit }: TabPFNLabViewProps) {
  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-0.5">
            Prior Labs TabPFN Category ($200)
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            Model: prior-labs/tabpfn-v2
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
          Tabular Foundation Model Laboratory
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Prior Labs' TabPFN is a tabular foundation model trained on synthetic prior data. In
          PlateMate, we vectorize ingredients into structured numerical feature spaces
          (concentration %, processing intensity, facility cross-contact probability, molecular
          derivative distance, and personal friend sensitivity weight), producing calibrated risk
          distributions in milliseconds without cloud leakage.
        </p>
      </div>

      {/* Model Feature Vector Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold flex items-center gap-2 text-rose-500">
              <Layers className="size-4" />
              1. Naive Regex & Keywords
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-muted-foreground space-y-1">
            <p>
              Fails on chemical synonyms, hidden derivatives (e.g. modified wheat starch), and
              cannot estimate cross-contact probabilities.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold flex items-center gap-2 text-amber-500">
              <Terminal className="size-4" />
              2. Closed Cloud LLMs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-muted-foreground space-y-1">
            <p>
              Harvests user health & medical queries on corporate servers. High latency, requires
              internet, and hallucinates probability numbers.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/40 bg-emerald-500/5 shadow-2xs">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-4 text-emerald-500" />
              3. PlateMate + TabPFN
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-muted-foreground space-y-1">
            <p>
              100% on-device private in-context learning. Evaluates non-linear chemical interactions
              and outputs calibrated probability curves.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Inspector */}
      {audit && <TabPFNInspector audit={audit} />}
    </div>
  );
}
