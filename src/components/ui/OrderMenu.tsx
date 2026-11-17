"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { WOLT_URL, GLOVO_URL } from "@/lib/site";

type Props = {
  /** Trigger label; defaults to common.order ("Naruči"). */
  label?: string;
  /** Classes for the trigger button. */
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
  /** Accent used for the Wolt/Glovo buttons inside the popover. */
  accent?: string;
  /** Text color on the solid Wolt button (contrast against `accent`). */
  accentText?: string;
  /** Show a trailing arrow on the trigger. */
  arrow?: boolean;
  /** Horizontal anchor of the popover relative to the trigger. */
  align?: "left" | "right";
  /** Extra classes on the wrapping inline-flex. */
  className?: string;
};

/**
 * "Naruči" action. Instead of a cart (which Wolt/Glovo can't receive), every
 * order button opens a tiny two-choice popover — Wolt or Glovo — that deep-links
 * straight to our restaurant in that app. Nothing is stored or carried over, so
 * there's no false impression that a selection is remembered. Used by the main
 * CTA, each burger card and each menu row so the interaction is identical
 * everywhere.
 *
 * The popover is portalled to <body> with `position: fixed`, so it always sits
 * above the following section (sections create their own stacking contexts /
 * clip with overflow, which used to cover it). It tracks the trigger on scroll
 * and resize, and flips above the button when there's no room below. Theme
 * tokens are copied from the trigger so a locally re-themed section keeps its
 * colours in the portal.
 */

const POP_GAP = 8;
const THEME_VARS = [
  "--surface",
  "--outline-ink",
  "--muted-foreground",
  "--foreground",
  "--radius",
  "--radius-pill",
];

type Pos = { top: number; left: number; flip: boolean };
export function OrderMenu({
  label,
  triggerClassName = "",
  triggerStyle,
  accent = "var(--primary)",
  accentText = "var(--primary-foreground)",
  arrow = false,
  align = "left",
  className = "",
}: Props) {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  // portal mounts on first open → nothing extra in the SSR/hydration tree
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [themeVars, setThemeVars] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const place = useCallback(() => {
    const trigger = ref.current;
    const pop = popRef.current;
    if (!trigger || !pop) return;
    const r = trigger.getBoundingClientRect();
    const w = pop.offsetWidth;
    const h = pop.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const flip = r.bottom + POP_GAP + h > vh && r.top - POP_GAP - h > 0;
    let left = align === "right" ? r.right - w : r.left;
    left = Math.max(8, Math.min(left, vw - w - 8));
    const top = flip ? r.top - POP_GAP - h : r.bottom + POP_GAP;
    setPos({ top, left, flip });
  }, [align]);

  // Resolve theme tokens (and var()-based accents) at the trigger, once per open.
  useLayoutEffect(() => {
    if (!open || !ref.current) return;
    const cs = getComputedStyle(ref.current);
    const names = [...THEME_VARS];
    for (const v of [accent, accentText]) {
      const m = /^var\((--[\w-]+)/.exec(v);
      if (m) names.push(m[1]);
    }
    const vars: Record<string, string> = {};
    for (const n of names) {
      const val = cs.getPropertyValue(n).trim();
      if (val) vars[n] = val;
    }
    setThemeVars(vars as React.CSSProperties);
    place();
  }, [open, accent, accentText, place]);

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const onMove = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        place();
      });
    };
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t) || popRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const text = label ?? t("order");

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={() => {
          setMounted(true);
          setOpen((v) => !v);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className={triggerClassName}
        style={triggerStyle}
      >
        {text}
        {arrow && (
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </button>

      {mounted &&
        createPortal(
          <div
            ref={popRef}
            role="menu"
            aria-hidden={!open}
            className={`fixed z-[150] flex min-w-[11rem] flex-col gap-2 p-3 transition-[opacity,transform,visibility] duration-200 ${
              open && pos
                ? "visible translate-y-0 opacity-100"
                : `invisible opacity-0 ${pos?.flip ? "translate-y-1" : "-translate-y-1"}`
            }`}
            style={{
              ...themeVars,
              top: pos?.top ?? 0,
              left: pos?.left ?? 0,
              background: "var(--surface)",
              border: "3px solid var(--outline-ink)",
              borderRadius: "var(--radius)",
              boxShadow: "5px 5px 0 var(--outline-ink)",
            }}
          >
            <span
              className="label text-[0.6rem]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t("delivery")}
            </span>
            <a
              role="menuitem"
              href={WOLT_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="label px-4 py-2.5 text-center transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                background: accent,
                color: accentText,
                borderRadius: "var(--radius-pill)",
              }}
            >
              {t("wolt")}
            </a>
            <a
              role="menuitem"
              href={GLOVO_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="label px-4 py-2.5 text-center transition-colors duration-150"
              style={{
                border: `3px solid ${accent}`,
                color: "var(--foreground)",
                borderRadius: "var(--radius-pill)",
              }}
            >
              {t("glovo")}
            </a>
          </div>,
          document.body,
        )}
    </div>
  );
}
