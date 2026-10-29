import fallbackJson from '../../data/fixtures/fallback.json'
import sampleJson from '../../data/fixtures/sample.json'
import type { FallbackFixture, SampleFixture, SuggestionGroup, Transaction } from '../types'

export const sample = sampleJson as SampleFixture
export const fallback = fallbackJson as FallbackFixture

const syncGroup: SuggestionGroup = {
  id: 'g-sync-issues',
  merchantLabel: 'Sync issues',
  suggestedCategory: 'Uncategorized',
  confidence: 'likely',
  why: 'Harbor Card is behind. Ridge asked for a new code. Sort after the month is whole.',
  ruleDraft: { whenContains: '', setCategory: '' },
  kind: 'sync',
  transactionIds: [],
}

const rulesGroup: SuggestionGroup = {
  id: 'g-rules',
  merchantLabel: 'Rules',
  suggestedCategory: 'Uncategorized',
  confidence: 'likely',
  why: 'Turn on rules after transfers and merchants are sorted. Most specific match wins.',
  ruleDraft: { whenContains: '', setCategory: '' },
  kind: 'rules',
  transactionIds: [],
}

const transfers = fallback.groups.filter((group) => group.kind === 'transfer')
const merchants = fallback.groups.filter((group) => group.kind === 'merchant')

export const groups: SuggestionGroup[] = [syncGroup, ...transfers, ...merchants, rulesGroup]

export function transactionsFor(group: SuggestionGroup): Transaction[] {
  const map = new Map(sample.transactions.map((txn) => [txn.id, txn]))
  return group.transactionIds
    .map((id) => map.get(id))
    .filter((txn): txn is Transaction => Boolean(txn))
}

export function uniqueRaws(group: SuggestionGroup, limit = 3): string[] {
  const seen = new Set<string>()
  const raws: string[] = []
  for (const txn of transactionsFor(group)) {
    if (seen.has(txn.rawDescription)) continue
    seen.add(txn.rawDescription)
    raws.push(txn.rawDescription)
    if (raws.length >= limit) break
  }
  return raws
}

export function groupTotal(group: SuggestionGroup): number {
  return transactionsFor(group).reduce((sum, txn) => sum + Math.abs(txn.amount), 0)
}

export function groupDateSpan(group: SuggestionGroup): { first: string; last: string } | null {
  const dates = transactionsFor(group)
    .map((txn) => txn.date)
    .sort()
  if (dates.length === 0) return null
  return { first: dates[0], last: dates[dates.length - 1] }
}

export function accountById(id: string) {
  return sample.accounts.find((account) => account.id === id)
}
