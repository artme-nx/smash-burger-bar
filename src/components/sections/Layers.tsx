"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { StickerLabel } from "@/components/ui/Sticker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { CartoonBurger } from "@/components/ui/CartoonBurger";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";

/**
 * "Svaki sloj" — the seven burger layers drop in and stack themselves when the
 * section scrolls into view. The ScrollTrigger only *detects* entry (~40% of the
 * section visible) and then plays the timeline ONCE at its own pace (autoplay,
 * not scrub) — layers fall one by one with the same bounce/settle as the
 * preloader. It never replays. Under reduced motion the burger stays assembled.
 * DOM order of [data-layer] is bun-bottom, patty-1, cheese, patty-2, tomato,
 * lettuce, bun-top. Uses the shared CartoonBurger; swap in the client's cut-out
 * PNG layers later without touching the choreography.
 */
const SPREAD = [
  { x: -150, y: 90, r: -18 },
  { x: 150, y: 80, r: 16 },
  { x: -165, y: 40, r: -14 },
  { x: 165, y: 10, r: 13 },
  { x: -155, y: -30, r: -15 },
  { x: 145, y: -80, r: 14 },
  { x: -135, y: -120, r: -16 },
];

const LAYERS = [
  { id: "bun-top", key: "bunTop", dot: "var(--primitive-color-cartoon-bun)" },
  { id: "lettuce", key: "lettuce", dot: "var(--primitive-color-cartoon-lettuce)" },
  { id: "tomato", key: "tomato", dot: "var(--primitive-color-cartoon-tomato)" },
  { id: "cheese", key: "cheese", dot: "var(--primitive-color-cartoon-cheese)" },
  { id: "patty", key: "patty", dot: "var(--primitive-color-cartoon-patty)" },
  { id: "bun-bottom", key: "bunBottom", dot: "var(--primitive-color-cartoon-bun-shadow)" },
] as const;

export function Layers() {
  const t = useTranslations("home.layers");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<SVGGElement>("[data-layer]", el);
      gsap.set(layers, { transformOrigin: "50% 50%", willChange: "transform" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            // fire once when ~40% of the section is in view; no pin, no scrub
            start: "top 60%",
            once: true,
          },
          // drop will-change once settled so it isn't a permanent layer
          onComplete: () => gsap.set(layers, { clearProps: "willChange" }),
        })
        .from(layers, {
          x: (i: number) => SPREAD[i]?.x ?? 0,
          y: (i: number) => SPREAD[i]?.y ?? 0,
          rotate: (i: number) => SPREAD[i]?.r ?? 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
          stagger: 0.14,
        });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-background-alt py-24 sm:py-32">
      {/* Source order intro → burger → list. On mobile that stacks as burger
          ABOVE the ingredient list (as requested); on lg the burger becomes the
          right column, vertically centred beside the intro + list. */}
      <div className="container-wide grid gap-10 sm:gap-14 lg:grid-cols-2">
        <div className="max-w-xl lg:col-start-1 lg:row-start-1">
          <StickerLabel rotate={-3} className="mb-6">
            {t("kicker")}
          </StickerLabel>
          <SplitHeading
            text={t("heading")}
            className="display text-primary"
            style={{ fontSize: "var(--type-display2-size)" }}
          />
          <p className="mt-8 max-w-md text-lg text-muted-foreground">{t("lead")}</p>
        </div>

        <div className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <CartoonBurger
            className="w-[72%] max-w-[380px] lg:w-full lg:max-w-[520px]"
            title={t("heading")}
          />
        </div>

        <ul className="flex flex-col gap-2 lg:col-start-1 lg:row-start-2">
          {LAYERS.map((layer) => (
            <li
              key={layer.id}
              className="card-cartoon flex items-center gap-3 px-5 py-3"
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full"
                style={{ background: layer.dot, border: "2px solid var(--outline-ink)" }}
                aria-hidden="true"
              />
              <span className="label text-foreground">{t(layer.key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
