import { cx } from '../../lib/cx'
import { LOCKUP, MARK } from './logo.generated'
import styles from './Logo.module.css'

/**
 * The Spa Maroc Signature lockup: a wall with a doorway of light, standing over
 * its reflection, beside the outlined wordmark. Drawn from the shared sprite,
 * so it never waits for a font and costs one copy of its paths per page.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cx(styles.logo, className)}
      viewBox={`0 0 ${LOCKUP.width} ${LOCKUP.height}`}
      role="img"
      aria-label="Spa Maroc Signature"
    >
      <use href="#logo" />
    </svg>
  )
}

/** The mark alone, for places where the name is already written beside it. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={cx(styles.mark, className)} viewBox={`0 0 ${MARK.width} ${MARK.height}`} aria-hidden="true" focusable="false">
      <use href="#mark" />
    </svg>
  )
}
