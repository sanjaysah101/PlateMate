"use client";

import { useState } from "react";

import { Check, Copy, Globe, Printer, ShieldAlert, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  { code: "en", label: "English 🇬🇧" },
  { code: "es", label: "Spanish 🇪🇸" },
  { code: "it", label: "Italian 🇮🇹" },
  { code: "ja", label: "Japanese 🇯🇵" },
  { code: "fr", label: "French 🇫🇷" },
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
        return `¡Hola! Mi amigo/a ${friend.name} tiene alergias alimentarias médicas severas: ${severeList} (GRAVE) y ${moderateList} (MODERADO). El contacto cruzado con sartenes, aceite de freír o tablas de cortar compartidas puede causarle una reacción médica grave / shock anafiláctico. Por favor, confirme que ${currentDishName} NO contiene ninguno de estos ingredientes ni trazas. ¡Muchas gracias por su ayuda!`;
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

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-border bg-card p-6 shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <DialogTitle className="text-xl font-bold">
                Restaurant Server Dietary Card
              </DialogTitle>
            </div>
            <DialogClose className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100">
              <X className="size-4" />
            </DialogClose>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Show this card on your phone or hand it directly to the waiter or kitchen staff.
          </DialogDescription>
        </DialogHeader>

        {/* Language selector */}
        <div className="my-3 flex flex-wrap items-center gap-1.5 border-b border-border/60 pb-3">
          <Globe className="mr-1 size-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground mr-1">Language:</span>
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setLang(item.code)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                lang === item.code
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Visual Card Display */}
        <div className="rounded-xl border-2 border-rose-500/40 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent p-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-rose-500" />
              <span className="font-extrabold uppercase tracking-wide text-xs text-rose-500">
                Medical Allergy Notice
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-rose-500 text-rose-600 dark:text-rose-400 font-bold text-[10px]"
            >
              For {friend.name}
            </Badge>
          </div>

          <p className="text-base font-medium leading-relaxed text-foreground whitespace-pre-line">
            "{currentText}"
          </p>

          <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>
              Emergency Contact: <strong>{friend.emergencyContact.name}</strong> (
              {friend.emergencyContact.phone})
            </span>
            <span className="italic text-[11px]">Validated with TabPFN In-Context Engine</span>
          </div>
        </div>

        <DialogFooter className="mt-4 flex flex-row items-center justify-between gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
            <Printer className="size-3.5" />
            Print Card
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied to Clipboard!" : "Copy Text"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
