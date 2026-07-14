"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { OrderCta } from "@/components/ui/OrderCta";
import { Sticker } from "@/components/ui/Sticker";
import { HeroBurger } from "@/components/ui/HeroBurger";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { onIntroDone } from "@/lib/animations/intro";
import heroBg from "../../../public/img/hero-bg-split.webp";

/**
 * Hero — cartoon-sticker poster. Two huge stacked sticker words with the real
 * burger mascot sitting IN FRONT of them, and four hand-lettered yellow tags
 * (no boxes) scattered around. Letters pop/wobble in once the preloader hands
 * off (or immediately on client-side nav).
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-letter]", { opacity: 0, yPercent: 120, scale: 0.3 });
      gsap.set("[data-hero-pop]", { opacity: 0, scale: 0.6 });
    }, el);

    const play = () =>
      ctx.add(() => {
        gsap
          .timeline()
          .to('[data-hero-pop="burger"]', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
          })
          .to(
            "[data-letter]",
            {
              opacity: 1,
              yPercent: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              stagger: 0.03,
            },
            "-=0.2",
          )
          .to(
            '[data-hero-pop="tag"]',
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              stagger: 0.1,
            },
            "-=0.3",
          );
      });

    const off = onIntroDone(play);
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  const heroSize = { fontSize: "clamp(4rem, 23vw, 20rem)", lineHeight: "0.8" } as const;

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Vintage Split panorama — faint backdrop; every other layer sits over it */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.14 }}
        />
      </div>

      <div className="container-full relative z-10 flex flex-col items-center">
        <div className="relative flex w-full flex-col items-center">
          <Sticker
            text={t("titleLine1")}
            className="relative z-20 text-center"
            style={heroSize}
          />

          <div
            data-hero-pop="burger"
            className="relative z-30 -my-[6vw] w-[56vw] min-w-[220px] max-w-[380px] sm:w-[34vw]"
          >
            <HeroBurger className="w-full" />
          </div>

          <Sticker
            text={t("titleLine2")}
            className="relative z-20 text-center"
            style={heroSize}
          />

          {/* Four hand-lettered yellow tags — no boxes, deliberately uneven:
              different sizes, rotations and distances from the title. */}
          <HeroTag className="left-[1%] top-[2%]" rotate={-12} size="lg">
            {t("tag1") /* Svježe smashano — big */}
          </HeroTag>
          <HeroTag className="right-[7%] top-[23%]" rotate={5} size="xs">
            {t("tag2") /* oči su mi gore — smallest */}
          </HeroTag>
          <HeroTag className="bottom-[19%] left-[4%]" rotate={-5} size="lg">
            {t("tag3") /* griz koji pamtiš — big */}
          </HeroTag>
          <HeroTag className="bottom-[4%] right-[1%]" rotate={10} size="sm">
            {t("tag4") /* Split — dvije lokacije — smaller */}
          </HeroTag>
        </div>

        <div className="mt-12 flex max-w-xl flex-col items-center gap-6 text-center">
          <p className="text-lg text-muted-foreground">{t("lead")}</p>
          <OrderCta />
        </div>
      </div>
    </section>
  );
}

const TAG_SIZE = {
  xs: "clamp(0.7rem, 1.15vw, 0.95rem)",
  sm: "clamp(0.8rem, 1.45vw, 1.15rem)",
  md: "clamp(0.9rem, 1.7vw, 1.35rem)",
  lg: "clamp(1.15rem, 2.5vw, 2rem)",
} as const;

/** Text-only sticker tag: yellow fill + white outline (same treatment as the
 *  burger cutout), no box. Hidden on small screens so nothing runs off the
 *  mobile viewport. */
function HeroTag({
  children,
  className = "",
  rotate = 0,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  size?: keyof typeof TAG_SIZE;
}) {
  return (
    <span
      data-hero-pop="tag"
      className={`pointer-events-none absolute z-40 hidden select-none md:block ${className}`}
      style={{
        fontFamily: "var(--type-display)",
        fontSize: TAG_SIZE[size],
        color: "var(--primitive-color-sticker-yellow)",
        transform: `rotate(${rotate}deg)`,
        textShadow:
          "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, " +
          "1.6px 1.6px 0 #fff, -1.6px 1.6px 0 #fff, 1.6px -1.6px 0 #fff, -1.6px -1.6px 0 #fff, " +
          "4px 6px 6px rgba(74,21,32,0.22)",
      }}
    >
      {children}
    </span>
  );
}
