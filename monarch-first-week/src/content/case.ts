/**
 * Story copy for /case. Facts from the Oct 29, 2026 research canvas only.
 */
export const caseStudy = {
  kicker: 'Case study',
  title: 'Your First Week',
  subtitle: 'Seven days. A card required. A household that has to trust a month before the charge.',
  unofficialNote:
    'Unofficial concept by Luis Cielak. Not affiliated with or endorsed by Monarch Money, Inc. Synthetic household only.',
  company: 'Unofficial concept for Monarch',
  role: 'Product design',
  platforms: 'Phone-sized web prototype',
  moment: {
    kicker: 'The moment',
    headline: 'A household opens Monarch with seven days on the clock.',
    body: 'Payment method required. Cancel at least 24 hours before the trial ends, or the card is billed. Setup lives in a help article, not in the product.',
  },
  tension: {
    kicker: 'The tension',
    headline: 'Week one breaks on the bill, the sync, and the categories.',
    body: 'Luis uses Monarch with a household. Miscategorizations, sync gaps, transfers counted as spend, a billing surprise. The public record says the same.',
    method: '500 most recent US App Store reviews, coded Oct 29, 2026. Counts are signals, not rates.',
    problems: [
      { title: 'Billing surprise', body: 'A card on file, a seven-day clock, and reviews that say the charge still landed.' },
      { title: 'Sync gaps', body: 'One view says transactions are updated. Another says the account is disconnected.' },
      { title: 'Miscategorizations', body: 'Coffee filed as shopping. Rules that do not stick, and no way to see which rule won.' },
      { title: 'Transfers and tags', body: 'Card payments counted as spend. Categories, tags, and transfers confused for each other.' },
    ],
    stats: [
      { value: '500', label: 'reviews coded' },
      { value: '183', label: 'rated 1–3 stars' },
      { value: '70', label: 'billing, of those 183' },
      { value: '47', label: 'sync, of those 183' },
    ],
  },
  quotes: [
    {
      text: 'Seven days is barely enough to finish setting everything up, much less evaluate whether the product actually works for you.',
      cite: 'PursuitOfAppiness, App Store, 2 stars, Sep 5, 2026',
    },
    {
      text: 'I canceled within the trial period and they continue to try to charge me for an entire year.',
      cite: 'queenepeachie, App Store, 1 star, Sep 20, 2026',
    },
  ],
  insight: {
    kicker: 'The insight',
    headline: 'If the trial is the product, make the week complete.',
  },
  field: {
    kicker: 'The field',
    headline: 'Everyone else gives the first month more room.',
    fit: 'Monarch’s 7 days is the shortest paid trial in this set. First Week is the design answer if the length stays.',
    axes: {
      xLeft: 'No card / free',
      xRight: 'Card required',
      yTop: 'Month +',
      yBottom: 'Week −',
    },
    cells: {
      longFree: [
        { app: 'YNAB', take: '34 days, no card' },
        { app: 'Lunch Money', take: '30 days, no card' },
      ],
      longCard: [
        { app: 'Copilot', take: '1 month, card on file' },
        { app: 'Tiller', take: '30 days, card on file' },
      ],
      shortFree: [
        { app: 'Empower', take: 'Free. No trial needed.' },
        { app: 'Simplifi', take: 'No trial. Paid at signup.' },
      ],
      shortCard: [
        { app: 'Monarch', take: '7 days, card required' },
        { app: 'Origin', take: '7 days' },
      ],
    },
    aside: 'Rocket Money: 7-day Premium trial (from earlier research, not rechecked). Card not confirmed.',
  },
  pricing: {
    kicker: 'The price',
    headline: 'The price story disagrees with itself.',
    body: 'Checked Oct 29, 2026. Today’s Core and Plus are clear on the pricing page and the App Store. Plus, cancel, and the guarantee are not.',
    steps: [
      { when: 'Apr 20, 2026', price: '$299', note: 'Launch post and press', fn: '1' },
      { when: 'Apr 23, 2026', price: '$199', note: 'CEO update', fn: '2' },
      { when: 'Oct 29, 2026', price: '$199.99', note: 'Pricing page and App Store', fn: '3' },
    ],
    chips: [
      { label: 'Cancel', text: '“Before trial ends” vs 24 hours before', fn: '4' },
      { label: 'Guarantee', text: '“No-questions-asked” vs remaining time only', fn: '5' },
      { label: 'Referral', text: '30-day trial vs 50% off year one', fn: '6' },
    ],
    footnotes: [
      {
        n: '1',
        text: 'Plus at $299/yr for new members. PR Newswire and the CEO’s Apr 20, 2026 launch post.',
        href: 'https://www.prnewswire.com/news-releases/monarch-launches-premium-tier-monarch-plus-302748653.html',
        source: 'PR Newswire',
      },
      {
        n: '2',
        text: 'CEO update Apr 23, 2026: Plus is now $199 a year.',
        href: 'https://www.reddit.com/r/MonarchMoney/comments/1stvnik/updates_on_monarch_plus/',
        source: 'r/MonarchMoney, Apr 23, 2026',
      },
      {
        n: '3',
        text: 'Core $99.99/yr or $14.99/mo; Plus $199.99/yr. monarch.com/pricing and the App Store, Oct 29, 2026.',
        href: 'https://www.monarch.com/pricing',
        source: 'monarch.com/pricing',
      },
      {
        n: '4',
        text: 'Pricing page: “Cancel in settings before trial ends.” FAQ: cancel at least 24 hours before.',
        href: 'https://help.monarch.com/hc/en-us/articles/19985735202068-Monarch-FAQs',
        source: 'Help: Monarch FAQs',
      },
      {
        n: '5',
        text: 'Pricing page: “no-questions-asked money-back guarantee.” Help: remaining time only, excludes App Store.',
        href: 'https://help.monarch.com/hc/en-us/articles/30368325619732-Monarch-s-Money-back-Guarantee',
        source: 'Help: Money-back Guarantee',
      },
      {
        n: '6',
        text: 'Older blog: referred people get a 30-day trial. Referral Rewards help (updated Oct 23, 2026): 50% off year one of annual Core.',
        href: 'https://www.monarch.com/blog/rollovers-and-referral-rewards',
        source: 'Blog: rollovers and referral rewards',
      },
    ],
  },
  bet: {
    kicker: 'The bet',
    headline: 'First Week + Quick Sort.',
    body: 'One job a day. AI drafts. The member marks as reviewed, edits, or skips. A rule runs only when they say so.',
  },
  walk: {
    kicker: 'The week',
    headline: 'One screen a day. One job.',
  },
  beats: [
    {
      day: 'Day 0',
      headline: 'Say the charge before they connect.',
      line: 'Goal, then the facts: amount, date, who bills you, where to cancel, 24 hours before.',
      src: '/figures/day0.png',
      alt: 'Day 0. Goal choices and a trial card that states the charge date, amount, and cancel-by time.',
      caption: 'Day 0. Your first week is on us.',
    },
    {
      day: 'Day 1',
      headline: 'Review groups, not rows.',
      line: 'Connection status, then transfers, then merchants, then rules. Swipe to mark as reviewed, or skip.',
      src: '/figures/quicksort_review_card.png',
      alt: 'Day 1. A Needs review card for Daily Grind with a category chip and Mark as reviewed.',
      caption: 'Needs review. Merchant, count, date span, category chip.',
    },
    {
      day: 'Insights',
      headline: 'Show what the model saw.',
      line: 'Tap the sparkle. Sent and never sent. Edit stays beside it.',
      src: '/figures/ai_panel.png',
      alt: 'Insights sheet listing fields sent to the model and fields never sent.',
      caption: 'Insights. Two lists. Suggestions can turn off.',
    },
    {
      day: 'Day 4',
      headline: 'A recap both members can share.',
      line: 'Four numbers. A Shared ring. No paragraphs.',
      src: '/figures/weekly_recap.png',
      alt: 'Weekly Recap with four number tiles and household avatars.',
      caption: 'Weekly Recap. 2×2 tiles.',
    },
    {
      day: 'Day 6',
      headline: 'Show the week, then the bill.',
      line: 'What they built. Who charges them. Where to cancel.',
      src: '/figures/day6.png',
      alt: 'Day 6. A week checklist and the plan in plain language.',
      caption: 'Day 6. Checklist, then the plan.',
    },
  ],
  proof: {
    kicker: 'How we’d know',
    headline: 'We’d know it worked if fewer people felt tricked.',
    body: 'Proposed only. No public baseline. Split by web and App Store.',
    tests: [
      { name: 'Trial timeline', primary: 'Refunds and billing tickets / 100 trials' },
      { name: 'Quick Sort after sync', primary: 'Quick Sort done within 48 hours' },
      { name: 'Transfers first', primary: '% still uncategorized or re-edited by Day 7' },
      { name: 'A job for a member', primary: 'Partner active in week 2, per invite sent' },
    ],
  },
  reflection: {
    kicker: 'Reflection',
    headline: 'I already live this week.',
    body: 'A designer who uses Monarch with a household, and who already runs Finley on Monarch’s MCP, can feel when a first week is honest. This concept does not invent a conversion rate. It makes the trial week complete.',
  },
  placeholders: {
    household: 'How long you’ve used Monarch, and who does what day to day.',
    examples: 'One real example each: miscategorization, sync, categories vs tags vs transfers.',
    reflection: 'What a hiring manager should know first.',
  },
  heroPhones: [
    { src: '/figures/day0.png', alt: 'Day 0 phone. Goal and trial card.', caption: 'Day 0' },
    { src: '/figures/quicksort_review_card.png', alt: 'Day 1 phone. Needs review card.', caption: 'Day 1' },
    { src: '/figures/day6.png', alt: 'Day 6 phone. Week summary and plan.', caption: 'Day 6' },
  ],
} as const
