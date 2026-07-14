import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StickerLabel } from "@/components/ui/Sticker";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { LOCATIONS } from "@/lib/site";

/** "Za ponijeti" — the reference's travelling strip, reworked into our two Split
 * locations + delivery. Full detail lives on /lokacije. */
export function TakeAway() {
  const t = useTranslations("home.takeaway");

  return (
    <section className="py-24 sm:py-32">
      <div className="container-wide">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <StickerLabel rotate={-3} className="mb-6">
              {t("kicker")}
            </StickerLabel>
            <SplitHeading
              text={t("heading")}
              className="display text-primary"
              style={{ fontSize: "var(--type-display2-size)" }}
            />
          </div>
          <p className="max-w-sm text-muted-foreground">{t("lead")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {LOCATIONS.map((loc, i) => {
            const isSignature = loc.variant === "signature";
            return (
              <Link
                key={loc.id}
                href="/lokacije"
                className="card-cartoon group flex flex-col justify-between gap-16 p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
                style={{
                  transform: `rotate(${i % 2 ? 2 : -2}deg)`,
                  background: isSignature ? "var(--foreground)" : "var(--surface)",
                }}
              >
                <div className="flex items-start justify-between">
                  <StickerLabel rotate={-4}>
                    {isSignature ? t("signatureTag") : t("classicTag")}
                  </StickerLabel>
                  <span
                    aria-hidden="true"
                    className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: isSignature ? "var(--signature)" : "var(--primary)" }}
                  >
                    →
                  </span>
                </div>
                <div>
                  <h3
                    className="uppercase"
                    style={{
                      fontFamily: "var(--type-logo)",
                      letterSpacing: "0.03em",
                      fontSize: "var(--type-section-size)",
                      color: isSignature ? "var(--signature)" : "var(--foreground)",
                    }}
                  >
                    {loc.name}
                  </h3>
                  <p
                    className="mt-3"
                    style={{ color: isSignature ? "var(--on-red)" : "var(--muted-foreground)" }}
                  >
                    {loc.address}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
