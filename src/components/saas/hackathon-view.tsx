"use client";

import { CheckCircle2, Cpu, FileCheck, Heart, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HackathonView() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-amber-500/5 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-amber-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-0.5">
            DEV Hacktoberfest 2026
          </Badge>
          <span className="text-xs text-muted-foreground">
            Challenge 1 of 5: <strong>Build for a Friend</strong>
          </span>
          <span className="text-border">•</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Target Category: Best Use of TabPFN ($200)
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
          PlateMate: The Story Behind Building for Alex
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Hacktoberfest 2026 is about building brand-new projects with open-source AI at their core.
          Here is our official project brief and technical documentation for the DEV submission
          post.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The Friend */}
        <Card className="border-border/80 bg-card shadow-xs">
          <CardHeader className="p-4 pb-2 border-b border-border/60">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <Heart className="size-3.5 fill-rose-500" />
              1. The Friend & The Real Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              My roommate and close friend <strong>Alex</strong> lives with strict Celiac disease
              (an autoimmune reaction where &gt;20 ppm gluten destroys their small intestine) and
              life-threatening peanut anaphylaxis requiring an EpiPen.
            </p>
            <p>
              Ordering takeout or dining out with our friend group has always been an ordeal of
              anxiety, awkward interrogations of busy restaurant servers, and microscopic label
              scanning. PlateMate gives Alex instant certainty.
            </p>
          </CardContent>
        </Card>

        {/* Why Open-Source AI */}
        <Card className="border-border/80 bg-card shadow-xs">
          <CardHeader className="p-4 pb-2 border-b border-border/60">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Lock className="size-3.5" />
              2. Why Open-Source AI at the Core?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong>Health Privacy is Sacred:</strong> Medical conditions and chronic allergies
              are personal health data. Closed proprietary models harvest and retain user queries.
              PlateMate evaluates food safety locally—Alex's health profile never leaves the device.
            </p>
            <p>
              <strong>Offline Edge Reliability:</strong> Grocery basements and subway food halls
              frequently lack cellular service. Open-source local inference guarantees safety
              anywhere.
            </p>
          </CardContent>
        </Card>

        {/* Best Use of TabPFN */}
        <Card className="border-border/80 bg-card shadow-xs md:col-span-2">
          <CardHeader className="p-4 pb-2 border-b border-border/60">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Cpu className="size-3.5" />
              3. Featured Partner Category: Best Use of TabPFN ($200 USD)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              Instead of using crude keyword matchers or hallucinations from closed LLMs, PlateMate
              converts ingredients into structured numerical feature spaces:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 font-mono text-[11px] text-foreground">
              <div className="rounded bg-muted/40 p-2 border border-border/60">
                concentrationPct
              </div>
              <div className="rounded bg-muted/40 p-2 border border-border/60">processingLevel</div>
              <div className="rounded bg-muted/40 p-2 border border-border/60">
                facilityRiskScore
              </div>
              <div className="rounded bg-muted/40 p-2 border border-border/60">
                derivativeDistance
              </div>
              <div className="rounded bg-muted/40 p-2 border border-border/60">
                friendSensitivityWeight
              </div>
              <div className="rounded bg-muted/40 p-2 border border-border/60">
                hiddenAdditiveScore
              </div>
            </div>
            <p>
              <strong>Prior Labs' TabPFN</strong> in-context transformer evaluates these vectors in
              milliseconds, outputting mathematically calibrated posterior probabilities (P(Safe),
              P(Caution), P(Dangerous)) and spotting deceptive additives like{" "}
              <em>modified wheat starch in balsamic glaze</em> or{" "}
              <em>barley malt extract in granola bars</em>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Checklist Card */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader className="p-4 pb-2 border-b border-border/60">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FileCheck className="size-3.5 text-emerald-500" />
            DEV.to Challenge Submission Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Theme: Build for a Friend (Alex - Celiac & Anaphylaxis)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Core: Open-Source AI & Local Health Privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Partner Prize: Best Use of TabPFN ($200)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Real-World Dining: Multilingual Waiter Safe Passports</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
