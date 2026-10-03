"use client";

import { useState } from "react";
import Image from "next/image";

import { Camera, CheckCircle2, Clock, Cpu, FileText, Sparkles, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_FOOD_DATABASE, type SampleFoodItem } from "@/lib/food-database";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface FoodScannerProps {
  friend: FriendProfile;
  onAuditFood: (
    foodName: string,
    category: "restaurant_dish" | "packaged_food" | "custom_input",
    rawIngredients: string,
    image?: string
  ) => void;
  isAuditing: boolean;
}

export function FoodScanner({ friend, onAuditFood, isAuditing }: FoodScannerProps) {
  const defaultPreset = SAMPLE_FOOD_DATABASE[0] ?? {
    id: "default-preset",
    name: "Classic Chicken Pad Thai",
    rawIngredients:
      "Rice noodles, chicken breast, eggs, crushed peanuts, peanut oil, fish sauce, tamarind paste, regular brewed soy sauce (contains wheat), bean sprouts.",
    category: "restaurant_dish" as const,
    image: "/dishes/pad_thai.jpg",
    cuisine: "Thai Wok",
    prepTime: "12 min",
    riskHighlights: ["Peanuts", "Wheat Gluten"],
  };

  const [foodName, setFoodName] = useState(defaultPreset.name);
  const [rawText, setRawText] = useState(defaultPreset.rawIngredients);
  const [activeCategory, setActiveCategory] = useState<
    "restaurant_dish" | "packaged_food" | "custom_input"
  >(defaultPreset.category);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPreset.id);
  const [currentImage, setCurrentImage] = useState<string>(defaultPreset.image);

  const handleSelectPreset = (item: SampleFoodItem) => {
    setSelectedPresetId(item.id);
    setFoodName(item.name);
    setRawText(item.rawIngredients);
    setActiveCategory(item.category);
    setCurrentImage(item.image);
    onAuditFood(item.name, item.category, item.rawIngredients, item.image);
  };

  const handleRunAudit = () => {
    if (!foodName.trim() || !rawText.trim()) return;
    onAuditFood(foodName, activeCategory, rawText, currentImage);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card/50 p-6 sm:p-10 shadow-lg">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-500">
              <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Personal Dietary Shield for {friend.name}</span>
              <span className="text-rose-400/40">•</span>
              <span>Celiac & Anaphylaxis Guard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Dining Out With Friends, <br />
              <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
                Without The Fear.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Scan restaurant menus, packaging labels, and recipe cards. PlateMate runs
              <strong> Prior Labs' TabPFN tabular foundation model</strong> to predict molecular
              allergen risks, quantify shared-fryer cross-contact, and flag deceptive food additives
              in milliseconds.
            </p>
          </div>

          {/* TabPFN Telemetry Widget */}
          <div className="rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md p-5 text-xs shadow-md lg:w-72 shrink-0 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <Cpu className="size-4 text-emerald-500" />
                TabPFN In-Context Engine
              </span>
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-1.5 text-muted-foreground text-[11px]">
              <div className="flex justify-between">
                <span>Synthetic Prior Model:</span>
                <span className="font-mono font-semibold text-foreground">tabpfn-v2</span>
              </div>
              <div className="flex justify-between">
                <span>Inference Mode:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  In-Context (Zero-Cost)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Medical Data Privacy:</span>
                <span className="font-mono text-foreground font-semibold">100% On-Device</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60">
              <p className="text-[11px] text-muted-foreground italic">
                Evaluates non-linear chemical distances and facility risk matrices without corporate
                data harvesting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gourmet Food Carousel / Presets */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="size-4 text-rose-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Real Dining & Market Test Cases
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">Click any card to inspect & audit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_FOOD_DATABASE.map((item) => {
            const isSelected = selectedPresetId === item.id;
            const isDangerous = item.expectedVerdictForAlex === "DANGEROUS";
            const isCaution = item.expectedVerdictForAlex === "CAUTION";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPreset(item)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 flex flex-col ${
                  isSelected
                    ? "border-rose-500 ring-2 ring-rose-500/30 shadow-xl shadow-rose-500/10 bg-card"
                    : "border-border/80 bg-card/70 hover:border-border hover:bg-card hover:shadow-md"
                }`}
              >
                {/* Image Header with Aspect Ratio */}
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Verdict Badge in top-right */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md ${
                        isDangerous
                          ? "bg-rose-600/90 text-white"
                          : isCaution
                            ? "bg-amber-600/90 text-white"
                            : "bg-emerald-600/90 text-white"
                      }`}
                    >
                      {item.expectedVerdictForAlex}
                    </span>
                  </div>

                  {/* Cuisine & Time Pill */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-white/90 drop-shadow-sm">
                    <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5">
                      {item.cuisine}
                    </span>
                    <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 flex items-center gap-1">
                      <Clock className="size-3" />
                      {item.prepTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-foreground line-clamp-1 group-hover:text-rose-500 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Risk Highlight Chips */}
                  <div className="pt-2 border-t border-border/50 flex flex-wrap gap-1">
                    {item.riskHighlights.map((hl) => (
                      <span
                        key={hl}
                        className="rounded-md bg-muted/70 px-2 py-0.5 text-[10px] font-medium text-foreground/80"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Diagnostic Scanner Bay */}
      <Card className="border-border/90 bg-card/90 shadow-xl overflow-hidden">
        <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <FileText className="size-4 text-rose-500" />
                Live Food & Ingredient Diagnostic Feed
              </CardTitle>
              <CardDescription className="text-xs">
                Inspect raw menu item text, packaging nutrition panels, or grocery receipts
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => {
                  setFoodName("Convenience Store Protein Bar");
                  setRawText(
                    "Soy protein isolate, maltitol, chocolate coating (sugar, whey, cocoa butter, milk), peanut butter, natural flavor, salt. Made on shared equipment that also processes tree nuts and wheat."
                  );
                  setSelectedPresetId("");
                  setCurrentImage("/dishes/pad_thai.jpg");
                }}
              >
                <Camera className="size-3.5 text-muted-foreground" />
                Simulate Camera OCR
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-1.5">
              <label htmlFor="food-name-input" className="text-xs font-bold text-foreground">
                Dish or Product Name:
              </label>
              <input
                id="food-name-input"
                type="text"
                value={foodName}
                onChange={(e) => {
                  setFoodName(e.target.value);
                  setSelectedPresetId("");
                }}
                placeholder="e.g. Pad Thai, Bruschetta, Granola..."
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />

              <div className="pt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Category: </span>
                <span className="capitalize">{activeCategory.replace("_", " ")}</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label
                htmlFor="food-ingredients-textarea"
                className="text-xs font-bold text-foreground flex items-center justify-between"
              >
                <span>Ingredients List & Allergen Statement:</span>
                <span className="text-[11px] font-normal text-muted-foreground">
                  Comma-separated or full text block
                </span>
              </label>
              <textarea
                id="food-ingredients-textarea"
                rows={3}
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value);
                  setSelectedPresetId("");
                }}
                placeholder="Paste food ingredients, allergen warnings ('may contain'), or menu item recipe notes..."
                className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-y"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              <span>
                TabPFN in-context feature vectors ready for {friend.name}'s active allergens
              </span>
            </div>

            <Button
              size="default"
              onClick={handleRunAudit}
              disabled={isAuditing || !foodName.trim() || !rawText.trim()}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-extrabold gap-2 text-sm px-7 py-2.5 rounded-xl shadow-lg shadow-rose-500/25 transition-all"
            >
              <Sparkles className="size-4" />
              {isAuditing ? "TabPFN Computing In-Context..." : "Run TabPFN Safety Audit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
