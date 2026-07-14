/**
 * Cartoon illustration palette + layer order. Single source of truth shared by
 * the hero burger, the preloader stack and the "Every Layer" scroll sequence.
 * Values mirror the cartoon tokens in tokens.json.
 */
export const CARTOON = {
  outline: "#4A1520",
  bun: "#F0913F",
  bunShadow: "#D9772E",
  bunHi: "#FBBE7A",
  lettuce: "#7CBB45",
  lettuceShadow: "#5E9A33",
  tomato: "#E4443A",
  tomatoShadow: "#C6362E",
  cheese: "#F5C043",
  cheeseShadow: "#E0A82E",
  patty: "#9C5A33",
  pattyShadow: "#7E4526",
  seed: "#FBE7C8",
} as const;

/**
 * Assembly order, bottom of the stack → top. Used to stagger the build-up.
 * Double smash: two thin patties with a slice of cheese melting between them.
 */
export const LAYER_ORDER = [
  "bun-bottom",
  "patty-1",
  "cheese",
  "patty-2",
  "tomato",
  "lettuce",
  "bun-top",
] as const;

export type LayerId = (typeof LAYER_ORDER)[number];
