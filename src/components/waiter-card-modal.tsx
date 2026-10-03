"use client";

import { useState } from "react";

import { Check, Copy, Phone, Printer, ShieldAlert, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface WaiterCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friend: FriendProfile;
  currentDishName?: string;
}

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
  { code: "es", label: "Español", flag: "🇪🇸", short: "ES" },
  { code: "it", label: "Italiano", flag: "🇮🇹", short: "IT" },
  { code: "ja", label: "日本語", flag: "🇯🇵", short: "JA" },
  { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
];

export function WaiterCardModal({
  open,
  onOpenChange,
  friend,
  currentDishName = "this dish",
}: WaiterCardModalProps) {
  const [lang, setLang] = useState("en");
  const [copied, setCopied] = useState(false);

  const severeList = friend.rules
    .filter((r) => r.severity === "severe")
    .map((r) => r.allergenName)
    .join(", ");

  const moderateList = friend.rules
    .filter((r) => r.severity === "moderate")
    .map((r) => r.allergenName)
    .join(", ");

  const getTranslatedCard = (l: string) => {
    switch (l) {
      case "es":
        return `¡Hola! Mi amigo/a ${friend.name} tiene alergias alimentarias médicas severas: ${severeList} (GRAVE) y ${moderateList} (MODERADO). El contacto cruzado con sartenes, aceite de freír o tablas de cortar compartidas puede causarle una reacción médica grave o shock anafiláctico. Por favor, confirme que ${currentDishName} NO contiene ninguno de estos ingredientes ni trazas. ¡Muchas gracias por su ayuda!`;
      case "it":
        return `Buongiorno! Il mio amico ${friend.name} soffre di gravi allergie alimentari: ${severeList} (GRAVE) e ${moderateList} (MODERATO). Anche tracce microscopiche o la contaminazione incrociata da friggitrici o taglieri possono provocare shock anafilattico. Vi preghiamo di verificare che ${currentDishName} sia preparato in totale sicurezza senza queste sostanze. Grazie di cuore!`;
      case "ja":
        return `こんにちは。私の友人${friend.name}は重度の食物アレルギー（${severeList}、${moderateList}）を持っています。微量の混入や調理器具・油の共用でもアナフィラキシー等の命に関わる重篤な症状を引き起こします。${currentDishName}にこれらの成分が含まれていないか、厨房にご確認いただけますと幸いです。ご配慮よろしくお願いいたします。`;
      case "fr":
        return `Bonjour! Mon ami(e) ${friend.name} a de graves allergies alimentaires médicales: ${severeList} (SÉVÈRE) et ${moderateList} (MODÉRÉ). Même des traces microscopiques ou la contamination croisée sur les poêles ou friteuses peuvent déclencher un choc anaphylactique. Merci de vérifier en cuisine que ${currentDishName} ne contient aucun de ces ingrédients. Merci beaucoup pour votre vigilance!`;
      default:
        return `Hello! My friend ${friend.name} has severe medical food allergies (${severeList || "Peanuts & Gluten"}). Even trace amounts or cross-contamination from cooking oils, grills, or cutting boards can cause acute illness or anaphylactic shock. Please ensure ${currentDishName} contains ZERO traces of these ingredients, and kindly notify the kitchen chef. Thank you so much for keeping my friend safe!`;
    }
  };

  const currentText = getTranslatedCard(lang);
  const activeLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-border bg-card shadow-2xl rounded-xl gap-0">
        {/* Header */}
        <div className="border-b border-border bg-muted/20 p-5">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-md bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <ShieldAlert className="size-4" />
                </div>
                <div>
                  <DialogTitle className="text-base font-semibold text-foreground">
                    Chef & Waiter Dining Pass
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    Show to restaurant service staff to prevent cross-contamination
                  </DialogDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 border border-border bg-card rounded-md px-2.5 py-1 text-xs">
                <span className="text-sm">{friend.avatar}</span>
                <span className="font-medium text-foreground">{friend.name}</span>
              </div>
            </div>

            {/* Severity Tag list */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {friend.rules
                .filter((r) => r.severity === "severe")
                .map((rule) => (
                  <span
                    key={rule.allergenId}
                    className="inline-flex items-center gap-1 rounded bg-destructive/10 border border-destructive/20 px-2 py-0.5 text-[10px] font-medium text-destructive uppercase tracking-wide"
                  >
                    <ShieldAlert className="size-2.5" />
                    {rule.allergenName} (Severe)
                  </span>
                ))}
              {friend.rules
                .filter((r) => r.severity === "moderate")
                .map((rule) => (
                  <span
                    key={rule.allergenId}
                    className="inline-flex items-center gap-1 rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide"
                  >
                    {rule.allergenName}
                  </span>
                ))}
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide shrink-0">
              Language:
            </span>
            <div className="flex gap-1 flex-wrap">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    lang === item.code
                      ? "bg-secondary text-foreground font-semibold shadow-2xs border border-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <span className="text-xs">{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dining Pass Notice Box */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Stethoscope className="size-3.5 text-primary" />
                Medical Allergy Notification
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase bg-secondary px-1.5 py-0.5 rounded">
                {activeLang?.short ?? "EN"}
              </span>
            </div>

            {currentDishName !== "this dish" && (
              <div className="rounded bg-muted/30 border border-border px-2.5 py-1.5 text-xs flex items-center gap-2">
                <span className="text-muted-foreground text-[11px]">Audited Item:</span>
                <span className="font-semibold text-foreground">{currentDishName}</span>
              </div>
            )}

            <p className="text-xs sm:text-sm font-normal text-foreground leading-relaxed whitespace-pre-line bg-muted/10 p-3 rounded border border-border">
              &ldquo;{currentText}&rdquo;
            </p>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Phone className="size-3 text-muted-foreground" />
                <span>
                  Emergency:{" "}
                  <strong className="text-foreground">{friend.emergencyContact.name}</strong> (
                  {friend.emergencyContact.phone})
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">TabPFN Verified</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 gap-1.5 text-xs font-medium border-border"
            >
              <Printer className="size-3.5" />
              Print
            </Button>
            <Button
              size="sm"
              onClick={handleCopy}
              className="h-8 gap-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied to Clipboard" : "Copy Message"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
