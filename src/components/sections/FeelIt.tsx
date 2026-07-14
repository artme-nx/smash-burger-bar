import { useTranslations } from "next-intl";
import { OrderMenu } from "@/components/ui/OrderMenu";
import { Sticker, StickerLabel } from "@/components/ui/Sticker";
import { CartoonBurger } from "@/components/ui/CartoonBurger";

/** Closing statement CTA — bold red cartoon panel with the burger. */
export function FeelIt() {
  const t = useTranslations("home.feel");
  const tc = useTranslations("common");

  return (
    <section className="bg-surface-red py-24 text-on-red sm:py-32">
      <div className="container-wide flex flex-col items-center gap-8 text-center">
        <StickerLabel rotate={-3}>{t("kicker")}</StickerLabel>

        <CartoonBurger className="w-[48vw] max-w-[220px]" />

        <Sticker
          text={t("heading")}
          tone="onRed"
          font="display"
          className="max-w-[16ch]"
          style={{ fontSize: "var(--type-display1-size)", lineHeight: "0.95" }}
        />
        <p className="max-w-md text-on-red/85">{t("lead")}</p>
        <OrderMenu
          label={tc("orderNow")}
          arrow
          accent="var(--primary)"
          triggerClassName="group label inline-flex items-center gap-3 bg-on-red px-8 py-4 text-primary transition-transform duration-200 hover:-translate-y-0.5"
          triggerStyle={{ borderRadius: "var(--radius-pill)", boxShadow: "4px 4px 0 var(--outline-ink)" }}
        />
      </div>
    </section>
  );
}
