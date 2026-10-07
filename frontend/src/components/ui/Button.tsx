import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cx } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  /** Clay, once per view. Everything else is secondary or quiet. */
  variant?: 'primary' | 'secondary' | 'quiet'
  icon?: IconName
  /** Trailing arrow, for actions that go somewhere. */
  arrow?: boolean
  /** Stretch to the width of the container. */
  block?: boolean
  /** An internal route. */
  to?: string
  /** An outside address: WhatsApp, a phone number, a website, a map. */
  href?: string
  /** Opens a new tab. Phone links stay in place. */
  external?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  'aria-label'?: string
  'aria-expanded'?: boolean
  'aria-controls'?: string
}

/** One button, rendered as a route link, an outside link or a real button. */
export function Button({
  children,
  variant = 'secondary',
  icon,
  arrow,
  block,
  to,
  href,
  external,
  type = 'button',
  disabled,
  onClick,
  className,
  ...aria
}: ButtonProps) {
  const classes = cx('button', `button-${variant}`, block && 'button-block', className)
  const content = (
    <>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
      {arrow ? <Icon name="arrow-right" className="button-arrow" /> : null}
    </>
  )

  if (to !== undefined) {
    return (
      <Link className={classes} to={to} onClick={onClick} {...aria}>
        {content}
      </Link>
    )
  }
  if (href !== undefined) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...aria}
      >
        {content}
      </a>
    )
  }
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick} {...aria}>
      {content}
    </button>
  )
}

interface ArrowLinkProps {
  to: string
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

/** A text link that leads somewhere: underlined words and an arrow. */
export function ArrowLink({ to, children, className, onClick }: ArrowLinkProps) {
  return (
    <Link className={cx('button-arrow-link', className)} to={to} onClick={onClick}>
      <span>{children}</span>
      <Icon name="arrow-right" />
    </Link>
  )
}
