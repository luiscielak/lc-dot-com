import sample from '../../data/fixtures/sample.json'
import type { SampleFixture } from '../types'

const fixture = sample as SampleFixture

export const tz = fixture.meta.timezone
export const nowIso = fixture.meta.now
export const trialStartedAt = fixture.meta.trialStartedAt
export const trialEndsAt = fixture.meta.trialEndsAt

export function formatWhen(iso: string, opts: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleString('en-US', { timeZone: tz, ...opts })
}

export function cancelByIso(): string {
  const end = new Date(trialEndsAt).getTime()
  return new Date(end - 24 * 60 * 60 * 1000).toISOString()
}

export function cancelByLabel(): string {
  return formatWhen(cancelByIso(), {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function chargeDateLabel(): string {
  return formatWhen(trialEndsAt, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function trialEndsLabel(): string {
  return formatWhen(trialEndsAt, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function daysLeftOnTrial(): number {
  const now = new Date(nowIso).getTime()
  const end = new Date(trialEndsAt).getTime()
  return Math.max(0, Math.ceil((end - now) / (24 * 60 * 60 * 1000)))
}

export function shortDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
