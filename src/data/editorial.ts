import type { ArticleCategory } from '../domain/types'

/** The editors' picks for the month. They change monthly and are never sold. */
export const MONTHLY_PICKS = {
  month: 'October',
  year: 2026,
  items: [
    {
      spaId: 'jardin-argile',
      whyNow: 'The heat has broken. The palm garden is at its best: warm enough for the pool, cool enough for clay at noon.',
    },
    {
      spaId: 'asif-wellness',
      whyNow: 'The autumn swell has reached Taghazout, and with it the sore shoulders. The terrace is still quiet.',
    },
    {
      spaId: 'maison-oudaya',
      whyNow: 'Clear river light and no crowds. Rabat’s best month, and the easiest time to get one of the three rooms.',
    },
  ],
}

export const ARTICLE_CATEGORIES: Record<ArticleCategory, { name: string; purpose: string }> = {
  guide: { name: 'Guide', purpose: 'Compare and choose' },
  ritual: { name: 'Rituals', purpose: 'Understand before you go' },
  picks: { name: 'Editors’ picks', purpose: 'A confident shortcut' },
  education: { name: 'Know before you go', purpose: 'Choose the right treatment' },
  destination: { name: 'Destination', purpose: 'Plan around a trip' },
}

export const BYLINE = 'The Spa Maroc Signature editors'
