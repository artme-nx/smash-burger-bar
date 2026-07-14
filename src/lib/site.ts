/**
 * Central site constants — delivery links, socials, locations.
 * PLACEHOLDER values are marked; klijent potvrđuje prije objave.
 */

// PLACEHOLDER: klijent potvrđuje prave linkove dostave (točan restoran na Wolt/Glovo)
export const WOLT_URL = "https://wolt.com/";
export const GLOVO_URL = "https://glovoapp.com/";
export const INSTAGRAM_URL = "https://instagram.com/smash.burger.bar";
export const INSTAGRAM_HANDLE = "@smash.burger.bar";

export type LocationVariant = "classic" | "signature";

export type SiteLocation = {
  id: string;
  variant: LocationVariant;
  name: string;
  address: string;
  phone: string; // "" = nepoznato (placeholder)
  mapsUrl: string;
  logo: string; // raster logo path in /public/img
};

export const LOCATIONS: SiteLocation[] = [
  {
    id: "classic",
    variant: "classic",
    name: "Smash Burger Bar",
    address: "Trogirska ul. 1, 21000 Split",
    phone: "+385 95 821 0451",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Trogirska+1+Split",
    logo: "/img/logo-red.png",
  },
  {
    id: "signature",
    variant: "signature",
    name: "Smash Burger Signature",
    // PLACEHOLDER: tel za Signature još nedostaje
    address: "Obrov ul. 2, 21000 Split",
    phone: "",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Obrov+2+Split",
    logo: "/img/logo-signature-gold.png",
  },
];
