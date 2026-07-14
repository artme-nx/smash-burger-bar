"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Smooth scroll (Lenis) driven by GSAP's ticker and synced to ScrollTrigger.
 * Disabled entirely under prefers-reduced-motion. Runs once for the whole app.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // lerp (not duration) → the view catches up to the target each frame, which
    // feels far more responsive than the old duration:1.1 easing (that was the
    // main "slow scroll" culprit). 0.14 keeps a little smoothing without lag.
    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
