"use client";

import { useEffect, useRef, useState } from "react";
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
 */
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
        onClick={() => setOpen((v) => !v)}
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

      <div
        role="menu"
        aria-hidden={!open}
        className={`absolute top-full z-40 mt-2 flex min-w-[11rem] flex-col gap-2 p-3 transition-all duration-200 ${
          align === "right" ? "right-0" : "left-0"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
        style={{
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
      </div>
    </div>
  );
}
