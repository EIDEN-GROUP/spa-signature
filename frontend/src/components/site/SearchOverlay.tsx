import { type FormEvent, type KeyboardEvent, useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { Sheet } from '@/components/ui/Sheet'
import { CITIES, cityStats, EXPERIENCES, SPAS } from '@/lib/data'
import { activeFilters, filtersToSearch, search } from '@/lib/filters'
import { paths } from '@/lib/paths'
import { parseQuery, suggest } from '@/lib/search'
import { cx, plural } from '@/lib/utils'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

/**
 * One field that understands intent. As you type it shows what it has
 * understood ("Hammam · Guéliz · Marrakech") and how many spas that leaves,
 * with places, experiences and spa names beneath. Full keyboard support:
 * arrows move, Enter goes, Escape closes.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
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
    <Sheet open={open} onClose={onClose} title="Search" variant="cover" hideTitle>
      <div className="container search-overlay">
        <form role="search" onSubmit={submit} className="search-overlay-form">
          <label htmlFor={inputId} className="label">
            Search the guide
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
              placeholder="City, neighbourhood, ritual or spa"
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
                      {chip.label}
                    </span>
                  ))
                ) : (
                  <span className="search-overlay-term">All spas</span>
                )}
              </span>
              <span className="search-overlay-go">
                {understood.count > 0 ? `Show ${plural(understood.count, 'spa')}` : 'See the closest matches'}
                <Icon name="arrow-right" />
              </span>
            </button>
          ) : null}
        </form>

        <div id={listId} role="listbox" aria-label="Suggestions" className="search-overlay-results">
          {groups.map((group) => (
            <div key={group.title} role="group" aria-label={group.title} className="search-overlay-group">
              <p className="label" aria-hidden="true">
                {group.title}
              </p>
              {group.items.map((item) => {
                const index = options.indexOf(item)
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
                    <span>{item.label}</span>
                    <span className="search-overlay-detail">{item.detail}</span>
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
                Start with a city
              </h3>
              <ul>
                {CITIES.map((city) => (
                  <li key={city.id}>
                    <Link to={paths.spas({ city: city.id })} replace className="search-overlay-option">
                      <span>{city.name}</span>
                      <span className="search-overlay-detail">{plural(cityStats(city.id).count, 'spa')}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby={`${listId}-experiences`}>
              <h3 id={`${listId}-experiences`} className="label">
                Or with what you want
              </h3>
              <ul>
                {EXPERIENCES.map((experience) => (
                  <li key={experience.id}>
                    <Link to={paths.spas({ experiences: [experience.id] })} replace className="search-overlay-option">
                      <span>{experience.name}</span>
                      <span className="search-overlay-detail">{experience.promise}</span>
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
