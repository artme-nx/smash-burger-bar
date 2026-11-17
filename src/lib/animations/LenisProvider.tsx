"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { onIntroDone } from "./intro";

/**
 * Smooth scroll (Lenis) driven by GSAP's ticker and synced to ScrollTrigger.
 * Disabled entirely under prefers-reduced-motion. Runs once for the whole app.
 *
 * Also owns scroll restoration: the browser would otherwise reload you at your
 * previous scroll position, which — hidden behind the preloader — leaves you
 * mid-page when the burger finishes assembling. We switch to manual restoration
 * and force the top of the page on load and again when the preloader hands off.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (prefersReducedMotion()) {
      window.scrollTo(0, 0);
      return;
    }

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

    // Land at the top on a fresh load, and again the moment the preloader
    // finishes (by then the browser may have restored an old position).
    lenis.scrollTo(0, { immediate: true });
    const offIntro = onIntroDone(() => lenis.scrollTo(0, { immediate: true }));

    return () => {
      offIntro();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
