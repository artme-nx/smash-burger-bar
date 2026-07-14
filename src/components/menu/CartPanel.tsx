"use client";

/**
 * ⚠️ ARCHIVED — not mounted anywhere. The cart was removed from the menu (QA:
 * Wolt/Glovo can't receive a basket, so a cart only loses the user's picks).
 * Kept intact in case a real first-party checkout is added later. If you revive
 * it, re-wire the `add`/`remove` state that used to live in MenuBoard.
 */

import { useTranslations } from "next-intl";
import { WOLT_URL, GLOVO_URL } from "@/lib/site";
import { eur } from "./BurgerCard";

export type CartLine = { key: string; name: string; price: number; qty: number };

type Props = {
  lines: CartLine[];
  onRemove: (key: string) => void;
  dark: boolean;
};

/**
 * Visual clone of the reference's cart side-panel. Concept only — the checkout
 * buttons open real delivery (Wolt / Glovo), never a fake payment flow.
 */
export function CartPanel({ lines, onRemove, dark }: Props) {
  const t = useTranslations("menu.cart");
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const accent = dark ? "var(--signature)" : "var(--primary)";

  return (
    <aside
      className="card-cartoon flex h-fit flex-col p-6 lg:sticky lg:top-24"
      style={
        dark
          ? { background: "var(--foreground)", borderColor: "var(--signature)", boxShadow: "6px 6px 0 var(--signature-deep)" }
          : undefined
      }
    >
      <h3
        className="uppercase leading-none"
        style={{
          fontFamily: "var(--type-logo)",
          letterSpacing: "0.03em",
          fontSize: "1.3rem",
          color: dark ? "var(--on-red)" : "var(--foreground)",
        }}
      >
        {t("title")}
      </h3>

      {lines.length === 0 ? (
        <p
          className="mt-4 text-sm"
          style={{ color: dark ? "var(--on-red)" : "var(--muted-foreground)", opacity: 0.8 }}
        >
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {lines.map((l) => (
            <li key={l.key} className="flex items-center justify-between gap-3 text-sm">
              <span style={{ color: dark ? "var(--on-red)" : "var(--foreground)" }}>
                {l.qty}× {l.name}
              </span>
              <span className="flex items-center gap-3">
                <span style={{ color: accent }}>{eur(l.price * l.qty)}</span>
                <button
                  type="button"
                  onClick={() => onRemove(l.key)}
                  aria-label={`${t("remove")} ${l.name}`}
                  className="text-xs opacity-60 hover:opacity-100"
                  style={{ color: dark ? "var(--on-red)" : "var(--foreground)" }}
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div
        className="mt-5 flex items-center justify-between border-t-[3px] pt-4"
        style={{ borderColor: dark ? "var(--signature)" : "var(--outline-ink)" }}
      >
        <span className="label" style={{ color: dark ? "var(--on-red)" : "var(--foreground)" }}>
          {t("total")}
        </span>
        <span
          className="uppercase"
          style={{ fontFamily: "var(--type-logo)", fontSize: "1.3rem", color: accent }}
        >
          {eur(total)}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <a
          href={WOLT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="label px-6 py-3 text-center"
          style={{
            background: accent,
            color: dark ? "var(--foreground)" : "var(--primary-foreground)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {t("checkout")} · Wolt
        </a>
        <a
          href={GLOVO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="label px-6 py-3 text-center"
          style={{
            border: `3px solid ${accent}`,
            color: dark ? "var(--on-red)" : "var(--foreground)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {t("checkout")} · Glovo
        </a>
      </div>

      <p
        className="mt-4 text-xs"
        style={{ color: dark ? "var(--on-red)" : "var(--muted-foreground)", opacity: 0.7 }}
      >
        {/* PLACEHOLDER: koncept košarice — narudžba se dovršava na dostavi */}
        {t("note")}
      </p>
    </aside>
  );
}
