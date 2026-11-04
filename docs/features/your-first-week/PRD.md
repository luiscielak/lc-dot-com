# Your First Week — PRD

**Feature slug:** `your-first-week`
**Mode:** Feature of luiscielak.com (portfolio case + phone prototype)
**design_system:** konstrukt (mid-fi of the phone concept; portfolio page keeps its Paper editorial layout)
**Research as of:** 2026-10-29
**Status:** Draft. Unofficial concept. Not affiliated with Monarch Money.

## 1. Overview

**Product name:** Your First Week

**Elevator pitch:** An unofficial concept for a new member’s first week with AI Quick Sort — one job a day, charge facts before connect, groups instead of rows — so a household can trust a month before the card is billed.

**Problem statement:** Monarch’s trial is 7 days with a card required. Setup lives in help articles. Public App Store coding (500 US reviews, Oct 29, 2026) shows week one breaking on billing surprise, sync gaps, miscategorizations, and transfers counted as spend. Competitors in this set give the first month more room. If the length stays, the week itself has to be complete.

## 2. Goals and Non-Goals

### Goals

- Make the trial week a product: one screen a day, one job.
- State charge date, amount, who bills, and cancel-by before accounts connect, and again before the charge.
- Review groups (sync → transfers → merchants → rules), not a spreadsheet of rows.
- AI drafts; the member marks as reviewed, edits, skips, or flags a transfer. A rule runs only when they say so.
- Ship a hiring-manager-ready case page on luiscielak.com that shows competitors, jobs, hypotheses, flow, lo-fi, mid-fi, and the live prototype — without invented outcomes.

### Non-Goals

- Changing Monarch’s trial length or pricing.
- Live Workers AI deploy (local/static uses Pre-written fallback).
- Personal household anecdotes marked `[Luis to write]`.
- Claiming conversion rates or baselines (none are public).
- Restyling the Paper editorial case page to strict Konstrukt.

## 3. Target Users and Personas

| Archetype | Who | Wants | Loses |
|-----------|-----|-------|-------|
| Household CFO | One partner runs money for two | Accurate categories, transfers handled, rules that stick, a partner with a job | Fixes don’t stick; rule order invisible |
| Trial skeptic | Comparing apps, wary of subscriptions | Real value fast, a clear way out | Paywall feels like a trick; charge after cancel |
| Agent-native tinkerer | Already points agents at their money | Guided setup, review a few corrections, reliable data | Connections break; AI forced into every surface |

**Primary reader of the case page:** hiring managers and design leads evaluating product craft, research honesty, and AI interaction design.

## 4. User Stories and Primary Flows

### Stories

| ID | Story | Metric |
|----|-------|--------|
| US-01 | As a new member, I want the charge date, amount, who bills me, and where to cancel before I connect accounts, so I can decide calmly. | Refunds and billing tickets / 100 trials |
| US-02 | As a new member, I want connection status before I review transactions, so I know which institutions are healthy. | Activation by Day 5 |
| US-03 | As a new member, I want to review merchant and transfer groups (not rows), so I can finish a month I trust in one pass. | Quick Sort completion within 48h |
| US-04 | As a new member, I want transfers and card payments sorted before merchants, so totals aren’t wrong from the start. | % uncategorized or re-edited by Day 7 |
| US-05 | As a new member, I want to see what the model saw and turn suggestions off, so I can trust AI as a partner. | Undo rate; suggestions-off usage |
| US-06 | As a household member, I want a small clear job (e.g. unsure cards), so I don’t carry the week alone. | Partner active in week 2 / invite |
| US-07 | As a hiring manager, I want the case to show competitors, jobs, hypotheses, flow, wireframes, and a live prototype with no invented metrics. | Case draft published; prototype walkable |

### Primary flow

```
Day 0 goal → Connect → Week hub → Needs review
  → groups (sync, transfers, merchants, rule)
  → Day 2 budget → Day 3 goal → Day 4 recap
  → Day 5 tags → Day 6 the charge → Day 7 rules
```

**Side paths:** Skip for now (Day 0); Update stale connection; Insights sheet; Edit (suggestions off); Mark as reviewed / Skip / Undo; Open full screen from the case page.

## 5. Scope

### MVP (this pass)

- PRD, lo-fi, mid-fi under `docs/features/your-first-week/`.
- Portfolio case page sections: competitor field, JTBD, experiments, flow, wireframe figures, live prototype embed.
- Existing phone prototype in `monarch-first-week/` (Days 0–7), hosted under `/prototypes/your-first-week/`.
- Page stays `draft: true`.

### Post-MVP

- Personal copy (`[Luis to write]`).
- Cloudflare Workers AI + KV for live Quick Sort.
- Hi-fi gallery; visual restyle of the phone to Konstrukt.
- Competitor-map label polish on the standalone `/case` app.
- Homepage feature.

## 6. Functional Requirements

| FR | Requirement | Story | Metric |
|----|-------------|-------|--------|
| FR-001 | Case page remains draft-labeled; not featured on the homepage until undrafted. | US-07 | Draft badge visible |
| FR-002 | Problem section shows coded counts: 500 reviews, 183 rated 1–3, 70 billing, 47 sync, with method note (signals, not rates). | US-07 | Counts match Oct 29 coding |
| FR-003 | Case includes two App Store pull quotes with citations. | US-07 | Quotes attributed |
| FR-004 | Case includes the week-as-steps diagram (Day 0 → Insights → Day 4 → Day 6). | US-07 | Steps rendered |
| FR-005 | Case embeds the live 390×844 phone prototype after the week diagram. | US-07 | Prototype interactive |
| FR-006 | Case offers “Open full screen” to the same prototype. | US-07 | Link works |
| FR-007 | Prototype embed has ready / loading / error states; Retry reloads; Pre-written is a labeled AI source, not an error. | US-05 | States present |
| FR-008 | On narrow viewports the phone frame scales to the column without horizontal overflow. | US-07 | No overflow ≤760px |
| FR-009 | Case includes competitor field (trial length × card), five+ JTBD, and three experiment cards from research. | US-07 | Sections present |
| FR-010 | No invented metrics, household anecdotes, or unnamed wife; personal placeholders stay unwritten. | US-07 | Facts-only audit |
| FR-011 | Day 0 states charge, amount, who bills, cancel-by (24h before) before connect. | US-01 | Billing card on Day 0 |
| FR-012 | Connect shows per-institution status; Continue allowed with partial healthy set. | US-02 | 2 of 3 path works |
| FR-013 | Quick Sort order: connection status → transfers → merchants → rules. | US-04 | Order in intro |
| FR-014 | Review is one group card at a time; Mark as reviewed / Skip advance; Undo returns. | US-03 | Card flow works |
| FR-015 | Insights lists Sent vs Never sent; suggestions toggle; source Live / Cached / Pre-written. | US-05 | Sheet contents |
| FR-016 | Day 6 shows week checklist then the same charge facts as Day 0. | US-01 | Day 6 billing |

## 7. Non-Functional Requirements

| NFR | Requirement |
|-----|-------------|
| NFR-001 | Unofficial banner on every prototype screen; no Monarch logo, screenshots, or licensed fonts. |
| NFR-002 | Mock household only; local/static never requires Workers AI. |
| NFR-003 | Site is static Astro; prototype SPA base `/prototypes/your-first-week/` with Cloudflare rewrite. |
| NFR-004 | `noindex` on the standalone prototype app; portfolio case follows site robots. |
| NFR-005 | Pricing copy from monarch.com/pricing as of 2026-10-29. |
| NFR-006 | Mid-fi specs use Konstrukt token names; running prototype may keep its inspired-by UI until a later visual pass. |

## 8. Acceptance Criteria

```
Given a visitor opens /work/your-first-week
When the page loads
Then they see Draft, problem + counts, quotes, competitor field, JTBD, experiments, week steps, and a phone frame

Given the phone embed loads
When they walk Day 0 → Connect → Hub → Needs review → a merchant card → Insights
Then charge facts appear on Day 0, transfers precede merchants, and Insights shows Pre-written or Live/Cached

Given the prototype file is missing or the iframe fails
When the error state shows
Then Retry and Open full screen remain available

Given a viewport under 760px
When the case page is viewed
Then the phone scales inside the column with no horizontal scroll
```

## 9. Success Metrics

Proposed only. No public baseline. Split by web and App Store when measured in product.

| Metric | Target | Timeframe | Measurement |
|--------|--------|-----------|-------------|
| North star: fewer people feel tricked | ↓ refunds and billing tickets / 100 trials | 30 days after first charge | Support + billing |
| Quick Sort completion | ↑ share finishing within 48h of first sync | Week 1 of experiment | Product analytics |
| Transfers first | ↓ % uncategorized or re-edited by Day 7 | End of week 1 | Product analytics |
| Partner job | ↑ partner active in week 2 / invite sent | Weeks 1–2 | Product analytics |
| Case craft (portfolio) | Hiring manager can walk research → prototype without invented claims | Publish of draft case | Review checklist |

## 10. Dependencies and Constraints

- Research locked to Oct 29, 2026 canvas in `monarch-first-week/src/content/research.ts`.
- Prototype lives in `monarch-first-week/`; case in `site/src/content/work/your-first-week.mdx`.
- Paper editorial presentation already on the site; do not restyle the whole template.
- Card required; cancel at least 24 hours before trial ends (FAQ). Pricing page wording differs — show both honestly.

## 11. Assumptions and Open Questions

**Assumptions**

- Trial length stays 7 days; First Week is the design answer if it does.
- Pre-written Quick Sort is acceptable for the portfolio embed.
- Luis’s lived use may appear later, labeled; not in this pass.

**Open questions**

- When to undraft and feature on the homepage.
- Whether to host Workers AI for live Quick Sort on the public prototype.
- Exact personal copy for Hello / Why / reflection (`[Luis to write]`).

## 12. Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Trademark / affiliation confusion | Unofficial banner, note, no logo or screenshots |
| Invented outcomes | Facts-only guardrail; proposed metrics labeled |
| Embed fails in production | Loading/error states; full-screen fallback; Pre-written AI |
| Competitor data goes stale | Date stamp; Rocket Money marked not rechecked |

## 13. Release Plan

| Milestone | Output |
|-----------|--------|
| M1 | PRD + WORKFLOW.md |
| M2 | Lo-fi phone frames for primary flow |
| M3 | Mid-fi tokens/components/screens + ui.html |
| M4 | Case page content + prototype host + embed |
| M5 (later) | Personal copy, hi-fi, live AI, undraft |
