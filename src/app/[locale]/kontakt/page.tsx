import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { StickerLabel, Sticker } from "@/components/ui/Sticker";
import { ContactForm } from "@/components/ui/ContactForm";
import { LOCATIONS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage.hero" });
  return { title: `${t("title")} — Smash Burger Bar` };
}

export default async function ContactPage({
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
        <div className="container-wide flex flex-col gap-12">
          {/* Locations lead (dominant) · form is the narrower secondary column */}
          <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_0.85fr] lg:gap-12">
            <Locations />
            <FormPanel />
          </div>
          <InstagramBar />
        </div>
      </section>
    </>
  );
}

function Hero() {
  const t = useTranslations("contactPage.hero");
  return (
    <section className="flex min-h-[42svh] flex-col items-center justify-center gap-6 pt-28 pb-10 text-center">
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

/** Two big location cards — the main event on the contact page. */
function Locations() {
  const t = useTranslations("locationsPage");
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {LOCATIONS.map((loc) => {
        const dark = loc.variant === "signature";
        const accent = dark ? "var(--signature)" : "var(--primary)";
        return (
          <div key={loc.id} className="card-cartoon flex flex-col p-8 sm:p-9">
            <span
              className="label self-start rounded-full px-4 py-1.5 text-[0.7rem]"
              style={{
                background: accent,
                color: dark ? "var(--foreground)" : "var(--primary-foreground)",
              }}
            >
              {dark ? t("signature.tag") : t("classic.tag")}
            </span>
            <h2
              className="mt-5 uppercase leading-[0.95]"
              style={{
                fontFamily: "var(--type-logo)",
                letterSpacing: "0.02em",
                fontSize: "1.9rem",
                color: "var(--foreground)",
              }}
            >
              {loc.name}
            </h2>
            <p className="mt-4 text-lg text-foreground/90">{loc.address}</p>
            <p className="mt-2 text-muted-foreground">
              {dark ? t("signature.hours") : t("classic.hours")}
            </p>
            {loc.phone ? (
              <a
                href={`tel:${loc.phone.replace(/\s/g, "")}`}
                className="mt-3 block text-lg font-medium hover:underline"
                style={{ color: accent }}
              >
                {loc.phone}
              </a>
            ) : (
              <span className="mt-3 block text-muted-foreground/70">{t("phoneTbd")}</span>
            )}
            <a
              href={loc.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-6 inline-flex items-center gap-2 self-start px-5 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                border: `3px solid ${accent}`,
                color: accent,
                borderRadius: "var(--radius-pill)",
              }}
            >
              {t("directions")}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        );
      })}
    </div>
  );
}

/** Compact, secondary contact form. */
function FormPanel() {
  const t = useTranslations("contactPage.form");
  return (
    <div className="lg:sticky lg:top-28">
      <span className="label text-[0.7rem] text-primary-strong">{t("title")}</span>
      <div className="mt-4">
        <ContactForm />
      </div>
    </div>
  );
}

/** Big, unmissable Instagram call-out. */
function InstagramBar() {
  const t = useTranslations("contactPage");
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3 bg-surface-red px-8 py-10 text-center text-on-red transition-transform duration-200 hover:-translate-y-1 sm:flex-row sm:justify-between sm:gap-6 sm:text-left"
      style={{
        border: "3px solid var(--outline-ink)",
        borderRadius: "var(--radius)",
        boxShadow: "6px 6px 0 var(--outline-ink)",
      }}
    >
      <span className="label text-[0.75rem] text-on-red/80">{t("instaCta")}</span>
      <span
        className="uppercase leading-none"
        style={{
          fontFamily: "var(--type-logo)",
          letterSpacing: "0.01em",
          fontSize: "clamp(1.8rem, 6vw, 3.4rem)",
        }}
      >
        {INSTAGRAM_HANDLE}
      </span>
      <span
        aria-hidden="true"
        className="text-3xl transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
