"use client";

import { useEffect, useState } from "react";

import { FriendProfileModal } from "@/components/friend-profile-drawer";
import { AllergenVaultView } from "@/components/saas/allergen-vault-view";
import { AppSidebar } from "@/components/saas/app-sidebar";
import { AppTopbar } from "@/components/saas/app-topbar";
import { DiningPassportsView } from "@/components/saas/dining-passports-view";
import { FoodDiagnosticPanel } from "@/components/saas/food-diagnostic-panel";
import { HackathonView } from "@/components/saas/hackathon-view";
import { TabPFNLabView } from "@/components/saas/tabpfn-lab-view";
import { TelemetrySidebar } from "@/components/saas/telemetry-sidebar";
import { WaiterCardModal } from "@/components/waiter-card-modal";
import { SAMPLE_FOOD_DATABASE, type SampleFoodItem } from "@/lib/food-database";
import { DEFAULT_FRIEND_ALEX } from "@/lib/friend-profile";
import { auditFoodWithTabPFN } from "@/lib/tabpfn-engine";
import type { FoodAuditResult, FriendProfile } from "@/lib/tabpfn-types";

export default function Home() {
  const [friend, setFriend] = useState<FriendProfile>(DEFAULT_FRIEND_ALEX);
  const [currentAudit, setCurrentAudit] = useState<FoodAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentView, setCurrentView] = useState("scanner");
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    SAMPLE_FOOD_DATABASE[0]?.id || ""
  );
  const [currentDishImage, setCurrentDishImage] = useState<string>(
    SAMPLE_FOOD_DATABASE[0]?.image || "/dishes/pad_thai.jpg"
  );

  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWaiterCardModalOpen, setIsWaiterCardModalOpen] = useState(false);

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
      setSelectedPresetId(firstSample.id);
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
    }, 350);
  };

  const handleSelectPreset = (item: SampleFoodItem) => {
    setSelectedPresetId(item.id);
    setCurrentDishImage(item.image);
    handleAuditFood(item.name, item.category, item.rawIngredients, item.image);
  };

  const handleNewScan = () => {
    setCurrentView("scanner");
    const sample = SAMPLE_FOOD_DATABASE[0];
    if (sample) {
      handleSelectPreset(sample);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex antialiased">
      {/* 1. Left SaaS Sidebar */}
      <AppSidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        friend={friend}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenWaiterCard={() => setIsWaiterCardModalOpen(true)}
      />

      {/* 2. Main SaaS Dashboard Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <AppTopbar
          currentView={currentView}
          friend={friend}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenWaiterCard={() => setIsWaiterCardModalOpen(true)}
          onNewScan={handleNewScan}
          onSelectPreset={handleSelectPreset}
          onSelectView={setCurrentView}
        />

        {/* Content Workspace Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {/* View 1: Main Scanner & Telemetry 2-Column Cockpit */}
            {currentView === "scanner" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-slide-in">
                {/* Left 7 Columns: Food Diagnostic Panel */}
                <div className="lg:col-span-7 xl:col-span-8">
                  <FoodDiagnosticPanel
                    friend={friend}
                    onAuditFood={handleAuditFood}
                    isAuditing={isAuditing}
                    selectedPresetId={selectedPresetId}
                    onSelectPreset={handleSelectPreset}
                  />
                </div>

                {/* Right 5 Columns: Diagnostic Telemetry Sidebar */}
                <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
                  <TelemetrySidebar
                    audit={currentAudit}
                    friend={friend}
                    dishImage={currentDishImage}
                    onOpenWaiterCard={() => setIsWaiterCardModalOpen(true)}
                  />
                </div>
              </div>
            )}

            {/* View 2: TabPFN Neural Lab */}
            {currentView === "tabpfn-lab" && (
              <div className="animate-fade-slide-in">
                <TabPFNLabView audit={currentAudit} />
              </div>
            )}

            {/* View 3: Allergen Vault */}
            {currentView === "allergen-vault" && (
              <div className="animate-fade-slide-in">
                <AllergenVaultView
                  friend={friend}
                  onUpdateFriend={(updated) => {
                    setFriend(updated);
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
              </div>
            )}

            {/* View 4: Dining Passports */}
            {currentView === "dining-passport" && (
              <div className="animate-fade-slide-in">
                <DiningPassportsView friend={friend} currentDishName={currentAudit?.foodName} />
              </div>
            )}

            {/* View 5: Hackathon Story */}
            {currentView === "hackathon" && (
              <div className="animate-fade-slide-in">
                <HackathonView />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <FriendProfileModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
        friend={friend}
        onUpdateFriend={(updated) => {
          setFriend(updated);
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
        open={isWaiterCardModalOpen}
        onOpenChange={setIsWaiterCardModalOpen}
        friend={friend}
        currentDishName={currentAudit?.foodName}
      />
    </div>
  );
}
