import { WEEKDAYS } from '@/lib/taxonomy'
import type { DayHours, OpeningHours, Weekday } from '@/lib/types'

/** The time on the wall in Morocco, wherever the reader is. */
export interface MoroccoTime {
  weekday: Weekday
  minutes: number
}

const ORDER: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const CLOCK = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Casablanca',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export function moroccoTime(date: Date = new Date()): MoroccoTime {
  const parts = CLOCK.formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  const weekday = get('weekday').slice(0, 3).toLowerCase() as Weekday
  return { weekday, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMinutes = (clock: string) => {
  const [h, m] = clock.split(':').map(Number)
  return h * 60 + m
}

const dayName = (day: Weekday) => WEEKDAYS.find((d) => d.id === day)?.name ?? day

export interface OpenStatus {
  open: boolean
  /** "Open now" or "Closed now" */
  label: string
  /** "until 20:00", "opens at 10:00", "opens Tuesday at 10:00" */
  detail: string
}

export function openStatus(hours: OpeningHours, now: MoroccoTime): OpenStatus {
  const today = hours.weekly[now.weekday]
  if (today && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
    return { open: true, label: 'Open now', detail: `until ${today.close}` }
  }
  if (today && now.minutes < toMinutes(today.open)) {
    return { open: false, label: 'Closed now', detail: `opens at ${today.open}` }
  }
  const start = ORDER.indexOf(now.weekday)
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = ORDER[(start + offset) % 7]
    const next = hours.weekly[day]
    if (next) {
      const when = offset === 1 ? 'tomorrow' : dayName(day)
      return { open: false, label: 'Closed now', detail: `opens ${when} at ${next.open}` }
    }
  }
  return { open: false, label: 'Closed', detail: '' }
}

export function hoursText(day: DayHours | null): string {
  return day ? `${day.open} to ${day.close}` : 'Closed'
}

export interface HoursGroup {
  days: string
  hours: string
  includes: Weekday[]
}

/** Collapse the week into runs of identical days: "Tuesday to Sunday, 10:00 to 19:00". */
export function groupedHours(weekly: OpeningHours['weekly']): HoursGroup[] {
  const groups: { from: Weekday; to: Weekday; hours: string; includes: Weekday[] }[] = []
  for (const day of ORDER) {
    const text = hoursText(weekly[day])
    const last = groups.at(-1)
    if (last && last.hours === text) {
      last.to = day
      last.includes.push(day)
    } else {
      groups.push({ from: day, to: day, hours: text, includes: [day] })
    }
  }
  return groups.map((group) => ({
    days:
      group.includes.length === 7
        ? 'Every day'
        : group.from === group.to
          ? dayName(group.from)
          : `${dayName(group.from)} to ${dayName(group.to)}`,
    hours: group.hours,
    includes: group.includes,
  }))
}

/** schema.org day names, for structured data. */
export const SCHEMA_DAY: Record<Weekday, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}
