import type { CSSProperties } from 'react'
import { Stars } from '@/components/site/Stars'
import { ratingText, summarise } from '@/lib/rating'
import { RATING_CATEGORIES, RATING_MIN_REVIEWS } from '@/lib/taxonomy'
import type { Rating } from '@/lib/types'
import { plural } from '@/lib/utils'

const bar = (share: number) => ({ '--share': `${Math.round(share * 1000) / 10}%` }) as CSSProperties

/**
 * What guests think, made checkable at a glance: the average, how many
 * reviews stand behind it, the same five categories for every spa, and the
 * spread of stars. No review text and no wall of quotes. Ink throughout.
 */
export function RatingBreakdown({ rating }: { rating: Rating }) {
  const summary = summarise(rating)

  if (summary.average === null) {
    return (
      <div className="rating-breakdown-fresh">
        <p className="rating-breakdown-fresh-title">New on the guide</p>
        <p>
          {plural(summary.count, 'review')} so far. We show an average once {RATING_MIN_REVIEWS} guests have rated their
          visit, because a handful of reviews is not yet a rating.
        </p>
      </div>
    )
  }

  const categories = [{ id: 'overall', name: 'Overall', value: summary.average }].concat(
    RATING_CATEGORIES.map((category) => ({ id: category.id, name: category.name, value: rating.categories[category.id] })),
  )

  return (
    <div className="rating-breakdown">
      <div className="rating-breakdown-score">
        <p className="visually-hidden">{ratingText(summary)}</p>
        <p className="rating-breakdown-number" aria-hidden="true">
          {summary.average.toFixed(1)}
        </p>
        <div aria-hidden="true">
          <Stars value={summary.average} />
          <p className="rating-breakdown-label">
            <b>{summary.label}</b>
            <span>{plural(summary.count, 'review')}</span>
          </p>
        </div>
      </div>

      <dl className="rating-breakdown-categories">
        {categories.map((category) => (
          <div key={category.id}>
            <dt>{category.name}</dt>
            <dd>
              <span className="rating-breakdown-track" style={bar(category.value / 5)} aria-hidden="true" />
              <span className="rating-breakdown-value">
                {category.value.toFixed(1)}
                <span className="visually-hidden"> out of 5</span>
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <table className="rating-breakdown-spread">
        <caption className="label">Reviews by star</caption>
        <tbody>
          {rating.distribution.map((count, index) => (
            <tr key={index}>
              <th scope="row">
                {5 - index}
                <span className="visually-hidden"> {5 - index === 1 ? 'star' : 'stars'}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <use href="#i-star" />
                </svg>
              </th>
              <td className="rating-breakdown-spread-bar">
                <span className="rating-breakdown-track" style={bar(count / summary.count)} aria-hidden="true" />
              </td>
              <td className="rating-breakdown-value">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
