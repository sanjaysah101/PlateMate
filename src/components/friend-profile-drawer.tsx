"use client";

import { useState } from "react";

import { Check, Heart, Plus, ShieldCheck, X } from "lucide-react";

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
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-border bg-card p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{profile.avatar}</span>
              <div>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  {profile.name}'s Medical Allergy Profile
                  <Heart className="size-4 fill-rose-500 text-rose-500" />
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {profile.relationship} • Strict Personal Food Defense Rules
                </DialogDescription>
              </div>
            </div>
            <DialogClose className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100">
              <X className="size-4" />
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Bio & Emergency Callout */}
        <div className="mt-2 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3.5 text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">Health & Anaphylaxis Summary:</p>
          <p>{profile.bio}</p>
        </div>

        {/* Dietary Style Badges */}
        <div className="my-2 flex flex-wrap gap-1.5">
          {profile.dietaryStyles.map((style) => (
            <Badge key={style} variant="secondary" className="bg-muted text-xs font-semibold">
              ✓ {style}
            </Badge>
          ))}
        </div>

        {/* Rules Table */}
        <div className="space-y-3 mt-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Allergen Sensitivity Matrix (Processed by TabPFN)
          </h4>

          <div className="grid gap-2">
            {profile.rules.map((rule) => {
              const allergenDef = COMMON_ALLERGENS.find((a) => a.id === rule.allergenId);
              return (
                <div
                  key={rule.allergenId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-lg border border-border/80 bg-background/50 p-3 transition-colors hover:border-border"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">{allergenDef?.icon || "⚠️"}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">
                          {rule.allergenName}
                        </span>
                        {rule.strictlyNoSharedEquipment && (
                          <Badge
                            variant="outline"
                            className="border-rose-500/40 text-[10px] text-rose-500 font-semibold px-1.5 py-0"
                          >
                            Zero ppm / No Shared Line
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
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
                          className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase transition-all ${
                            isActive
                              ? sev === "severe"
                                ? "bg-rose-500 text-white"
                                : sev === "moderate"
                                  ? "bg-amber-500 text-white"
                                  : sev === "mild"
                                    ? "bg-sky-500 text-white"
                                    : "bg-muted-foreground/30 text-foreground"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
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
        <div className="mt-4 pt-3 border-t border-border/60 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Custom Trigger Keywords & Derivatives
            </h4>
            <span className="text-[11px] text-muted-foreground">Auto-checked in every scan</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {profile.customBannedWords.map((word, idx) => (
              <span
                key={word}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs text-foreground font-medium"
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

          <div className="flex gap-2 pt-1">
            <Input
              placeholder="e.g. maltodextrin, lupin, whey protein isolate..."
              value={newBannedWord}
              onChange={(e) => setNewBannedWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddBannedWord()}
              className="text-xs h-8"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddBannedWord}
              className="h-8 gap-1 text-xs"
            >
              <Plus className="size-3.5" />
              Add
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            Stored safely & privately on local device
          </span>

          <Button
            size="sm"
            onClick={handleSave}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold gap-1.5 text-xs"
          >
            {savedToast ? <Check className="size-3.5" /> : null}
            {savedToast ? "Saved Profile!" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
