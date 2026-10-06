import { LOCKUP, MARK } from '@/lib/logo'
import { cx } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <svg className={cx('logo', className)} viewBox={`0 0 ${LOCKUP.width} ${LOCKUP.height}`} role="img" aria-label="Spa Maroc Signature">
      <use href="#logo" />
    </svg>
  )
}

/** The mark alone, for places where the name is already written beside it. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={cx('logo-mark', className)} viewBox={`0 0 ${MARK.width} ${MARK.height}`} aria-hidden="true" focusable="false">
      <use href="#mark" />
    </svg>
  )
}
