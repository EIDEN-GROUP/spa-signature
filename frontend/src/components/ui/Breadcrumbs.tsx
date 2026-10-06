import { Link } from 'react-router'
import { cx } from '@/lib/utils'

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumbs({ trail, className }: { trail: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cx('breadcrumbs', className)}>
      <ol>
        {trail.map((crumb, index) => (
          <li key={crumb.path}>
            {index < trail.length - 1 ? (
              <Link to={crumb.path}>{crumb.name}</Link>
            ) : (
              <span aria-current="page">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
