import type { CityId, IsoDate } from '@/lib/types'

// Commercial visibility.
//
// This module is kept apart from the public data model on purpose. Nothing in
// `domain/types.ts` can reference it, sorting and filtering never import it,
// and the only thing it can do is fill a slot that is labelled "Sponsored".
// In production this data is served by the commercial system, not the CMS.

/** Spas with a commercial partnership. Shown as a neutral "Partner" note on their profile. */
const PARTNERS = new Set(['spa-oceane', 'tifawt-thalasso'])

interface Campaign {
  spaId: string
  /** Shown only when the reader is looking at this city, or at the whole country. */
  cityId: CityId
  startsOn: IsoDate
  endsOn: IsoDate
}

const CAMPAIGNS: Campaign[] = [{ spaId: 'tifawt-thalasso', cityId: 'agadir', startsOn: '2026-09-15', endsOn: '2026-12-15' }]

export function isPartner(spaId: string): boolean {
  return PARTNERS.has(spaId)
}

/**
 * At most one sponsored spa per results view, and only if it genuinely matches
 * what the reader asked for. It is rendered outside the ranked list.
 */
export function sponsoredSpaId(view: { cityId: CityId | null; matchingIds: Set<string> }): string | null {
  const campaign = CAMPAIGNS.find(
    (c) => (view.cityId === null || view.cityId === c.cityId) && view.matchingIds.has(c.spaId),
  )
  return campaign?.spaId ?? null
}
