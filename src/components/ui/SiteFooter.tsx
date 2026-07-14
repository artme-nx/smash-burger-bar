import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./LogoMark";
import { RollText } from "./RollText";
import { WOLT_URL, GLOVO_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/site";

const NAV = [
  { key: "home", href: "/" },
  { key: "menu", href: "/meni" },
  { key: "ingredients", href: "/sastojci" },
  { key: "locations", href: "/lokacije" },
  { key: "contact", href: "/kontakt" },
] as const;

export function SiteFooter() {
  const t = useTranslations();
  const year = 2026; // PLACEHOLDER: stamp real year at deploy

  return (
    <footer className="relative overflow-hidden bg-surface-red text-on-red">
      <div className="container-full pt-24 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <LogoMark tone="red" style={{ width: "96px", fontSize: "36px" }} />
            <p className="max-w-xs text-on-red/80">{t("footer.tagline")}</p>
          </div>

          <FooterCol title={t("footer.navTitle")}>
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="self-start text-on-red/80 transition-colors duration-200 hover:text-on-red"
              >
                <RollText>{t(`nav.${item.key}`)}</RollText>
              </Link>
            ))}
          </FooterCol>

          <FooterCol title={t("footer.orderTitle")}>
            <ExternalLink href={WOLT_URL}>{t("common.wolt")}</ExternalLink>
            <ExternalLink href={GLOVO_URL}>{t("common.glovo")}</ExternalLink>
          </FooterCol>

          <FooterCol title={t("footer.followTitle")}>
            <ExternalLink href={INSTAGRAM_URL}>{INSTAGRAM_HANDLE}</ExternalLink>
          </FooterCol>
        </div>

        <div
          className="mt-16 select-none uppercase text-on-red leading-[0.8]"
          style={{
            fontFamily: "var(--type-logo)",
            fontSize: "clamp(4rem, 22vw, 20rem)",
            letterSpacing: "0.02em",
          }}
          aria-hidden="true"
        >
          Smash
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t-[3px] border-on-red/40 pt-6 text-on-red/80 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm">{t("footer.company")}</span>
          <span className="text-sm">
            © {year} · {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="label text-on-red">{title}</span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="self-start text-on-red/80 transition-colors duration-200 hover:text-on-red"
    >
      <RollText>{children}</RollText>
    </a>
  );
}
