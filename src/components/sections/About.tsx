import Image from "next/image";
import { useTranslations } from "next-intl";
import { StickerLabel } from "@/components/ui/Sticker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import trioImg from "../../../public/img/burgers-trio.webp";
import heroImg from "../../../public/img/hero-split-tower.webp";

export function About() {
  const t = useTranslations("home.about");

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <div className="max-w-xl">
          <StickerLabel rotate={-3} className="mb-6">
            {t("kicker")}
          </StickerLabel>
          <SplitHeading
            text={t("heading")}
            className="display text-primary"
            style={{ fontSize: "var(--type-display2-size)" }}
          />
          <Reveal className="mt-8 flex flex-col gap-5 text-lg text-muted-foreground">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </Reveal>
        </div>

        {/* Sticker photo cluster with parallax drift */}
        <div className="relative h-[420px] sm:h-[520px]">
          <Parallax speed={-0.12} className="absolute right-0 top-2 w-[62%]">
            <div
              className="card-cartoon relative aspect-[3/4] overflow-hidden"
              style={{ transform: "rotate(3deg)" }}
            >
              <Image
                src={heroImg}
                alt="Smash burger u ruci"
                fill
                sizes="(max-width: 640px) 62vw, 32vw"
                className="object-cover"
              />
            </div>
          </Parallax>
          <Parallax speed={0.1} className="absolute bottom-2 left-0 w-[52%]">
            <div
              className="card-cartoon relative aspect-[4/5] overflow-hidden"
              style={{ transform: "rotate(-4deg)" }}
            >
              <Image
                src={trioImg}
                alt="Tri smash burgera na pladnju"
                fill
                sizes="(max-width: 640px) 52vw, 26vw"
                className="object-cover"
              />
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
