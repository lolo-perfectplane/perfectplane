// src/lib/currency.ts
export const CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD'] as const
export type Currency = typeof CURRENCIES[number]

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$', EUR: '€', GBP: '£', CHF: 'CHF ', CAD: 'CA$', AUD: 'A$',
}

function symbolFor(currency?: string | null): string {
  return CURRENCY_SYMBOLS[(currency as Currency)] ?? '$'
}

// Compact form for cards/badges — "$450K", "€1.2M"
export function fmtPrice(amount: number | null | undefined, currency?: string | null): string {
  if (amount == null) return 'On enquiry'
  const sym = symbolFor(currency)
  return amount >= 1_000_000 ? `${sym}${(amount / 1_000_000).toFixed(1)}M` : `${sym}${Math.round(amount / 1000)}K`
}

// Full form with thousands separators — "$450,000"
export function fmtPriceFull(amount: number | null | undefined, currency?: string | null): string {
  if (amount == null) return 'On enquiry'
  return `${symbolFor(currency)}${Math.round(amount).toLocaleString()}`
}
