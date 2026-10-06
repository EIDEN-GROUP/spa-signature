import { Icon } from '@/components/ui/Icon'
import { useMoroccoTime } from '@/hooks/use-morocco-time'
import { groupedHours, openStatus } from '@/lib/hours'
import type { OpeningHours } from '@/lib/types'
import { cx } from '@/lib/utils'

/**
 * "Open now, until 20:00", by the clock in Morocco rather than the reader's.
 * The server cannot know the time, so until the page is live in the browser
 * this is a plain link to the opening hours, on the same single line.
 */
export function OpenNow({ hours, className }: { hours: OpeningHours; className?: string }) {
  const now = useMoroccoTime()
  const status = now ? openStatus(hours, now) : null

  return (
    <p className={cx('hours-status', className)}>
      <Icon name="clock" />
      {status ? (
        <span>
          <b className={status.open ? 'hours-open' : undefined}>{status.label}</b>
          {status.detail ? `, ${status.detail}` : ''}
          <span className="hours-zone"> · Morocco time</span>
        </span>
      ) : (
        <a href="#practical" className="link">
          Opening hours
        </a>
      )}
    </p>
  )
}

/** The week, collapsed into runs of identical days, with today picked out once known. */
export function HoursTable({ hours }: { hours: OpeningHours }) {
  const now = useMoroccoTime()
  return (
    <table className="hours-table">
      <caption className="visually-hidden">Opening hours</caption>
      <tbody>
        {groupedHours(hours.weekly).map((group) => {
          const today = now !== null && group.includes.includes(now.weekday)
          return (
            <tr key={group.days} className={today ? 'hours-today' : undefined}>
              <th scope="row">
                {group.days}
                {today ? <span className="hours-today-tag"> · today</span> : null}
              </th>
              <td>{group.hours}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
