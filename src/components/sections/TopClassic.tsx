"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { OrderCta } from "@/components/ui/OrderCta";
import { StickerLabel } from "@/components/ui/Sticker";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";

/**
 * Oversized typographic statement on the red band. "pljeskavica" is plain text;
 * "SMASH" is set in the logo font; "TOP SECRET" is a rubber stamp that SLAMS
 * down once the section scrolls into view. Rich-text tags keep every locale's
 * wording/punctuation natural.
 */
export function TopClassic() {
  const t = useTranslations("home.classic");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-fx="stamp"]', {
        y: -90,
        scale: 1.9,
        opacity: 0,
        rotate: -22,
        transformOrigin: "50% 50%",
      });
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } })
        .to('[data-fx="stamp"]', {
          y: 0,
          scale: 1,
          opacity: 1,
          rotate: -8,
          duration: 0.45,
          ease: "back.out(3)",
        });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-surface-red py-24 text-on-red sm:py-32">
      <div className="container-wide" ref={root}>
        <StickerLabel rotate={-3} className="mb-8">
          {t("kicker")}
        </StickerLabel>

        <p
          className="display max-w-[22ch] text-on-red"
          style={{ fontSize: "var(--type-display2-size)", lineHeight: 1.15 }}
        >
          {t.rich("line", {
            patty: (chunks) => <>{chunks}</>,
            stamp: (chunks) => <Stamp>{chunks}</Stamp>,
            smash: (chunks) => (
              <span style={{ fontFamily: "var(--type-logo)", letterSpacing: "0.02em" }}>
                {chunks}
              </span>
            ),
          })}
        </p>

        <div className="mt-12">
          <OrderCta variant="ghost" tone="light" />
        </div>
      </div>
    </section>
  );
}

/** Rubber-stamp "TOP SECRET" that slams down — distressed double frame, tilted. */
function Stamp({ children }: { children: ReactNode }) {
  return (
    <span
      data-fx="stamp"
      className="mx-1 inline-block whitespace-nowrap px-3 py-0.5 align-middle"
      style={{
        fontFamily: "var(--type-logo)",
        fontSize: "0.62em",
        letterSpacing: "0.14em",
        color: "var(--on-red)",
        border: "3px solid var(--on-red)",
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 2px var(--surface-red), inset 0 0 0 4px var(--on-red)",
        opacity: 0.95,
      }}
    >
      {children}
    </span>
  );
}
