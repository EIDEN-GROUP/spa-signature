import { DISTINCTIONS } from '@/lib/taxonomy'
import type { DistinctionLevel } from '@/lib/types'
import { cx } from '@/lib/utils'

interface DistinctionProps {
  level: DistinctionLevel
  year?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Distinction({ level, year, size = 'md', className }: DistinctionProps) {
  return (
    <span className={cx('distinction', `distinction-${size}`, className)}>
      <span className="distinction-marks" aria-hidden="true">
        {Array.from({ length: level }, (_, index) => (
          <svg key={index} viewBox="6.2 7.6 11.6 17.4" focusable="false">
            <use href="#m-door" />
          </svg>
        ))}
      </span>
      <span className="distinction-name">
        {DISTINCTIONS[level].name}
        {year ? <span className="distinction-year"> {year}</span> : null}
      </span>
    </span>
  )
}

/** The doorways alone. Only for use directly beside a written distinction name. */
export function DistinctionMarks({ level, className }: { level: DistinctionLevel; className?: string }) {
  return (
    <span className={cx('distinction-marks', 'distinction-lg', className)} aria-hidden="true">
      {Array.from({ length: level }, (_, index) => (
        <svg key={index} viewBox="6.2 7.6 11.6 17.4" focusable="false">
          <use href="#m-door" />
        </svg>
      ))}
    </span>
  )
}
