"use client";

import { useState } from "react";

import { AlertCircle, Check, Heart, Phone, Plus, Save, ShieldAlert, User, X } from "lucide-react";

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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-rose-500/5 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-2xl shadow-xs">
            {profile.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground">
                {profile.name}'s Medical Allergen Vault
              </h2>
              <Heart className="size-4 fill-rose-500 text-rose-500" />
            </div>
            <p className="text-xs text-muted-foreground">
              {profile.relationship} • Strict On-Device Medical Defense Matrix
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleSave}
          className="h-8 gap-1.5 text-xs font-semibold bg-primary text-primary-foreground shadow-xs"
        >
          {savedSuccess ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
          {savedSuccess ? "Saved to Vault!" : "Save Profile"}
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Allergen Sensitivity Matrix */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/80 bg-card shadow-xs">
            <CardHeader className="p-4 pb-3 border-b border-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold">Active Allergen Sensitivities</CardTitle>
                  <CardDescription className="text-xs">
                    Weights used by TabPFN during in-context tabular feature calculations
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">
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
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl shrink-0">{def?.icon || "⚠️"}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-foreground">
                            {rule.allergenName}
                          </span>
                          {rule.strictlyNoSharedEquipment && (
                            <span className="rounded bg-rose-500/10 text-rose-500 font-bold text-[9px] px-1.5 py-0.2 border border-rose-500/20">
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
                            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-all ${
                              isActive
                                ? sev === "severe"
                                  ? "bg-rose-600 text-white shadow-2xs"
                                  : sev === "moderate"
                                    ? "bg-amber-500 text-white shadow-2xs"
                                    : sev === "mild"
                                      ? "bg-sky-500 text-white shadow-2xs"
                                      : "bg-muted-foreground/30 text-foreground"
                                : "bg-card text-muted-foreground hover:bg-muted"
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
          <Card className="border-border/80 bg-card shadow-xs">
            <CardHeader className="p-4 pb-2 border-b border-border/60">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                <ShieldAlert className="size-3.5" />
                Emergency Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-muted-foreground" />
                <span className="font-semibold text-foreground">
                  {profile.emergencyContact.name}
                </span>
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
          <Card className="border-border/80 bg-card shadow-xs">
            <CardHeader className="p-4 pb-2 border-b border-border/60">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <AlertCircle className="size-3.5" />
                Custom Trigger Keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {profile.customBannedWords.map((word, idx) => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-foreground font-medium"
                  >
                    {word}
                    <button
                      type="button"
                      onClick={() => handleRemoveBannedWord(idx)}
                      className="text-muted-foreground hover:text-rose-500"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-1.5 pt-1">
                <Input
                  placeholder="Add custom banned ingredient..."
                  value={newBannedWord}
                  onChange={(e) => setNewBannedWord(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddBannedWord()}
                  className="h-8 text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddBannedWord}
                  className="h-8 text-xs px-2.5"
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
