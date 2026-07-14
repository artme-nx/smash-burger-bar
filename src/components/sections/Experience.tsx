import Image from "next/image";
import { useTranslations } from "next-intl";
import { StickerLabel } from "@/components/ui/Sticker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import trioImg from "../../../public/img/burgers-trio.webp";
import heroImg from "../../../public/img/hero-split-tower.webp";

export function Experience() {
  const t = useTranslations("home.experience");

  const cards = [
    { img: trioImg, title: t("card1Title"), meta: t("card1Meta"), alt: "Smash burgeri na pladnju", rot: -2 },
    { img: heroImg, title: t("card2Title"), meta: t("card2Meta"), alt: "Smash burger izbliza", rot: 2 },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="container-wide">
        <div className="mb-14 max-w-2xl">
          <StickerLabel rotate={-3} className="mb-6">
            {t("kicker")}
          </StickerLabel>
          <SplitHeading
            text={t("heading")}
            className="display text-primary"
            style={{ fontSize: "var(--type-display2-size)" }}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((c) => (
            <article
              key={c.title}
              className="card-cartoon group overflow-hidden"
              style={{ transform: `rotate(${c.rot}deg)` }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <StickerLabel rotate={-4}>{c.meta}</StickerLabel>
                </div>
              </div>
              <div className="flex items-center justify-between px-6 py-5">
                <h3
                  className="display text-foreground"
                  style={{ fontSize: "var(--type-section-size)" }}
                >
                  {c.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
