"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/animations/gsap";
import { CursorIcon, CURSOR_ICONS } from "./CursorIcons";

/**
 * Ingredient cursor — a flat-cartoon icon (burger / fries / cola / Roman soldier)
 * follows the pointer and swaps as you move between sections. Pointer-devices
 * only, disabled under reduced motion.
 *
 * SAFETY: the system cursor is hidden ONLY while the ingredient is actually
 * visible (i.e. over non-interactive space). The moment it hides — over a
 * link/button, when the pointer leaves the window, or before the first move —
 * the native cursor comes back, so the user is never left with no cursor. The
 * element is always pointer-events:none, so it can never eat clicks.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [icon, setIcon] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const html = document.documentElement;

    let visible = false;
    const setVisible = (on: boolean) => {
      if (on === visible) return;
      visible = on;
      el.style.opacity = on ? "1" : "0";
      // Hide the native cursor only while our icon is showing.
      html.classList.toggle("cursor-hidden", on);
    };

    // Last known pointer Y — the icon follows the section UNDER THE
    // POINTER (not the viewport middle), so it swaps the moment you cross a
    // section edge, whether you move the mouse or scroll underneath it.
    let py = -1;

    // Swap the icon based on which top-level <section> is under the pointer.
    // Nested sections are skipped so the icon index stays stable per block.
    let current = -1;
    const pickIcon = () => {
      if (py < 0) return;
      const secs = Array.from(document.querySelectorAll("section")).filter(
        (s) => !s.parentElement?.closest("section"),
      );
      let idx = -1;
      for (let i = 0; i < secs.length; i++) {
        const r = secs[i].getBoundingClientRect();
        if (py >= r.top && py < r.bottom) {
          idx = i;
          break;
        }
      }
      if (idx < 0 || idx === current) return; // header/footer: keep last icon
      current = idx;
      setIcon(idx % CURSOR_ICONS.length);
    };

    let ticking = false;
    const schedulePick = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        pickIcon();
      });
    };

    const move = (e: PointerEvent) => {
      // Track 1:1 with the pointer — no smoothing, so it behaves like a real
      // cursor instead of a floaty icon lagging behind the click point.
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      py = e.clientY;
      const interactive = (e.target as Element)?.closest(
        "a, button, input, textarea, select, label, [role='button']",
      );
      setVisible(!interactive);
      schedulePick();
    };
    const hide = () => setVisible(false);
    const onScroll = schedulePick;

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", onScroll);
      html.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <div ref={ref} className="cursor-ingredient" aria-hidden="true">
      <CursorIcon name={CURSOR_ICONS[icon]} />
    </div>
  );
}
