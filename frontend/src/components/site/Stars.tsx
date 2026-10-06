import { ratingText } from '@/lib/rating'
import type { RatingSummary } from '@/lib/types'
import { cx, plural } from '@/lib/utils'

/** Five ink stars filled to a value. Decoration only: the number beside them is the content. */
export function Stars({ value, className }: { value: number; className?: string }) {
  // Each star is 12 units wide with a 2-unit gap, in a 68-unit strip.
  const whole = Math.floor(value)
  const filled = Math.min(68, whole * 14 + (value - whole) * 12)
  return (
    <span className={cx('rating-stars', className)} aria-hidden="true">
      <svg viewBox="0 0 68 12" focusable="false">
        <use href="#i-stars" />
      </svg>
      <span className="rating-fill" style={{ width: `${(filled / 68) * 100}%` }}>
        <svg viewBox="0 0 68 12" focusable="false">
          <use href="#i-stars" />
        </svg>
      </span>
    </span>
  )
}

interface RatingInlineProps {
  rating: RatingSummary
  /** Adds the word: "Excellent". */
  showLabel?: boolean
  className?: string
}

/**
 * The guest rating on one line: stars, the average out of five and how many
 * reviews stand behind it. Always ink, never brass: a rating must not look
 * like a distinction. Under ten reviews there is no average, only "New".
 */
export function RatingInline({ rating, showLabel = false, className }: RatingInlineProps) {
  return (
    <span className={cx('rating', className)}>
      <span className="visually-hidden">{ratingText(rating)}</span>
      <span className="rating-visual" aria-hidden="true">
        {rating.average === null ? (
          <span className="rating-new">New</span>
        ) : (
          <>
            <Stars value={rating.average} />
            <span className="rating-value">
              <b>{rating.average.toFixed(1)}</b> / 5
            </span>
          </>
        )}
        <span className="rating-count">
          {plural(rating.count, 'review')}
          {showLabel && rating.label ? ` · ${rating.label}` : ''}
        </span>
      </span>
    </span>
  )
}
