export const SITE_ORIGIN = "https://luiscielak.com";
export const SITE_NAME = "Luis Cielak";
export const DEFAULT_TITLE = "Luis Cielak — Clarity above all.";
export const DEFAULT_DESCRIPTION =
  "Lead Product Designer / design engineer. Portfolio of Luis Cielak.";
export const DEFAULT_OG_IMAGE = "/og-default.png";
export const DEFAULT_OG_ALT = "Luis Cielak — Clarity above all.";
export const DEFAULT_GA_ID = "G-3BV9V5XZSH";

/** Built but unlisted. Hidden from the home catalog, next-study links, and sitemap. */
export const UNLISTED_WORK = new Set<string>();

/** Draft studies that stay on the site with a Draft badge, but out of the sitemap. */
export const DRAFT_SITEMAP_SLUGS = [] as const;

/** Badge in the Draft slot: Draft itself, or a compact status like In progress. */
export function workBadge(data: { draft?: boolean; status?: string }) {
  if (data.draft) return "Draft";
  const status = data.status?.trim();
  if (status === "In progress") return status;
  return undefined;
}

const SITEMAP_EXCLUDE_PATHS = new Set([
  "/motion",
  "/about",
  "/writing",
  "/case-study-mss",
  "/case-study-pmi-da",
  "/case-study-pmi-pp",
  ...DRAFT_SITEMAP_SLUGS.map((slug) => `/work/${slug}`),
]);

export function isListedWork(id: string, listed = true) {
  return listed && !UNLISTED_WORK.has(id);
}

export function includeInSitemap(page: string) {
  const path = new URL(page).pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/case-studies")) return false;
  if (path.startsWith("/prototypes/your-first-week")) return false;
  return !SITEMAP_EXCLUDE_PATHS.has(path);
}

export function absoluteUrl(path: string, origin = SITE_ORIGIN) {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, origin).href;
}

export function canonicalPath(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}
