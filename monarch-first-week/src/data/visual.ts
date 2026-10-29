export const categoryVisual: Record<string, { emoji: string; tone: string }> = {
  'Restaurants & coffee': { emoji: '☕', tone: 'pink' },
  Groceries: { emoji: '🍏', tone: 'lime' },
  'Groceries & coffee': { emoji: '🍏', tone: 'lime' },
  'Auto & transport': { emoji: '⛽', tone: 'orange' },
  Housing: { emoji: '🏠', tone: 'yellow' },
  Utilities: { emoji: '💡', tone: 'cyan' },
  Shopping: { emoji: '🛍️', tone: 'purple' },
  Health: { emoji: '💊', tone: 'teal' },
  Entertainment: { emoji: '🎬', tone: 'indigo' },
  Income: { emoji: '💵', tone: 'lime' },
  Transfer: { emoji: '🔄', tone: 'cyan' },
  Uncategorized: { emoji: '•', tone: 'brown' },
  'Tax-related': { emoji: '🏷️', tone: 'brown' },
}

export const institutions: Record<
  string,
  { initials: string; tone: string }
> = {
  'Northfield Bank': { initials: 'NB', tone: 'teal' },
  'Harbor Card': { initials: 'HC', tone: 'orange' },
  'Ridge Credit Union': { initials: 'RC', tone: 'indigo' },
}

export const household = {
  owner: { id: 'luis', first: 'Luis', initials: 'L', tone: 'brown', role: 'Owner' },
  members: [
    { id: 'luis', first: 'Luis', initials: 'L', tone: 'brown', role: 'Owner', shared: false },
    { id: 'maya', first: 'Maya', initials: 'M', tone: 'orange', role: 'Member', shared: true },
  ],
}

export function categoryEmoji(name: string): string {
  return categoryVisual[name]?.emoji ?? '•'
}

export function categoryTone(name: string): string {
  return categoryVisual[name]?.tone ?? 'brown'
}
