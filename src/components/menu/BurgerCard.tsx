"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Burger } from "@/lib/menu";
import { PATTY_SIZES } from "@/lib/menu";
import { OrderMenu } from "@/components/ui/OrderMenu";

export function eur(n: number) {
  return `${Number.isInteger(n) ? n : n.toFixed(2)} €`;
}

type Props = {
  burger: Burger;
  dark: boolean;
};

export function BurgerCard({ burger, dark }: Props) {
  const t = useTranslations("menu");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);

  const accent = dark ? "var(--signature)" : "var(--primary)";
  const price = burger.flat
    ? eur(burger.flat)
    : `${burger.tier!.single} / ${burger.tier!.double} / ${eur(burger.tier!.triple)}`;

  return (
    <article
      className="card-cartoon flex flex-col p-6"
      style={
        dark
          ? { background: "var(--foreground)", borderColor: "var(--signature)", boxShadow: "6px 6px 0 var(--signature-deep)" }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="uppercase leading-none"
          style={{
            fontFamily: "var(--type-logo)",
            letterSpacing: "0.03em",
            fontSize: "1.4rem",
            color: dark ? "var(--on-red)" : "var(--foreground)",
          }}
        >
          {burger.name}
        </h3>
        {burger.signatureOnly && (
          <span
            className="label shrink-0 rounded-full px-2 py-1 text-[0.6rem]"
            style={{ background: "var(--signature)", color: "var(--foreground)" }}
          >
            {t("card.signatureTag")}
          </span>
        )}
      </div>

      <p
        className="mt-2 text-lg"
        style={{ color: accent, fontWeight: 400 }}
      >
        {price}
      </p>
      {!burger.flat && (
        <p
          className="label mt-1 text-[0.65rem]"
          style={{ color: dark ? "var(--on-red)" : "var(--muted-foreground)", opacity: 0.75 }}
        >
          {t("card.single")} {PATTY_SIZES.single} · {t("card.double")} {PATTY_SIZES.double} · {t("card.triple")} {PATTY_SIZES.triple}
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="label mt-4 flex items-center gap-2 self-start text-[0.7rem]"
        style={{ color: accent }}
      >
        {t("card.details")}
        <span
          aria-hidden="true"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          ▾
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="mt-3 flex flex-wrap gap-2">
            {burger.ing.map((id) => (
              <li
                key={id}
                className="rounded-full px-3 py-1 text-sm"
                style={{
                  border: `2px solid ${dark ? "var(--signature)" : "var(--outline-ink)"}`,
                  color: dark ? "var(--on-red)" : "var(--foreground)",
                }}
              >
                {t(`ing.${id}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <OrderMenu
        className="mt-6 self-start"
        label={tc("order")}
        accent={accent}
        accentText={dark ? "var(--foreground)" : "var(--primary-foreground)"}
        triggerClassName="label px-6 py-2.5"
        triggerStyle={{
          background: accent,
          color: dark ? "var(--foreground)" : "var(--primary-foreground)",
          borderRadius: "var(--radius-pill)",
          boxShadow: `3px 3px 0 ${dark ? "var(--signature-deep)" : "var(--outline-ink)"}`,
        }}
      />
    </article>
  );
}
