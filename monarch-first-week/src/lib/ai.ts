import { fallback, groups } from './fixtures'
import type { AiSource, QuickSortResponse, SentFields, SuggestionGroup } from '../types'

export const neverSent = [
  'Your name',
  'Account numbers',
  'Balances',
  'Login tokens',
] as const

export function sentFieldsFor(group: SuggestionGroup): SentFields {
  if (group.exampleSent) return group.exampleSent
  return {
    description: group.merchantLabel,
    amount: 0,
    date: '2026-10-28',
    weekday: 'Wednesday',
    application: 'First Week · Quick Sort',
    accountKind: 'Credit card',
  }
}

export async function requestQuickSort(
  group: SuggestionGroup,
): Promise<QuickSortResponse> {
  const payload = sentFieldsFor(group)
  try {
    const response = await fetch('/api/quicksort', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: group.id, sent: payload }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error(`quicksort ${response.status}`)
    return (await response.json()) as QuickSortResponse
  } catch {
    return {
      source: fallback.source,
      model: fallback.model,
      group,
    }
  }
}

export function sourceLabel(source: AiSource): string {
  if (source === 'live') return 'Live'
  if (source === 'cached') return 'Cached'
  return 'Pre-written'
}

export function groupById(id: string): SuggestionGroup | undefined {
  return groups.find((group) => group.id === id)
}
