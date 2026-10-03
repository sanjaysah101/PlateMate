"use client";

import { useState } from "react";

import { AlertTriangle, Cpu, Database, Info, Sparkles, TrendingUp, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { FoodAuditResult } from "@/lib/tabpfn-types";

interface TabPFNInspectorProps {
  audit: FoodAuditResult;
}

export function TabPFNInspector({ audit }: TabPFNInspectorProps) {
  const [selectedIngredientIdx, setSelectedIngredientIdx] = useState(0);

  const selectedPrediction =
    audit.tabpfnIngredients[selectedIngredientIdx] || audit.tabpfnIngredients[0];

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-card via-card to-emerald-500/5 shadow-xl overflow-hidden">
      <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              <Cpu className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base sm:text-lg font-bold">
                  Prior Labs TabPFN Intelligence Inspector
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold"
                >
                  Tabular Foundation Model
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                In-context tabular risk classification, anomaly detection, and cross-contamination
                probability
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <Badge variant="secondary" className="gap-1 font-mono text-[11px] bg-background">
              <Database className="size-3 text-emerald-500" />
              {audit.tabpfnIngredients.length} In-Context Vectors
            </Badge>
            {audit.tabpfnAnomalyCount > 0 ? (
              <Badge
                variant="outline"
                className="border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-[11px] gap-1"
              >
                <AlertTriangle className="size-3" />
                {audit.tabpfnAnomalyCount} Anomaly Detected
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-emerald-500/40 text-emerald-600 text-[11px]"
              >
                Clean Tabular Prior
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Why TabPFN section banner */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-xs text-muted-foreground flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="space-y-1">
            <p className="font-bold text-foreground flex items-center gap-1.5 text-sm">
              <Sparkles className="size-4 text-emerald-500" />
              Why TabPFN for Dietary Safety?
            </p>
            <p className="leading-relaxed">
              Standard LLMs frequently hallucinate or miss non-linear chemical derivatives (e.g.
              modified wheat starch vs native potato starch).
              <strong> TabPFN treats ingredients as numerical tabular features</strong>{" "}
              (concentration, molecular distance, facility risk, sensitivity weight), evaluating
              them through synthetic tabular priors in milliseconds with mathematically calibrated
              confidence.
            </p>
          </div>
        </div>

        {/* Interactive Tabular Dataset Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-emerald-500" />
              Tabular Feature Predictions (Click any row to inspect)
            </h4>
            <span className="text-[11px] text-muted-foreground">
              P(Safe) | P(Caution) | P(Danger)
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border/80 bg-background/50">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/80 bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-3">Ingredient</th>
                  <th className="py-2.5 px-3">TabPFN Class</th>
                  <th className="py-2.5 px-3 text-center">P(Safe)</th>
                  <th className="py-2.5 px-3 text-center">P(Caution)</th>
                  <th className="py-2.5 px-3 text-center">P(Danger)</th>
                  <th className="py-2.5 px-3 text-center">Cross-Contact %</th>
                  <th className="py-2.5 px-3 text-right">Anomaly Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {audit.tabpfnIngredients.map((item, idx) => {
                  const isSelected = selectedIngredientIdx === idx;
                  const isDangerous = item.safetyClass === "DANGEROUS";
                  const isCaution = item.safetyClass === "CAUTION";

                  return (
                    <tr
                      key={item.ingredientName}
                      onClick={() => setSelectedIngredientIdx(idx)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-emerald-500/10 font-medium" : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="py-2 px-3 font-semibold text-foreground flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full shrink-0 bg-emerald-500" />
                        <span className="truncate max-w-[160px] sm:max-w-[220px]">
                          {item.ingredientName}
                        </span>
                        {item.isAnomaly && (
                          <Badge
                            variant="outline"
                            className="border-amber-500/50 bg-amber-500/10 text-amber-600 text-[9px] py-0 px-1"
                          >
                            Anomaly
                          </Badge>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                            isDangerous
                              ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                              : isCaution
                                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {item.safetyClass}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-muted-foreground">
                        {Math.round(item.classProbabilities.safe * 100)}%
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-muted-foreground">
                        {Math.round(item.classProbabilities.caution * 100)}%
                      </td>
                      <td className="py-2 px-3 text-center font-mono font-bold text-rose-500">
                        {Math.round(item.classProbabilities.dangerous * 100)}%
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-muted-foreground">
                        {item.crossContaminationProb}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        <span
                          className={
                            item.anomalyScore >= 0.5
                              ? "text-amber-500 font-bold"
                              : "text-muted-foreground"
                          }
                        >
                          {item.anomalyScore.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Ingredient Deep-Dive */}
        {selectedPrediction && (
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  In-Context Focus:
                </span>
                <h5 className="text-base font-bold text-foreground">
                  {selectedPrediction.ingredientName}
                </h5>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">TabPFN Decision:</span>
                <Badge
                  className={`font-bold text-xs ${
                    selectedPrediction.safetyClass === "DANGEROUS"
                      ? "bg-rose-500 text-white"
                      : selectedPrediction.safetyClass === "CAUTION"
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-500 text-white"
                  }`}
                >
                  {selectedPrediction.safetyClass}
                </Badge>
              </div>
            </div>

            {/* Probability Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border/60 bg-background/60 p-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">P(Safe)</span>
                  <span className="font-bold text-emerald-500">
                    {Math.round(selectedPrediction.classProbabilities.safe * 100)}%
                  </span>
                </div>
                <Progress
                  value={selectedPrediction.classProbabilities.safe * 100}
                  className="h-1.5 [&>div]:bg-emerald-500"
                />
              </div>

              <div className="rounded-lg border border-border/60 bg-background/60 p-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">P(Caution / Trace)</span>
                  <span className="font-bold text-amber-500">
                    {Math.round(selectedPrediction.classProbabilities.caution * 100)}%
                  </span>
                </div>
                <Progress
                  value={selectedPrediction.classProbabilities.caution * 100}
                  className="h-1.5 [&>div]:bg-amber-500"
                />
              </div>

              <div className="rounded-lg border border-border/60 bg-background/60 p-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">P(Severe Reaction)</span>
                  <span className="font-bold text-rose-500">
                    {Math.round(selectedPrediction.classProbabilities.dangerous * 100)}%
                  </span>
                </div>
                <Progress
                  value={selectedPrediction.classProbabilities.dangerous * 100}
                  className="h-1.5 [&>div]:bg-rose-500"
                />
              </div>
            </div>

            {/* Explanation & Recommendation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                  <Info className="size-3.5 text-sky-500" />
                  Model Feature Rationale
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedPrediction.explanation}
                </p>
              </div>

              <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
                  <Zap className="size-3.5 text-amber-500" />
                  Actionable Kitchen Direction
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedPrediction.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
