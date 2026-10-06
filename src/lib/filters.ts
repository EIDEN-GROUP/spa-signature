// Search state and the pure functions that act on it.
//
// The URL is the state: every filter, the query and the sort order live in the
// address, so any search can be shared, bookmarked or opened by a search engine.
// Nothing here knows about payment. Commercial data is never an input.

import { byRecommendation, CITIES, EXPERIENCES, getCity, neighbourhoodOf, priceBand, priceFrom, typeName } from '../data'
import { DISTINCTIONS, FACILITIES, OCCASIONS, PRICE_BANDS, SPA_TYPES } from '../data/taxonomy'
import type {
  CityId,
  DistinctionLevel,
  ExperienceId,
  FacilityId,
  OccasionId,
  PriceBandId,
  Spa,
  SpaTypeId,
} from '../domain/types'
import { meanRating, reviewCount, summarise } from './rating'

export type SortId = 'recommended' | 'rating' | 'reviews' | 'price'
export type MinRating = 4.5 | 4 | 3.5

export interface Filters {
  q: string
  city: CityId | null
  areas: string[]
  experiences: ExperienceId[]
  occasions: OccasionId[]
  prices: PriceBandId[]
  types: SpaTypeId[]
  /** Unlike the other groups, every chosen feature must be present. */
  features: FacilityId[]
  /** Editorial data only. No paid option can ever appear here. */
  distinctions: DistinctionLevel[]
  rating: MinRating | null
  sort: SortId
}

export const EMPTY_FILTERS: Filters = {
  q: '',
  city: null,
  areas: [],
  experiences: [],
  occasions: [],
  prices: [],
  types: [],
  features: [],
  distinctions: [],
  rating: null,
  sort: 'recommended',
}

export const SORTS: { id: SortId; name: string }[] = [
  { id: 'recommended', name: 'Recommended' },
  { id: 'rating', name: 'Guest rating' },
  { id: 'reviews', name: 'Most reviewed' },
  { id: 'price', name: 'Price, low to high' },
]

export const MIN_RATINGS: { id: MinRating; name: string }[] = [
  { id: 4.5, name: '4.5 and above' },
  { id: 4, name: '4.0 and above' },
  { id: 3.5, name: '3.5 and above' },
]

// ── URL ⇄ state ─────────────────────────────────────────────────────────────

const list = (value: string | null) => (value ? value.split(',').filter(Boolean) : [])

function oneOf<T extends string | number>(values: readonly T[], raw: string[]): T[] {
  const allowed = new Map(values.map((value) => [String(value), value]))
  return [...new Set(raw.map((item) => allowed.get(item)).filter((item): item is T => item !== undefined))]
}

export function filtersFromParams(params: URLSearchParams): Filters {
  const city = CITIES.find((c) => c.slug === params.get('city')) ?? null
  const rating = MIN_RATINGS.find((r) => String(r.id) === params.get('rating'))?.id ?? null
  const sort = SORTS.find((s) => s.id === params.get('sort'))?.id ?? 'recommended'
  const selection = params.get('selection')
  return {
    q: (params.get('q') ?? '').trim().slice(0, 80),
    city: city?.id ?? null,
    // A neighbourhood only means something inside its city.
    areas: city ? oneOf(city.neighbourhoods.map((n) => n.id), list(params.get('area'))) : [],
    experiences: oneOf(EXPERIENCES.map((e) => e.id), list(params.get('exp'))),
    occasions: oneOf(OCCASIONS.map((o) => o.id), list(params.get('occasion'))),
    prices: oneOf(PRICE_BANDS.map((b) => b.id), list(params.get('price'))),
    types: oneOf(SPA_TYPES.map((t) => t.id), list(params.get('type'))),
    features: oneOf(FACILITIES.map((f) => f.id), list(params.get('feature'))),
    distinctions: selection === 'any' ? [3, 2, 1] : oneOf([3, 2, 1] as const, list(selection)),
    rating,
    sort,
  }
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams()
  const set = (key: string, values: (string | number)[]) => {
    if (values.length) params.set(key, values.join(','))
  }
  if (filters.q) params.set('q', filters.q)
  if (filters.city) params.set('city', getCity(filters.city).slug)
  if (filters.city) set('area', filters.areas)
  set('exp', filters.experiences)
  set('occasion', filters.occasions)
  set('price', filters.prices)
  set('type', filters.types)
  set('feature', filters.features)
  if (filters.distinctions.length === 3) params.set('selection', 'any')
  else set('selection', filters.distinctions)
  if (filters.rating) params.set('rating', String(filters.rating))
  if (filters.sort !== 'recommended') params.set('sort', filters.sort)
  return params
}

export function filtersToSearch(filters: Partial<Filters>): string {
  const query = filtersToParams({ ...EMPTY_FILTERS, ...filters }).toString()
  return query ? `?${query}` : ''
}

// ── Matching ────────────────────────────────────────────────────────────────

export function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const haystacks = new WeakMap<Spa, string>()

/** Everything a person might type to find this spa. */
function haystack(spa: Spa): string {
  let text = haystacks.get(spa)
  if (!text) {
    text = normalise(
      [
        spa.name,
        spa.descriptor,
        getCity(spa.cityId).name,
        neighbourhoodOf(spa).name,
        typeName(spa),
        ...spa.treatments.map((t) => t.name),
        ...spa.experiences,
      ].join(' '),
    )
    haystacks.set(spa, text)
  }
  return text
}

type Group = Exclude<keyof Filters, 'sort'>

const anyOf = <T,>(chosen: T[], has: (value: T) => boolean) => chosen.length === 0 || chosen.some(has)

/** One test per filter group. A spa must pass every group: AND across, OR within. */
const TESTS: Record<Group, (spa: Spa, f: Filters) => boolean> = {
  q: (spa, f) => {
    if (!f.q) return true
    const text = haystack(spa)
    return normalise(f.q)
      .split(' ')
      .every((word) => text.includes(word))
  },
  city: (spa, f) => f.city === null || spa.cityId === f.city,
  areas: (spa, f) => anyOf(f.areas, (area) => spa.neighbourhoodId === area),
  experiences: (spa, f) => anyOf(f.experiences, (e) => spa.experiences.includes(e)),
  occasions: (spa, f) => anyOf(f.occasions, (o) => spa.occasions.includes(o)),
  prices: (spa, f) => anyOf(f.prices, (band) => priceBand(spa) === band),
  types: (spa, f) => anyOf(f.types, (type) => spa.type === type),
  features: (spa, f) => f.features.every((feature) => spa.facilities.includes(feature)),
  distinctions: (spa, f) => anyOf(f.distinctions, (level) => spa.selection?.level === level),
  rating: (spa, f) => {
    if (f.rating === null) return true
    const { average } = summarise(spa.rating)
    return average !== null && average >= f.rating
  },
}

const GROUPS = Object.keys(TESTS) as Group[]

export function matches(spa: Spa, filters: Filters, except?: Group): boolean {
  return GROUPS.every((group) => group === except || TESTS[group](spa, filters))
}

const SORTERS: Record<SortId, (a: Spa, b: Spa) => number> = {
  recommended: byRecommendation,
  rating: (a, b) => {
    const ra = summarise(a.rating).average
    const rb = summarise(b.rating).average
    return (rb ?? 0) - (ra ?? 0) || meanRating(b.rating) - meanRating(a.rating) || byRecommendation(a, b)
  },
  reviews: (a, b) => reviewCount(b.rating) - reviewCount(a.rating),
  price: (a, b) => priceFrom(a) - priceFrom(b) || byRecommendation(a, b),
}

export function search(spas: Spa[], filters: Filters): Spa[] {
  return spas.filter((spa) => matches(spa, filters)).sort(SORTERS[filters.sort])
}

// ── Facets ──────────────────────────────────────────────────────────────────

export type FacetGroup = 'city' | 'areas' | 'experiences' | 'occasions' | 'prices' | 'types' | 'features' | 'distinctions' | 'rating'

/** The filters with one option switched on or off. Changing city clears its neighbourhoods. */
export function toggle(filters: Filters, group: FacetGroup, value: string | number): Filters {
  if (group === 'city') {
    return { ...filters, city: filters.city === value ? null : (value as CityId), areas: [] }
  }
  if (group === 'rating') {
    return { ...filters, rating: filters.rating === value ? null : (value as MinRating) }
  }
  const current = filters[group] as (string | number)[]
  const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
  return { ...filters, [group]: next }
}

export function isActive(filters: Filters, group: FacetGroup, value: string | number): boolean {
  if (group === 'city') return filters.city === value
  if (group === 'rating') return filters.rating === value
  return (filters[group] as (string | number)[]).includes(value)
}

/**
 * How many spas the reader would see with this option chosen, everything else
 * unchanged. Inside an OR group the other choices of that group are ignored,
 * so a count never drops to zero just because a sibling is selected.
 */
export function facetCount(spas: Spa[], filters: Filters, group: FacetGroup, value: string | number): number {
  if (group === 'features') {
    const withFeature = { ...filters, features: [...new Set([...filters.features, value as FacilityId])] }
    return spas.filter((spa) => matches(spa, withFeature)).length
  }
  const only: Filters =
    group === 'city'
      ? { ...filters, city: value as CityId, areas: [] }
      : group === 'rating'
        ? { ...filters, rating: value as MinRating }
        : { ...filters, [group]: [value] }
  return spas.filter((spa) => matches(spa, only)).length
}

// ── Describing a search ─────────────────────────────────────────────────────

export interface ActiveFilter {
  group: FacetGroup | 'q'
  value: string | number
  label: string
}

const nameIn = <T extends { id: string | number; name: string }>(items: readonly T[], id: string | number) =>
  items.find((item) => item.id === id)?.name ?? String(id)

/** The chips above the results: every choice visible, each removable in one tap. */
export function activeFilters(filters: Filters): ActiveFilter[] {
  const chips: ActiveFilter[] = []
  if (filters.q) chips.push({ group: 'q', value: filters.q, label: `“${filters.q}”` })
  if (filters.city) {
    const city = getCity(filters.city)
    chips.push({ group: 'city', value: filters.city, label: city.name })
    for (const area of filters.areas) chips.push({ group: 'areas', value: area, label: nameIn(city.neighbourhoods, area) })
  }
  for (const e of filters.experiences) chips.push({ group: 'experiences', value: e, label: nameIn(EXPERIENCES, e) })
  for (const o of filters.occasions) chips.push({ group: 'occasions', value: o, label: nameIn(OCCASIONS, o) })
  for (const b of filters.prices) chips.push({ group: 'prices', value: b, label: PRICE_BANDS.find((p) => p.id === b)?.range ?? '' })
  for (const t of filters.types) chips.push({ group: 'types', value: t, label: nameIn(SPA_TYPES, t) })
  for (const f of filters.features) chips.push({ group: 'features', value: f, label: nameIn(FACILITIES, f) })
  for (const d of filters.distinctions) chips.push({ group: 'distinctions', value: d, label: DISTINCTIONS[d].name })
  if (filters.rating) chips.push({ group: 'rating', value: filters.rating, label: `Rated ${filters.rating.toFixed(1)}+` })
  return chips
}

export function removeFilter(filters: Filters, chip: Pick<ActiveFilter, 'group' | 'value'>): Filters {
  if (chip.group === 'q') return { ...filters, q: '' }
  if (chip.group === 'city') return { ...filters, city: null, areas: [] }
  if (chip.group === 'rating') return { ...filters, rating: null }
  return { ...filters, [chip.group]: (filters[chip.group] as (string | number)[]).filter((v) => v !== chip.value) }
}

export function countActive(filters: Filters): number {
  return activeFilters(filters).filter((chip) => chip.group !== 'q').length
}

const EXPERIENCE_SUBJECT: Record<ExperienceId, string> = {
  hammam: 'Hammams',
  massage: 'Spas for massage',
  beauty: 'Spas for beauty',
  wellness: 'Spas for a wellness day',
  couples: 'Spas for couples',
  recovery: 'Spas for recovery',
}

/** A heading that says what the reader is looking at: "Hammams in Marrakech". */
export function searchTitle(filters: Filters): string {
  const type = filters.types.length === 1 ? SPA_TYPES.find((t) => t.id === filters.types[0])?.plural : undefined
  const subject =
    type ?? (filters.experiences.length === 1 ? EXPERIENCE_SUBJECT[filters.experiences[0]] : 'Spas')
  const selected = filters.distinctions.length > 0 && !type ? 'Selected ' : ''
  const city = filters.city ? getCity(filters.city) : null
  const area = city && filters.areas.length === 1 ? nameIn(city.neighbourhoods, filters.areas[0]) : null
  const place = city ? (area ? `${area}, ${city.name}` : city.name) : 'Morocco'
  const noun = selected ? subject.charAt(0).toLowerCase() + subject.slice(1) : subject
  return `${selected}${noun} in ${place}`
}

// ── When a search comes up short ────────────────────────────────────────────

export interface Fix {
  label: string
  count: number
  filters: Filters
}

/** Name the filters that are blocking results and offer a one-tap way out of each. */
export function fixes(spas: Spa[], filters: Filters): Fix[] {
  return activeFilters(filters)
    .map((chip) => {
      const relaxed = removeFilter(filters, chip)
      return { label: chip.label, count: search(spas, relaxed).length, filters: relaxed }
    })
    .filter((fix) => fix.count > 0)
    .sort((a, b) => b.count - a.count)
}

/** With only a few results, add spas that match once a single filter is relaxed. */
export function closeMatches(spas: Spa[], filters: Filters, exclude: Spa[], limit = 3): { without: string; spas: Spa[] } | null {
  const best = fixes(spas, filters).find((fix) => fix.count > exclude.length)
  if (!best) return null
  const extra = search(spas, best.filters).filter((spa) => !exclude.includes(spa)).slice(0, limit)
  return extra.length ? { without: best.label, spas: extra } : null
}
