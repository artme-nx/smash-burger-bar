import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { StickerLabel, Sticker } from "@/components/ui/Sticker";
import { MenuBoard } from "@/components/menu/MenuBoard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu.hero" });
  return { title: `${t("title")} — Smash Burger Bar` };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <MenuHero />
      <MenuBoard />
    </>
  );
}

function MenuHero() {
  const t = useTranslations("menu.hero");
  return (
    <section className="flex min-h-[62svh] flex-col items-center justify-center gap-6 pt-28 pb-12 text-center">
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
