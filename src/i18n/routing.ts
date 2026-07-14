import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hr", "en", "de", "it"],
  defaultLocale: "hr",
  // All locales carry a prefix (/hr, /en, …) so the site is safe to statically
  // export to GitHub Pages, where no middleware runs to negotiate a bare "/".
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
