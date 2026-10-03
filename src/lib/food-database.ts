export interface SampleFoodItem {
  id: string;
  name: string;
  cuisineOrBrand: string;
  category: "restaurant_dish" | "packaged_food" | "custom_input";
  description: string;
  rawIngredients: string;
  expectedVerdictForAlex: "SAFE" | "CAUTION" | "DANGEROUS";
  keyTakeaway: string;
}

export const SAMPLE_FOOD_DATABASE: SampleFoodItem[] = [
  {
    id: "thai-chicken-pad-thai",
    name: "Classic Chicken Pad Thai",
    cuisineOrBrand: "Bangkok Bistro",
    category: "restaurant_dish",
    description:
      "Stir-fried rice noodles with chicken, egg, crushed peanuts, bean sprouts, tamarind sauce, and soy sauce.",
    rawIngredients:
      "Rice noodles, chicken breast, eggs, crushed peanuts, peanut oil, fish sauce, tamarind paste, regular brewed soy sauce (contains wheat), palm sugar, bean sprouts, garlic chives.",
    expectedVerdictForAlex: "DANGEROUS",
    keyTakeaway:
      "Contains both direct crushed peanuts/peanut oil (anaphylaxis danger) AND wheat-brewed soy sauce (Celiac reaction).",
  },
  {
    id: "artisan-sourdough-bruschetta",
    name: "Tuscan Heirloom Tomato Bruschetta",
    cuisineOrBrand: "Trattoria Bella",
    category: "restaurant_dish",
    description:
      "Grilled sourdough bread topped with ripe heirloom tomatoes, basil, extra virgin olive oil, and aged balsamic glaze.",
    rawIngredients:
      "Sourdough wheat bread, heirloom tomatoes, fresh basil, extra virgin olive oil, garlic, sea salt, aged balsamic glaze (grape must, wine vinegar, modified wheat starch).",
    expectedVerdictForAlex: "DANGEROUS",
    keyTakeaway:
      "Direct wheat sourdough + hidden wheat derivative (modified wheat starch in balsamic glaze).",
  },
  {
    id: "japanese-salmon-sashimi-bowl",
    name: "Salmon Sashimi & Steamed Calrose Rice",
    cuisineOrBrand: "Kura Sushi Bar",
    category: "restaurant_dish",
    description:
      "Fresh Atlantic salmon sashimi served over steamed plain short-grain rice with cucumber, avocado, and pickled ginger.",
    rawIngredients:
      "Atlantic salmon sashimi, 100% Calrose short-grain rice, fresh avocado, English cucumber, pickled ginger (ginger, water, salt, acetic acid), toasted white sesame seeds. Prepared in a dedicated gluten-free and peanut-free cold prep station.",
    expectedVerdictForAlex: "SAFE",
    keyTakeaway:
      "Clean protein and naturally gluten-free rice; sesame seeds present at low mild sensitivity without peanut or gluten risk.",
  },
  {
    id: "organic-granola-bar",
    name: "Crunchy Oat & Honey Granola Bars",
    cuisineOrBrand: "Nature's Trail Organics",
    category: "packaged_food",
    description: "Packaged honey oat snack bars labeled 'Made with Real Oats'.",
    rawIngredients:
      "Whole grain rolled oats, honey, brown rice syrup, canola oil, crisp rice (rice flour, sugar, salt, barley malt extract), soy lecithin, natural flavors. Manufactured on shared equipment that also processes peanuts and tree nuts.",
    expectedVerdictForAlex: "DANGEROUS",
    keyTakeaway:
      "Contains barley malt extract (hidden gluten) and shared line warning with peanuts. TabPFN flags facility risk anomaly.",
  },
  {
    id: "truffle-parmesan-fries",
    name: "Hand-Cut Truffle Herb Fries",
    cuisineOrBrand: "The Craft Gastropub",
    category: "restaurant_dish",
    description:
      "Crispy Idaho russet potato fries tossed in white truffle oil, rosemary, and aged grated parmesan.",
    rawIngredients:
      "Russet potatoes, white truffle infused olive oil, fresh rosemary, sea salt, aged parmesan cheese (milk, cultures, salt, rennet). Fried in a shared commercial deep fryer that also cooks beer-battered onion rings and fried chicken.",
    expectedVerdictForAlex: "CAUTION",
    keyTakeaway:
      "Ingredients are gluten-free potatoes, but cooking in a shared fryer with beer batter creates severe cross-contact danger.",
  },
  {
    id: "certified-gf-pasta-primavera",
    name: "Certified GF Penne Primavera",
    cuisineOrBrand: "Harvest Kitchen (Dedicated Allergen-Safe)",
    category: "restaurant_dish",
    description:
      "100% certified gluten-free corn and rice pasta tossed with roasted zucchini, bell peppers, extra virgin olive oil, and garlic.",
    rawIngredients:
      "Certified gluten-free penne (corn flour, brown rice flour), zucchini, red bell pepper, cherry tomatoes, extra virgin olive oil, fresh garlic, basil, black pepper. Prepared in a dedicated allergen-certified allergen-free prep zone.",
    expectedVerdictForAlex: "SAFE",
    keyTakeaway:
      "Certified zero-cross-contact gluten-free pasta with zero peanut derivatives. 100% safe for Alex.",
  },
];
