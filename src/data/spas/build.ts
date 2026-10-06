// Small builders that keep the spa fixtures readable.

import type {
  DayHours,
  IsoDate,
  OpeningHours,
  Treatment,
  TreatmentCategory,
  VerifiedField,
  Weekday,
} from '../../domain/types'

const DAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

/** The same hours every day, with exceptions. `null` closes a day. */
export function week(
  open: string,
  close: string,
  exceptions: Partial<Record<Weekday, DayHours | null>> = {},
): OpeningHours['weekly'] {
  const weekly = Object.fromEntries(DAYS.map((day) => [day, { open, close }])) as Record<Weekday, DayHours | null>
  return { ...weekly, ...exceptions }
}

export function treatment(
  id: string,
  name: string,
  category: TreatmentCategory,
  durationMin: number,
  priceMad: number,
  note?: string,
): Treatment {
  return { id, name, category, durationMin, priceMad, ...(note ? { note } : {}) }
}

/** Every fact checked on one date, with the few that were checked separately. */
export function verifiedOn(date: IsoDate, exceptions: Partial<Record<VerifiedField, IsoDate>> = {}): Record<VerifiedField, IsoDate> {
  return {
    address: date,
    phone: date,
    website: date,
    hours: date,
    prices: date,
    facilities: date,
    languages: date,
    treatments: date,
    ...exceptions,
  }
}
