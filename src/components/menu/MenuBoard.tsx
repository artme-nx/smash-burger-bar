"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  boardBurgers,
  boardSides,
  DRINKS,
  type BoardId,
} from "@/lib/menu";
import { OrderMenu } from "@/components/ui/OrderMenu";
import { BurgerCard, eur } from "./BurgerCard";

export function MenuBoard() {
  const t = useTranslations("menu");
  const [board, setBoard] = useState<BoardId>("classic");
  const dark = board === "signature";

  const burgers = boardBurgers(board);
  const sides = boardSides(board);
  const accent = dark ? "var(--signature)" : "var(--primary)";
  const accentText = dark ? "var(--foreground)" : "var(--primary-foreground)";

  return (
    <section
      className="py-16 sm:py-24"
      style={dark ? { background: "var(--foreground)" } : undefined}
    >
      <div className="container-wide">
        {/* Switch — toggles both ways, unlimited */}
        <div className="mb-14 flex flex-col items-center gap-4">
          <div
            className="flex gap-2 p-2"
            style={{
              border: "3px solid",
              borderColor: dark ? "var(--signature)" : "var(--outline-ink)",
              borderRadius: "var(--radius-pill)",
              background: dark ? "transparent" : "var(--surface)",
            }}
          >
            {(["classic", "signature"] as BoardId[]).map((b) => {
              const on = board === b;
              const bAccent = b === "signature" ? "var(--signature)" : "var(--primary)";
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBoard(b)}
                  aria-pressed={on}
                  className="label px-6 py-3 transition-colors duration-300 sm:px-10"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    background: on ? bAccent : "transparent",
                    color: on
                      ? b === "signature"
                        ? "var(--foreground)"
                        : "var(--primary-foreground)"
                      : dark
                        ? "var(--on-red)"
                        : "var(--foreground)",
                  }}
                >
                  {t(`switch.${b}`)}
                </button>
              );
            })}
          </div>
          <p
            className="label text-[0.7rem]"
            style={{ color: dark ? "var(--signature)" : "var(--muted-foreground)" }}
          >
            {t(dark ? "switch.signatureSub" : "switch.classicSub")}
          </p>
        </div>

        {/* Burgers */}
        <div className="mb-8">
          <span className="label" style={{ color: accent }}>
            {t("picks.kicker")}
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {burgers.map((burger) => (
            <BurgerCard key={burger.id} burger={burger} dark={dark} />
          ))}
        </div>

        {/* Sides + drinks — every row is clickable/expandable, just like a burger */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <ItemList title={t("sidesTitle")} accent={accent}>
            {sides.map((s) => (
              <ItemRow
                key={s.id}
                id={s.id}
                name={t(`sides.${s.id}`)}
                price={eur(s.price)}
                dark={dark}
                accent={accent}
                accentText={accentText}
              />
            ))}
          </ItemList>
          <ItemList title={t("drinksTitle")} accent={accent}>
            {DRINKS.map((d) => (
              <ItemRow
                key={d.id}
                id={d.id}
                name={t(`drinks.${d.id}`)}
                price={eur(d.price)}
                dark={dark}
                accent={accent}
                accentText={accentText}
              />
            ))}
          </ItemList>
        </div>
      </div>
    </section>
  );
}

function ItemList({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        className="uppercase"
        style={{
          fontFamily: "var(--type-logo)",
          letterSpacing: "0.03em",
          fontSize: "1.2rem",
          color: accent,
        }}
      >
        {title}
      </h3>
      <ul className="mt-4 flex flex-col">{children}</ul>
    </div>
  );
}

function ItemRow({
  id,
  name,
  price,
  dark,
  accent,
  accentText,
}: {
  id: string;
  name: string;
  price: string;
  dark: boolean;
  accent: string;
  accentText: string;
}) {
  const t = useTranslations("menu");
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);
  const ink = dark ? "var(--on-red)" : "var(--foreground)";
  const border = dark ? "var(--signature-deep)" : "var(--border)";

  return (
    <li className="border-b-2" style={{ borderColor: border }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-3 py-3 text-left transition-colors"
        style={{ color: ink }}
      >
        <span>{name}</span>
        <span className="flex items-center gap-3">
          <span style={{ opacity: 0.8 }}>{price}</span>
          <span
            aria-hidden="true"
            className="text-[0.7rem] transition-transform duration-200"
            style={{ color: accent, transform: open ? "rotate(180deg)" : "none" }}
          >
            ▾
          </span>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 pb-3">
            <p className="text-sm" style={{ color: ink, opacity: 0.75 }}>
              {t(`itemNote.${id}`)}
            </p>
            <OrderMenu
              label={tc("order")}
              accent={accent}
              accentText={accentText}
              align="right"
              triggerClassName="label shrink-0 px-4 py-2 text-[0.65rem]"
              triggerStyle={{
                background: accent,
                color: accentText,
                borderRadius: "var(--radius-pill)",
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
