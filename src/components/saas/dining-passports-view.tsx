"use client";

import { useState } from "react";

import { Check, Copy, Printer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FriendProfile } from "@/lib/tabpfn-types";

interface DiningPassportsViewProps {
  friend: FriendProfile;
  currentDishName?: string;
}

const PASSPORTS = [
  {
    code: "en",
    language: "English (UK & International)",
    flag: "🇬🇧",
    getText: (friendName: string, severe: string, _moderate: string) =>
      `Hello! My friend ${friendName} has severe medical food allergies (${severe}). Even trace amounts or cross-contamination from cooking oils, shared grills, or cutting boards can cause acute illness or anaphylactic shock. Please ensure all dishes served contain ZERO traces of these ingredients, and kindly notify the kitchen chef. Thank you for your care!`,
  },
  {
    code: "es",
    language: "Spanish (España & Latin America)",
    flag: "🇪🇸",
    getText: (friendName: string, severe: string, _moderate: string) =>
      `¡Hola! Mi amigo/a ${friendName} tiene alergias alimentarias médicas muy severas (${severe}). Incluso trazas microscópicas o la contaminación cruzada en sartenes, aceite de freír o tablas de cortar pueden causarle un shock anafiláctico grave. Por favor, confirme con la cocina que la comida no contiene ninguno de estos ingredientes. ¡Muchas gracias!`,
  },
  {
    code: "it",
    language: "Italian (Italia)",
    flag: "🇮🇹",
    getText: (friendName: string, severe: string, _moderate: string) =>
      `Buongiorno! Il mio amico ${friendName} soffre di gravissime allergie alimentari (${severe}). Anche minime tracce o contaminazioni incrociate su piastre, friggitrici o taglieri possono provocare reazioni anafilattiche pericolose per la vita. Vi preghiamo di verificare in cucina che il cibo sia preparato in totale sicurezza. Grazie di cuore!`,
  },
  {
    code: "ja",
    language: "Japanese (日本)",
    flag: "🇯🇵",
    getText: (friendName: string, severe: string, _moderate: string) =>
      `こんにちは。私の友人${friendName}は命に関わる重度の食物アレルギー（${severe}）を持っています。微量の混入や調理器具、油の共用でもアナフィラキシーショック等の重篤な症状を引き起こします。厨房スタッフの方に確認いただき、アレルゲンの混入がないよう厳重なご配慮をお願いいたします。`,
  },
  {
    code: "fr",
    language: "French (France / Belgique)",
    flag: "🇫🇷",
    getText: (friendName: string, severe: string, _moderate: string) =>
      `Bonjour! Mon ami(e) ${friendName} a de graves allergies alimentaires médicales (${severe}). Même des traces microscopiques ou la contamination croisée sur les poêles, plaques ou friteuses peuvent déclencher un choc anaphylactique. Merci de vérifier en cuisine que la commande est préparée sans aucun de ces ingrédients. Merci pour votre vigilance!`,
  },
];

export function DiningPassportsView({
  friend,
  currentDishName = "Active Order",
}: DiningPassportsViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const severeList = friend.rules
    .filter((r) => r.severity === "severe")
    .map((r) => r.allergenName)
    .join(", ");

  const moderateList = friend.rules
    .filter((r) => r.severity === "moderate")
    .map((r) => r.allergenName)
    .join(", ");

  const handleCopy = (code: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Multilingual Dining Passports
            </h1>
            <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">
              For {friend.name}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Display on mobile or print chef instruction cards before traveling or dining at
            international restaurants.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handlePrint}
          className="h-8 gap-1.5 text-xs font-medium border-border hover:bg-secondary self-start sm:self-auto"
        >
          <Printer className="size-3.5" />
          Print Passports
        </Button>
      </div>

      {/* Grid of Passports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PASSPORTS.map((p) => {
          const cardText = p.getText(friend.name, severeList, moderateList);
          const isCopied = copiedCode === p.code;

          return (
            <Card
              key={p.code}
              className="border-border bg-card shadow-2xs flex flex-col justify-between"
            >
              <CardHeader className="p-4 pb-2 border-b border-border bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{p.flag}</span>
                    <CardTitle className="text-xs font-semibold text-foreground">
                      {p.language}
                    </CardTitle>
                  </div>

                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {p.code}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs font-normal text-foreground leading-relaxed whitespace-pre-line bg-muted/20 p-3 rounded-md border border-border">
                  &ldquo;{cardText}&rdquo;
                </p>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    Emergency Contact: {friend.emergencyContact.phone}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(p.code, cardText)}
                    className="h-7 text-xs font-medium gap-1 text-primary hover:text-primary hover:bg-primary/10"
                  >
                    {isCopied ? (
                      <Check className="size-3 text-emerald-500" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    {isCopied ? "Copied" : "Copy Card"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
