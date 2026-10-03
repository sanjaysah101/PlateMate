"use client";

import { useState } from "react";
import Image from "next/image";

import { Camera, FileCode, Sparkles, UploadCloud } from "lucide-react";

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
    <div className="flex flex-col gap-5">
      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/60 p-1 self-start">
          <button
            type="button"
            onClick={() => setInputMode("presets")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              inputMode === "presets"
                ? "bg-card text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Curated Menu Items ({SAMPLE_FOOD_DATABASE.length})
          </button>
          <button
            type="button"
            onClick={() => setInputMode("editor")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              inputMode === "editor"
                ? "bg-card text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Raw Ingredient Editor
          </button>
          <button
            type="button"
            onClick={() => setInputMode("camera")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              inputMode === "camera"
                ? "bg-card text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Label OCR Simulator
          </button>
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span>
            Active Patient: <strong className="text-foreground">{friend.name}</strong> (Celiac &
            Peanuts)
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
                className={`group relative overflow-hidden rounded-lg border text-left cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? "border-primary bg-card shadow-xs ring-1 ring-primary/30"
                    : "border-border bg-card/60 hover:border-border hover:bg-card hover:shadow-2xs"
                }`}
              >
                {/* Photo Header */}
                <div className="relative h-28 w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                  {/* Verdict Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                        isDangerous
                          ? "bg-destructive text-destructive-foreground shadow-2xs"
                          : isCaution
                            ? "bg-amber-500 text-white shadow-2xs"
                            : "bg-emerald-600 text-white shadow-2xs"
                      }`}
                    >
                      {item.expectedVerdictForAlex}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 text-[10px] font-medium text-white/95 drop-shadow-xs">
                    {item.cuisine} · {item.prepTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-xs text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex flex-wrap gap-1">
                    {item.riskHighlights.map((hl) => (
                      <span
                        key={hl}
                        className="rounded px-1.5 py-0.2 text-[9px] font-medium bg-secondary text-muted-foreground"
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
        <Card className="border-border bg-card shadow-2xs">
          <CardHeader className="p-4 pb-2 border-b border-border">
            <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-2">
              <Camera className="size-4 text-primary" />
              Optical Food Label Scanner Simulator
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Simulates edge camera scanning of packaging nutrition panels and ingredients lists.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="rounded-lg border border-dashed border-border p-6 text-center space-y-2.5 bg-muted/10">
              <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <UploadCloud className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-foreground">
                  Simulate scanning an ingredient label
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Text is extracted locally and vectorized without uploading images to cloud
                  servers.
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-1">
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
                  className="text-xs h-8 border-border"
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
                  className="text-xs h-8 border-border"
                >
                  Load Bakery Bread Sample
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Editor & Execution Panel */}
      <Card className="border-border bg-card shadow-2xs">
        <CardHeader className="p-4 pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-2">
                <FileCode className="size-4 text-primary" />
                Active Ingredient Vector Stream
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Raw culinary ingredient statement parsed into TabPFN tabular tokens
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
              <label htmlFor="dish-name-input" className="text-xs font-medium text-foreground">
                Dish or Product Name:
              </label>
              <input
                id="dish-name-input"
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label
                htmlFor="ingredients-textarea"
                className="text-xs font-medium text-foreground flex items-center justify-between"
              >
                <span>Raw Ingredients:</span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  Comma or line delimited
                </span>
              </label>
              <textarea
                id="ingredients-textarea"
                rows={2}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full rounded-md border border-border bg-background p-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              TabPFN In-Context tabular prior ready
            </span>

            <Button
              size="sm"
              onClick={handleExecuteAudit}
              disabled={isAuditing || !foodName.trim() || !rawText.trim()}
              className="w-full sm:w-auto h-8 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-xs rounded-md shadow-xs gap-1.5"
            >
              <Sparkles className="size-3.5" />
              {isAuditing ? "Evaluating Vectors..." : "Run TabPFN Diagnostic"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
