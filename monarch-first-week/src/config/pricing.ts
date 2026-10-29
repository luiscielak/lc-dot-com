/**
 * Web prices from https://www.monarch.com/pricing
 * as of 2026-10-29. App Store / Play prices can differ.
 * This prototype is unofficial and not affiliated with Monarch Money.
 */
export const pricingAsOf = '2026-10-29'
export const pricingSource = 'https://www.monarch.com/pricing'

export const pricing = {
  currency: 'USD',
  trialDays: 7,
  paymentMethodRequired: true,
  core: {
    annual: {
      id: 'core-annual',
      label: 'Core annual',
      amount: 99.99,
      per: 'year' as const,
      monthlyEquivalent: 8.33,
      display: '$99.99/yr',
      short: 'about $8.33/mo',
    },
    monthly: {
      id: 'core-monthly',
      label: 'Core monthly',
      amount: 14.99,
      per: 'month' as const,
      display: '$14.99/mo',
    },
  },
  plus: {
    annual: {
      id: 'plus-annual',
      label: 'Plus',
      amount: 199.99,
      per: 'year' as const,
      monthlyEquivalent: 16.67,
      display: '$199.99/yr',
      annualOnly: true,
    },
  },
} as const

export function money(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const day0TrialLine = `Your first week is on us. Then Core at ${pricing.core.annual.display} or ${pricing.core.monthly.display}.`

export const plusAnnualOnlyLine = `Plus is ${pricing.plus.annual.display}, annual only`

export const billing = {
  partnerJoinsFree: 'A household member joins free.',
  web: {
    who: 'Monarch on the web',
    cancelWhere: 'Settings → Plan & billing',
  },
  appStore: {
    who: 'Apple App Store',
    cancelWhere: 'iPhone Settings → [your name] → Subscriptions',
    priceNote: 'App Store prices can differ from the web.',
  },
} as const

export type SignupChannel = 'web' | 'app-store'
