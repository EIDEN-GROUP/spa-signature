import type { IsoDate } from '../domain/types'

/** 1200 -> "1,200 MAD" */
export function formatMad(amount: number): string {
  return `${amount.toLocaleString('en-US')} MAD`
}

/** 75 -> "75 min", 150 -> "2 h 30", 180 -> "3 h" */
export function formatDuration(minutes: number): string {
  if (minutes < 120) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} h` : `${hours} h ${rest}`
}

// Dates are calendar dates, not instants: format them in UTC so the server
// and every browser print the same day.
const LONG = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const SHORT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

function toDate(iso: IsoDate): Date {
  return new Date(`${iso}T00:00:00Z`)
}

/** "12 September 2026" */
export function formatDate(iso: IsoDate): string {
  return LONG.format(toDate(iso))
}

/** "12 Sept 2026" */
export function formatDateShort(iso: IsoDate): string {
  return SHORT.format(toDate(iso))
}

/** "September 2026" */
export function formatMonth(iso: IsoDate): string {
  return MONTH.format(toDate(iso))
}

/** "+212500000101" -> "+212 5 00 00 01 01" */
export function formatPhone(e164: string): string {
  const match = /^\+212(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(e164)
  return match ? `+212 ${match.slice(1).join(' ')}` : e164
}

export function plural(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`
}

/** "one" to "twenty", for headlines; digits beyond that. */
export function spellNumber(n: number): string {
  const words = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
  ]
  return words[n] ?? String(n)
}

export function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Join with commas and a final "and". */
export function listText(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`
}
