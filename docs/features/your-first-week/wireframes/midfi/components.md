# Mid-fi components — Your First Week (phone)

**design_system:** konstrukt. Portable classes where they map; otherwise anatomy described with tokens.

## Inventory

| Component | Konstrukt / pattern | Notes |
|-----------|---------------------|-------|
| Unofficial banner | `.badge` / custom strip | Always visible; NFR-001 |
| Primary button | `.btn-primary` | Continue, Mark as reviewed, Start review |
| Quiet button | `.portal-quiet-btn` | Skip for now, Undo, Edit |
| Radio card | custom on `--surface` + `--stroke-rule` | Goal picker |
| Day row | list link | Hub jumps |
| Chip | `.badge` variants | This month / Web / App Store |
| Account line | list row | Connect status |
| Billing card | `.module` | Charge facts Day 0 / Day 6 |
| Review card | `.module` | One group |
| Insights sheet | square dialog on `--surface` + `--stroke-rule` | No Sheet/shadow; bottom or full overlay |
| Toast | not shipped — use `.alert.alert-info` | Mock refresh / try another |
| Sparkle | icon button | Opens Insights |
| Select | `.field` / `.input` | Category |

## States (all interactive)

| State | Spec |
|-------|------|
| default | `--surface` / `--text`, hairline border |
| hover | border → `--stroke-rule` stronger; no shadow lift |
| focus | 2px accent outline, offset 2px |
| disabled | muted text, no pointer |
| loading | label “Loading…” / aria-busy on embed |
| error | `.alert.alert-danger` copy + Retry |
| success | check on day row; reauthed account |

## Keyboard

- Tab order: back → primary content → footer actions left-to-right.
- Radio cards: arrow keys within group; Space/Enter select.
- Insights: Escape closes; focus returns to sparkle.
- Embed Retry: Enter activates.

## Focus order (review card)

1. Back  
2. Insights  
3. Category select  
4. Mark as reviewed  
5. Skip  
6. Undo  
