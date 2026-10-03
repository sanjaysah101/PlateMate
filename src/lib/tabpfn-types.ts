export type AllergenSeverity = "severe" | "moderate" | "mild" | "none";

export interface AllergenCategory {
  id: string;
  name: string;
  commonNames: string[];
  hiddenDerivatives: string[];
  icon: string;
  color: string;
}

export interface FriendAllergyRule {
  allergenId: string;
  allergenName: string;
  severity: AllergenSeverity;
  notes: string;
  strictlyNoSharedEquipment: boolean;
}

export interface FriendProfile {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  bio: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  rules: FriendAllergyRule[];
  dietaryStyles: string[]; // e.g. "Strict Celiac", "Peanut Anaphylactic"
  customBannedWords: string[];
}

export interface TabularIngredientFeature {
  name: string;
  concentrationPct: number; // 0 - 100
  processingLevel: number; // 0.0 (raw) to 1.0 (ultra-processed/hydrolyzed)
  facilityRiskScore: number; // 0.0 (dedicated certified) to 1.0 (shared line)
  derivativeDistance: number; // 0.0 (direct allergen) to 1.0 (distant trace)
  friendSensitivityWeight: number; // 0.0 to 1.0
  hiddenAdditiveScore: number; // 0.0 to 1.0
}

export interface TabPFNPrediction {
  ingredientName: string;
  safetyClass: "SAFE" | "CAUTION" | "DANGEROUS";
  safetyClassNumeric: 0 | 1 | 2;
  classProbabilities: {
    safe: number;
    caution: number;
    dangerous: number;
  };
  crossContaminationProb: number; // 0 - 100%
  anomalyScore: number; // 0.0 - 1.0 (TabPFN anomaly detection)
  isAnomaly: boolean;
  matchedAllergen?: string;
  explanation: string;
  recommendation: string;
}

export interface FoodAuditResult {
  id: string;
  foodName: string;
  category: "restaurant_dish" | "packaged_food" | "custom_input";
  rawText: string;
  overallSafety: "SAFE" | "CAUTION" | "DANGEROUS";
  overallRiskScore: number; // 0 - 100
  confidencePct: number;
  tabpfnIngredients: TabPFNPrediction[];
  allergenFlags: {
    allergen: string;
    severity: AllergenSeverity;
    foundIn: string;
    riskDetails: string;
  }[];
  tabpfnAnomalyCount: number;
  safeSubstitutions: {
    originalIngredient: string;
    safeAlternative: string;
    notes: string;
  }[];
  waiterCardText: string;
}
