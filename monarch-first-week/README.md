# Your First Week

Unofficial design concept for a new-member first week with AI Quick Sort. Built for designer **Luis Cielak**’s portfolio.

Not affiliated with Monarch Money. No Monarch logos, screenshots, or assets. All accounts, merchants, and household data are fictional.

## Run locally

Needs Node 22+. Local mode uses **mock AI** (`data/fixtures/fallback.json`) and does not need a Cloudflare account.

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:45261](http://127.0.0.1:45261) for the landing, [http://127.0.0.1:45261/case](http://127.0.0.1:45261/case) for the case study, or [http://127.0.0.1:45261/prototype](http://127.0.0.1:45261/prototype) for the 390×844 phone. The site is marked `noindex,nofollow`.

Landing copy lives in `src/content/landing.ts`. Case study copy lives in `src/content/case.ts`. Research facts live in `src/content/research.ts`.

```bash
npm run build
npm run preview
```

Regenerate the synthetic household (optional):

```bash
npm run fixtures
```

## What’s in the prototype

Days 0–6 are all navigable. Prototype jump links sit under each screen’s primary action.

| Route | Screen |
| --- | --- |
| `/` | Landing · Luis Cielak x Monarch |
| `/case` | Case study · first-week story |
| `/prototype` | Day 0 · goal + “Your first week is on us” |
| `/prototype/connect` | Day 0 · Connect your accounts / Connection status |
| `/prototype/week` | First Week hub |
| `/prototype/day/1` | Needs review intro |
| `/prototype/day/1/sort` | Review card (swipe or Mark as reviewed / Skip for now) |
| `/prototype/day/2` | Flex Budgeting vs Category Budgeting |
| `/prototype/day/3` | Save up goal |
| `/prototype/day/4` | Weekly Recap |
| `/prototype/day/5` | Tags |
| `/prototype/day/6` | Visual week + plan |
| `/prototype/day/7` | Rules that ran this week |

Sheets: **Category, tag or transfer?**, **Insights** (Sent / Never sent icon lists, Live / Cached / Pre-written, AI toggle).

Every screen has a slim 28px banner: `Unofficial concept by Luis Cielak. Not affiliated with Monarch.`

## Data

`data/fixtures/sample.json` is an unnamed household with ~200 made-up transactions (August–October 2026). Banks: Northfield Bank, Harbor Card, Ridge Credit Union (masked). Merchants include Daily Grind, Fresh Basket, and Fuel Stop.

Seeded messes, tagged on rows as `seedMess`:

- miscategorized coffee as Shopping
- messy raw merchant strings
- a pending/posted duplicate pair
- a stale card connection and one that needs re-auth
- card autopay and account transfers counted as spending
- a refund booked as income
- tax items stored as a category instead of a tag

`data/fixtures/fallback.json` is the pre-written Quick Sort grouping used by mock AI.

## Pricing

`src/config/pricing.ts` is the source of copy. Figures from [monarch.com/pricing](https://www.monarch.com/pricing) as of **2026-10-29**:

- Core annual $99.99/yr (~$8.33/mo)
- Core monthly $14.99/mo
- Plus $199.99/yr, annual only
- 7-day trial, payment method required

Day 0: “Your first week is on us. Then Core at $99.99/yr or $14.99/mo.”  
Day 6 computes cancel-by as 24 hours before `trialEndsAt` in the fixture.

## Design tokens

`tokens/tokens.json` is an inspired-by set (Radix orange `#F76B15`, sand neutrals) flattened into CSS variables on boot (`src/lib/tokens.ts`). UI is Inter; display is Newsreader. Cards are 12px. No Monarch logo, butterfly, or licensed fonts.

## AI (later)

`functions/api/quicksort.ts` is a Cloudflare Pages Function. It:

- accepts only the fields shown on the AI panel
- caches by input hash in KV (`QUICKSORT_CACHE`)
- applies a daily call cap and a per-IP hourly limit
- times out at 8 seconds
- falls back to `data/fixtures/fallback.json`

Local `npm run dev` never calls Workers AI. Vite serves `/api/quicksort` from the fallback file.

## Later deploy (Cloudflare Pages)

This repo does **not** create Cloudflare resources. When you want to publish:

1. Create a Pages project that builds with `npm run build` and output `dist`.
2. Create a KV namespace and put its id in `wrangler.toml` (`QUICKSORT_CACHE`).
3. Enable Workers AI on the project (`[ai] binding = "AI"`).
4. Deploy with your usual Pages flow, for example `npx wrangler pages deploy dist` after you are logged in.

`wrangler.toml` already points `pages_build_output_dir` at `dist`. `public/_redirects` sends app routes to `index.html`.
