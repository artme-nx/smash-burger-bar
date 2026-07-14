"use client";

import { useEffect, useRef, type CSSProperties, type ElementType } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/animations/gsap";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Heading with a char-by-char reveal on scroll (SplitText + ScrollTrigger).
 * Under reduced motion it renders as a plain heading. Reverts the split on
 * cleanup so screen readers keep the original text.
 */
export function SplitHeading({ text, as: Tag = "h2", className, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: "chars,words" });
      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        rotate: 6,
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.02,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {text}
    </Tag>
  );
}
