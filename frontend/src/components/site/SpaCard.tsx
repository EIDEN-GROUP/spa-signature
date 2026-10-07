import { Link } from 'react-router'
import { Distinction } from '@/components/site/Distinction'
import { RatingInline } from '@/components/site/Stars'
import { Icon } from '@/components/ui/Icon'
import { Picture } from '@/components/ui/Picture'
import { track } from '@/lib/analytics'
import { paths } from '@/lib/paths'
import type { SpaCardData } from '@/lib/types'
import { cx, formatDuration } from '@/lib/utils'

interface SpaCardProps {
  spa: SpaCardData
  /**
   * grid:    lists; a 4:3 photograph over the essentials.
   * compact: related spas and dense lists; a thumbnail beside the essentials.
   * feature: editorial picks; a 4:5 photograph and a line of the verdict.
   */
  variant?: 'grid' | 'compact' | 'feature'
  /** A paid placement. Same anatomy, labelled, and it never carries a mark it has not earned. */
  sponsored?: boolean
  /** Heading level of the name, so the page outline stays correct. */
  as?: 'h2' | 'h3' | 'h4'
  /** Replaces the editorial descriptor, e.g. the editors' "why now". */
  note?: string
  /** Load the photograph eagerly: only for the first card above the fold. */
  priority?: boolean
  /** Where the card sits, for analytics: which list and at what position. */
  list?: string
  position?: number
  className?: string
}

/**
 * The card says just enough to decide whether to look closer: what and where,
 * who vouches for it, what it is like, what it costs. Everything it shows
 * comes from SpaCardData. Contact details live on the profile.
 */
export function SpaCard({
  spa,
  variant = 'grid',
  sponsored = false,
  as: Heading = 'h3',
  note,
  priority,
  list,
  position,
  className,
}: SpaCardProps) {
  const image = variant === 'feature' ? spa.leadImage : spa.image
  const ratio = variant === 'feature' ? '4 / 5' : variant === 'compact' ? '1 / 1' : '4 / 3'

  return (
    <article className={cx('spa-card', `spa-card-${variant}`, sponsored && 'spa-card-sponsored', className)}>
      <Picture
        media={image}
        ratio={ratio}
        priority={priority}
        className="spa-card-media"
        decorative
      />

      <div className="spa-card-body">
        {sponsored ? (
          <p className="spa-card-paid">Sponsored</p>
        ) : spa.selection ? (
          <Distinction level={spa.selection.level} size={variant === 'compact' ? 'sm' : 'md'} />
        ) : null}

        <Heading className="spa-card-name">
          <Link
            to={paths.spa(spa.slug)}
            className="spa-card-link"
            onClick={() => {
              if (list) track('search_result_click', { spa_id: spa.id, position: position ?? 0, list })
            }}
          >
            {spa.name}
          </Link>
        </Heading>

        <p className="spa-card-place">
          {spa.neighbourhoodName}, {spa.cityName}
          {variant !== 'compact' ? <span className="spa-card-type"> · {spa.typeLabel}</span> : null}
        </p>

        <RatingInline rating={spa.rating} className="spa-card-rating" />

        {variant !== 'compact' ? (
          <p className="voice spa-card-descriptor">{note ?? (variant === 'feature' ? spa.verdictLine : spa.descriptor)}</p>
        ) : null}

        <div className="spa-card-foot">
          <p className="spa-card-signature">
            <span className="spa-card-ritual">{spa.signature.name}</span>
            <span className="spa-card-facts">
              {formatDuration(spa.signature.durationMin)}
            </span>
          </p>
          <span className="spa-card-cta" aria-hidden="true">
            <span>View spa</span>
            <Icon name="arrow-right" />
          </span>
        </div>
      </div>
    </article>
  )
}

/** The same footprint as a grid card while results load: no spinner, no layout shift. */
export function SpaCardSkeleton() {
  return (
    <div className="spa-card spa-card-grid spa-card-skeleton" aria-hidden="true">
      <div className="spa-card-media" style={{ aspectRatio: '4 / 3' }} />
      <div className="spa-card-body">
        <span style={{ width: '40%' }} />
        <span style={{ width: '75%', height: '1.5rem' }} />
        <span style={{ width: '55%' }} />
        <span style={{ width: '90%' }} />
      </div>
    </div>
  )
}
