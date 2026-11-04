export function usd(amount: number): string {
  const abs = Math.abs(amount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(abs)
}

export function signedUsd(amount: number): string {
  const formatted = usd(amount)
  if (amount > 0) return `+${formatted}`
  if (amount < 0) return `−${formatted}`
  return formatted
}
