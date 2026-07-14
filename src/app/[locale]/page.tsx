import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TopClassic } from "@/components/sections/TopClassic";
import { GallerySection } from "@/components/sections/GallerySection";
import { Layers } from "@/components/sections/Layers";
import { TakeAway } from "@/components/sections/TakeAway";
import { FeelIt } from "@/components/sections/FeelIt";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TopClassic />
      <GallerySection />
      <Layers />
      <TakeAway />
      <FeelIt />
    </>
  );
}
