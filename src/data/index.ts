import type { City, CityId, Experience, ExperienceId, Neighbourhood, PriceBandId, Spa, SpaCardData, Treatment, } from '../domain/types'
import { meanRating, reviewCount, summarise } from '../lib/rating'
import { CITIES } from './cities'
import { EXPERIENCES } from './experiences'
import { AGADIR } from './spas/agadir'
import { CASABLANCA } from './spas/casablanca'
import { MARRAKECH } from './spas/marrakech'
import { RABAT } from './spas/rabat'
import { TANGIER } from './spas/tangier'
import { priceBandOf, SPA_TYPES } from './taxonomy'

export { CITIES, EXPERIENCES }

export const SPAS: Spa[] = [...MARRAKECH, ...CASABLANCA, ...AGADIR, ...RABAT, ...TANGIER]

const bySlug = new Map(SPAS.map((spa) => [spa.slug, spa]))
const byId = new Map(SPAS.map((spa) => [spa.id, spa]))
const cityById = new Map(CITIES.map((city) => [city.id, city]))
const experienceById = new Map(EXPERIENCES.map((experience) => [experience.id, experience]))

// ── Lookups ─────────────────────────────────────────────────────────────────

export function getSpaBySlug(slug: string | undefined): Spa | undefined {
  return slug ? bySlug.get(slug) : undefined
}

export function getSpaById(id: string): Spa | undefined {
  return byId.get(id)
}

export function getSpasByIds(ids: string[]): Spa[] {
  return ids.map((id) => byId.get(id)).filter((spa): spa is Spa => spa !== undefined)
}

export function getCity(id: CityId): City {
  return cityById.get(id) as City
}

export function getCityBySlug(slug: string | undefined): City | undefined {
  return CITIES.find((city) => city.slug === slug)
}

export function getExperience(id: ExperienceId): Experience {
  return experienceById.get(id) as Experience
}

export function getExperienceBySlug(slug: string | undefined): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug)
}

export function neighbourhoodOf(spa: Spa): Neighbourhood {
  const city = getCity(spa.cityId)
  return city.neighbourhoods.find((n) => n.id === spa.neighbourhoodId) ?? { id: spa.neighbourhoodId, name: city.name }
}

export function typeName(spa: Spa): string {
  return SPA_TYPES.find((type) => type.id === spa.type)?.name ?? ''
}

// ── Derived values ──────────────────────────────────────────────────────────

/** The ritual a spa is known for. Its price is the "from" price on every card. */
export function signatureTreatment(spa: Spa): Treatment {
  return spa.treatments.find((t) => t.id === spa.signature.treatmentId) ?? spa.treatments[0]
}

export function priceFrom(spa: Spa): number {
  return signatureTreatment(spa).priceMad
}

export function priceBand(spa: Spa): PriceBandId {
  return priceBandOf(priceFrom(spa))
}

export function priceRange(spa: Spa): { min: number; max: number } {
  const prices = spa.treatments.map((t) => t.priceMad)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

const firstSentence = (text: string) => /^.*?[.!?](?=\s|$)/.exec(text)?.[0] ?? text

/** Project a spa to the only shape a card is allowed to read. */
export function toCard(spa: Spa): SpaCardData {
  const signature = signatureTreatment(spa)
  return {
    id: spa.id,
    slug: spa.slug,
    name: spa.name,
    typeLabel: typeName(spa),
    cityName: getCity(spa.cityId).name,
    neighbourhoodName: neighbourhoodOf(spa).name,
    image: spa.media.card,
    leadImage: spa.media.lead,
    selection: spa.selection ? { level: spa.selection.level, year: spa.selection.year } : null,
    rating: summarise(spa.rating),
    descriptor: spa.descriptor,
    signature: { name: signature.name, durationMin: signature.durationMin },
    priceFrom: signature.priceMad,
    verdictLine: firstSentence(spa.verdict.text),
  }
}

// ── Saved queries ───────────────────────────────────────────────────────────

const PRIOR_REVIEWS = 40
const PRIOR_MEAN = SPAS.reduce((sum, spa) => sum + meanRating(spa.rating), 0) / SPAS.length

export function weightedRating(spa: Spa): number {
  const count = reviewCount(spa.rating)
  return (count * meanRating(spa.rating) + PRIOR_REVIEWS * PRIOR_MEAN) / (count + PRIOR_REVIEWS)
}

export function byRecommendation(a: Spa, b: Spa): number { return (b.selection?.level ?? 0) - (a.selection?.level ?? 0) || weightedRating(b) - weightedRating(a) }

export function recommended(spas: Spa[] = SPAS): Spa[] { return [...spas].sort(byRecommendation) }

export function selectedSpas(): Spa[] { return recommended(SPAS.filter((spa) => spa.selection)) }

export function spasInCity(cityId: CityId): Spa[] { return recommended(SPAS.filter((spa) => spa.cityId === cityId)) }

export function spasWithExperience(experienceId: ExperienceId): Spa[] { return recommended(SPAS.filter((spa) => spa.experiences.includes(experienceId))) }

/** Three more to look at, so no profile is a dead end: same city first, then the same budget. */
export function relatedSpas(spa: Spa, limit = 3): Spa[] {
  const others = SPAS.filter((other) => other.id !== spa.id)
  const sameCity = recommended(others.filter((other) => other.cityId === spa.cityId))
  const sameBand = recommended(
    others.filter((other) => other.cityId !== spa.cityId && priceBand(other) === priceBand(spa)),
  )
  const rest = recommended(others.filter((other) => !sameCity.includes(other) && !sameBand.includes(other)))
  return [...sameCity, ...sameBand, ...rest].slice(0, limit)
}

export interface CityStats {
  count: number
  selected: number
  priceFrom: number
}

export function cityStats(cityId: CityId): CityStats {
  const spas = SPAS.filter((spa) => spa.cityId === cityId)
  return {
    count: spas.length,
    selected: spas.filter((spa) => spa.selection).length,
    priceFrom: spas.length ? Math.min(...spas.map(priceFrom)) : 0,
  }
}

/** A city page is indexed once it has enough spas to be useful. */
export const CITY_INDEX_MIN_SPAS = 3

export const TOTALS = {
  spas: SPAS.length,
  cities: CITIES.length,
  selected: SPAS.filter((spa) => spa.selection).length,
  reviews: SPAS.reduce((sum, spa) => sum + reviewCount(spa.rating), 0),
}
