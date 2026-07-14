"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { RollText } from "./RollText";
import { OrderMenu } from "./OrderMenu";
import { WOLT_URL, GLOVO_URL } from "@/lib/site";

const NAV = [
  { key: "home", href: "/" },
  { key: "menu", href: "/meni" },
  { key: "ingredients", href: "/sastojci" },
  { key: "locations", href: "/lokacije" },
  { key: "contact", href: "/kontakt" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pill =
    "inline-flex items-center gap-2 px-5 py-2.5 label transition-colors duration-200";
  const pillStyle = {
    borderRadius: "var(--radius-pill)",
    border: "3px solid var(--outline-ink)",
  } as const;

  return (
    <>
      {/* --- Top bar ------------------------------------------------------- */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-full flex items-center justify-between py-4">
          <Wordmark tone="cream" />

          <div className="flex items-center gap-3">
            {/* Language switch — cartoon pill to match the header buttons */}
            <div
              className="hidden items-center bg-background px-4 py-2.5 sm:inline-flex"
              style={pillStyle}
            >
              <LanguageSwitcher />
            </div>

            <OrderMenu
              className="hidden sm:inline-flex"
              label={t("common.order")}
              align="right"
              accent="var(--primary)"
              triggerClassName={`${pill} bg-primary text-primary-foreground hover:bg-foreground`}
              triggerStyle={{ ...pillStyle, boxShadow: "3px 3px 0 var(--outline-ink)" }}
            />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("header.openMenu")}
              aria-expanded={open}
              className={`${pill} bg-background text-foreground hover:bg-sticker-bg`}
              style={pillStyle}
            >
              {t("header.menuLabel")}
              <span className="flex h-3.5 w-4 flex-col justify-between">
                <span className="h-[2.5px] w-full rounded bg-outline-ink" />
                <span className="h-[2.5px] w-full rounded bg-outline-ink" />
                <span className="h-[2.5px] w-full rounded bg-outline-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Overlay nav (SIBLING of header, not a child) ----------------- */}
      <div
        className={`fixed inset-0 z-[60] bg-surface-red transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-reveal)" }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="container-full flex items-center justify-between py-4">
          <Wordmark tone="red" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("header.closeLabel")}
            className="label flex items-center gap-3 text-on-red"
          >
            {t("header.closeLabel")}
            <span className="relative block h-5 w-5">
              <span className="absolute left-0 top-1/2 h-[2.5px] w-full -translate-y-1/2 rotate-45 rounded bg-on-red" />
              <span className="absolute left-0 top-1/2 h-[2.5px] w-full -translate-y-1/2 -rotate-45 rounded bg-on-red" />
            </span>
          </button>
        </div>

        <nav className="container-full mt-[6vh] flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="display text-on-red text-[13vw] leading-[1] transition-transform duration-200 hover:translate-x-2 sm:text-[7vw]"
            >
              <RollText>{t(`nav.${item.key}`)}</RollText>
            </Link>
          ))}
        </nav>

        <div className="container-full mt-[7vh] flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <a
              href={WOLT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label bg-on-red px-6 py-3 text-primary transition-transform duration-200 hover:-translate-y-0.5"
              style={{ borderRadius: "var(--radius-pill)" }}
            >
              {t("common.wolt")}
            </a>
            <a
              href={GLOVO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label border-[3px] border-on-red px-6 py-3 text-on-red transition-colors duration-200 hover:bg-on-red hover:text-primary"
              style={{ borderRadius: "var(--radius-pill)" }}
            >
              {t("common.glovo")}
            </a>
          </div>
          <LanguageSwitcher tone="light" />
        </div>
      </div>
    </>
  );
}
