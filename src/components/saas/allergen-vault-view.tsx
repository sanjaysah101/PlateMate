"use client";

import { useState } from "react";

import { AlertCircle, Check, Phone, Plus, Save, ShieldAlert, User, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { COMMON_ALLERGENS } from "@/lib/friend-profile";
import type { AllergenSeverity, FriendProfile } from "@/lib/tabpfn-types";

interface AllergenVaultViewProps {
  friend: FriendProfile;
  onUpdateFriend: (updated: FriendProfile) => void;
}

export function AllergenVaultView({ friend, onUpdateFriend }: AllergenVaultViewProps) {
  const [profile, setProfile] = useState<FriendProfile>(friend);
  const [newBannedWord, setNewBannedWord] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSeverityChange = (allergenId: string, severity: AllergenSeverity) => {
    const updatedRules = profile.rules.map((r) => {
      if (r.allergenId === allergenId) {
        return { ...r, severity };
      }
      return r;
    });

    const updated = { ...profile, rules: updatedRules };
    setProfile(updated);
    onUpdateFriend(updated);
  };

  const handleAddBannedWord = () => {
    if (!newBannedWord.trim()) return;
    const updated = {
      ...profile,
      customBannedWords: [...profile.customBannedWords, newBannedWord.trim()],
    };
    setProfile(updated);
    onUpdateFriend(updated);
    setNewBannedWord("");
  };

  const handleRemoveBannedWord = (idx: number) => {
    const updated = {
      ...profile,
      customBannedWords: profile.customBannedWords.filter((_, i) => i !== idx),
    };
    setProfile(updated);
    onUpdateFriend(updated);
  };

  const handleSave = () => {
    onUpdateFriend(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-xl shrink-0">
            {profile.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                {profile.name}&apos;s Medical Allergen Matrix
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {profile.relationship} · Strict on-device TabPFN weight configuration
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleSave}
          className="h-8 gap-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
          {savedSuccess ? "Saved to Matrix" : "Save Matrix"}
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Allergen Sensitivity Matrix */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border bg-card shadow-2xs">
            <CardHeader className="p-4 pb-3 border-b border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Active Allergen Sensitivities
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    TabPFN prior weights for in-context tabular feature calculations
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono border-border">
                  {profile.rules.length} Monitored Groups
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-2.5">
              {profile.rules.map((rule) => {
                const def = COMMON_ALLERGENS.find((a) => a.id === rule.allergenId);
                return (
                  <div
                    key={rule.allergenId}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl shrink-0">{def?.icon || "⚠️"}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-foreground">
                            {rule.allergenName}
                          </span>
                          {rule.strictlyNoSharedEquipment && (
                            <span className="rounded bg-destructive/10 text-destructive font-medium text-[9px] px-1.5 py-0.2 border border-destructive/20">
                              0 ppm Strict
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{rule.notes}</p>
                      </div>
                    </div>

                    {/* Selector */}
                    <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                      {(["severe", "moderate", "mild", "none"] as AllergenSeverity[]).map((sev) => {
                        const isActive = rule.severity === sev;
                        return (
                          <button
                            key={sev}
                            type="button"
                            onClick={() => handleSeverityChange(rule.allergenId, sev)}
                            className={`rounded px-2 py-0.5 text-[10px] font-medium uppercase transition-colors ${
                              isActive
                                ? sev === "severe"
                                  ? "bg-destructive text-destructive-foreground shadow-2xs"
                                  : sev === "moderate"
                                    ? "bg-amber-500 text-white shadow-2xs"
                                    : sev === "mild"
                                      ? "bg-sky-500 text-white shadow-2xs"
                                      : "bg-muted text-muted-foreground"
                                : "bg-secondary text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {sev}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right: Emergency Contact & Banned Keywords */}
        <div className="space-y-4">
          {/* Emergency Contact */}
          <Card className="border-border bg-card shadow-2xs">
            <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-destructive" />
                Emergency Contact Roster
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">{profile.emergencyContact.name}</span>
                <span className="text-muted-foreground">
                  ({profile.emergencyContact.relationship})
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="size-3.5 text-muted-foreground" />
                <span className="text-foreground">{profile.emergencyContact.phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Custom Banned Additives */}
          <Card className="border-border bg-card shadow-2xs">
            <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-1.5">
                <AlertCircle className="size-3.5 text-primary" />
                Custom Banned Chemical Additives
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {profile.customBannedWords.map((word, idx) => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-foreground"
                  >
                    <span>{word}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBannedWord(idx)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Input
                  value={newBannedWord}
                  onChange={(e) => setNewBannedWord(e.target.value)}
                  placeholder="e.g. Maltodextrin, Brewer's yeast..."
                  className="h-8 text-xs bg-background border-border"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBannedWord();
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={handleAddBannedWord}
                  className="h-8 px-2.5 text-xs bg-secondary text-secondary-foreground hover:bg-muted"
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
