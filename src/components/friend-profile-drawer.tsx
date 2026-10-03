"use client";

import { useState } from "react";

import { Check, Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { COMMON_ALLERGENS } from "@/lib/friend-profile";
import type { AllergenSeverity, FriendProfile } from "@/lib/tabpfn-types";

interface FriendProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friend: FriendProfile;
  onUpdateFriend: (updated: FriendProfile) => void;
}

export function FriendProfileModal({
  open,
  onOpenChange,
  friend,
  onUpdateFriend,
}: FriendProfileModalProps) {
  const [profile, setProfile] = useState<FriendProfile>(friend);
  const [newBannedWord, setNewBannedWord] = useState("");
  const [savedToast, setSavedToast] = useState(false);

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

  const handleRemoveBannedWord = (index: number) => {
    const updated = {
      ...profile,
      customBannedWords: profile.customBannedWords.filter((_, i) => i !== index),
    };
    setProfile(updated);
    onUpdateFriend(updated);
  };

  const handleSave = () => {
    onUpdateFriend(profile);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onOpenChange(false);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-border bg-card p-6 shadow-xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{profile.avatar}</span>
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  {profile.name}&apos;s Allergy & Medical Profile
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {profile.relationship} · Strict On-Device Safety Rules
                </DialogDescription>
              </div>
            </div>
            <DialogClose className="rounded-md p-1 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Bio & Emergency Callout */}
        <div className="mt-2 rounded-md border border-border bg-muted/20 p-3 text-xs text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-0.5">Medical Allergy Summary:</p>
          <p>{profile.bio}</p>
        </div>

        {/* Dietary Style Badges */}
        <div className="my-2 flex flex-wrap gap-1.5">
          {profile.dietaryStyles.map((style) => (
            <Badge
              key={style}
              variant="secondary"
              className="text-xs font-normal bg-secondary text-secondary-foreground border border-border"
            >
              {style}
            </Badge>
          ))}
        </div>

        {/* Rules Table */}
        <div className="space-y-2.5 mt-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Allergen Sensitivity Matrix (TabPFN In-Context Weights)
          </h4>

          <div className="grid gap-2">
            {profile.rules.map((rule) => {
              const allergenDef = COMMON_ALLERGENS.find((a) => a.id === rule.allergenId);
              return (
                <div
                  key={rule.allergenId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-md border border-border bg-card p-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl shrink-0">{allergenDef?.icon || "⚠️"}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs text-foreground">
                          {rule.allergenName}
                        </span>
                        {rule.strictlyNoSharedEquipment && (
                          <span className="rounded bg-destructive/10 text-destructive font-medium text-[9px] px-1.5 py-0.2 border border-destructive/20">
                            Zero ppm / No Shared Line
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {rule.notes}
                      </p>
                    </div>
                  </div>

                  {/* Severity selector */}
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
          </div>
        </div>

        {/* Custom Banned Words & Additives */}
        <div className="mt-3 pt-3 border-t border-border space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Custom Trigger Keywords & Derivatives
            </h4>
            <span className="text-[11px] text-muted-foreground">Checked by TabPFN</span>
          </div>

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

          <div className="flex items-center gap-2 pt-1">
            <Input
              value={newBannedWord}
              onChange={(e) => setNewBannedWord(e.target.value)}
              placeholder="Add ingredient keyword (e.g. Maltodextrin)..."
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
              variant="outline"
              onClick={handleAddBannedWord}
              className="h-8 px-2.5 text-xs border-border"
            >
              <Plus className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            Emergency Contact: {profile.emergencyContact.name} ({profile.emergencyContact.phone})
          </span>
          <Button
            size="sm"
            onClick={handleSave}
            className="h-8 px-4 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {savedToast ? <Check className="size-3.5" /> : null}
            {savedToast ? "Saved" : "Save Profile"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
