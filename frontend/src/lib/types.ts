// The public data model. Every page is a view over these shapes.
//
// Two things are deliberately absent: the editors' internal assessment and any
// commercial agreement. Neither can be reached from a public type, so neither
// can leak into a card, a sort order or a filter.

// ── Taxonomy ────────────────────────────────────────────────────────────────

export type CityId = 'marrakech' | 'casablanca' | 'agadir' | 'rabat' | 'tangier'
export type RegionId = 'imperial-cities' | 'atlantic-coast' | 'north' | 'mountains-desert'
export type ExperienceId = 'hammam' | 'massage' | 'beauty' | 'wellness' | 'couples' | 'recovery'
export type SpaTypeId = 'hotel-spa' | 'day-spa' | 'traditional-hammam' | 'luxury-spa' | 'wellness-centre'
export type FacilityId =
  | 'pool'
  | 'sauna'
  | 'jacuzzi'
  | 'private-hammam'
  | 'couples-room'
  | 'gym'
  | 'outdoor'
  | 'hotel-access'
export type OccasionId = 'solo' | 'couple' | 'friends' | 'celebration' | 'first-hammam' | 'after-sport'
export type PriceBandId = 1 | 2 | 3 | 4
export type LanguageCode = 'ar' | 'fr' | 'en' | 'es' | 'de' | 'it' | 'zgh'
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type IsoDate = `${number}-${number}-${number}`

// ── Media ───────────────────────────────────────────────────────────────────

export interface Media {
  src: string
  alt: string
  caption?: string
  focus?: string
  type?: 'image' | 'video'
}

// ── Places and experiences ──────────────────────────────────────────────────

export interface Neighbourhood {
  id: string
  name: string
  /** Other spellings people type: "gueliz", "medina", "ain diab". */
  aliases?: string[]
}

export interface Faq {
  question: string
  answer: string
}

export interface City {
  id: CityId
  slug: string
  name: string
  aliases: string[]
  region: RegionId
  /** One line for tiles and cards. */
  tagline: string
  /** Editorial introduction, one string per paragraph. */
  intro: string[]
  image: Media
  neighbourhoods: Neighbourhood[]
  practical: {
    prices: string
    etiquette: string
    gettingAround: string
    ramadan: string
  }
  faq: Faq[]
}

export interface Experience {
  id: ExperienceId
  slug: string
  name: string
  /** One-line promise, for tiles. */
  promise: string
  /** What people say when they want this. */
  inTheirWords: string
  intro: string[]
  expect: { title: string; text: string }[]
  image: Media
  aliases: string[]
  faq: Faq[]
}

export interface Facility {
  id: FacilityId
  name: string
  aliases?: string[]
}

// ── A spa ───────────────────────────────────────────────────────────────────

export type TreatmentCategory = 'hammam' | 'massage' | 'face' | 'body' | 'rituals' | 'recovery'

export interface Treatment {
  id: string
  name: string
  category: TreatmentCategory
  durationMin: number
  priceMad: number
  note?: string
}

export interface DayHours {
  open: string // "10:00"
  close: string // "21:00"
}

export interface OpeningHours {
  /** null means closed that day. */
  weekly: Record<Weekday, DayHours | null>
  /** Traditional hammams often split the day. */
  hammam?: { women: string; men: string; mixed?: string }
  ramadan: string
  lastEntry?: string
}

export interface ContactInformation {
  /** E.164, digits only after the plus. */
  phone: string
  whatsapp?: string
  website?: string
  email?: string
  address: {
    street: string
    postalCode: string
  }
  coordinates: { lat: number; lng: number }
  accessNotes: string
}

/** What guests think. Editors never edit it and no one can buy it. */
export interface Rating {
  /** Reviews per star, five first: [5★, 4★, 3★, 2★, 1★]. */
  distribution: [number, number, number, number, number]
  categories: {
    service: number
    cleanliness: number
    treatments: number
    value: number
    atmosphere: number
  }
}

/** 1 Signature Selection · 2 Highly Recommended · 3 Exceptional. */
export type DistinctionLevel = 1 | 2 | 3

/** What the editors recommend. Earned, reviewed yearly, never sold. */
export interface Selection {
  level: DistinctionLevel
  year: number
  assessedOn: IsoDate
  reasons: {
    setting: string
    technique: string
    hygiene: string
    welcome: string
  }
}

export interface SignatureExperience {
  /** Points at one of the spa's treatments. */
  treatmentId: string
  summary: string
  includes: string[]
  forWhom: string
}

export interface Verdict {
  text: string
  bestFor: string[]
  visitedOn: IsoDate
}

export type VerifiedField = 'address' | 'phone' | 'website' | 'hours' | 'prices' | 'facilities' | 'languages' | 'treatments'

export interface Spa {
  id: string
  slug: string
  name: string
  type: SpaTypeId
  cityId: CityId
  neighbourhoodId: string
  /** One line, ninety characters at most, written by editors, never by the spa. */
  descriptor: string
  verdict: Verdict
  signature: SignatureExperience
  selection: Selection | null
  rating: Rating
  treatments: Treatment[]
  facilities: FacilityId[]
  experiences: ExperienceId[]
  occasions: OccasionId[]
  languages: LanguageCode[]
  hours: OpeningHours
  contact: ContactInformation
  practical: {
    payment: string[]
    parking: string
    accessibility: string
    goodToKnow: string[]
  }
  media: {
    /** Portrait lead: feature cards, the profile, social cards. */
    lead: Media
    /** 4:3 crop for grid cards. */
    card: Media
    gallery: Media[]
  }
  /** Each fact carries the date we last checked it. */
  verified: Record<VerifiedField, IsoDate>
}

// ── Projections ─────────────────────────────────────────────────────────────

export type RatingLabel = 'Excellent' | 'Very good' | 'Good' | 'Fair' | 'Poor'

/** A rating as the public sees it. Below ten reviews there is no average. */
export interface RatingSummary {
  average: number | null
  count: number
  label: RatingLabel | null
}

/** Everything a card may show, and nothing else. Lists read this, not Spa. */
export interface SpaCardData {
  id: string
  slug: string
  name: string
  typeLabel: string
  cityName: string
  neighbourhoodName: string
  image: Media
  leadImage: Media
  selection: { level: DistinctionLevel; year: number } | null
  rating: RatingSummary
  descriptor: string
  signature: { name: string; durationMin: number }
  priceFrom: number
  verdictLine: string
}

// ── Editorial ───────────────────────────────────────────────────────────────

export type ArticleCategory = 'guide' | 'ritual' | 'picks' | 'education' | 'destination'

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string }
  | { type: 'figure'; media: Media }
  | { type: 'facts'; rows: { label: string; value: string }[]; caption?: string }
  | { type: 'spas'; ids: string[]; title: string }

export interface EditorialArticle {
  id: string
  slug: string
  title: string
  /** The standfirst. */
  dek: string
  category: ArticleCategory
  author: string
  publishedOn: IsoDate
  updatedOn: IsoDate
  readMinutes: number
  image: Media
  body: ArticleBlock[]
  /** Spas the article leads to: no guide ends in a dead end. */
  spaIds: string[]
  cityId?: CityId
  experienceId?: ExperienceId
}
