export interface SampleFoodItem {
  id: string;
  name: string;
  cuisineOrBrand: string;
  category: "restaurant_dish" | "packaged_food" | "custom_input";
  description: string;
  rawIngredients: string;
  expectedVerdictForAlex: "SAFE" | "CAUTION" | "DANGEROUS";
  keyTakeaway: string;
  image: string;
  cuisine: string;
  prepTime: string;
  riskHighlights: string[];
}

export const SAMPLE_FOOD_DATABASE: SampleFoodItem[] = [
  {
    id: "thai-chicken-pad-thai",
    name: "Classic Chicken Pad Thai",
    cuisineOrBrand: "Bangkok Bistro",
    category: "restaurant_dish",
    description:
      "Wok-fired rice noodles with tender chicken, farm egg, crushed roasted peanuts, tamarind glaze, and brewed soy sauce.",
    rawIngredients:
      "Rice noodles, chicken breast, eggs, crushed peanuts, peanut oil, fish sauce, tamarind paste, regular brewed soy sauce (contains wheat), palm sugar, bean sprouts, garlic chives.",
    expectedVerdictForAlex: "DANGEROUS",
    keyTakeaway:
      "Contains direct crushed peanuts/peanut oil (anaphylaxis shock risk) AND wheat-brewed soy sauce (severe Celiac reaction).",
    image: "/dishes/pad_thai.jpg",
    cuisine: "Thai Wok",
    prepTime: "12 min",
    riskHighlights: ["Peanut Oil & Crushed Nuts", "Wheat-Brewed Soy Sauce"],
  },
  {
    id: "artisan-sourdough-bruschetta",
    name: "Tuscan Heirloom Tomato Bruschetta",
    cuisineOrBrand: "Trattoria Bella",
    category: "restaurant_dish",
    description:
      "Chargrilled artisan sourdough bread topped with sweet heirloom tomatoes, fresh basil ribbons, and aged balsamic reduction glaze.",
    rawIngredients:
      "Sourdough wheat bread, heirloom tomatoes, fresh basil, extra virgin olive oil, garlic, sea salt, aged balsamic glaze (grape must, wine vinegar, modified wheat starch).",
    expectedVerdictForAlex: "DANGEROUS",
    keyTakeaway:
      "Dual gluten violation: raw wheat sourdough bread + hidden modified wheat starch in balsamic glaze.",
    image: "/dishes/bruschetta.jpg",
    cuisine: "Italian Rustic",
    prepTime: "8 min",
    riskHighlights: ["Wheat Sourdough", "Modified Wheat Starch"],
  },
  {
    id: "japanese-salmon-sashimi-bowl",
    name: "Salmon Sashimi & Calrose Bowl",
    cuisineOrBrand: "Kura Artisan Sushi",
    category: "restaurant_dish",
    description:
      "Sashimi-grade Atlantic salmon over steamed short-grain Calrose rice, sliced Hass avocado, and toasted sesame seeds.",
    rawIngredients:
      "Atlantic salmon sashimi, 100% Calrose short-grain rice, fresh avocado, English cucumber, pickled ginger (ginger, water, salt, acetic acid), toasted white sesame seeds. Prepared in a dedicated allergen-safe cold prep zone.",
    expectedVerdictForAlex: "SAFE",
    keyTakeaway:
      "Naturally gluten-free steamed rice and clean protein. Sesame is at mild tolerance; zero peanut or gluten contamination.",
    image: "/dishes/salmon_bowl.jpg",
    cuisine: "Japanese Clean",
    prepTime: "10 min",
    riskHighlights: ["No Peanuts", "No Gluten", "Dedicated Cold Station"],
  },
  {
    id: "truffle-parmesan-fries",
    name: "Hand-Cut Truffle Herb Fries",
    cuisineOrBrand: "The Craft Gastropub",
    category: "restaurant_dish",
    description:
      "Crispy Idaho russet potato fries tossed in Italian white truffle oil, sea salt, fresh rosemary, and aged grated parmesan.",
    rawIngredients:
      "Russet potatoes, white truffle infused olive oil, fresh rosemary, sea salt, aged parmesan cheese (milk, cultures, salt, rennet). Fried in a shared commercial fryer that also cooks beer-battered fish and onion rings.",
    expectedVerdictForAlex: "CAUTION",
    keyTakeaway:
      "Potatoes and cheese are naturally safe, but frying in shared oil with beer-battered items carries high gluten cross-contact.",
    image: "/dishes/truffle_fries.jpg",
    cuisine: "Gastropub",
    prepTime: "14 min",
    riskHighlights: ["Shared Commercial Fryer (Beer Batter)", "Dairy (Parmesan)"],
  },
  {
    id: "organic-granola-bar",
    name: "Crunchy Oat & Honey Granola Bar",
    cuisineOrBrand: "Nature's Trail Organics",
    category: "packaged_food",
    description:
      "Convenience store packaged oat bar labeled 'Made with 100% Whole Grain Rolled Oats & Wild Honey'.",
    rawIngredients:
      "Whole grain rolled oats, honey, brown rice syrup, canola oil, crisp rice (rice flour, sugar, salt, barley malt extract), soy lecithin, natural flavors. Manufactured on shared equipment that also processes peanuts and tree nuts.",
    expectedVerdictForAlex: "DANGEROUS",
    keyTakeaway:
      "Hidden barley malt extract is a covert gluten derivative; facility warning flags shared equipment line with peanuts.",
    image: "/dishes/pad_thai.jpg",
    cuisine: "Packaged Snack",
    prepTime: "Ready to eat",
    riskHighlights: ["Barley Malt Extract", "Shared Line With Peanuts"],
  },
  {
    id: "certified-gf-pasta-primavera",
    name: "Certified GF Penne Primavera",
    cuisineOrBrand: "Harvest Kitchen (Certified Safe)",
    category: "restaurant_dish",
    description:
      "Corn & brown rice penne tossed with roasted squash, bell peppers, fresh garlic, and cold-pressed olive oil in a certified kitchen.",
    rawIngredients:
      "Certified gluten-free penne (corn flour, brown rice flour), zucchini, red bell pepper, cherry tomatoes, extra virgin olive oil, fresh garlic, basil, black pepper. Prepared in a dedicated allergen-certified prep station.",
    expectedVerdictForAlex: "SAFE",
    keyTakeaway:
      "100% verified allergen-free kitchen. Zero cross-contact risk and no peanut or wheat derivatives.",
    image: "/dishes/bruschetta.jpg",
    cuisine: "Allergen Certified",
    prepTime: "15 min",
    riskHighlights: ["Certified 0 ppm Gluten", "Zero Peanut Traces"],
  },
];
