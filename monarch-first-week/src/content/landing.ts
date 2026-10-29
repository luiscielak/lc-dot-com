/**
 * All landing-page copy lives here so Luis can edit without hunting through components.
 * Facts-only in Hello. Anything else is marked [Luis to write] or [draft].
 * Do not invent metrics.
 */
export const landing = {
  meta: {
    title: 'Luis Cielak x Monarch',
    description:
      'Unofficial concept for a new member’s first week. Designed by Luis Cielak. Not affiliated with Monarch Money.',
    robots: 'noindex, nofollow',
  },
  nav: [
    { label: 'Hello', href: '/#hello' },
    { label: 'The case', href: '/case' },
    { label: 'Prototype', href: '/prototype' },
    { label: 'Contact', href: '/#contact' },
  ],
  hero: {
    eyebrow: 'Unofficial concept',
    title: 'Luis Cielak x Monarch',
    pitchLead: 'A first week that',
    pitchEm: 'feels like home.',
    pitchRest: 'From someone who already uses Monarch with a household.',
    cta: { label: 'Try the prototype', to: '/prototype' },
    secondary: { label: 'Read the case', to: '/case' },
  },
  hello: {
    id: 'hello',
    kicker: 'Hello',
    title: 'A designer who already lives in the product.',
    paragraphs: [
      {
        text: 'Senior product designer. 15+ years. Philadelphia.',
      },
      {
        text: 'Builds with AI agents. Runs a role-based team on Nous Research’s Hermes Agent. Founded Cursor Philly in August 2025 — 1,000+ builders.',
      },
      {
        text: 'He and his wife use Monarch together. He built Finley, a finance agent, on Monarch’s MCP.',
      },
      {
        text: 'How he works with PMs, researchers, and new-member teams.',
        mark: 'Luis to write',
      },
    ],
  },
  why: {
    id: 'why',
    kicker: 'Why Monarch / why Growth',
    title: 'The week after connect is when it becomes home.',
    mark: 'draft',
    paragraphs: [
      {
        text: 'Growth here is the first week: messy merchants, a stale institution, a card payment counted twice, a household member not in yet.',
        mark: 'draft',
      },
      {
        text: 'AI as a working partner — not a black box. A designer who already uses Monarch can feel when a first week is honest.',
        mark: 'draft',
      },
      {
        text: 'Why this team, this season, this problem.',
        mark: 'Luis to write',
      },
    ],
  },
  study: {
    id: 'case',
    kicker: 'Case study',
    title: 'Your First Week',
    lede: 'Seven days after signup. Quick Sort that only moves when the member says so.',
    teaser:
      'Public research from Oct 29, 2026 — 500 App Store reviews, eight competitors, and a pricing inconsistency across Monarch’s own pages — then a phone prototype. No invented outcomes.',
    sections: [
      {
        id: 'problem',
        title: 'Problem',
        mark: 'draft',
        paragraphs: [
          'Three accounts can still start the month wrong: an institution behind, transfers booked as spend, coffee filed as shopping.',
          'If the first job is a spreadsheet of rows, they bounce. If it is a group they can mark as reviewed, they stay.',
        ],
      },
      {
        id: 'research',
        title: 'Research highlights',
        mark: 'draft',
        paragraphs: [
          'No interviews or funnel numbers are claimed. Prompts only: drop-off after connect, time-to-first-reviewed-group, card autopay as spend, how households split the week, when members want AI off.',
          'Luis’s household use and Finley-on-MCP notes sit beside research, labeled as lived use.',
        ],
      },
      {
        id: 'concept',
        title: 'Concept',
        mark: 'draft',
        paragraphs: [
          'One short task a day. Day 0 is a goal and connection status. Day 1 is Needs review: groups, not rows. Day 2 is Flex Budgeting vs Category Budgeting. Day 4 is Weekly Recap. Day 6 is the plan, in plain language.',
          'AI drafts. The member marks as reviewed, edits, skips, splits, or flags a transfer. A rule is optional.',
        ],
      },
      {
        id: 'screens',
        title: 'Key screens',
        mark: 'draft',
        paragraphs: ['The live prototype is the artifact.'],
        screens: [
          { label: 'Day 0 · What do you want first?', to: '/prototype' },
          { label: 'Day 0 · Connect your accounts', to: '/prototype/connect' },
          { label: 'Hub · Your first week', to: '/prototype/week' },
          { label: 'Day 1 · Needs review', to: '/prototype/day/1' },
          { label: 'Day 1 · Review card', to: '/prototype/day/1/sort' },
          { label: 'Day 1 · Transfer', to: '/prototype/day/1/sort?group=g-harbor-autopay' },
          { label: 'Day 1 · Insights', to: '/prototype/day/1/sort?sheet=ai' },
          { label: 'Day 2 · Flex Budgeting', to: '/prototype/day/2' },
          { label: 'Day 4 · Weekly Recap', to: '/prototype/day/4' },
          { label: 'Day 6 · Your first week is on us', to: '/prototype/day/6' },
        ],
      },
      {
        id: 'ai',
        title: 'How the AI works safely',
        mark: 'draft',
        paragraphs: [
          'Tap the sparkle. Sent: description, amount, date, application, account kind. Never sent: name, account numbers, balances, login tokens. No free-text box.',
          'Each answer is Live, Cached, or Pre-written. Local mock AI uses a committed fallback. A later Pages Function can call Workers AI with a hash cache, a daily cap, a per-IP limit, and an 8-second timeout.',
          'Suggestions can turn off. Accepted work stays.',
        ],
      },
    ],
  },
  cta: {
    id: 'try',
    kicker: 'Try it',
    title: 'Walk the first week on a phone.',
    body: 'Mock household. Mock institutions. Prices as of October 29, 2026. Seven days, no account required.',
    label: 'Open the prototype',
    to: '/prototype',
  },
  contact: {
    id: 'contact',
    kicker: 'Contact',
    title: 'Luis Cielak',
    links: [
      { label: 'Portfolio', href: 'https://luiscielak.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cielak' },
      { label: 'luis@luiscielak.com', href: 'mailto:luis@luiscielak.com' },
    ],
  },
  footer: {
    note: 'Unofficial concept by Luis Cielak. Not affiliated with Monarch.',
    aside: 'No Monarch logo, screenshots, or assets. Pricing from monarch.com/pricing as of 2026-10-29.',
  },
} as const
