import { type FormEvent, type KeyboardEvent, useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { Sheet } from '@/components/ui/Sheet'
import { useT } from '@/hooks/use-language'
import { CITIES, cityStats, EXPERIENCES, getSpaById, SPAS } from '@/lib/data'
import { type ActiveFilter, activeFilters, filtersToSearch, search } from '@/lib/filters'
import { paths } from '@/lib/paths'
import { parseQuery, type Suggestion, suggest } from '@/lib/search'
import type { CityId, DistinctionLevel, ExperienceId, FacilityId, OccasionId, PriceBandId, SpaTypeId } from '@/lib/types'
import { cx } from '@/lib/utils'
import type { Dictionary } from '@/locales/fr'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

/** A suggestion in the visitor's language. The search itself names things in English. */
function suggestionWords(item: Suggestion, t: Dictionary): { label: string; detail: string } {
  const [kind, ...rest] = item.id.split('-')
  const key = rest.join('-')
  if (kind === 'city') return { label: t.cities.byId[key as CityId]?.name ?? item.label, detail: item.detail }
  if (kind === 'exp') return { label: t.experiences.byId[key as ExperienceId]?.name ?? item.label, detail: item.detail }
  if (kind === 'type') return { label: t.spaTypes[key as SpaTypeId]?.plural ?? item.label, detail: item.detail }
  if (kind === 'feature') {
    const feature = t.facilities[key as FacilityId]
    return { label: feature ? t.overlay.withFeature(feature) : item.label, detail: item.detail }
  }
  if (kind === 'area') {
    const city = CITIES.find((candidate) => key.startsWith(`${candidate.id}-`))
    const area = city?.neighbourhoods.find((candidate) => `${city.id}-${candidate.id}` === key)
    if (city && area) return { label: `${area.name}, ${t.cities.byId[city.id].name}`, detail: item.detail }
  }
  if (kind === 'spa') {
    const spa = getSpaById(key)
    if (spa) return { label: item.label, detail: t.cities.byId[spa.cityId].name }
  }
  return { label: item.label, detail: item.detail }
}

/** One of the chips that say what the field understood, in the visitor's language. */
function chipLabel(chip: ActiveFilter, t: Dictionary): string {
  switch (chip.group) {
    case 'city':
      return t.cities.byId[chip.value as CityId]?.name ?? chip.label
    case 'experiences':
      return t.experiences.byId[chip.value as ExperienceId]?.name ?? chip.label
    case 'occasions':
      return t.occasions[chip.value as OccasionId] ?? chip.label
    case 'prices':
      return t.priceBands[chip.value as PriceBandId]?.range ?? chip.label
    case 'types':
      return t.spaTypes[chip.value as SpaTypeId]?.name ?? chip.label
    case 'features':
      return t.facilities[chip.value as FacilityId] ?? chip.label
    case 'distinctions':
      return t.distinctions[chip.value as DistinctionLevel] ?? chip.label
    case 'rating':
      return t.overlay.rated(t.format.score(Number(chip.value)))
    default:
      return chip.label
  }
}

/**
 * One field that understands intent. As you type it shows what it has
 * understood ("Hammam · Guéliz · Marrakech") and how many spas that leaves,
 * with places, experiences and spa names beneath. Full keyboard support:
 * arrows move, Enter goes, Escape closes.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const t = useT()
  const navigate = useNavigate()
  const inputId = useId()
  const listId = useId()
  const [text, setText] = useState('')
  const [active, setActive] = useState(-1)

  const groups = useMemo(() => suggest(text), [text])
  const options = useMemo(() => groups.flatMap((group) => group.items), [groups])
  const understood = useMemo(() => {
    if (text.trim().length < 2) return null
    const { filters } = parseQuery(text)
    return { filters, chips: activeFilters(filters), count: search(SPAS, filters).length }
  }, [text])

  // Leaving replaces the overlay's history entry, so Back returns to the page before it.
  const go = (to: string) => {
    setText('')
    setActive(-1)
    navigate(to, { replace: true })
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (active >= 0 && options[active]) go(options[active].to)
    else if (understood) go(`/spas${filtersToSearch(understood.filters)}`)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!options.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % options.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index <= 0 ? options.length - 1 : index - 1))
    }
  }

  return (
    <Sheet open={open} onClose={onClose} title={t.overlay.title} variant="cover" hideTitle>
      <div className="container search-overlay">
        <form role="search" onSubmit={submit} className="search-overlay-form">
          <label htmlFor={inputId} className="label">
            {t.overlay.label}
          </label>
          <div className="search-overlay-field">
            <Icon name="search" />
            <input
              id={inputId}
              data-autofocus
              type="search"
              role="combobox"
              aria-expanded={options.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
              placeholder={t.overlay.placeholder}
              value={text}
              onChange={(event) => {
                setText(event.target.value)
                setActive(-1)
              }}
              onKeyDown={onKeyDown}
            />
          </div>

          {understood ? (
            <button type="submit" className="search-overlay-understood">
              <span className="search-overlay-terms">
                {understood.chips.length ? (
                  understood.chips.map((chip) => (
                    <span key={`${chip.group}-${chip.value}`} className="search-overlay-term">
                      {chipLabel(chip, t)}
                    </span>
                  ))
                ) : (
                  <span className="search-overlay-term">{t.overlay.allSpas}</span>
                )}
              </span>
              <span className="search-overlay-go">
                {understood.count > 0 ? t.overlay.show(understood.count) : t.overlay.closest}
                <Icon name="arrow-right" />
              </span>
            </button>
          ) : null}
        </form>

        <div id={listId} role="listbox" aria-label={t.overlay.suggestions} className="search-overlay-results">
          {groups.map((group) => (
            <div key={group.title} role="group" aria-label={t.overlay.groups[group.title]} className="search-overlay-group">
              <p className="label" aria-hidden="true">
                {t.overlay.groups[group.title]}
              </p>
              {group.items.map((item) => {
                const index = options.indexOf(item)
                const words = suggestionWords(item, t)
                return (
                  <Link
                    key={item.id}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === active}
                    tabIndex={-1}
                    to={item.to}
                    replace
                    className={cx('search-overlay-option', index === active && 'search-overlay-active')}
                    onClick={() => {
                      setText('')
                      setActive(-1)
                    }}
                  >
                    <span>{words.label}</span>
                    <span className="search-overlay-detail">{words.detail}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* Before anything is typed: curated ways in, never a blank page. */}
        {text.trim().length < 2 ? (
          <div className="search-overlay-entries">
            <section aria-labelledby={`${listId}-cities`}>
              <h3 id={`${listId}-cities`} className="label">
                {t.overlay.startCity}
              </h3>
              <ul>
                {CITIES.map((city) => (
                  <li key={city.id}>
                    <Link to={paths.spas({ city: city.id })} replace className="search-overlay-option">
                      <span>{t.cities.byId[city.id].name}</span>
                      <span className="search-overlay-detail">{t.format.spas(cityStats(city.id).count)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby={`${listId}-experiences`}>
              <h3 id={`${listId}-experiences`} className="label">
                {t.overlay.orWant}
              </h3>
              <ul>
                {EXPERIENCES.map((experience) => (
                  <li key={experience.id}>
                    <Link to={paths.spas({ experiences: [experience.id] })} replace className="search-overlay-option">
                      <span>{t.experiences.byId[experience.id].name}</span>
                      <span className="search-overlay-detail">{t.experiences.byId[experience.id].promise}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </div>
    </Sheet>
  )
}
