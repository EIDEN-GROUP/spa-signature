import { type CSSProperties, type FormEvent, useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Select'
import { useT } from '@/hooks/use-language'
import { track } from '@/lib/analytics'
import { CITIES, EXPERIENCES, SPAS } from '@/lib/data'
import { EMPTY_FILTERS, type Filters, search } from '@/lib/filters'
import { paths } from '@/lib/paths'
import { OCCASIONS, PRICE_BANDS } from '@/lib/taxonomy'
import type { CityId, ExperienceId, OccasionId } from '@/lib/types'
import { cx } from '@/lib/utils'
import type { Dictionary } from '@/locales/fr'

type FieldId = 'city' | 'experience' | 'occasion'

function optionsOf(id: FieldId, t: Dictionary): { value: string; label: string }[] {
  if (id === 'city') return CITIES.map((city) => ({ value: city.id, label: t.cities.byId[city.id].name }))
  if (id === 'experience') return EXPERIENCES.map((experience) => ({ value: experience.id, label: t.experiences.byId[experience.id].name }))
  if (id === 'occasion') return OCCASIONS.map((occasion) => ({ value: occasion.id, label: t.occasions[occasion.id] }))
  return PRICE_BANDS.map((band) => ({ value: String(band.id), label: `${t.priceBands[band.id].name} · ${t.priceBands[band.id].range}` }))
}

const EMPTY: Record<FieldId, string> = { city: '', experience: '', occasion: '' }

function toFilters(values: Record<FieldId, string>): Partial<Filters> {
  return {
    city: (values.city || null) as CityId | null,
    experiences: values.experience ? [values.experience as ExperienceId] : [],
    occasions: values.occasion ? [values.occasion as OccasionId] : [],
  }
}

interface SearchFormProps {
  fields: FieldId[]
  submitLabel: string
  /** Says how many spas the current choices leave. */
  showCount?: boolean
  className?: string
}

/** The quick way in: a few plain choices that open the results already filtered. */
export function SearchForm({ fields, submitLabel, showCount = false, className }: SearchFormProps) {
  const t = useT()
  const navigate = useNavigate()
  const uid = useId()
  const [values, setValues] = useState(EMPTY)

  const filters = useMemo(() => toFilters(values), [values])
  const count = useMemo(() => search(SPAS, { ...EMPTY_FILTERS, ...filters }).length, [filters])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    for (const id of fields) {
      if (values[id]) track('filter_used', { filter: id, value: values[id], active: true, surface: 'home' })
    }
    navigate(paths.spas(filters))
  }

  return (
    <form className={cx('search-form', className)} role="search" aria-label={t.search.label} onSubmit={submit}>
      <div className="search-form-row" style={{ '--fields': fields.length } as CSSProperties}>
        {fields.map((id) => (
          <div key={id} className={cx('search-form-field', values[id] && 'search-form-chosen')}>
            <label id={`${uid}-${id}-label`} htmlFor={`${uid}-${id}`}>
              {t.search.fields[id].label}
            </label>
            <Select
              id={`${uid}-${id}`}
              labelledBy={`${uid}-${id}-label`}
              value={values[id]}
              options={[{ value: '', label: t.search.fields[id].any }, ...optionsOf(id, t)]}
              onChange={(value) => setValues((current) => ({ ...current, [id]: value }))}
            />
            <Icon name="chevron-down" />
          </div>
        ))}
        <Button type="submit" variant="primary" arrow className="search-form-submit">
          {submitLabel}
        </Button>
      </div>

      {showCount ? (
        <p className="search-form-count" aria-live="polite">
          {count > 0 ? t.search.count(count) : t.search.none}
        </p>
      ) : null}
    </form>
  )
}
