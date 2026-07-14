"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { tone?: "dark" | "light"; className?: string };

/** Compact typographic locale switch (HR · EN · DE · IT). */
export function LanguageSwitcher({ tone = "dark", className = "" }: Props) {
  const active = useLocale();
  const pathname = usePathname();

  const idle =
    tone === "light" ? "text-on-red/70" : "text-muted-foreground";
  const on = tone === "light" ? "text-on-red" : "text-foreground";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-2">
          {i > 0 && <span className={`text-[0.6rem] ${idle}`}>·</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === active ? "true" : undefined}
            className={`label text-[0.65rem] transition-colors duration-200 hover:text-primary ${
              locale === active ? on : idle
            }`}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
