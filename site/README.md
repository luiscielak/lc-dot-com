# luiscielak.com (Astro)

The live site for [luiscielak.com](https://luiscielak.com). See the [root README](../README.md) for what the portfolio is about; this file is the technical reference.

## Commands

All commands run from this `site/` directory:

```bash
npm install      # also builds Konstrukt via postinstall
npm run dev      # local dev server
npm run check    # astro check + image-resolution check
npm run build    # production build + image-resolution check
npm run preview  # serve the built site locally
```

`build` and `check` both run `scripts/check-image-resolution.mjs`, which fails if a case-study image is under 1.5x its declared CSS max width.

## Stack

- Astro 5, MDX, TypeScript
- Sharp for responsive images
- [Konstrukt](https://github.com/the-hooman-loop/konstrukt) v2.0.0 (pinned git tag; this repo does not fork or patch it). The `postinstall` script builds it after install.

## Routes

`/`, `/about`, `/resume`, `/work/[slug]`, and a 404. Old case-study URLs and `/writing` are 301-redirected; see `redirects` in [`astro.config.mjs`](astro.config.mjs).

## Case studies

Case studies are MDX in [`src/content/work/`](src/content/work/); the frontmatter schema lives in [`src/content.config.ts`](src/content.config.ts).

- Empty sections are omitted from the rendered page.
- Metrics render only when `confirmed: true`.
- Drafts (`draft: true`) are still built and labeled Draft.

Published: Field Dispatch, PMI Disciplined Agile, PMI Partner Platform.
Draft: StraatClaw, Making "Compare" Actually Compare.

## Hosting

There is no deploy pipeline in this repo (no GitHub Actions, Vercel, or Cloudflare config). Preview is local via `npm run preview`.
