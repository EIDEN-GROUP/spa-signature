import { cx } from '@/lib/utils'

/** The eight-pointed star of zellige work: two squares, one turned. An ornament, never a control. */
export function Khatam({ className }: { className?: string }) {
  return (
    <svg className={cx('khatam', className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <use href="#m-khatam" />
    </svg>
  )
}

interface EyebrowProps {
  children: string
  className?: string
}

/** The small label that opens a section, marked with the star. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cx('label', 'eyebrow', className)}>
      <Khatam />
      <span>{children}</span>
    </p>
  )
}
