# Your First Week — handoff

Unofficial portfolio concept for Luis Cielak: a phone-sized first-week + AI Quick Sort prototype, a landing page, and a case study. Not affiliated with Monarch Money. No Monarch logo, screenshots, or licensed fonts. All household data is mock.

Drop this folder into `lc-dot-com` (or run it standalone). Node 22+.

It now lives in `lc-dot-com/monarch-first-week` on branch `monarch/first-week-concept`.

## Run locally

```bash
npm install
npm run dev
```

Dev server is `http://127.0.0.1:45261` (`vite.config.ts`, `strictPort: true`). Local mode never calls Workers AI.

```bash
npm run build
npm run preview
```

`npm run fixtures` regenerates `data/fixtures/sample.json` (optional).

## Routes

| Path | What |
| --- | --- |
| `/` | Landing — “Luis Cielak x Monarch”. Copy in `src/content/landing.ts`. |
| `/prototype/*` | 390×844 phone prototype (Days 0–7). Embeddable in an iframe. |
| `/case` | Narrative case study. Copy in `src/content/case.ts`. Research facts in `src/content/research.ts`. |

Legacy `/connect`, `/week`, `/day/*` redirect under `/prototype`. Site is `noindex,nofollow`.

## Fixtures and pricing

- Transactions: `data/fixtures/sample.json` (~200 fictional Aug–Oct 2026 rows). Loaded via `src/lib/fixtures.ts`.
- Mock AI groups: `data/fixtures/fallback.json`.
- Prices: `src/config/pricing.ts` — Core $99.99/yr or $14.99/mo, Plus $199.99/yr, 7-day trial, card required. From monarch.com/pricing as of **2026-10-29**.
- Tokens: `tokens/tokens.json` → CSS vars in `src/lib/tokens.ts`.

## Cloudflare Pages Function (not deployed)

Config only. This repo does not create Cloudflare resources.

- Function: `functions/api/quicksort.ts` (`POST` / `GET /api/quicksort`).
- `wrangler.toml`: `pages_build_output_dir = "dist"`.
- **Workers AI** binding: `AI`. Model `@cf/meta/llama-3.1-8b-instruct`. 8s timeout, then fallback.
- **KV** binding: `QUICKSORT_CACHE`. Placeholder id `00000000000000000000000000000000` — replace with a real namespace. Cache key `qs:<sha256>`, TTL 24h.
- **Cap:** `DAILY_AI_CAP=200` (KV `cap:day:YYYY-MM-DD`).
- **Rate limit:** `PER_IP_HOURLY_CAP=20` (KV `rl:ip:<ip>:<hour>`).
- **Fallback:** `data/fixtures/fallback.json` on timeout, missing AI, cap, or error. Response `source`: `live` | `cached` | `pre-written`.
- **Mock AI locally:** Vite plugin `vite-plugins/mock-quicksort.ts` serves `/api/quicksort` from `fallback.json`. Preview server does the same.

To publish later: Pages project (`npm run build` → `dist`), real KV id in `wrangler.toml`, enable Workers AI, then your usual Pages deploy. `public/_redirects` sends app routes to `index.html`.

## Open items

- **[Luis to write]** — Landing Hello: “How he works with PMs, researchers, and new-member teams.” Landing Why: “Why this team, this season, this problem.” Case tension: household use; one real example each (miscategorization, sync, categories vs tags vs transfers). Case reflection: “What a hiring manager should know first.”
- **Competitor map labels** on `/case` run into their notes (app name and takeaway sit in one flow in `.pos-app` / `.pos-take`).
- **Third person:** `/case` tension still says “Luis uses Monarch with a household…” (`src/content/case.ts`).
- **Deploy not done.** Function and wrangler file are stubs only.

## Guardrails (keep)

Canvas facts only. No invented numbers, quotes, or dates. No Temple / MIS-AIS / Proof. Never say he built Hermes Agent. Finley (not Finly). Wife never named or shown. Unofficial banner on every prototype screen. Mock data only.
