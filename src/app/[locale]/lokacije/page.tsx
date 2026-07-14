import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { StickerLabel, Sticker } from "@/components/ui/Sticker";
import { LocationCard } from "@/components/ui/LocationCard";
import { LOCATIONS } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locationsPage.hero" });
  return { title: `${t("title")} — Smash Burger Bar` };
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <section className="pb-24 sm:pb-32">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </section>
    </>
  );
}

function Hero() {
  const t = useTranslations("locationsPage.hero");
  return (
    <section className="flex min-h-[50svh] flex-col items-center justify-center gap-6 pt-28 pb-14 text-center">
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
