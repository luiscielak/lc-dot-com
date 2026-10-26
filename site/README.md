# luiscielak.com (Astro)

New portfolio app. Lives in `site/` so the existing Jekyll tree at the repo root stays untouched and this branch can rebase onto Luis’s local reorg later.

## Stack

- Astro + MDX + TypeScript
- [Konstrukt](https://github.com/the-hooman-loop/konstrukt) **v2.0.0** (git tag; this repo does not fork or patch Konstrukt)
- Sharp for responsive images (`<Picture>` AVIF/WebP)

## Commands

```bash
cd site
npm install
npm run dev
npm run build   # includes the 1.5× image-resolution check
```

Preview is local only. Do not deploy, change DNS, or attach Cloudflare Pages from this branch.

## Content

Case studies: `src/content/work/*.mdx`. StraatClaw and Vanguard are `draft: true` (still built, labeled Draft). Empty template sections are omitted. When the MDX body has real content (not only `{/* TODO */}` comments), the template renders it via `Content`. Metrics render only when `confirmed: true`.
