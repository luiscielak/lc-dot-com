import type { APIRoute } from "astro";
import { UNLISTED_WORK } from "../lib/site";

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  const disallows = [
    "/motion",
    ...[...UNLISTED_WORK].map((slug) => `/work/${slug}`),
  ];
  const body = [
    "User-agent: *",
    "Allow: /",
    ...disallows.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${sitemapURL.href}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
