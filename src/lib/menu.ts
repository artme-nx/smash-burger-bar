/**
 * Menu data taken from the client's two printed price lists (red Classic + gold
 * Signature). Prices in EUR. Ingredient descriptions live in the message files
 * (menu.ing.*) as reusable tokens; names are brand-proper and shared across
 * locales. No invented figures (calories/prep time) — anti-slop.
 */

export type Tier = { single: number; double: number; triple: number };

export type Burger = {
  id: string;
  name: string;
  /** tiered patty pricing, or a flat price (chicken) */
  tier?: Tier;
  flat?: number;
  /** ingredient token ids → menu.ing.<token> */
  ing: string[];
  /** true = one of the extra Signature-only burgers */
  signatureOnly?: boolean;
};

export type SimpleItem = { id: string; price: number };

const TIER: Tier = { single: 11, double: 13, triple: 15 };
export const PATTY_SIZES = { single: "80g", double: "160g", triple: "240g" } as const;

export const CLASSIC_BURGERS: Burger[] = [
  { id: "classic", name: "Classic Burger", tier: TIER, ing: ["beef", "burgerSauce", "cheddar", "iceberg"] },
  { id: "bbq", name: "BBQ Burger", tier: TIER, ing: ["beef", "bbqSauce", "cheddar", "iceberg", "caramelizedOnions", "bacon"] },
  { id: "truffle", name: "Truffle Burger", tier: TIER, ing: ["beef", "truffleMayo", "cheddar", "crispyOnions", "iceberg"] },
  { id: "chicken", name: "Chicken Burger", flat: 12, ing: ["crispyChicken", "honeyMustard", "cheddar", "iceberg", "caramelizedOnions"] },
];

export const SIGNATURE_BURGERS: Burger[] = [
  { id: "classic", name: "Classic Burger", tier: TIER, ing: ["beef", "cheddar", "iceberg", "burgerSauce"] },
  { id: "truffle", name: "Truffle Burger", tier: TIER, ing: ["beef", "cheddar", "iceberg", "figJam", "truffleMayo", "crispyOnions"] },
  { id: "bbq", name: "BBQ Burger", tier: TIER, ing: ["beef", "cheddar", "caramelizedOnions", "bacon", "bbqSauce", "spicyMayo"] },
  { id: "jalapeno", name: "Jalapeño Burger", tier: TIER, signatureOnly: true, ing: ["beef", "cheddar", "jalapenos", "bacon", "burgerSauce"] },
  { id: "oklahoma", name: "Oklahoma Burger", tier: TIER, signatureOnly: true, ing: ["beef", "cheddar", "bacon", "caramelizedOnions", "onionSauce"] },
  { id: "chicken", name: "Chicken Burger", flat: 12, ing: ["crispyChicken", "cheddar", "iceberg", "sweetChili", "honeyMustard"] },
];

export const CLASSIC_SIDES: SimpleItem[] = [
  { id: "mozzarellaSticks", price: 5 },
  { id: "truffleFries", price: 5 },
  { id: "cheddarFries", price: 5 },
  { id: "sweetPotato", price: 6 },
  { id: "frenchFries", price: 4 },
];

export const SIGNATURE_SIDES: SimpleItem[] = [
  { id: "onionRings", price: 5 },
  { id: "truffleParmesanFries", price: 6 },
  { id: "crispyCheddarFries", price: 6 },
  { id: "chickenNuggets", price: 6 },
  { id: "sweetPotatoFries", price: 6 },
  { id: "frenchFries", price: 4 },
];

// Drinks appear on the Classic list; shared across both boards.
export const DRINKS: SimpleItem[] = [
  { id: "cola", price: 3.5 },
  { id: "colaZero", price: 3.5 },
  { id: "fanta", price: 4 },
  { id: "sprite", price: 4 },
  { id: "schweppes", price: 4 },
  { id: "iceTea", price: 4 },
  { id: "water", price: 3.5 },
  { id: "beer", price: 5 },
];

export type BoardId = "classic" | "signature";

export function boardBurgers(board: BoardId) {
  return board === "signature" ? SIGNATURE_BURGERS : CLASSIC_BURGERS;
}
export function boardSides(board: BoardId) {
  return board === "signature" ? SIGNATURE_SIDES : CLASSIC_SIDES;
}
