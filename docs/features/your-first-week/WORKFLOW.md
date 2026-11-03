# Your First Week — workflow

**Mode:** Feature of luiscielak.com  
**design_system:** konstrukt (phone mid-fi). Portfolio case keeps Paper editorial layout (recorded exception).  
**Prototype app:** `monarch-first-week/` (existing; no second `app/`)  
**Feature folder:** `docs/features/your-first-week/`

## Chain

```
scaffold (feature folder) → /prd → /lofi → /midfi → case embed (existing proto) → /hifi optional
```

Default order: prototype already exists; hi-fi after the case page works.

## Stage status

| Stage | Status | Output |
|-------|--------|--------|
| scaffold | done | This folder; no second app |
| /prd | done | `PRD.md` |
| /lofi | done | `wireframes/lofi/` |
| /midfi | done | `wireframes/midfi/` (+ `vendor/konstrukt-2.0.0/`) |
| case embed | done | `/work/your-first-week` + `/prototypes/your-first-week/` |
| storytelling + flow clips | done | Opener, method, tabbed looping clips under week map |
| /hifi | deferred | `ui-design/` |

## Scope boundary (this pass does not ship)

- Live auth, Monarch APIs, or real household data
- Cloudflare Workers AI / KV for production Quick Sort
- Personal `[Luis to write]` copy
- Undrafting or homepage feature
- Restyling the Paper case page to radius-0 Konstrukt

## Konstrukt exception

Mid-fi for **phone screens** uses Konstrukt token names. The **portfolio editorial page** keeps its existing Paper CSS (`site/src/styles/site.css` `.editorial-study`). New case sections inherit those editorial roles. Do not force `--radius: 0` on the whole case template in this pass.
