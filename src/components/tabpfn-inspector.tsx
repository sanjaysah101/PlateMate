"use client";

import { useState } from "react";

import { AlertTriangle, Check, Cpu, Database, Info, Zap } from "lucide-react";

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
    <Card className="border-border bg-card shadow-2xs overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/20 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary font-medium border border-border">
              <Cpu className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm sm:text-base font-semibold text-foreground">
                  In-Context Tabular Predictions
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-border bg-secondary text-muted-foreground text-[10px] font-normal"
                >
                  Bayesian Posterior
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Click any ingredient to inspect its calibrated feature distribution
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Badge
              variant="secondary"
              className="gap-1 font-mono text-[11px] bg-background border border-border text-foreground"
            >
              <Database className="size-3 text-primary" />
              {audit.tabpfnIngredients.length} In-Context Tokens
            </Badge>
            {audit.tabpfnAnomalyCount > 0 ? (
              <Badge
                variant="outline"
                className="border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-[11px] gap-1"
              >
                <AlertTriangle className="size-3" />
                {audit.tabpfnAnomalyCount} Outlier Detected
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-border text-muted-foreground text-[11px] gap-1"
              >
                <Check className="size-3 text-emerald-500" />
                Prior Validated
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-5">
        {/* Tabular Dataset Table */}
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
              <tr>
                <th className="py-2.5 px-3 font-medium">Ingredient</th>
                <th className="py-2.5 px-3 font-medium">Predicted Class</th>
                <th className="py-2.5 px-3 text-center font-medium">P(Safe)</th>
                <th className="py-2.5 px-3 text-center font-medium">P(Caution)</th>
                <th className="py-2.5 px-3 text-center font-medium">P(Danger)</th>
                <th className="py-2.5 px-3 text-center font-medium">Cross-Contact</th>
                <th className="py-2.5 px-3 text-right font-medium">Anomaly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {audit.tabpfnIngredients.map((item, idx) => {
                const isSelected = selectedIngredientIdx === idx;
                const isDangerous = item.safetyClass === "DANGEROUS";
                const isCaution = item.safetyClass === "CAUTION";

                return (
                  <tr
                    key={item.ingredientName}
                    onClick={() => setSelectedIngredientIdx(idx)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <td className="py-2 px-3 text-foreground flex items-center gap-2">
                      <span
                        className={`size-1.5 rounded-full shrink-0 ${
                          isDangerous
                            ? "bg-destructive"
                            : isCaution
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      <span className="truncate max-w-[180px] sm:max-w-[240px] font-medium">
                        {item.ingredientName}
                      </span>
                      {item.isAnomaly && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                          Anomaly
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium uppercase ${
                          isDangerous
                            ? "bg-destructive/10 text-destructive border border-destructive/20"
                            : isCaution
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {item.safetyClass}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center font-mono tabular-nums text-muted-foreground">
                      {Math.round(item.classProbabilities.safe * 100)}%
                    </td>
                    <td className="py-2 px-3 text-center font-mono tabular-nums text-muted-foreground">
                      {Math.round(item.classProbabilities.caution * 100)}%
                    </td>
                    <td className="py-2 px-3 text-center font-mono tabular-nums">
                      <span
                        className={
                          item.classProbabilities.dangerous > 0.1
                            ? "text-destructive font-semibold"
                            : "text-muted-foreground"
                        }
                      >
                        {Math.round(item.classProbabilities.dangerous * 100)}%
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center font-mono tabular-nums text-muted-foreground">
                      {item.crossContaminationProb}%
                    </td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums">
                      <span
                        className={
                          item.anomalyScore >= 0.5
                            ? "text-amber-600 dark:text-amber-400 font-semibold"
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

        {/* Selected Vector Deep-Dive */}
        {selectedPrediction && (
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                  Selected Vector
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {selectedPrediction.ingredientName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Classification:</span>
                <span
                  className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-semibold uppercase ${
                    selectedPrediction.safetyClass === "DANGEROUS"
                      ? "bg-destructive text-destructive-foreground"
                      : selectedPrediction.safetyClass === "CAUTION"
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-600 text-white"
                  }`}
                >
                  {selectedPrediction.safetyClass}
                </span>
              </div>
            </div>

            {/* Calibrated Probability Distribution Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-md border border-border bg-muted/20 p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">P(Safe)</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {Math.round(selectedPrediction.classProbabilities.safe * 100)}%
                  </span>
                </div>
                <Progress
                  value={selectedPrediction.classProbabilities.safe * 100}
                  className="h-1.5 [&>div]:bg-emerald-500"
                />
              </div>

              <div className="rounded-md border border-border bg-muted/20 p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">P(Caution / Trace)</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
                    {Math.round(selectedPrediction.classProbabilities.caution * 100)}%
                  </span>
                </div>
                <Progress
                  value={selectedPrediction.classProbabilities.caution * 100}
                  className="h-1.5 [&>div]:bg-amber-500"
                />
              </div>

              <div className="rounded-md border border-border bg-muted/20 p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">P(Severe Hazard)</span>
                  <span className="font-semibold text-destructive tabular-nums">
                    {Math.round(selectedPrediction.classProbabilities.dangerous * 100)}%
                  </span>
                </div>
                <Progress
                  value={selectedPrediction.classProbabilities.dangerous * 100}
                  className="h-1.5 [&>div]:bg-destructive"
                />
              </div>
            </div>

            {/* Vector Attributes breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="rounded border border-border bg-muted/10 p-2">
                <span className="text-[10px] text-muted-foreground block font-sans">
                  Concentration
                </span>
                <span className="text-foreground font-semibold tabular-nums">
                  {selectedPrediction.concentrationPct}%
                </span>
              </div>
              <div className="rounded border border-border bg-muted/10 p-2">
                <span className="text-[10px] text-muted-foreground block font-sans">
                  Processing Level
                </span>
                <span className="text-foreground font-semibold tabular-nums">
                  {selectedPrediction.processingLevel}/5
                </span>
              </div>
              <div className="rounded border border-border bg-muted/10 p-2">
                <span className="text-[10px] text-muted-foreground block font-sans">
                  Cross-Contact Risk
                </span>
                <span className="text-foreground font-semibold tabular-nums">
                  {selectedPrediction.crossContaminationProb}%
                </span>
              </div>
              <div className="rounded border border-border bg-muted/10 p-2">
                <span className="text-[10px] text-muted-foreground block font-sans">
                  Anomaly Distance
                </span>
                <span className="text-foreground font-semibold tabular-nums">
                  {selectedPrediction.anomalyScore.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Rationale and Kitchen Directions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="rounded-md border border-border bg-muted/10 p-3">
                <p className="font-medium text-foreground mb-1 flex items-center gap-1.5">
                  <Info className="size-3.5 text-primary" />
                  Model Feature Rationale
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedPrediction.explanation}
                </p>
              </div>

              <div className="rounded-md border border-border bg-muted/10 p-3">
                <p className="font-medium text-foreground mb-1 flex items-center gap-1.5">
                  <Zap className="size-3.5 text-primary" />
                  Kitchen & Culinary Action
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
