/** Designed household rules for the Quick Sort preview. Not live-bank output. */
export type HouseholdRule = {
  id: string
  whenContains: string
  setCategory: string
  specificity: number
  heldThisWeek: number
  neededRefix: number
  note: string
}

export const householdRules: HouseholdRule[] = [
  {
    id: 'rule-daily-grind',
    whenContains: 'daily grind',
    setCategory: 'Restaurants & coffee',
    specificity: 2,
    heldThisWeek: 14,
    neededRefix: 0,
    note: 'More specific than “grind”. Wins on Daily Grind rows.',
  },
  {
    id: 'rule-grind',
    whenContains: 'grind',
    setCategory: 'Shopping',
    specificity: 1,
    heldThisWeek: 0,
    neededRefix: 1,
    note: 'Overlaps Daily Grind. Loses there; one coffee row came back as Shopping until the more specific rule was on.',
  },
  {
    id: 'rule-fresh-basket',
    whenContains: 'fresh basket',
    setCategory: 'Groceries',
    specificity: 1,
    heldThisWeek: 22,
    neededRefix: 0,
    note: 'Held on Fresh Basket for the week.',
  },
  {
    id: 'rule-harbor-autopay',
    whenContains: 'harbor card autopay',
    setCategory: 'Transfer',
    specificity: 2,
    heldThisWeek: 3,
    neededRefix: 0,
    note: 'Keeps the card payment from counting as spend.',
  },
  {
    id: 'rule-pine',
    whenContains: 'pine',
    setCategory: 'Shopping',
    specificity: 1,
    heldThisWeek: 0,
    neededRefix: 2,
    note: 'Overlaps Oak & Pine. Those tickets needed a second look.',
  },
  {
    id: 'rule-oak-pine',
    whenContains: 'oak & pine',
    setCategory: 'Restaurants & coffee',
    specificity: 2,
    heldThisWeek: 11,
    neededRefix: 2,
    note: 'Wins over “pine” on Oak & Pine. Two rows still came back mixed.',
  },
  {
    id: 'rule-fuel-stop',
    whenContains: 'fuel stop',
    setCategory: 'Auto & transport',
    specificity: 1,
    heldThisWeek: 12,
    neededRefix: 1,
    note: 'The pending/posted twin needed a re-fix.',
  },
]

export function winnerFor(raw: string): HouseholdRule | undefined {
  const hay = raw.toLowerCase()
  return householdRules
    .filter((rule) => hay.includes(rule.whenContains))
    .sort((a, b) => b.specificity - a.specificity)[0]
}

export function overlapsFor(whenContains: string): HouseholdRule[] {
  const needle = whenContains.toLowerCase()
  return householdRules.filter((rule) => {
    if (rule.whenContains === needle) return false
    return needle.includes(rule.whenContains) || rule.whenContains.includes(needle)
  })
}

export function conflictFlag(whenContains: string): { winner: HouseholdRule; losers: HouseholdRule[] } | null {
  const self =
    householdRules.find((rule) => rule.whenContains === whenContains) ??
    ({
      id: 'draft',
      whenContains,
      setCategory: '',
      specificity: whenContains.split(' ').length,
      heldThisWeek: 0,
      neededRefix: 0,
      note: 'Draft on this card.',
    } satisfies HouseholdRule)
  const others = overlapsFor(whenContains)
  if (others.length === 0) return null
  const pool = [self, ...others].sort((a, b) => b.specificity - a.specificity)
  return { winner: pool[0], losers: pool.slice(1) }
}
