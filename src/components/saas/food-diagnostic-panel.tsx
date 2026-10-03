"use client";

import { useState } from "react";
import Image from "next/image";

import { Camera, CheckCircle2, FileCode, Sparkles, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_FOOD_DATABASE, type SampleFoodItem } from "@/lib/food-database";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface FoodDiagnosticPanelProps {
  friend: FriendProfile;
  onAuditFood: (
    foodName: string,
    category: "restaurant_dish" | "packaged_food" | "custom_input",
    rawIngredients: string,
    image?: string
  ) => void;
  isAuditing: boolean;
  selectedPresetId: string;
  onSelectPreset: (item: SampleFoodItem) => void;
}

export function FoodDiagnosticPanel({
  friend,
  onAuditFood,
  isAuditing,
  selectedPresetId,
  onSelectPreset,
}: FoodDiagnosticPanelProps) {
  const defaultItem = SAMPLE_FOOD_DATABASE[0] ?? {
    id: "default-pad-thai",
    name: "Classic Chicken Pad Thai",
    rawIngredients:
      "Rice noodles, chicken breast, eggs, crushed peanuts, peanut oil, fish sauce, tamarind paste, regular brewed soy sauce (contains wheat), palm sugar, bean sprouts, garlic chives.",
    category: "restaurant_dish" as const,
    image: "/dishes/pad_thai.jpg",
  };

  const [foodName, setFoodName] = useState(defaultItem.name);
  const [rawText, setRawText] = useState(defaultItem.rawIngredients);
  const [activeCategory, setActiveCategory] = useState<
    "restaurant_dish" | "packaged_food" | "custom_input"
  >(defaultItem.category);
  const [inputMode, setInputMode] = useState<"presets" | "editor" | "camera">("presets");

  const handlePresetClick = (item: SampleFoodItem) => {
    setFoodName(item.name);
    setRawText(item.rawIngredients);
    setActiveCategory(item.category);
    onSelectPreset(item);
  };

  const handleExecuteAudit = () => {
    if (!foodName.trim() || !rawText.trim()) return;
    onAuditFood(foodName, activeCategory, rawText);
  };

  return (
    <div className="space-y-6">
      {/* Segmented Control Mode Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setInputMode("presets")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              inputMode === "presets"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Curated Menu Dishes ({SAMPLE_FOOD_DATABASE.length})
          </button>
          <button
            type="button"
            onClick={() => setInputMode("editor")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              inputMode === "editor"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Raw Ingredient Editor
          </button>
          <button
            type="button"
            onClick={() => setInputMode("camera")}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              inputMode === "camera"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Label OCR Simulator
          </button>
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span>
            Active Patient: <strong>{friend.name}</strong> (Celiac & Peanuts)
          </span>
        </div>
      </div>

      {/* Preset Card Gallery */}
      {inputMode === "presets" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SAMPLE_FOOD_DATABASE.map((item) => {
            const isSelected = selectedPresetId === item.id;
            const isDangerous = item.expectedVerdictForAlex === "DANGEROUS";
            const isCaution = item.expectedVerdictForAlex === "CAUTION";

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handlePresetClick(item)}
                className={`group relative overflow-hidden rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 shadow-md bg-card"
                    : "border-border/70 bg-card/60 hover:border-border hover:bg-card hover:shadow-xs"
                }`}
              >
                {/* Photo Header */}
                <div className="relative h-32 w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                  {/* Verdict Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${
                        isDangerous
                          ? "bg-rose-600 text-white shadow-xs"
                          : isCaution
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-emerald-600 text-white shadow-xs"
                      }`}
                    >
                      {item.expectedVerdictForAlex}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 text-[10px] font-semibold text-white/90 drop-shadow-xs">
                    {item.cuisine} • {item.prepTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex flex-wrap gap-1">
                    {item.riskHighlights.map((hl) => (
                      <span
                        key={hl}
                        className="rounded px-1.5 py-0.2 text-[9px] font-medium bg-muted text-muted-foreground"
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
      )}

      {/* Camera / OCR Simulator Mode */}
      {inputMode === "camera" && (
        <Card className="border-border/80 bg-card/60 shadow-xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Camera className="size-4 text-primary" />
              Optical Food Label Scanner Simulator
            </CardTitle>
            <CardDescription className="text-xs">
              Simulates edge camera scanning of packaging nutrition panels and ingredients lists.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="rounded-xl border-2 border-dashed border-border p-8 text-center space-y-3 bg-muted/20">
              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <UploadCloud className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-foreground">
                  Snap a photo of ingredient label
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Open-source OCR extracts text locally without uploading images to cloud servers.
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setFoodName("Store Granola Bar");
                    setRawText(
                      "Whole grain rolled oats, honey, brown rice syrup, canola oil, crisp rice (rice flour, sugar, salt, barley malt extract), soy lecithin, natural flavors. Manufactured on shared equipment with peanuts."
                    );
                    setInputMode("editor");
                  }}
                  className="text-xs h-8"
                >
                  Load Granola Label Sample
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setFoodName("Artisan Sourdough Loaf");
                    setRawText(
                      "Organic wheat flour, water, wild sourdough starter cultures, sea salt."
                    );
                    setInputMode("editor");
                  }}
                  className="text-xs h-8"
                >
                  Load Bakery Bread Sample
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Editor & Execution Panel */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <FileCode className="size-4 text-primary" />
                Active Ingredient Vector Feed
              </CardTitle>
              <CardDescription className="text-xs">
                Inspect raw ingredient strings parsed into TabPFN tabular tokens
              </CardDescription>
            </div>

            <span className="text-[11px] font-mono text-muted-foreground">
              {rawText.split(/[,;\n]/).filter(Boolean).length} tokens detected
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="dish-name-input" className="text-xs font-bold text-foreground">
                Dish / Product Title:
              </label>
              <input
                id="dish-name-input"
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label
                htmlFor="ingredients-textarea"
                className="text-xs font-bold text-foreground flex items-center justify-between"
              >
                <span>Raw Ingredients Statement:</span>
                <span className="text-[10px] font-normal text-muted-foreground">
                  Comma or line delimited
                </span>
              </label>
              <textarea
                id="ingredients-textarea"
                rows={2}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              TabPFN In-Context attention matrix active
            </span>

            <Button
              size="sm"
              onClick={handleExecuteAudit}
              disabled={isAuditing || !foodName.trim() || !rawText.trim()}
              className="w-full sm:w-auto h-8 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-1.5 text-xs rounded-lg shadow-xs"
            >
              <Sparkles className="size-3.5" />
              {isAuditing ? "TabPFN Computing..." : "Run TabPFN Diagnostic"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
