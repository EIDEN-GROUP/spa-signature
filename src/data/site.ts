// Site-wide facts. The origin and addresses below are placeholders until the
// production domain is confirmed; set VITE_SITE_URL at build time to override.

export const SITE = {
  name: 'Spa Maroc Signature',
  tagline: 'The independent guide to the spas of Morocco',
  description:
    'Find, compare and trust the best spas and hammams in Morocco. Selected by editors, rated by guests, never paid for. Contact each spa directly by WhatsApp or phone.',
  url: (import.meta.env.VITE_SITE_URL ?? 'https://www.spamarocsignature.example').replace(/\/$/, ''),
  locale: 'en',
  /** The current edition of the selection. */
  edition: 2026,
  updated: 'October 2026',
  updatedIso: '2026-10-01',
  publisher: 'EIDEN Group',
  email: {
    editors: 'editors@spamarocsignature.example',
    partners: 'partners@spamarocsignature.example',
    corrections: 'corrections@spamarocsignature.example',
  },
  /** Optional endpoint that receives the For Spas form as JSON. Without it the form opens a prepared email. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
} as const

/** Join the deploy base and a public path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
