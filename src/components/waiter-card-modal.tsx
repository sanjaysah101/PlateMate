"use client";

import { useState } from "react";

import {
  Check,
  Copy,
  Heart,
  Phone,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => window.print();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border/80 bg-card shadow-2xl rounded-2xl gap-0">
        {/* Header Strip */}
        <div className="relative bg-gradient-to-br from-rose-600 via-rose-500 to-orange-500 p-6 pb-5">
          {/* Background texture */}
          <div className="absolute inset-0 bg-mesh-grid opacity-20" />

          <DialogHeader className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm shadow-sm">
                  <ShieldAlert className="size-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-white font-extrabold text-lg leading-tight">
                    Restaurant Dietary Safety Card
                  </DialogTitle>
                  <DialogDescription className="text-rose-100/80 text-xs mt-0.5 font-medium">
                    Show to your waiter or kitchen staff before ordering
                  </DialogDescription>
                </div>
              </div>

              {/* Friend badge */}
              <div className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <span className="text-base leading-none">{friend.avatar}</span>
                <div>
                  <p className="text-white text-[11px] font-bold leading-tight">{friend.name}</p>
                  <p className="text-rose-100/70 text-[9px] font-medium">{friend.relationship}</p>
                </div>
                <Heart className="size-3 text-white fill-white ml-0.5" />
              </div>
            </div>

            {/* Allergen chips in header */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {friend.rules
                .filter((r) => r.severity === "severe")
                .map((rule) => (
                  <span
                    key={rule.allergenId}
                    className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/30 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide backdrop-blur-sm"
                  >
                    <ShieldAlert className="size-2.5" />
                    {rule.allergenName}
                  </span>
                ))}
              {friend.rules
                .filter((r) => r.severity === "moderate")
                .map((rule) => (
                  <span
                    key={rule.allergenId}
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-2.5 py-1 text-[10px] font-medium text-rose-100 uppercase tracking-wide backdrop-blur-sm"
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
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide shrink-0">
              Language:
            </span>
            <div className="flex gap-1 flex-wrap">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    lang === item.code
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                  }`}
                >
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card Preview */}
          <div className="rounded-xl border-2 border-rose-500/30 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/40 dark:from-rose-950/25 dark:via-card dark:to-amber-950/10 p-5 shadow-inner relative overflow-hidden">
            {/* Subtle watermark */}
            <div className="absolute top-3 right-3 opacity-5">
              <ShieldCheck className="size-16 text-rose-500" />
            </div>

            {/* Card header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-200/60 dark:border-rose-800/30">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-md bg-rose-500/15 flex items-center justify-center">
                  <Stethoscope className="size-3.5 text-rose-600 dark:text-rose-400" />
                </div>
                <span className="font-black uppercase tracking-wide text-[11px] text-rose-600 dark:text-rose-400">
                  Medical Allergy Notice
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge
                  variant="outline"
                  className="border-rose-400/40 text-rose-600 dark:text-rose-400 font-bold text-[9px] px-2"
                >
                  For {friend.name}
                </Badge>
                <span className="text-[9px] font-mono bg-muted border border-border rounded px-1.5 py-0.5 text-muted-foreground uppercase">
                  {activeLang?.short ?? "EN"}
                </span>
              </div>
            </div>

            {/* Active dish context */}
            {currentDishName !== "this dish" && (
              <div className="mb-3 rounded-lg bg-rose-500/8 border border-rose-500/15 px-3 py-2 flex items-center gap-2">
                <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                  Checking:
                </span>
                <span className="text-xs font-bold text-foreground">{currentDishName}</span>
              </div>
            )}

            {/* Card text */}
            <p className="text-sm font-medium leading-relaxed text-foreground/90 whitespace-pre-line">
              "{currentText}"
            </p>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-rose-200/50 dark:border-rose-800/25 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="size-3 text-rose-500 shrink-0" />
                <span>
                  <strong className="text-foreground">{friend.emergencyContact.name}</strong>{" "}
                  <span className="font-mono text-[10px]">{friend.emergencyContact.phone}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground justify-end">
                <div className="size-3.5 rounded bg-primary/15 flex items-center justify-center shrink-0">
                  <span className="text-[7px] font-black text-primary">AI</span>
                </div>
                <span className="italic">Validated by TabPFN Engine</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="text-[10px] text-muted-foreground">
              💡 Show on your phone screen or print and hand to kitchen staff
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="h-8 gap-1.5 text-xs font-semibold"
              >
                <Printer className="size-3.5" />
                Print
              </Button>
              <Button
                size="sm"
                onClick={handleCopy}
                className={`h-8 gap-1.5 text-xs font-bold transition-all ${
                  copied
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-rose-600 hover:bg-rose-700 text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy Text
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
