"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** rise distance in px */
  y?: number;
  delay?: number;
};

/** Generic fade-and-rise on scroll into view. */
export function Reveal({ children, as: Tag = "div", className, y = 26, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
