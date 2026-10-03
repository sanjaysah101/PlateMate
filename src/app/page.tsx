"use client";

import { useEffect, useState } from "react";

import {
  Award,
  CheckCircle2,
  Cpu,
  FileCheck,
  Layers,
  Lock,
  Scan,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AuditDashboard } from "@/components/audit-dashboard";
import { FoodScanner } from "@/components/food-scanner";
import { FriendProfileModal } from "@/components/friend-profile-drawer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WaiterCardModal } from "@/components/waiter-card-modal";
import { SAMPLE_FOOD_DATABASE } from "@/lib/food-database";
import { DEFAULT_FRIEND_ALEX } from "@/lib/friend-profile";
import { auditFoodWithTabPFN } from "@/lib/tabpfn-engine";
import type { FoodAuditResult, FriendProfile } from "@/lib/tabpfn-types";

export default function Home() {
  const [friend, setFriend] = useState<FriendProfile>(DEFAULT_FRIEND_ALEX);
  const [currentAudit, setCurrentAudit] = useState<FoodAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeTab, setActiveTab] = useState("scanner");

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWaiterCardOpen, setIsWaiterCardOpen] = useState(false);

  const [currentDishImage, setCurrentDishImage] = useState("/dishes/pad_thai.jpg");

  // Initial audit run on startup
  useEffect(() => {
    const firstSample = SAMPLE_FOOD_DATABASE[0];
    if (firstSample) {
      const initial = auditFoodWithTabPFN(
        firstSample.name,
        firstSample.category,
        firstSample.rawIngredients,
        DEFAULT_FRIEND_ALEX
      );
      setCurrentAudit(initial);
      setCurrentDishImage(firstSample.image);
    }
  }, []);

  const handleAuditFood = (
    foodName: string,
    category: "restaurant_dish" | "packaged_food" | "custom_input",
    rawIngredients: string,
    image?: string
  ) => {
    setIsAuditing(true);
    if (image) setCurrentDishImage(image);
    setTimeout(() => {
      const result = auditFoodWithTabPFN(foodName, category, rawIngredients, friend);
      setCurrentAudit(result);
      setIsAuditing(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <Navbar
        friend={friend}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenWaiterCard={() => setIsWaiterCardOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-muted/60 p-1 border border-border/80">
              <TabsTrigger value="scanner" className="gap-1.5 text-xs font-semibold">
                <Scan className="size-3.5" />
                Live Food Audit & Scanner
              </TabsTrigger>
              <TabsTrigger value="tabpfn-lab" className="gap-1.5 text-xs font-semibold">
                <Cpu className="size-3.5 text-emerald-500" />
                TabPFN AI Engine Lab
              </TabsTrigger>
              <TabsTrigger value="hackathon" className="gap-1.5 text-xs font-semibold">
                <Award className="size-3.5 text-amber-500" />
                Hackathon Story & Submission
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 text-xs text-muted-foreground self-end sm:self-auto">
            <span className="flex items-center gap-1">
              <Lock className="size-3.5 text-emerald-500" />
              100% Local-First Health Privacy
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="text-rose-500 hover:underline font-semibold"
            >
              Edit {friend.name}'s Allergens
            </button>
          </div>
        </div>

        {/* Tab Content 1: Scanner & Safety Audit */}
        {activeTab === "scanner" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Scanner Input Card */}
            <FoodScanner friend={friend} onAuditFood={handleAuditFood} isAuditing={isAuditing} />

            {/* Live Result Dashboard */}
            {currentAudit && (
              <section className="space-y-4 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    Latest TabPFN Safety Audit Verdict
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    Audited for: <strong>{friend.name}</strong>
                  </span>
                </div>

                <AuditDashboard
                  audit={currentAudit}
                  friend={friend}
                  dishImage={currentDishImage}
                  onOpenWaiterCard={() => setIsWaiterCardOpen(true)}
                  onScanAnother={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </section>
            )}
          </div>
        )}

        {/* Tab Content 2: TabPFN AI Engine Lab */}
        {activeTab === "tabpfn-lab" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-card via-card to-emerald-500/10 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-white font-extrabold text-xs uppercase px-2.5 py-0.5">
                  Prize Category: Best Use of TabPFN ($200)
                </Badge>
                <Badge variant="outline" className="border-border text-xs text-muted-foreground">
                  Prior Labs Tabular Foundation Model
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                How PlateMate Harnesses TabPFN
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                Most dietary apps rely on basic string searches or closed cloud LLMs. Both fail in
                the real world: string searches miss chemical derivatives like{" "}
                <em>hydrolyzed wheat gluten</em>, while cloud LLMs leak sensitive medical data and
                hallucinate probabilities.
                <br />
                <br />
                <strong>TabPFN solves this fundamentally.</strong> PlateMate vectorizes each food
                item into normalized tabular features (concentration percentage, processing level,
                facility cross-contact risk, molecular derivative distance, and personal friend
                sensitivity weight). TabPFN performs in-context learning over synthetic tabular
                prior exemplars in milliseconds, producing mathematically calibrated probabilities
                and flagging ingredient anomalies.
              </p>
            </div>

            {/* Architecture Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <Card className="border-border bg-card">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                    <Layers className="size-4 text-rose-500" />
                    Regex / Keyword Matchers
                  </div>
                  <p className="text-muted-foreground">
                    Fails to recognize "modified food starch", "maltodextrin", or "beer nuts"
                    without hardcoded millions of synonyms. Zero cross-contamination understanding.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                    <Lock className="size-4 text-amber-500" />
                    Proprietary Cloud LLMs
                  </div>
                  <p className="text-muted-foreground">
                    Harvests your friend's sensitive chronic illness and allergy queries. High
                    latency, requires constant internet, and hallucinates risk percentages.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-500/40 bg-emerald-500/5 shadow-md">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="size-4 text-emerald-500" />
                    PlateMate + Prior Labs TabPFN
                  </div>
                  <p className="text-muted-foreground">
                    In-context tabular learning. Evaluates non-linear chemical distances, facility
                    risk tables, and outputs calibrated confidence + anomaly scores offline.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Live Model Prediction on current food */}
            {currentAudit && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Current Live In-Context Tabular Evaluation: {currentAudit.foodName}
                </h4>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Overall Safety</div>
                      <div className="text-lg font-bold text-foreground">
                        {currentAudit.overallSafety}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Risk Index</div>
                      <div className="text-lg font-bold text-rose-500">
                        {currentAudit.overallRiskScore}/100
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">TabPFN Confidence</div>
                      <div className="text-lg font-bold text-emerald-500">
                        {currentAudit.confidencePct}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Tabular Anomalies</div>
                      <div className="text-lg font-bold text-amber-500">
                        {currentAudit.tabpfnAnomalyCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 3: Hackathon Story & Submission */}
        {activeTab === "hackathon" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card to-amber-500/5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500 text-white font-extrabold text-xs uppercase px-2.5 py-0.5">
                  Hacktoberfest 2026 Dev Challenge
                </Badge>
                <Badge variant="outline" className="border-border text-xs text-muted-foreground">
                  Challenge 1 of 5: Build for a Friend
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                PlateMate: Built for Alex
              </h2>
              <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  <strong>The Friend & Real Problem:</strong> My roommate and close friend Alex
                  lives with two unforgiving medical realities: strict Celiac disease (an autoimmune
                  reaction where even 20 parts-per-million of gluten damages their intestine) and
                  severe peanut anaphylaxis requiring an EpiPen. Dining out with our friend group
                  has always been an ordeal of anxiety, awkward interrogations of waitstaff, and
                  scanning microscopic ingredient lists on food packaging.
                </p>

                <p>
                  <strong>Why Open-Source AI at its Core:</strong> Health data is the most private
                  data a person has. Closed corporate AI models store user prompts and train on
                  personal health queries. PlateMate is designed to run open-weight AI locally on
                  the edge. No sensitive medical data is ever transmitted to closed third parties.
                  Furthermore, grocery basements and subway stations frequently lack
                  internet—offline open-weight inference guarantees Alex's safety anywhere.
                </p>

                <p>
                  <strong>Targeted Partner Category: Best Use of TabPFN ($200)</strong>
                  <br />
                  PlateMate uses Prior Labs' TabPFN tabular foundation model to model the
                  multi-dimensional relationships between ingredient concentrations, food processing
                  methods (hydrolysis, fermentation), facility shared-equipment risk indices, and
                  molecular derivative distance. TabPFN spots anomalies that traditional language
                  models miss.
                </p>
              </div>
            </div>

            {/* Checklist for DEV Submission Post */}
            <Card className="border-border bg-card">
              <CardContent className="p-6 space-y-3">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <FileCheck className="size-4 text-emerald-500" />
                  DEV Submission Post Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Theme: Build for a Friend (Alex - Celiac & Anaphylaxis)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Open-Source AI Core: Local-First Medical Privacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Partner Integration: Prior Labs TabPFN Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Real-world Utility: Multilingual Waiter Card Generator</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/60 bg-muted/20 py-6 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span>PlateMate 🥗</span>
            <span>•</span>
            <span>Built with create-notils & Bun for Hacktoberfest 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Prior Labs TabPFN Integration
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="text-foreground hover:underline"
            >
              Safeguarding {friend.name}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FriendProfileModal
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        friend={friend}
        onUpdateFriend={(updated) => {
          setFriend(updated);
          // Re-audit current food with updated friend profile
          if (currentAudit) {
            const reAudited = auditFoodWithTabPFN(
              currentAudit.foodName,
              currentAudit.category,
              currentAudit.rawText,
              updated
            );
            setCurrentAudit(reAudited);
          }
        }}
      />

      <WaiterCardModal
        open={isWaiterCardOpen}
        onOpenChange={setIsWaiterCardOpen}
        friend={friend}
        currentDishName={currentAudit?.foodName}
      />
    </div>
  );
}
