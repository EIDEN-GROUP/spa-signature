import { type CSSProperties, type FormEvent, useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { track } from '@/lib/analytics'
import { CITIES, EXPERIENCES, SPAS } from '@/lib/data'
import { EMPTY_FILTERS, type Filters, search } from '@/lib/filters'
import { paths } from '@/lib/paths'
import { OCCASIONS, PRICE_BANDS } from '@/lib/taxonomy'
import type { CityId, ExperienceId, OccasionId, PriceBandId } from '@/lib/types'
import { cx, plural } from '@/lib/utils'

type FieldId = 'city' | 'experience' | 'budget' | 'occasion'

const FIELDS: Record<FieldId, { label: string; any: string; options: { value: string; label: string }[] }> = {
  city: {
    label: 'City',
    any: 'Anywhere',
    options: CITIES.map((city) => ({ value: city.id, label: city.name })),
  },
  experience: {
    label: 'Experience',
    any: 'Any experience',
    options: EXPERIENCES.map((experience) => ({ value: experience.id, label: experience.name })),
  },
  budget: {
    label: 'Budget',
    any: 'Any budget',
    options: PRICE_BANDS.map((band) => ({ value: String(band.id), label: `${band.name} · ${band.range}` })),
  },
  occasion: {
    label: 'Occasion',
    any: 'Any occasion',
    options: OCCASIONS.map((occasion) => ({ value: occasion.id, label: occasion.name })),
  },
}

const EMPTY: Record<FieldId, string> = { city: '', experience: '', budget: '', occasion: '' }

function toFilters(values: Record<FieldId, string>): Partial<Filters> {
  return {
    city: (values.city || null) as CityId | null,
    experiences: values.experience ? [values.experience as ExperienceId] : [],
    prices: values.budget ? [Number(values.budget) as PriceBandId] : [],
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
    <form className={cx('search-form', className)} role="search" aria-label="Find a spa" onSubmit={submit}>
      <div className="search-form-row" style={{ '--fields': fields.length } as CSSProperties}>
        {fields.map((id) => (
          <div key={id} className={cx('search-form-field', values[id] && 'search-form-chosen')}>
            <label htmlFor={`${uid}-${id}`}>{FIELDS[id].label}</label>
            <select
              id={`${uid}-${id}`}
              value={values[id]}
              onChange={(event) => setValues((current) => ({ ...current, [id]: event.target.value }))}
            >
              <option value="">{FIELDS[id].any}</option>
              {FIELDS[id].options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" />
          </div>
        ))}
        <Button type="submit" variant="primary" arrow className="search-form-submit">
          {submitLabel}
        </Button>
      </div>

      {showCount ? (
        <p className="search-form-count" aria-live="polite">
          {count > 0 ? `${plural(count, 'spa')} to choose from` : 'No exact match yet: we will show the closest'}
        </p>
      ) : null}
    </form>
  )
}
