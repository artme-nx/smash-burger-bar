import type { Metadata } from "next";
import { Modak, Mouse_Memoirs, Anton } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Preloader } from "@/components/ui/Preloader";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { LenisProvider } from "@/lib/animations/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "../globals.css";

const modak = Modak({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-modak",
  display: "swap",
});

const mouseMemoirs = Mouse_Memoirs({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-mouse",
  display: "swap",
});

// Logo font — heavy condensed geometric, matches the printed "SMASH" wordmark.
const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smash Burger Bar — Split",
  description:
    "Smash burgeri smrskani na plancu, servirani u Splitu. Dvije lokacije: Classic i Signature.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${modak.variable} ${mouseMemoirs.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <LenisProvider>
            <CustomCursor />
            <Preloader />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
