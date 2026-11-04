# Mid-fi tokens — Your First Week (phone)

**design_system:** konstrukt v2.0.0  
**Vendor:** `vendor/konstrukt-2.0.0/`  
**Mode:** `data-mode="light"` on `<html>` for mid-fi frames

## Exception (portfolio case page)

The Astro editorial case (`.editorial-study` in `site/src/styles/site.css`) keeps its Paper palette and does **not** adopt `--radius: 0` or drop the phone shadow in this pass. New case sections inherit editorial roles (`--es-ink`, `--es-muted`, `--es-accent`, `--es-rule`, `--es-display`, `--es-mono`). This file specs the **phone concept** only.

## Color (semantic — no hand-typed hex in components)

| Role | Token |
|------|-------|
| Page | `--bg` |
| Card / sheet | `--surface` |
| Body text | `--text` |
| Muted | `--text-muted` (or equivalent muted role in shipped set) |
| Accent / CTA | `--accent` |
| On accent | `--on-accent` |
| Border | `--border` |

Strokes: `--stroke-hairline`, `--stroke-rule`, `--stroke-rail`.

## Type

Use `font: var(--type-<role>)` with tracking vars where shipped:

| Role | Use |
|------|-----|
| `--type-display` | Large day numbers (6 days left, 2 of 3) |
| `--type-heading` | Screen titles |
| `--type-subheading` | Card titles |
| `--type-body` | Body |
| `--type-label` | Kicker / day of 7 |
| `--type-meta` | Captions, cancel-by note |
| `--type-badge` | Unofficial banner, chips |
| `--type-mono` | Source labels (Live / Cached / Pre-written) |

## Spacing

`--sp-1` … `--sp-16` for padding and gaps. Phone content inset ≈ `--sp-4` / `--sp-6`.

## Shape

- `--radius: 0px`
- `--shadow: none`
- No gradients

**Running prototype note:** `monarch-first-week` currently uses an inspired-by sand/orange set with 12px cards. It keeps that UI until a later visual pass; mid-fi is the target spec for that pass.

## Accessibility

- Contrast: body on `--bg` / `--surface` meets WCAG AA.
- Focus: visible focus ring using accent stroke; do not remove outline without a replacement.
- Touch: primary actions ≥ 44×44 CSS px.
