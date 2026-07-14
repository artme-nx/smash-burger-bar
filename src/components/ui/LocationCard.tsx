import { useTranslations } from "next-intl";
import type { SiteLocation } from "@/lib/site";

/**
 * Location card — classic (red-on-cream) or signature (gold-on-dark). Shows
 * address, hours, phone, a cartoon-framed live map embed and a directions link.
 */
export function LocationCard({ location }: { location: SiteLocation }) {
  const t = useTranslations("locationsPage");
  const dark = location.variant === "signature";
  const accent = dark ? "var(--signature)" : "var(--primary)";
  const fg = dark ? "var(--on-red)" : "var(--foreground)";
  const muted = dark ? "var(--on-red)" : "var(--muted-foreground)";
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    location.address,
  )}&z=15&output=embed`;

  return (
    <article
      className="card-cartoon flex flex-col overflow-hidden"
      style={
        dark
          ? { background: "var(--foreground)", borderColor: "var(--signature)", boxShadow: "6px 6px 0 var(--signature-deep)" }
          : undefined
      }
    >
      {/* Map */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden border-b-[3px]"
        style={{ borderColor: dark ? "var(--signature)" : "var(--outline-ink)" }}
      >
        <iframe
          src={mapSrc}
          title={location.name}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
          style={{ border: 0, filter: dark ? "grayscale(0.3) contrast(1.05)" : "none" }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-8">
        <div className="flex items-center justify-between">
          <span
            className="label rounded-full px-3 py-1 text-[0.65rem]"
            style={{
              background: accent,
              color: dark ? "var(--foreground)" : "var(--primary-foreground)",
            }}
          >
            {dark ? t("signature.tag") : t("classic.tag")}
          </span>
        </div>

        <h2
          className="uppercase leading-none"
          style={{ fontFamily: "var(--type-logo)", letterSpacing: "0.03em", fontSize: "1.75rem", color: fg }}
        >
          {location.name}
        </h2>

        <p style={{ color: muted }}>{location.address}</p>

        <div className="flex flex-col gap-1">
          <span className="label text-[0.65rem]" style={{ color: accent }}>
            {t("hoursLabel")}
          </span>
          <span style={{ color: fg }}>
            {dark ? t("signature.hours") : t("classic.hours")}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="label text-[0.65rem]" style={{ color: accent }}>
            {t("phoneLabel")}
          </span>
          {location.phone ? (
            <a
              href={`tel:${location.phone.replace(/\s/g, "")}`}
              className="hover:underline"
              style={{ color: fg }}
            >
              {location.phone}
            </a>
          ) : (
            // PLACEHOLDER: telefon Signature lokacije još nedostaje
            <span style={{ color: muted, opacity: 0.7 }}>{t("phoneTbd")}</span>
          )}
        </div>

        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-2 self-start px-6 py-3"
          style={{
            background: accent,
            color: dark ? "var(--foreground)" : "var(--primary-foreground)",
            borderRadius: "var(--radius-pill)",
            boxShadow: `3px 3px 0 ${dark ? "var(--signature-deep)" : "var(--outline-ink)"}`,
          }}
        >
          {t("directions")} →
        </a>
      </div>
    </article>
  );
}
