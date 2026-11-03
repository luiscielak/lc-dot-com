import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { includeInSitemap } from "./src/lib/site.ts";

function stripGoogleFontImports() {
  return {
    name: "strip-google-font-imports",
    enforce: "pre",
    transform(code, id) {
      if (!code.includes("fonts.googleapis.com")) return;
      const next = code.replace(
        /@import\s+(?:url\()?['"]https:\/\/fonts\.googleapis\.com[^'"]+['"]\)?;?/g,
        "",
      );
      if (next !== code) return { code: next, map: null };
    },
  };
}

export default defineConfig({
  site: "https://luiscielak.com",
  output: "static",
  vite: {
    plugins: [stripGoogleFontImports()],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: includeInSitemap,
    }),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  redirects: {
    "/case-study-mss": {
      status: 301,
      destination: "/work/field-dispatch",
    },
    "/case-study-pmi-da": {
      status: 301,
      destination: "/work/pmi-disciplined-agile",
    },
    "/case-study-pmi-pp": {
      status: 301,
      destination: "/work/pmi-partner-platform",
    },
    "/case-studies/redefining-field-dispatch-mobile-first-real-time": {
      status: 301,
      destination: "/work/field-dispatch",
    },
    "/case-studies/streamlining-certification-mobile-first-learning-journey": {
      status: 301,
      destination: "/work/pmi-disciplined-agile",
    },
    "/case-studies/transforming-enterprise-security-fraud-to-revenue": {
      status: 301,
      destination: "/work/pmi-partner-platform",
    },
    "/case-studies/straatclaw": {
      status: 301,
      destination: "/work/straatclaw",
    },
    "/case-studies/making-compare-actually-compare": {
      status: 301,
      destination: "/work/making-compare-actually-compare",
    },
    "/writing": {
      status: 301,
      destination: "/",
    },
    "/about": {
      status: 301,
      destination: "/#about",
    },
  },
});
