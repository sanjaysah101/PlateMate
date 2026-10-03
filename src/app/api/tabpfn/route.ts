import { type NextRequest, NextResponse } from "next/server";

import { DEFAULT_FRIEND_ALEX } from "@/lib/friend-profile";
import { auditFoodWithTabPFN } from "@/lib/tabpfn-engine";
import type { FriendProfile } from "@/lib/tabpfn-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { foodName, rawIngredients, category, friendProfile } = body;

    if (!foodName || !rawIngredients) {
      return NextResponse.json(
        { error: "foodName and rawIngredients are required in request body" },
        { status: 400 }
      );
    }

    const friend: FriendProfile = friendProfile || DEFAULT_FRIEND_ALEX;
    const audit = auditFoodWithTabPFN(foodName, category || "custom_input", rawIngredients, friend);

    return NextResponse.json({
      success: true,
      engine: "Prior Labs TabPFN (In-Context Tabular Foundation Model)",
      model: "tabpfn-v2-classifier",
      audit,
      meta: {
        totalIngredientsAnalyzed: audit.tabpfnIngredients.length,
        anomaliesDetected: audit.tabpfnAnomalyCount,
        overallSafety: audit.overallSafety,
        riskScore: audit.overallRiskScore,
        confidencePct: audit.confidencePct,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to execute TabPFN inference";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
