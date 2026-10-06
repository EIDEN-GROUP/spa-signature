import { CITIES, cityStats, EXPERIENCES, SPAS, spasWithExperience } from '@/lib/data'
import { EMPTY_FILTERS, type Filters, filtersToSearch, normalise } from '@/lib/filters'
import { FACILITIES, OCCASIONS, SPA_TYPES } from '@/lib/taxonomy'
import type { CityId } from '@/lib/types'
import { plural } from '@/lib/utils'

// Search that answers "which spa is right for me?", not "what is this spa called?".
//
// One field understands cities, neighbourhoods, experiences, types, features
// and occasions, in English and French and in the spellings people really use.
// "hammam gueliz" becomes Hammam + Guéliz + Marrakech; whatever is not
// recognised stays as a text query over names and treatment menus.

type Patch = (filters: Filters) => Filters

interface Term {
  alias: string
  label: string
  apply: Patch
  /** Neighbourhood names repeat across cities ("Médina"); these need a city to resolve. */
  cityId?: CityId
  isArea?: boolean
}

const add = <K extends 'experiences' | 'types' | 'features' | 'occasions'>(key: K, value: Filters[K][number]): Patch =>
  (f) => ({ ...f, [key]: [...new Set([...(f[key] as string[]), value])] })

function buildTerms(): Term[] {
  const terms: Term[] = []
  const push = (aliases: string[], label: string, apply: Patch, extra: Partial<Term> = {}) => {
    for (const alias of new Set(aliases.map(normalise))) terms.push({ alias, label, apply, ...extra })
  }
  for (const city of CITIES) {
    push([city.name, ...city.aliases], city.name, (f) => ({ ...f, city: city.id, areas: f.city === city.id ? f.areas : [] }))
    for (const area of city.neighbourhoods) {
      push(
        [area.name, ...(area.aliases ?? [])],
        area.name,
        (f) => ({ ...f, city: city.id, areas: [...new Set([...(f.city === city.id ? f.areas : []), area.id])] }),
        { cityId: city.id, isArea: true },
      )
    }
  }
  for (const e of EXPERIENCES) push([e.name, ...e.aliases], e.name, add('experiences', e.id))
  for (const t of SPA_TYPES) push([t.name, t.plural, ...t.aliases], t.name, add('types', t.id))
  for (const f of FACILITIES) push([f.name, ...(f.aliases ?? [])], f.name, add('features', f.id))
  for (const o of OCCASIONS) push([o.name, ...o.aliases], o.name, add('occasions', o.id))
  push(['signature selection', 'selected', 'selection', 'recommended', 'best'], 'Signature Selection', (f) => ({
    ...f,
    distinctions: [3, 2, 1],
  }))
  push(['cheap', 'budget', 'affordable', 'pas cher', 'good value'], 'Accessible', (f) => ({ ...f, prices: [1, 2] }))
  return terms
}

const TERMS = buildTerms()
const MAX_WORDS = Math.max(...TERMS.map((term) => term.alias.split(' ').length))

/** Words that carry no intent on their own. */
const NOISE = new Set([
  'a', 'an', 'the', 'in', 'at', 'on', 'near', 'with', 'for', 'and', 'of', 'to', 'spa', 'spas',
  'de', 'du', 'des', 'la', 'le', 'les', 'un', 'une', 'en', 'dans', 'avec', 'pour', 'et', 'au', 'aux',
  'morocco', 'maroc', 'moroccan', 'marocain',
])

export interface ParsedQuery {
  filters: Filters
  /** Labels of what was understood, in the order typed. */
  recognised: string[]
}

/** Turn typed text into filters, keeping whatever is not understood as a text query. */
export function parseQuery(text: string, base: Filters = EMPTY_FILTERS): ParsedQuery {
  const words = normalise(text).split(' ').filter(Boolean)
  const matched: Term[][] = []
  const rest: string[] = []

  for (let i = 0; i < words.length; ) {
    let found: Term[] = []
    let size = Math.min(MAX_WORDS, words.length - i)
    for (; size > 0; size -= 1) {
      const phrase = words.slice(i, i + size).join(' ')
      found = TERMS.filter((term) => term.alias === phrase)
      if (found.length) break
    }
    if (found.length) {
      matched.push(found)
      i += size
    } else {
      rest.push(words[i])
      i += 1
    }
  }

  let filters: Filters = { ...base, q: '' }
  const recognised: string[] = []
  const unresolved: string[] = []

  // Cities first, so that "medina marrakech" and "marrakech medina" read the same.
  for (const candidates of matched) {
    const term = candidates.find((c) => !c.isArea)
    if (term && candidates.every((c) => !c.isArea)) {
      filters = term.apply(filters)
      recognised.push(term.label)
    }
  }
  for (const candidates of matched) {
    if (!candidates.some((c) => c.isArea)) continue
    const inCity = candidates.find((c) => c.isArea && c.cityId === filters.city)
    const only = candidates.filter((c) => c.isArea).length === 1 && !filters.city ? candidates.find((c) => c.isArea) : undefined
    const term = inCity ?? only
    if (term) {
      filters = term.apply(filters)
      recognised.push(term.label)
    } else {
      unresolved.push(candidates[0].alias)
    }
  }

  const q = [...unresolved, ...rest.filter((word) => !NOISE.has(word))].join(' ')
  return { filters: { ...filters, q }, recognised }
}

/** Where a typed search should land. */
export function searchPath(text: string, base?: Filters): string {
  return `/spas${filtersToSearch(parseQuery(text, base).filters)}`
}

// ── Suggestions ─────────────────────────────────────────────────────────────

export interface Suggestion {
  id: string
  label: string
  detail: string
  to: string
}

export interface SuggestionGroup {
  title: 'Places' | 'Experiences' | 'Spas'
  items: Suggestion[]
}

const begins = (text: string, input: string) => text.split(' ').some((word) => word.startsWith(input)) || text.startsWith(input)

export function suggest(input: string): SuggestionGroup[] {
  const typed = normalise(input)
  if (typed.length < 2) return []

  const places: Suggestion[] = []
  for (const city of CITIES) {
    if ([city.name, ...city.aliases].some((alias) => begins(normalise(alias), typed))) {
      places.push({
        id: `city-${city.id}`,
        label: city.name,
        detail: plural(cityStats(city.id).count, 'spa'),
        to: `/spas${filtersToSearch({ city: city.id })}`,
      })
    }
    for (const area of city.neighbourhoods) {
      if ([area.name, ...(area.aliases ?? [])].some((alias) => begins(normalise(alias), typed))) {
        const count = SPAS.filter((spa) => spa.cityId === city.id && spa.neighbourhoodId === area.id).length
        if (count > 0) {
          places.push({
            id: `area-${city.id}-${area.id}`,
            label: `${area.name}, ${city.name}`,
            detail: plural(count, 'spa'),
            to: `/spas${filtersToSearch({ city: city.id, areas: [area.id] })}`,
          })
        }
      }
    }
  }

  const experiences: Suggestion[] = []
  for (const e of EXPERIENCES) {
    if ([e.name, ...e.aliases].some((alias) => begins(normalise(alias), typed))) {
      experiences.push({
        id: `exp-${e.id}`,
        label: e.name,
        detail: plural(spasWithExperience(e.id).length, 'spa'),
        to: `/spas${filtersToSearch({ experiences: [e.id] })}`,
      })
    }
  }
  for (const t of SPA_TYPES) {
    if ([t.name, ...t.aliases].some((alias) => begins(normalise(alias), typed))) {
      experiences.push({
        id: `type-${t.id}`,
        label: t.plural,
        detail: plural(SPAS.filter((spa) => spa.type === t.id).length, 'spa'),
        to: `/spas${filtersToSearch({ types: [t.id] })}`,
      })
    }
  }
  for (const f of FACILITIES) {
    if ([f.name, ...(f.aliases ?? [])].some((alias) => begins(normalise(alias), typed))) {
      experiences.push({
        id: `feature-${f.id}`,
        label: `With ${f.name.toLowerCase()}`,
        detail: plural(SPAS.filter((spa) => spa.facilities.includes(f.id)).length, 'spa'),
        to: `/spas${filtersToSearch({ features: [f.id] })}`,
      })
    }
  }

  const spas: Suggestion[] = SPAS.filter((spa) => begins(normalise(spa.name), typed) || normalise(spa.name).includes(typed))
    .slice(0, 5)
    .map((spa) => ({
      id: `spa-${spa.id}`,
      label: spa.name,
      detail: CITIES.find((city) => city.id === spa.cityId)?.name ?? '',
      to: `/spa/${spa.slug}`,
    }))

  const groups: SuggestionGroup[] = [
    { title: 'Places', items: places.slice(0, 5) },
    { title: 'Experiences', items: experiences.slice(0, 5) },
    { title: 'Spas', items: spas },
  ]
  return groups.filter((group) => group.items.length > 0)
}
