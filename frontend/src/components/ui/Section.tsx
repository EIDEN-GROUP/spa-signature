import type { CSSProperties, ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import type { Faq as FaqItem } from '@/lib/types'
import { cx } from '@/lib/utils'

interface SectionHeadProps {
  label?: ReactNode
  title: ReactNode
  lede?: ReactNode
  /** A link out of the section, set beside the title on wide screens. */
  action?: ReactNode
  id?: string
  className?: string
}

/** The opening of a section: a small label, a serif title, an optional line and a way onward. */
export function SectionHead({ label, title, lede, action, id, className }: SectionHeadProps) {
  return (
    <div className={cx('section-head', className)}>
      <div className="section-titles">
        {label ? <p className="label">{label}</p> : null}
        <h2 id={id} className="h2">
          {title}
        </h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  )
}

interface PageHeadProps {
  trail?: Crumb[]
  label?: ReactNode
  title: ReactNode
  lede?: ReactNode
  /** A dated line under the title: "Updated October 2026 · 3 minute read". */
  meta?: ReactNode
  children?: ReactNode
  className?: string
}

/** The top of a page: where you are, what this is, and one sentence on why it matters. */
export function PageHead({ trail, label, title, lede, meta, children, className }: PageHeadProps) {
  return (
    <header className={cx('container', 'section-page', className)}>
      {trail ? <Breadcrumbs trail={trail} /> : null}
      <div className="section-page-titles">
        {label ? <p className="label">{label}</p> : null}
        <h1 className="h1">{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
        {meta ? <p className="section-meta">{meta}</p> : null}
      </div>
      {children}
    </header>
  )
}

interface ScrollerProps {
  children: ReactNode
  /** Names the group for assistive technology. */
  label: string
  /** Columns once there is room for a grid. */
  columns?: 2 | 3 | 4 | 5
  /** Width of one item on a phone, leaving the next one peeking in. */
  peek?: string
  className?: string
}

/**
 * A row you swipe on a phone, with the next item peeking in so the gesture is
 * obvious, and a plain grid once the screen is wide enough to show everything.
 * Native scrolling only: no autoplay, no script in the gesture.
 */
export function Scroller({ children, label, columns = 3, peek = '76%', className }: ScrollerProps) {
  return (
    <div
      className={cx('section-scroller', className)}
      style={{ '--cols': columns, '--peek': peek } as CSSProperties}
      role="group"
      aria-label={label}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

/** Questions that open in place. Native <details>: works without script. */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cx('section-faq', className)}>
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            <span>{item.question}</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
