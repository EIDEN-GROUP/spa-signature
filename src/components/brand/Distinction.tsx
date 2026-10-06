import { DISTINCTIONS } from '../../data/taxonomy'
import type { DistinctionLevel } from '../../domain/types'
import { cx } from '../../lib/cx'
import styles from './Distinction.module.css'

interface DistinctionProps {
  level: DistinctionLevel
  /** Adds the edition, as on a profile: "Exceptional 2026". */
  year?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * An editorial distinction: one to three brass doorways, always with the name
 * written out. Brass appears nowhere else in the interface, so if it is brass,
 * the editors decided it.
 */
export function Distinction({ level, year, size = 'md', className }: DistinctionProps) {
  return (
    <span className={cx(styles.distinction, styles[size], className)}>
      <span className={styles.marks} aria-hidden="true">
        {Array.from({ length: level }, (_, index) => (
          <svg key={index} viewBox="6.2 7.6 11.6 17.4" focusable="false">
            <use href="#m-door" />
          </svg>
        ))}
      </span>
      <span className={styles.name}>
        {DISTINCTIONS[level].name}
        {year ? <span className={styles.year}> {year}</span> : null}
      </span>
    </span>
  )
}

/** The doorways alone. Only for use directly beside a written distinction name. */
export function DistinctionMarks({ level, className }: { level: DistinctionLevel; className?: string }) {
  return (
    <span className={cx(styles.marks, styles.lg, className)} aria-hidden="true">
      {Array.from({ length: level }, (_, index) => (
        <svg key={index} viewBox="6.2 7.6 11.6 17.4" focusable="false">
          <use href="#m-door" />
        </svg>
      ))}
    </span>
  )
}
