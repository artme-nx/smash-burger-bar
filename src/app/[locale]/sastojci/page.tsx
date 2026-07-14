import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { StickerLabel, Sticker } from "@/components/ui/Sticker";
import { OrderCta } from "@/components/ui/OrderCta";
import { CartoonBurger } from "@/components/ui/CartoonBurger";
import { IngredientIcon, type IngredientKind } from "@/components/ui/IngredientIcon";

const ITEMS: IngredientKind[] = ["bun", "patty", "cheese", "tomato", "lettuce"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ingredientsPage.hero" });
  return { title: `${t("title")} — Smash Burger Bar` };
}

export default async function IngredientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Farm />
      <Story />
    </>
  );
}

function Hero() {
  const t = useTranslations("ingredientsPage.hero");
  return (
    <section className="flex min-h-[60svh] flex-col items-center justify-center gap-6 pt-28 pb-12 text-center">
      <StickerLabel rotate={-3}>{t("kicker")}</StickerLabel>
      <Sticker
        text={t("title")}
        font="display"
        className="max-w-[16ch]"
        style={{ fontSize: "var(--type-display1-size)", lineHeight: "0.95" }}
      />
      <p className="max-w-md text-lg text-muted-foreground">{t("lead")}</p>
    </section>
  );
}

function Farm() {
  const t = useTranslations("ingredientsPage.farm");
  return (
    <section className="bg-surface-red py-24 text-on-red sm:py-32">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
        <div className="max-w-xl">
          <StickerLabel rotate={-3} className="mb-6">
            {t("kicker")}
          </StickerLabel>
          <h2 className="display text-on-red" style={{ fontSize: "var(--type-display2-size)" }}>
            {t("heading")}
          </h2>
          <p className="mt-6 max-w-md text-lg text-on-red/85">{t("p")}</p>
          <div className="mt-8">
            <OrderCta variant="ghost" tone="light" />
          </div>
        </div>
        <div className="flex justify-center">
          <CartoonBurger className="w-[70%] max-w-[340px]" />
        </div>
      </div>
    </section>
  );
}

function Story() {
  const t = useTranslations("ingredientsPage");
  return (
    <section className="py-24 sm:py-32">
      <div className="container-wide">
        <div className="mb-14 max-w-2xl">
          <StickerLabel rotate={-3} className="mb-6">
            {t("story.kicker")}
          </StickerLabel>
          <h2 className="display text-primary" style={{ fontSize: "var(--type-display2-size)" }}>
            {t("story.heading")}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((kind, i) => (
            <article
              key={kind}
              className="card-cartoon flex flex-col items-center gap-4 p-8 text-center"
              style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
            >
              <IngredientIcon kind={kind} className="h-28 w-28" />
              <h3
                className="uppercase leading-none"
                style={{
                  fontFamily: "var(--type-logo)",
                  letterSpacing: "0.03em",
                  fontSize: "1.4rem",
                  color: "var(--foreground)",
                }}
              >
                {t(`items.${kind}.name`)}
              </h3>
              <p className="text-muted-foreground">{t(`items.${kind}.desc`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
