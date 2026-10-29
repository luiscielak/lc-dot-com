/** Facts only from the Oct 29, 2026 research canvas. Do not invent numbers or quotes. */

export const researchAsOf = '2026-10-29'

export const communityMethod = {
  store: 'Pulled the 500 most recent US App Store reviews from Apple’s public reviews feed on Oct 29, 2026 (dated Mar 24 to Oct 28, 2026) and coded them by keyword. One review can land in several themes.',
  counted: 'Keyword counts. Hand-read only the trial-charge group.',
  reddit: 'Opened threads in r/MonarchMoney, r/ynab, r/copilotmoney and r/personalfinance. Reddit’s data feed was blocked. Not counted.',
  x: 'Three searches of posts since Apr 1, 2026 on Monarch, onboarding, categorization and AI: 48 results with overlap, read by hand. Not counted.',
} as const

export const ratingSplit = {
  five: 272,
  four: 45,
  three: 39,
  two: 40,
  one: 104,
  lowStar: 183,
  total: 500,
} as const

export const communityThemes = [
  { theme: 'Price, trial and billing', low: 70, all: 102 },
  { theme: 'Sync and connections', low: 47, all: 77 },
  { theme: 'Support', low: 39, all: 50 },
  { theme: 'Categorization and rules', low: 21, all: 54 },
  { theme: 'Duplicates and accuracy', low: 16, all: 20 },
  { theme: 'AI', low: 15, all: 33 },
  { theme: 'Partner and household', low: 13, all: 60 },
  { theme: 'Setup and onboarding', low: 12, all: 53 },
  { theme: 'Mentions Mint', low: 8, all: 48 },
  { theme: 'Transfers and tags', low: 6, all: 14 },
] as const

export const communityNotes = {
  plusOfBilling: '14 of the 70 mention Plus or a paywall.',
  surpriseCharges:
    'On a hand read, 5 reviewers describe a charge they didn’t expect at the end of a trial (4 say they had already cancelled, 1 says there was no notice), and 3 more were confused about billing through Monarch on the web versus the App Store.',
  aprilPlus: 'April 2026, the month Plus launched, had the most 1 and 2 star reviews (29).',
  mint: '48 of the 500 most recent US App Store reviews mention Mint, 8 of them at 1 to 3 stars.',
} as const

export const competitors = [
  {
    app: 'Copilot Money',
    price: '$109/yr (limited-time, normally $119) or $18/mo',
    trial: '1 month',
    card: 'Yes; converts automatically (terms of service)',
    firstRun: 'Demo mode with sample data; first budget from real spending; paywall timeline',
    ai: 'Money assistant flags fixes and never acts without approval; iPhone only',
    partners: 'Up to 3 people free; same page also says “Invite your partner: coming this fall”',
    knownFor: 'Design; 4.8 stars from 31K App Store ratings',
    complaint: 'No Android; assistant is iPhone only',
  },
  {
    app: 'YNAB',
    price: '$109/yr or $14.99/mo',
    trial: '34 days, reminder a week before it ends',
    card: 'No, when you sign up direct',
    firstRun: 'Setup checklist at your own pace; free live workshops',
    ai: 'No AI. Defaults from payee history; a default changes only when 2 of your last 3 agree',
    partners: 'Share with up to 6 people',
    knownFor: 'Long, no-card trial; a teaching method',
    complaint: 'Steep learning curve and daily upkeep (NerdWallet)',
  },
  {
    app: 'Rocket Money',
    price: 'Free tier; Premium typically $7–$14/mo; Premium+ $15/mo',
    trial: '7-day Premium trial (from earlier research, not rechecked)',
    card: 'Not confirmed',
    firstRun: 'Goal questions first, then link banks; subscription detection',
    ai: 'Rowan by text on Premium+; rules, tags and custom categories are Premium only',
    partners: 'A second login on Premium',
    knownFor: 'Free tier, subscription cancelling, 10M+ members',
    complaint: 'Rules and tags behind Premium; pricing article still shows a “[CUTOVER DATE]” placeholder',
  },
  {
    app: 'Quicken Simplifi',
    price: '$3.99/mo billed annually (shown as a discount from $6.99); annual only',
    trial: 'None; 30-day money-back guarantee instead',
    card: 'Paid at signup (inferred, since there’s no trial)',
    firstRun: 'Short questionnaire; confirm suggested bills and income',
    ai: 'Quicken AI chat proposes changes in batches of up to 50, with approval',
    partners: 'One other person',
    knownFor: 'Low annual price; spending plan',
    complaint: 'No trial; annual billing only',
  },
  {
    app: 'Origin',
    price: '$99/yr; $1 for the first year for new members right now',
    trial: '7 days normally; paused during the $1 offer',
    card: 'Not confirmed',
    firstRun: 'An AI financial advisor at the center',
    ai: 'Advisor rebuilt to be proactive and daily, because chat assumes people know what to ask (CEO on X, Sep 9, 2026)',
    partners: 'Couples product with partner invites',
    knownFor: 'Advisor, investing and estate in one; $1 first year',
    complaint: 'In-app selling (one X user, Sep 10, 2026)',
  },
  {
    app: 'Empower Personal Dashboard',
    price: 'Free',
    trial: 'Not needed',
    card: 'No',
    firstRun: 'Net worth and investments first; one overall monthly target',
    ai: 'Auto-categorized with custom categories; no AI categorization found (not researched deeply)',
    partners: 'Not found',
    knownFor: 'Free investment and net worth tracking',
    complaint: 'Connection reliability and a weaker mobile app (NerdWallet); 3.2 on Google Play (Forbes)',
  },
  {
    app: 'Lunch Money',
    price: '$10/mo or $100/yr; set your own annual price; price locked for life',
    trial: '30 days',
    card: 'No',
    firstRun: 'Map imported categories in bulk, then let rules run',
    ai: 'Learns from past categorizations and suggests rules; AI through Zapier or its API',
    partners: 'Unlimited collaborators; only the admin pays',
    knownFor: 'Price lock, rules engine, open API',
    complaint: 'No built-in AI categorization',
  },
  {
    app: 'Tiller',
    price: '$99/yr',
    trial: '30 days',
    card: 'Yes, charged when the trial ends',
    firstRun: 'Spreadsheet templates in Google Sheets or Excel',
    ai: 'AutoCat rules plus an AI Suggest option',
    partners: 'Secondary users',
    knownFor: 'Full spreadsheet control',
    complaint: 'You need to be comfortable in spreadsheets',
  },
] as const

export const monarchReference = {
  app: 'Monarch (for reference)',
  price: 'Core $99.99/yr or $14.99/mo; Plus $199.99/yr',
  trial: '7 days',
  card: 'Yes',
} as const

export const pricingFinding = {
  checked: 'Checked Oct 29, 2026. The current price is clear on monarch.com/pricing and the App Store, but older announcements, help articles and the pricing page itself disagree on the Plus price, the cancel deadline, the guarantee and the referral trial.',
  rows: [
    {
      topic: 'Current prices (baseline)',
      says: 'Core $99.99/yr ($8.33/mo) or $14.99/mo; Plus $199.99/yr, annual only; free 7-day trial, payment method required',
      href: 'https://www.monarch.com/pricing',
      source: 'monarch.com/pricing',
    },
    {
      topic: 'Same prices in the app stores',
      says: 'In-app purchases list Core $99.99/yr and $14.99/mo, Plus $199.99/yr; the listing says only “free to try for 7 days”',
      href: 'https://apps.apple.com/us/app/monarch-budget-track-money/id1459319842',
      source: 'App Store listing',
    },
    {
      topic: 'Plus at launch: $299',
      says: 'Press release: Plus is $299 a year for new members; existing members get $100 off year one',
      href: 'https://www.prnewswire.com/news-releases/monarch-launches-premium-tier-monarch-plus-302748653.html',
      source: 'PR Newswire',
    },
    {
      topic: 'Plus at launch: $299',
      says: 'CEO’s launch post (Apr 20, 2026): Plus will be priced at $299 per year',
      href: 'https://www.reddit.com/r/MonarchMoney/comments/1sqvyve/announcing_monarch_plus/',
      source: 'r/MonarchMoney, Apr 20, 2026',
    },
    {
      topic: 'Plus cut to $199',
      says: 'CEO update (Apr 23, 2026): Plus is now $199 a year; existing members pay $149 in year one, then $199',
      href: 'https://www.reddit.com/r/MonarchMoney/comments/1stvnik/updates_on_monarch_plus/',
      source: 'r/MonarchMoney, Apr 23, 2026',
    },
    {
      topic: 'Plus: $199 vs $199.99',
      says: 'Launch blog post, dated Apr 20, 2026, now reads “$199 per year”; the pricing page and App Store say $199.99',
      href: 'https://www.monarch.com/blog/monarch-plus',
      source: 'monarch.com/blog/monarch-plus',
    },
    {
      topic: 'Plus price in help',
      says: 'Plus help article states no price: “Visit our pricing page”',
      href: 'https://help.monarch.com/hc/en-us/articles/48349699981972-Monarch-Plus-Tier',
      source: 'Help: Monarch Plus Tier',
    },
    {
      topic: 'Cancel deadline',
      says: 'Pricing page: “Cancel in settings before trial ends.” FAQ: cancel at least 24 hours before the trial ends to avoid billing',
      href: 'https://help.monarch.com/hc/en-us/articles/19985735202068-Monarch-FAQs',
      source: 'Help: Monarch FAQs',
    },
    {
      topic: 'Money-back guarantee',
      says: 'Pricing page: “no-questions-asked money-back guarantee.” Help article: refunds the remaining time only, excludes App Store subscriptions, contingent on appropriate use',
      href: 'https://help.monarch.com/hc/en-us/articles/30368325619732-Monarch-s-Money-back-Guarantee',
      source: 'Help: Money-back Guarantee',
    },
    {
      topic: 'Referral trial',
      says: 'Older Monarch blog post: people you refer get a 30-day trial. Current Referral Rewards help (updated Oct 23, 2026): 50% off year one of annual Core, no longer trial days',
      href: 'https://www.monarch.com/blog/rollovers-and-referral-rewards',
      source: 'Blog: rollovers and referral rewards',
    },
    {
      topic: 'Discount eligibility',
      says: 'WELCOME and referral discounts apply only to annual Core billed on the web, not monthly, Plus or App Store plans; the pricing banner names only “new users”',
      href: 'https://help.monarch.com/hc/en-us/articles/360048883891-Discounts-and-Promotions',
      source: 'Help: Discounts and Promotions',
    },
  ],
} as const

export const jtbd = [
  {
    when: 'I’ve just connected every account in a 7-day trial',
    want: 'see a month I trust within a day',
    so: 'decide if it’s worth paying for before the charge',
  },
  {
    when: 'a transaction lands in the wrong category',
    want: 'fix it once and know it stays fixed',
    so: 'stop checking the app every day',
  },
  {
    when: 'money moves between our own accounts',
    want: 'keep it out of income and spending',
    so: 'trust the totals',
  },
  {
    when: 'my partner and I share money',
    want: 'give them a small, clear part',
    so: 'not carry it all alone',
  },
  {
    when: 'the trial is about to end',
    want: 'know the amount, the date, who bills me and how to cancel',
    so: 'decide calmly instead of feeling tricked',
  },
  {
    when: 'AI changes my data',
    want: 'see what it looked at, what it changed and how to undo it',
    so: 'let it do more over time',
  },
] as const

export const archetypes = [
  {
    name: 'The household CFO',
    who: 'One partner runs the money for two, often coming from Mint or YNAB.',
    wants: 'Accurate categories, transfers handled, rules that stick, and a partner who takes part without nagging.',
    loses: 'Fixes don’t stick or rule order can’t be seen.',
    evidence: 'PursuitOfAppiness and PricacyTraveler reviews; the r/ynab post; Luis’s own household.',
  },
  {
    name: 'The trial skeptic',
    who: 'Comparing apps, wary of subscriptions, deciding within days.',
    wants: 'To see real value fast, with a clear way out.',
    loses: 'The paywall feels like a trick, there’s no reminder, or a charge follows a cancel.',
    evidence: 'heyjaywilson and queenepeachie reviews; 70 low-star price and billing reviews.',
  },
  {
    name: 'The agent-native tinkerer',
    who: 'Already points ChatGPT, Claude or their own scripts at their money.',
    wants: 'Let an agent do setup, then review a few corrections; reliable data and an API.',
    loses: 'Connections or the API break, or AI is forced into every surface.',
    evidence: '@lambda_thoughts, @SergioTapiaDev and @tylersbryden on X; Luis’s Finley on Monarch’s MCP.',
  },
] as const

export const proposedMetrics = [
  {
    stage: 'Trial start to activation',
    metric: 'Activation by Day 5',
    definition:
      'Share of trial starts with 2+ accounts syncing cleanly, the current month reviewed, and one budget or goal set (definition to agree with the team)',
  },
  {
    stage: 'Day 1',
    metric: 'Quick Sort completion',
    definition: 'Share of trial starts that finish Quick Sort within 24 hours of first sync',
  },
  {
    stage: 'End of week 1',
    metric: '% uncategorized after week 1',
    definition: 'Share of current-month transactions still uncategorized or flagged for review on Day 7',
  },
  {
    stage: 'Week 1 to 3',
    metric: 'Fixes that stick',
    definition: 'Share of AI or rule-applied categories the member changes again within 14 days',
  },
  {
    stage: 'Trial end',
    metric: 'Trial-to-paid',
    definition: 'Paid within 3 days of trial end; annual vs monthly mix',
  },
  {
    stage: 'First month paid',
    metric: 'Refund requests',
    definition: 'Refund requests and billing tickets within 30 days of the first charge',
  },
  {
    stage: 'Household',
    metric: 'Partner invites',
    definition: 'Invites sent in week 1, accepted, and partner active in week 2',
  },
  {
    stage: 'Retention',
    metric: 'Week 4 active households',
    definition: 'Households opening Monarch in week 4',
  },
] as const

export const experiments = [
  {
    name: 'Test 1: Trial timeline that says who bills you',
    hypothesis:
      'If the paywall and Day 6 show the charge date, amount, who bills you (Monarch or Apple) and exactly where to cancel, fewer people feel tricked, and conversion holds.',
    variant:
      'Control: today’s paywall. Variant: a timeline card, a “remind me 2 days before” option, and a direct path to the right cancel screen.',
    primary: 'Refund requests and billing tickets per 100 trial starts within 30 days of the first charge.',
    guardrail: 'Trial-to-paid rate.',
    why: '70 of 183 low-star reviews are about price, trial or billing.',
  },
  {
    name: 'Test 2: Quick Sort right after first sync',
    hypothesis:
      'Offering Quick Sort while motivation is highest gets more people to a clean month than waiting for a Day 1 nudge.',
    variant: 'Control: a Day 1 morning prompt. Variant: offered on the sync-complete screen, with “later” always available.',
    primary: 'Quick Sort completion within 48 hours.',
    guardrail: 'Day 0 drop-off before the first account connects; Day 2 return rate.',
    why: null,
  },
  {
    name: 'Test 3: Transfers first',
    hypothesis:
      'Sorting transfers and card payments before merchants removes the biggest cause of wrong totals, so fewer categories need fixing later.',
    variant: 'Control: biggest merchant groups first. Variant: transfers and card payments first, with a one-line why for each.',
    primary: '% of current-month transactions uncategorized or re-edited by Day 7.',
    guardrail: 'Time to finish Quick Sort; undo rate.',
    why: null,
  },
  {
    name: 'Test 4: Give the partner a job',
    hypothesis:
      'A small task (review 3 transactions the AI wasn’t sure about) gets more partners active than a plain invite.',
    variant:
      'Control: invite from settings. Variant: “Ask your partner” on unsure Quick Sort cards, with an invite that lands on those cards.',
    primary: 'Partner active in week 2, per household that sent an invite.',
    guardrail: 'Invite-related support tickets; privacy complaints; the inviter’s own Quick Sort completion.',
    why: null,
  },
] as const

export const quotes = [
  {
    text: 'Seven days is barely enough to finish setting everything up, much less evaluate whether the product actually works for you.',
    cite: 'PursuitOfAppiness, App Store, 2 stars, Sep 5, 2026',
  },
  {
    text: 'I thought the start trial was going to open the Apple subscription flow which was very misleading when it didn’t.',
    cite: 'heyjaywilson, App Store, 3 stars, Jun 29, 2026',
  },
  {
    text: 'I canceled within the trial period and they continue to try to charge me for an entire year.',
    cite: 'queenepeachie, App Store, 1 star, Sep 20, 2026',
  },
  {
    text: 'After a month, she’s way more involved in daily budgeting/expense categorization.',
    cite: 'r/ynab, Reluctantly leaving YNAB for Monarch',
  },
] as const

export const insights = [
  {
    title: 'Trial trust comes first',
    body: 'Price, trial and billing is the biggest theme in low-star reviews (70 of 183), and 5 reviewers describe a charge they didn’t expect at the end of a trial. Day 0 and Day 6 show the charge date, the amount, who bills you, and exactly where to cancel.',
  },
  {
    title: 'Transfers go first in Quick Sort',
    body: 'Former Mint users miss automatic transfer handling, and ChatGPT’s own help page names transfers and card payments counted as spending as a cause of wrong totals. The transfer step moves ahead of merchant groups.',
  },
  {
    title: 'Show which rule wins',
    body: 'Reviewers say rule order is invisible, rules can’t be reordered, and fixes don’t stick. The rule preview shows which rule runs first and any conflict, and Day 7 shows what stuck.',
  },
  {
    title: 'Give the household member a job',
    body: 'Invites fail or confuse people, but a partner with transactions to review got “way more involved” (r/ynab). Unsure cards can be marked Needs review by a household member.',
  },
  {
    title: 'Be guided, not chatty',
    body: 'ChatGPT Finances is free, people already ask general AI to set up Monarch, and Origin’s CEO says chat fails because people don’t know what to ask. Quick Sort stays a guided pass with a plain Edit path beside it.',
  },
] as const
