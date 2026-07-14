"use client";

import { useTranslations } from "next-intl";
import { OrderMenu } from "./OrderMenu";

type Props = {
  variant?: "solid" | "ghost";
  tone?: "dark" | "light";
  label?: string;
  className?: string;
};

/**
 * Primary "Naruči odmah" call-to-action. Opens the shared OrderMenu popover
 * (Wolt / Glovo) — never a fake checkout and never a cart, since delivery apps
 * can't receive a basket. Same interaction as every order button on the site.
 */
export function OrderCta({
  variant = "solid",
  tone = "dark",
  label,
  className = "",
}: Props) {
  const t = useTranslations("common");
  const text = label ?? t("orderNow");

  const base =
    "group inline-flex items-center gap-3 px-7 py-3 transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-foreground"
      : tone === "light"
        ? "border-[3px] border-on-red text-on-red hover:bg-on-red hover:text-primary"
        : "border-[3px] border-outline-ink text-foreground hover:bg-primary hover:text-primary-foreground";

  return (
    <OrderMenu
      label={text}
      arrow
      accent="var(--primary)"
      className={className}
      triggerClassName={`${base} ${styles}`}
      triggerStyle={{
        borderRadius: "var(--radius-pill)",
        boxShadow: variant === "solid" ? "3px 3px 0 var(--outline-ink)" : undefined,
      }}
    />
  );
}
