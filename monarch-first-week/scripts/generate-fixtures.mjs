/**
 * Deterministic synthetic household for the First Week prototype.
 * Unnamed household. Made-up merchants and banks. No real people.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20261029)

function pick(list) {
  return list[Math.floor(rand() * list.length)]
}

function money(min, max) {
  return Math.round((min + rand() * (max - min)) * 100) / 100
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function isoDate(y, m, d) {
  return `${y}-${pad(m)}-${pad(d)}`
}

function weekday(iso) {
  return new Date(`${iso}T12:00:00-07:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'America/Los_Angeles',
  })
}

function daysInMonth(y, m) {
  return new Date(y, m, 0).getDate()
}

function eachDay(start, end) {
  const out = []
  const cur = new Date(`${start}T12:00:00Z`)
  const last = new Date(`${end}T12:00:00Z`)
  while (cur <= last) {
    out.push(cur.toISOString().slice(0, 10))
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
  return out
}

const accounts = [
  {
    id: 'acc-northfield',
    institution: 'Northfield Bank',
    name: 'Checking',
    mask: '•••• 4412',
    type: 'depository',
    status: 'healthy',
    lastSyncedAt: '2026-10-29T15:04:00-07:00',
    historyDays: 90,
    note: 'Updated a minute ago. All good.',
  },
  {
    id: 'acc-harbor',
    institution: 'Harbor Card',
    name: 'Credit card',
    mask: '•••• 8821',
    type: 'credit',
    status: 'stale',
    lastSyncedAt: '2026-10-26T09:12:00-07:00',
    missingTransactions: 14,
    note: 'Last updated 3 days ago. 14 transactions may be missing.',
  },
  {
    id: 'acc-ridge',
    institution: 'Ridge Credit Union',
    name: 'Joint checking',
    mask: '•••• 1109',
    type: 'depository',
    status: 'needs_reauth',
    lastSyncedAt: '2026-10-22T14:40:00-07:00',
    note: 'Your bank asked for a new security code. Syncing paused. Nothing is lost. Sign in once to resume.',
  },
]

const categories = [
  'Restaurants & coffee',
  'Groceries',
  'Auto & transport',
  'Housing',
  'Utilities',
  'Shopping',
  'Health',
  'Entertainment',
  'Income',
  'Transfer',
  'Uncategorized',
  'Tax-related',
]

const tags = [
  { id: 'tag-tax', label: 'tax-related' },
  { id: 'tag-trip', label: 'trip' },
  { id: 'tag-reimburse', label: 'reimbursable' },
]

let seq = 1
const transactions = []

function add(partial) {
  const id = `txn-${String(seq++).padStart(3, '0')}`
  const amount = partial.amount
  const date = partial.date
  transactions.push({
    id,
    accountId: partial.accountId,
    date,
    weekday: weekday(date),
    amount,
    rawDescription: partial.rawDescription,
    merchant: partial.merchant,
    category: partial.category,
    suggestedCategory: partial.suggestedCategory ?? partial.category,
    status: partial.status ?? 'posted',
    isTransfer: Boolean(partial.isTransfer),
    isRefund: Boolean(partial.isRefund),
    tags: partial.tags ?? [],
    seedMess: partial.seedMess ?? null,
    pendingTwinId: partial.pendingTwinId ?? null,
  })
  return id
}

const dailyGrindRaws = [
  'SQ *DAILYGRIND0423',
  'DAILY GRIND COFFEE',
  'DAILY GRIND #12',
  'TST* DAILY GRIND',
  'DAILYGRIND DOWNTOWN',
  'SQ *DAILY GRIND CA',
  'POS DAILY GRIND 0423',
]

const freshBasketRaws = [
  'TST* FRESH BASKET',
  'FRESH BASKET #08',
  'FRESHBASKET MKTP',
  'FRESH BASKET GROCERY',
  'SQ *FRESH BASKET',
  'FRESH BASKET 1028',
]

const fuelRaws = [
  'FUEL STOP #441',
  'FUELSTOP 441 ANYTOWN',
  'POS FUEL STOP',
  'FUEL STOP PUMP 3',
]

function weekdayish(iso) {
  const d = new Date(`${iso}T12:00:00Z`).getUTCDay()
  return d >= 1 && d <= 5
}

const octoberDays = eachDay('2026-10-01', '2026-10-28')
const septemberDays = eachDay('2026-09-01', '2026-09-30')
const augustDays = eachDay('2026-08-01', '2026-08-31')

function takeWeekdays(days, n) {
  const weekdays = days.filter(weekdayish)
  const chosen = []
  let i = 0
  while (chosen.length < n && i < weekdays.length * 3) {
    const day = weekdays[i % weekdays.length]
    if (!chosen.includes(day) || i > weekdays.length) {
      if (!chosen.includes(day)) chosen.push(day)
    }
    i += 1
  }
  return chosen.slice(0, n)
}

// Daily Grind — 14 in October (wireframe group), plus earlier months
for (const date of takeWeekdays(octoberDays, 14)) {
  add({
    accountId: 'acc-harbor',
    date,
    amount: -money(4.85, 7.6),
    rawDescription: pick(dailyGrindRaws),
    merchant: 'Daily Grind',
    category: 'Shopping',
    suggestedCategory: 'Restaurants & coffee',
    seedMess: 'miscategorized-as-shopping',
  })
}
for (const date of takeWeekdays(septemberDays, 12)) {
  add({
    accountId: 'acc-harbor',
    date,
    amount: -money(4.85, 7.6),
    rawDescription: pick(dailyGrindRaws),
    merchant: 'Daily Grind',
    category: 'Shopping',
    suggestedCategory: 'Restaurants & coffee',
    seedMess: 'miscategorized-as-shopping',
  })
}
for (const date of takeWeekdays(augustDays, 10)) {
  add({
    accountId: 'acc-harbor',
    date,
    amount: -money(4.85, 7.6),
    rawDescription: pick(dailyGrindRaws),
    merchant: 'Daily Grind',
    category: 'Uncategorized',
    suggestedCategory: 'Restaurants & coffee',
    seedMess: 'messy-raw-merchant',
  })
}

// Fresh Basket — 22 across recent weeks so the 3-month / month group can hit 22
const freshDates = [
  ...takeWeekdays(octoberDays, 10),
  ...takeWeekdays(septemberDays, 7),
  ...takeWeekdays(augustDays, 5),
]
for (const date of freshDates) {
  add({
    accountId: 'acc-harbor',
    date,
    amount: -money(18.4, 86.2),
    rawDescription: pick(freshBasketRaws),
    merchant: 'Fresh Basket',
    category: date.startsWith('2026-08') ? 'Uncategorized' : 'Groceries',
    suggestedCategory: 'Groceries',
    seedMess: date.startsWith('2026-08') ? 'messy-raw-merchant' : null,
  })
}

// Fuel Stop, including a pending/posted duplicate pair
const fuelDates = ['2026-10-27', '2026-10-20', '2026-10-12', '2026-10-05', '2026-09-28', '2026-09-21', '2026-09-14', '2026-09-07', '2026-08-31', '2026-08-24', '2026-08-17', '2026-08-10']
for (const date of fuelDates) {
  add({
    accountId: 'acc-harbor',
    date,
    amount: -money(38.2, 64.5),
    rawDescription: pick(fuelRaws),
    merchant: 'Fuel Stop',
    category: 'Auto & transport',
    suggestedCategory: 'Auto & transport',
  })
}
const pendingId = add({
  accountId: 'acc-harbor',
  date: '2026-10-28',
  amount: -52.4,
  rawDescription: 'FUEL STOP #441',
  merchant: 'Fuel Stop',
  category: 'Uncategorized',
  suggestedCategory: 'Auto & transport',
  status: 'pending',
  seedMess: 'duplicate-pending-posted',
})
add({
  accountId: 'acc-harbor',
  date: '2026-10-28',
  amount: -52.4,
  rawDescription: 'FUEL STOP #441 ANYTOWN',
  merchant: 'Fuel Stop',
  category: 'Auto & transport',
  suggestedCategory: 'Auto & transport',
  status: 'posted',
  seedMess: 'duplicate-pending-posted',
  pendingTwinId: pendingId,
})

// Harbor Card autopay counted as spending (should be a transfer)
for (const date of ['2026-08-03', '2026-09-03', '2026-10-03']) {
  add({
    accountId: 'acc-northfield',
    date,
    amount: -1240,
    rawDescription: 'HARBOR CARD AUTOPAY',
    merchant: 'Harbor Card Autopay',
    category: 'Shopping',
    suggestedCategory: 'Transfer',
    isTransfer: true,
    seedMess: 'card-autopay-counted-as-spending',
  })
  add({
    accountId: 'acc-harbor',
    date,
    amount: 1240,
    rawDescription: 'AUTOPAY THANK YOU',
    merchant: 'Harbor Card Autopay',
    category: 'Income',
    suggestedCategory: 'Transfer',
    isTransfer: true,
    seedMess: 'card-autopay-counted-as-spending',
  })
}

// Internal transfers counted as spending
for (const date of ['2026-08-15', '2026-09-15', '2026-10-15']) {
  add({
    accountId: 'acc-northfield',
    date,
    amount: -400,
    rawDescription: 'ONLINE TRANSFER TO RIDGE CU ****1109',
    merchant: 'Transfer to Ridge',
    category: 'Shopping',
    suggestedCategory: 'Transfer',
    isTransfer: true,
    seedMess: 'account-transfer-counted-as-spending',
  })
  add({
    accountId: 'acc-ridge',
    date,
    amount: 400,
    rawDescription: 'TRANSFER FROM NORTHFIELD ****4412',
    merchant: 'Transfer from Northfield',
    category: 'Income',
    suggestedCategory: 'Transfer',
    isTransfer: true,
    seedMess: 'account-transfer-counted-as-spending',
  })
}

// Refund booked as income
add({
  accountId: 'acc-harbor',
  date: '2026-10-18',
  amount: 24.67,
  rawDescription: 'FRESH BASKET REFUND',
  merchant: 'Fresh Basket',
  category: 'Income',
  suggestedCategory: 'Groceries',
  isRefund: true,
  seedMess: 'refund-as-income',
})

// Category-vs-tag ambiguity: tax software and a CPA as a "Tax-related" category
add({
  accountId: 'acc-harbor',
  date: '2026-09-22',
  amount: -89,
  rawDescription: 'LEDGERLEAF TAX PREP',
  merchant: 'Ledgerleaf Tax',
  category: 'Tax-related',
  suggestedCategory: 'Shopping',
  tags: ['tax-related'],
  seedMess: 'category-vs-tag-ambiguity',
})
add({
  accountId: 'acc-northfield',
  date: '2026-10-09',
  amount: -160,
  rawDescription: 'WILLOW & CO CPA',
  merchant: 'Willow & Co',
  category: 'Tax-related',
  suggestedCategory: 'Shopping',
  tags: ['tax-related'],
  seedMess: 'category-vs-tag-ambiguity',
})

// Recurring household
const payroll = ['2026-08-07', '2026-08-21', '2026-09-04', '2026-09-18', '2026-10-02', '2026-10-16']
for (const date of payroll) {
  add({
    accountId: 'acc-northfield',
    date,
    amount: 2480.14,
    rawDescription: 'ACME NORTH PAYROLL',
    merchant: 'Acme North',
    category: 'Income',
    suggestedCategory: 'Income',
  })
}

for (const date of ['2026-08-01', '2026-09-01', '2026-10-01']) {
  add({
    accountId: 'acc-ridge',
    date,
    amount: -2150,
    rawDescription: 'MAPLE COURT RENT',
    merchant: 'Maple Court',
    category: 'Housing',
    suggestedCategory: 'Housing',
  })
}

for (const date of ['2026-08-08', '2026-09-08', '2026-10-08']) {
  add({
    accountId: 'acc-northfield',
    date,
    amount: -118.42,
    rawDescription: 'GREENLEAF UTILITIES',
    merchant: 'Greenleaf Utilities',
    category: 'Utilities',
    suggestedCategory: 'Utilities',
  })
}

for (const date of ['2026-08-12', '2026-09-12', '2026-10-12']) {
  add({
    accountId: 'acc-harbor',
    date,
    amount: -14.99,
    rawDescription: 'BRIGHTBOX STREAMING',
    merchant: 'Brightbox Streaming',
    category: 'Entertainment',
    suggestedCategory: 'Entertainment',
  })
}

for (const date of ['2026-08-04', '2026-09-04', '2026-10-04']) {
  add({
    accountId: 'acc-northfield',
    date,
    amount: -42,
    rawDescription: 'CLOUD GYM DUES',
    merchant: 'Cloud Gym',
    category: 'Health',
    suggestedCategory: 'Health',
  })
}

const extraMerchants = [
  { merchant: 'Northline Transit', raws: ['NORTHLINE TRANSIT', 'NLINE TAP 882'], category: 'Auto & transport', min: 2.75, max: 6.5, account: 'acc-harbor' },
  { merchant: 'Willow Pharmacy', raws: ['WILLOW PHARMACY #2', 'WLW PHARM 02'], category: 'Health', min: 8.2, max: 34, account: 'acc-harbor' },
  { merchant: 'Oak & Pine', raws: ['OAK & PINE CAFE', 'TST* OAK AND PINE'], category: 'Restaurants & coffee', min: 16, max: 42, account: 'acc-harbor' },
  { merchant: 'Book Nook', raws: ['BOOK NOOK POS', 'THE BOOK NOOK'], category: 'Shopping', min: 12, max: 28, account: 'acc-harbor' },
  { merchant: 'Meadow Market', raws: ['MEADOW MARKET', 'SQ *MEADOW MARKET'], category: 'Groceries', min: 9, max: 24, account: 'acc-harbor' },
  { merchant: 'River Laundry', raws: ['RIVER LAUNDRY', 'RIVER LNDRY CARD'], category: 'Shopping', min: 4.5, max: 9, account: 'acc-harbor' },
  { merchant: 'Sunset Cinema', raws: ['SUNSET CINEMA', 'SNST CINEMA TIX'], category: 'Entertainment', min: 14, max: 32, account: 'acc-harbor' },
  { merchant: 'Maple Hardware', raws: ['MAPLE HARDWARE', 'MAPLE HDW #1'], category: 'Shopping', min: 7, max: 46, account: 'acc-harbor' },
  { merchant: 'City Water', raws: ['CITY WATER E-PAY'], category: 'Utilities', min: 38, max: 52, account: 'acc-northfield' },
  { merchant: 'Homestead Insurance', raws: ['HOMESTEAD INS PREM'], category: 'Housing', min: 86, max: 86, account: 'acc-northfield' },
  { merchant: 'Parking Meter', raws: ['PARKMOB ANYTOWN', 'CITY PARKING MTR'], category: 'Auto & transport', min: 1.5, max: 4.5, account: 'acc-harbor' },
]

const allDays = [...augustDays, ...septemberDays, ...octoberDays]
let guard = 0
while (transactions.length < 208 && guard < 400) {
  guard += 1
  const spec = pick(extraMerchants)
  const date = pick(allDays)
  add({
    accountId: spec.account,
    date,
    amount: -money(spec.min, spec.max),
    rawDescription: pick(spec.raws),
    merchant: spec.merchant,
    category: rand() < 0.12 ? 'Uncategorized' : spec.category,
    suggestedCategory: spec.category,
    seedMess: rand() < 0.08 ? 'messy-raw-merchant' : null,
  })
}

transactions.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id.localeCompare(b.id)))

const oct = (t) => t.date.startsWith('2026-10')
const dailyGrindOct = transactions.filter((t) => t.merchant === 'Daily Grind' && oct(t) && t.amount < 0)
const freshAll = transactions.filter((t) => t.merchant === 'Fresh Basket' && t.amount < 0)
const fuelAll = transactions.filter((t) => t.merchant === 'Fuel Stop' && t.amount < 0)
const autopay = transactions.filter((t) => t.merchant === 'Harbor Card Autopay' && t.accountId === 'acc-northfield')
const toRidge = transactions.filter((t) => t.merchant === 'Transfer to Ridge')
const brightbox = transactions.filter((t) => t.merchant === 'Brightbox Streaming')
const oak = transactions.filter((t) => t.merchant === 'Oak & Pine')
const transit = transactions.filter((t) => t.merchant === 'Northline Transit')
const pharmacy = transactions.filter((t) => t.merchant === 'Willow Pharmacy')

const fallback = {
  source: 'pre-written',
  model: 'prototype-fallback',
  generatedAt: '2026-10-29T00:00:00Z',
  note: 'Used when Workers AI is off, timed out, rate-limited, or running in local mock AI mode.',
  groups: [
    {
      id: 'g-fresh-basket',
      merchantLabel: 'Fresh Basket',
      suggestedCategory: 'Groceries',
      confidence: 'likely',
      why: 'Same grocery merchant, mixed ticket sizes, usually weekends and Wednesday restocks.',
      ruleDraft: {
        whenContains: 'fresh basket',
        setCategory: 'Groceries',
      },
      kind: 'merchant',
      transactionIds: freshAll.map((t) => t.id),
    },
    {
      id: 'g-daily-grind',
      merchantLabel: 'Daily Grind',
      suggestedCategory: 'Restaurants & coffee',
      confidence: 'likely',
      why: 'Same merchant, mostly weekdays, coffee-sized amounts. Raw strings are messy but they collapse to one place.',
      ruleDraft: {
        whenContains: 'daily grind',
        setCategory: 'Restaurants & coffee',
      },
      kind: 'merchant',
      exampleSent: {
        description: 'SQ *DAILYGRIND0423',
        amount: dailyGrindOct[0]?.amount ?? -6.2,
        date: dailyGrindOct[0]?.date ?? '2026-10-28',
        weekday: dailyGrindOct[0]?.weekday ?? 'Wednesday',
        application: 'First Week · Quick Sort',
        accountKind: 'Credit card',
      },
      transactionIds: dailyGrindOct.map((t) => t.id),
    },
    {
      id: 'g-fuel-stop',
      merchantLabel: 'Fuel Stop',
      suggestedCategory: 'Auto & transport',
      confidence: 'likely',
      why: 'Same station, one pending charge still sitting next to its posted twin.',
      ruleDraft: { whenContains: 'fuel stop', setCategory: 'Auto & transport' },
      kind: 'merchant',
      transactionIds: fuelAll.map((t) => t.id),
    },
    {
      id: 'g-oak-pine',
      merchantLabel: 'Oak & Pine',
      suggestedCategory: 'Restaurants & coffee',
      confidence: 'likely',
      why: 'Sit-down tickets, evenings, one merchant.',
      ruleDraft: { whenContains: 'oak & pine', setCategory: 'Restaurants & coffee' },
      kind: 'merchant',
      transactionIds: oak.map((t) => t.id),
    },
    {
      id: 'g-brightbox',
      merchantLabel: 'Brightbox Streaming',
      suggestedCategory: 'Entertainment',
      confidence: 'likely',
      why: 'Same $14.99 on the same day each month.',
      ruleDraft: { whenContains: 'brightbox', setCategory: 'Entertainment' },
      kind: 'merchant',
      transactionIds: brightbox.map((t) => t.id),
    },
    {
      id: 'g-transit',
      merchantLabel: 'Northline Transit',
      suggestedCategory: 'Auto & transport',
      confidence: 'likely',
      why: 'Small tap-to-ride amounts on weekdays.',
      ruleDraft: { whenContains: 'northline', setCategory: 'Auto & transport' },
      kind: 'merchant',
      transactionIds: transit.map((t) => t.id),
    },
    {
      id: 'g-harbor-autopay',
      merchantLabel: 'Harbor Card Autopay',
      suggestedCategory: 'Transfer',
      confidence: 'likely',
      why: 'Same amount, same day, between two of your accounts. Counting it twice doubles spending.',
      ruleDraft: { whenContains: 'harbor card autopay', setCategory: 'Transfer' },
      kind: 'transfer',
      pair: {
        from: 'Northfield Bank · Checking',
        to: 'Harbor Card',
        amount: 1240,
        date: '2026-10-03',
      },
      transactionIds: autopay.map((t) => t.id),
    },
    {
      id: 'g-ridge-transfer',
      merchantLabel: 'Transfer to Ridge',
      suggestedCategory: 'Transfer',
      confidence: 'likely',
      why: 'Money moving to your own joint checking, not a purchase.',
      ruleDraft: { whenContains: 'transfer to ridge', setCategory: 'Transfer' },
      kind: 'transfer',
      transactionIds: toRidge.map((t) => t.id),
    },
    {
      id: 'g-pharmacy',
      merchantLabel: 'Willow Pharmacy',
      suggestedCategory: 'Health',
      confidence: 'likely',
      why: 'Same pharmacy, prescription-sized tickets.',
      ruleDraft: { whenContains: 'willow pharmacy', setCategory: 'Health' },
      kind: 'merchant',
      transactionIds: pharmacy.map((t) => t.id),
    },
  ],
}

const sample = {
  meta: {
    unofficial: true,
    designer: 'Luis Cielak',
    affiliation: 'Not affiliated with Monarch Money',
    householdName: null,
    now: '2026-10-29T15:00:00-07:00',
    trialStartedAt: '2026-10-23T12:00:00-07:00',
    trialEndsAt: '2026-10-30T12:00:00-07:00',
    timezone: 'America/Los_Angeles',
    pricingSource: 'https://www.monarch.com/pricing',
    pricingAsOf: '2026-10-29',
    seedMesses: [
      'miscategorized-as-shopping',
      'messy-raw-merchant',
      'duplicate-pending-posted',
      'stale-connection',
      'needs-reauth',
      'card-autopay-counted-as-spending',
      'account-transfer-counted-as-spending',
      'refund-as-income',
      'category-vs-tag-ambiguity',
    ],
  },
  accounts,
  categories,
  tags,
  transactions,
}

const outDir = resolve(root, 'data/fixtures')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sample.json'), JSON.stringify(sample, null, 2) + '\n')
writeFileSync(resolve(outDir, 'fallback.json'), JSON.stringify(fallback, null, 2) + '\n')

const messCounts = {}
for (const t of transactions) {
  if (t.seedMess) messCounts[t.seedMess] = (messCounts[t.seedMess] || 0) + 1
}
console.log(`Wrote ${transactions.length} transactions`)
console.log('Messes', messCounts)
console.log('Daily Grind Oct', dailyGrindOct.length, 'Fresh Basket', freshAll.length)
