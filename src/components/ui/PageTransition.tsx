"use client";

import { motion } from "motion/react";
import { isIntroDone } from "@/lib/animations/intro";
import { prefersReducedMotion } from "@/lib/animations/gsap";

/**
 * Route transition. On client navigation a red panel wipes up to reveal the new
 * page and the content fades/rises in. Skipped on the very first load (the
 * preloader owns that) and under reduced motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const firstLoad = typeof window === "undefined" || !isIntroDone();
  const reduced = prefersReducedMotion();
  const animate = !firstLoad && !reduced;

  return (
    <>
      {animate && (
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[95] bg-primary"
          style={{ borderRadius: "0 0 50% 50% / 0 0 80px 80px" }}
          aria-hidden="true"
        />
      )}
      <motion.div
        initial={animate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animate ? 0.2 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
