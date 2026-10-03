"use client";

import { useState } from "react";

import { Camera, CheckCircle, Cpu, FileText, Sparkles, Utensils } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_FOOD_DATABASE, type SampleFoodItem } from "@/lib/food-database";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface FoodScannerProps {
  friend: FriendProfile;
  onAuditFood: (
    foodName: string,
    category: "restaurant_dish" | "packaged_food" | "custom_input",
    rawIngredients: string
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
  };

  const [foodName, setFoodName] = useState(defaultPreset.name);
  const [rawText, setRawText] = useState(defaultPreset.rawIngredients);
  const [activeCategory, setActiveCategory] = useState<
    "restaurant_dish" | "packaged_food" | "custom_input"
  >(defaultPreset.category);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPreset.id);

  const handleSelectPreset = (item: SampleFoodItem) => {
    setSelectedPresetId(item.id);
    setFoodName(item.name);
    setRawText(item.rawIngredients);
    setActiveCategory(item.category);
  };

  const handleRunAudit = () => {
    if (!foodName.trim() || !rawText.trim()) return;
    onAuditFood(foodName, activeCategory, rawText);
  };

  return (
    <div className="space-y-6">
      {/* Intro Hero Banner */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-rose-500/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>❤️ Dedicated to {friend.name}</span>
              <span>•</span>
              <span>Strict Celiac & Anaphylaxis Shield</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Scan Food. Protect Your Friend.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Paste an ingredient list, restaurant menu item, or select a sample dish. PlateMate
              uses
              <strong> Prior Labs' TabPFN tabular foundation model</strong> to evaluate molecular
              derivatives, concentration percentages, and cross-contamination risks with zero health
              data leaked to closed servers.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-2 text-xs shrink-0 md:w-64">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <Cpu className="size-4 text-emerald-500" />
              TabPFN In-Context Engine
            </div>
            <p className="text-muted-foreground">
              Evaluates tabular interactions between allergens, processing levels, and friend
              sensitivity weights.
            </p>
            <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ Open-Source AI at the Core
            </div>
          </div>
        </div>
      </div>

      {/* Preset Quick Selectors */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Utensils className="size-3.5" />
            Quick Test Cases & Real Restaurant Menus
          </h3>
          <span className="text-[11px] text-muted-foreground">Click to load into scanner</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SAMPLE_FOOD_DATABASE.map((item) => {
            const isSelected = selectedPresetId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPreset(item)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-rose-500 bg-rose-500/5 shadow-md shadow-rose-500/10"
                    : "border-border/80 bg-card hover:border-border hover:bg-muted/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-bold text-sm text-foreground leading-tight line-clamp-1">
                    {item.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[9px] uppercase px-1.5 py-0 font-extrabold shrink-0 ${
                      item.expectedVerdictForAlex === "DANGEROUS"
                        ? "border-rose-500/40 text-rose-500 bg-rose-500/10"
                        : item.expectedVerdictForAlex === "CAUTION"
                          ? "border-amber-500/40 text-amber-500 bg-amber-500/10"
                          : "border-emerald-500/40 text-emerald-600 bg-emerald-500/10"
                    }`}
                  >
                    {item.expectedVerdictForAlex}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                  <span className="font-medium text-foreground/80">{item.cuisineOrBrand}</span>
                  <span className="text-[10px] text-rose-500/90 font-medium">Test Case &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scanner Input Box */}
      <Card className="border-border shadow-md">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <FileText className="size-4 text-rose-500" />
                Live Food & Ingredient Scanner
              </CardTitle>
              <CardDescription className="text-xs">
                Inspect raw food text, menu captions, or nutrition packaging
              </CardDescription>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs text-muted-foreground"
                onClick={() => {
                  setFoodName("Pantry Protein Bar");
                  setRawText(
                    "Soy protein isolate, maltitol, chocolate coating (sugar, whey, cocoa butter, milk), peanut butter, natural flavor, salt. Made on shared equipment with tree nuts and wheat."
                  );
                  setSelectedPresetId("");
                }}
              >
                <Camera className="size-3.5" />
                Simulate Label OCR
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="food-name-input" className="text-xs font-bold text-foreground">
              Dish or Food Product Name:
            </label>
            <input
              id="food-name-input"
              type="text"
              value={foodName}
              onChange={(e) => {
                setFoodName(e.target.value);
                setSelectedPresetId("");
              }}
              placeholder="e.g. Thai Chicken Pad Thai, Bruschetta, Oat Bar..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="food-ingredients-textarea"
              className="text-xs font-bold text-foreground flex items-center justify-between"
            >
              <span>Ingredients List / Menu Description:</span>
              <span className="text-[11px] font-normal text-muted-foreground">
                Separate by commas or lines
              </span>
            </label>
            <textarea
              id="food-ingredients-textarea"
              rows={4}
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                setSelectedPresetId("");
              }}
              placeholder="Paste ingredient list from packaging or restaurant menu item description..."
              className="w-full rounded-lg border border-border bg-background p-3 text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-y"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <CheckCircle className="size-3.5 text-emerald-500" />
              TabPFN In-Context vectors prepared for {friend.name}'s active allergens
            </span>

            <Button
              size="default"
              onClick={handleRunAudit}
              disabled={isAuditing || !foodName.trim() || !rawText.trim()}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold gap-2 text-sm px-6 shadow-md shadow-rose-500/20"
            >
              <Sparkles className="size-4" />
              {isAuditing ? "TabPFN In-Context Inference..." : "Audit With TabPFN Model"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
