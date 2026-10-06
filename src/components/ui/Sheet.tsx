import { type ReactNode, useEffect, useId, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'
import styles from './Sheet.module.css'

interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  /**
   * bottom: rises from the bottom edge on phones, a side drawer on wide screens.
   * cover:  takes the whole screen on phones, a panel under the header on wide screens.
   */
  variant?: 'bottom' | 'cover'
  /** Hide the title visually when the content speaks for itself. */
  hideTitle?: boolean
  /** Pinned under the scrolling content: the action that closes the sheet. */
  footer?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * A modal sheet built on the native <dialog>: the browser traps focus, closes
 * on Escape and makes the rest of the page inert. Content is mounted the first
 * time the sheet opens, so closed sheets cost nothing.
 */
export function Sheet({ open, onClose, title, variant = 'bottom', hideTitle, footer, children, className }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [mounted, setMounted] = useState(false)
  if (open && !mounted) setMounted(true)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={cx(styles.sheet, styles[variant], className)}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        // The dialog has no padding, so a click on it is a click on the backdrop.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {mounted ? (
        <div className={styles.panel}>
          <header className={cx(styles.header, hideTitle && styles.bare)}>
            <h2 id={titleId} className={hideTitle ? 'visually-hidden' : styles.title}>
              {title}
            </h2>
            <button type="button" className={styles.close} onClick={onClose}>
              <Icon name="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </header>
          <div className={styles.body}>{children}</div>
          {footer ? <footer className={styles.footer}>{footer}</footer> : null}
        </div>
      ) : null}
    </dialog>
  )
}
