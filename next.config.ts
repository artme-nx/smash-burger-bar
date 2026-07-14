import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (served at /smash-burger-bar/).
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/smash-burger-bar" : "",
  // Emit clean folder/index.html routes so GitHub Pages serves /hr/, /hr/meni/…
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
