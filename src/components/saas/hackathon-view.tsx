"use client";

import { CheckCircle2, Cpu, FileCheck, Heart, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HackathonView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              PlateMate Architecture Brief
            </h1>
            <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">
              DEV Hacktoberfest 2026
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Challenge #1: Build for a Friend. Technical specification and architecture documentation
            for the Prior Labs TabPFN category.
          </p>
        </div>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The Friend */}
        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-1.5">
              <Heart className="size-3.5 text-destructive" />
              1. The Real-World Need
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              My roommate and close friend <strong>Alex</strong> lives with strict Celiac disease
              (autoimmune intestinal damage from &gt;20 ppm gluten) and severe peanut anaphylaxis
              requiring an EpiPen.
            </p>
            <p>
              Ordering food or dining out with our friend group is a constant source of stress,
              awkward interrogations of busy restaurant servers, and microscopic label scanning.
              PlateMate gives Alex instant, calibrated certainty.
            </p>
          </CardContent>
        </Card>

        {/* Why Open-Source AI */}
        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-1.5">
              <Lock className="size-3.5 text-primary" />
              2. Privacy & Edge AI Foundation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Health Privacy by Design:</strong> Dietary medical
              conditions are personal health information. Cloud LLMs log and retain user prompts on
              remote servers. PlateMate evaluates culinary vectors locally on-device.
            </p>
            <p>
              <strong className="text-foreground">Offline Edge Reliability:</strong> Subway food
              courts and grocery basements frequently suffer from spotty connectivity. Local tabular
              priors guarantee evaluation anywhere.
            </p>
          </CardContent>
        </Card>

        {/* Best Use of TabPFN */}
        <Card className="border-border bg-card shadow-2xs md:col-span-2">
          <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-1.5">
              <Cpu className="size-3.5 text-primary" />
              3. Prior Labs TabPFN Tabular Feature Space
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              Instead of relying on fragile keyword matching or hallucinated generative text,
              PlateMate converts ingredients into 6-dimensional numerical feature spaces evaluated
              through TabPFN synthetic priors:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-foreground">
              <div className="rounded border border-border bg-muted/20 p-2.5">
                <span className="text-muted-foreground text-[10px] block font-sans">Feature 1</span>
                concentrationPct
              </div>
              <div className="rounded border border-border bg-muted/20 p-2.5">
                <span className="text-muted-foreground text-[10px] block font-sans">Feature 2</span>
                processingLevel
              </div>
              <div className="rounded border border-border bg-muted/20 p-2.5">
                <span className="text-muted-foreground text-[10px] block font-sans">Feature 3</span>
                facilityCrossContact
              </div>
              <div className="rounded border border-border bg-muted/20 p-2.5">
                <span className="text-muted-foreground text-[10px] block font-sans">Feature 4</span>
                molecularDistance
              </div>
              <div className="rounded border border-border bg-muted/20 p-2.5">
                <span className="text-muted-foreground text-[10px] block font-sans">Feature 5</span>
                sensitivityWeight
              </div>
              <div className="rounded border border-border bg-muted/20 p-2.5">
                <span className="text-muted-foreground text-[10px] block font-sans">Feature 6</span>
                hiddenAdditiveScore
              </div>
            </div>
            <p>
              The <strong className="text-foreground">Prior Labs TabPFN</strong> in-context
              transformer evaluates these vectors in milliseconds, computing mathematically
              calibrated posterior distributions (P(Safe), P(Caution), P(Dangerous)) and identifying
              deceptive derivatives like <em>modified wheat starch in balsamic glaze</em> or{" "}
              <em>barley malt extract in granola bars</em>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Checklist Card */}
      <Card className="border-border bg-card shadow-2xs">
        <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
          <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-1.5">
            <FileCheck className="size-3.5 text-primary" />
            Hackathon Requirements Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
            <span>Theme: Build for a Friend (Alex — Celiac & Anaphylaxis)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
            <span>Open-Source AI: Prior Labs TabPFN Foundation Model</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
            <span>Target Category: Best Use of TabPFN</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
            <span>Real-World Dining: Multilingual Chef Dining Passports</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
