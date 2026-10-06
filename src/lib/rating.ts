import { RATING_MIN_REVIEWS } from '../data/taxonomy'
import type { Rating, RatingLabel, RatingSummary } from '../domain/types'

export function reviewCount(rating: Rating): number {
  return rating.distribution.reduce((sum, n) => sum + n, 0)
}

/** The unrounded mean of the star distribution. Used for sorting only. */
export function meanRating(rating: Rating): number {
  const count = reviewCount(rating)
  if (count === 0) return 0
  const [five, four, three, two, one] = rating.distribution
  return (five * 5 + four * 4 + three * 3 + two * 2 + one) / count
}

export function ratingLabel(average: number): RatingLabel {
  if (average >= 4.5) return 'Excellent'
  if (average >= 4) return 'Very good'
  if (average >= 3.5) return 'Good'
  if (average >= 3) return 'Fair'
  return 'Poor'
}

/** What the public sees. A handful of reviews is not an average. */
export function summarise(rating: Rating): RatingSummary {
  const count = reviewCount(rating)
  if (count < RATING_MIN_REVIEWS) return { average: null, count, label: null }
  const average = Math.round(meanRating(rating) * 10) / 10
  return { average, count, label: ratingLabel(average) }
}

/** Reads a rating aloud: stars are decoration, this is the content. */
export function ratingText(summary: RatingSummary): string {
  const reviews = `${summary.count} ${summary.count === 1 ? 'review' : 'reviews'}`
  if (summary.average === null) return `New on the guide, ${reviews} so far`
  return `Rated ${summary.average.toFixed(1)} out of 5 by guests, ${reviews}, ${summary.label}`
}
