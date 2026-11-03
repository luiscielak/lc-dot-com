# Lo-fi legend — Your First Week

Phone concept for the new-member first week. Structure and flow only.

## Symbols

| Notation | Meaning |
|----------|---------|
| `+------+` / `\| \|` | Container / screen frame |
| `[Button: Label]` | Primary or secondary action |
| `[Select: Value]` | Category or plan picker |
| `( )` / `(•)` | Unselected / selected radio |
| `[*]` | Icon button (Insights, refresh) |
| `←` | Back |
| `[S1]` … | Section markers |
| `[A1]` … | Annotations (explained under each screen) |
| `[IMG:w×h]` | Image or live iframe region |

## Breakpoints

- **mobile** — 390×844 phone frame (prototype surface)
- **desktop** — same phone content; case page chrome is separate (see `case-page-desktop.txt`)

## Primary flow FRs

| Screen | FRs |
|--------|-----|
| day0-goal | FR-011, FR-010 |
| day0-connect | FR-012 |
| hub | FR-004 |
| day1-needs-review | FR-013, FR-015 |
| day1-review-card | FR-014, FR-015 |
| day1-insights | FR-015, FR-007 |
| day6-charge | FR-016, FR-011 |
| case-page | FR-001–FR-010 |
| embed-states | FR-007, FR-008 |

## States covered

- Ready, loading, error for the case-page prototype embed
- Partial connect (2 of 3 healthy)
- Suggestions on / off (Insights)
- Empty groups → advance to next day
- Pre-written AI source (not an error)
