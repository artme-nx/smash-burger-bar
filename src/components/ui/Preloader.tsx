"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { markIntroDone } from "@/lib/animations/intro";
import { CartoonBurger } from "./CartoonBurger";

const CURTAINS = [
  "var(--primitive-color-curtain-cream)",
  "var(--primitive-color-curtain-bordo)",
  "var(--primitive-color-curtain-orange)",
  "var(--primitive-color-curtain-red)",
];

const LAYER_COUNT = 7; // bun-bottom · patty-1 · cheese · patty-2 · tomato · lettuce · bun-top
const LAYER_DUR = 0.5;
const BUILD = 3.234; // build phase — 30% shorter than the previous 4.62s

export function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip the whole thing under reduced motion.
    if (prefersReducedMotion()) {
      markIntroDone();
      setDone(true);
      return;
    }

    // Safety net: if the timeline ever fails to complete (error, tab throttling),
    // force the preloader to unmount so its full-screen overlay can never sit on
    // top of the page and swallow clicks.
    const safety = window.setTimeout(() => {
      markIntroDone();
      setDone(true);
    }, (BUILD + 3) * 1000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          markIntroDone();
          setDone(true);
        },
      });

      // Stack + bar share ONE clock: the layer drop and the yellow bar both start
      // at 0 and finish together at BUILD, so the top bun lands the instant the
      // bar reaches 100%. Stagger is derived so the LAST layer's tween ends at
      // exactly BUILD.
      const stagger = (BUILD - LAYER_DUR) / (LAYER_COUNT - 1);

      tl.from(
        "[data-layer]",
        {
          y: -200,
          opacity: 0,
          duration: LAYER_DUR,
          ease: "back.out(1.6)",
          stagger,
        },
        0,
      );
      tl.to("[data-progress]", { scaleX: 1, duration: BUILD, ease: "none" }, 0);

      // Curved multi-layer curtain wipe (red leaves first) — starts the instant
      // the build completes.
      tl.to(
        "[data-curtain]",
        {
          yPercent: -108,
          duration: 0.65,
          ease: "power3.inOut",
          stagger: { each: 0.09, from: "end" },
        },
        BUILD,
      );
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {CURTAINS.map((c, i) => {
        const isFront = i === CURTAINS.length - 1;
        return (
          <div
            key={i}
            data-curtain
            className="absolute inset-0"
            style={{
              background: c,
              borderRadius: "0 0 50% 50% / 0 0 90px 90px",
            }}
          >
            {isFront && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-6">
                <CartoonBurger className="w-[46vw] max-w-[220px]" />
                <div
                  className="h-2 w-52 max-w-[70vw] overflow-hidden rounded-full"
                  style={{ background: "rgba(251,241,225,0.25)" }}
                >
                  <div
                    data-progress
                    className="h-full w-full origin-left rounded-full"
                    style={{
                      background: "var(--primitive-color-sticker-yellow)",
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
