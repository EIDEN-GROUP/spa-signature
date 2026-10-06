import type {
  DistinctionLevel,
  Facility,
  FacilityId,
  LanguageCode,
  OccasionId,
  PriceBandId,
  RegionId,
  SpaTypeId,
  TreatmentCategory,
  VerifiedField,
  Weekday,
} from '../domain/types'

export const SPA_TYPES: { id: SpaTypeId; name: string; plural: string; aliases: string[] }[] = [
  { id: 'hotel-spa', name: 'Hotel spa', plural: 'Hotel spas', aliases: ['hotel', 'hotel spa', 'spa hotel', 'spa d hotel'] },
  { id: 'day-spa', name: 'Day spa', plural: 'Day spas', aliases: ['day spa', 'spa urbain', 'urban spa'] },
  {
    id: 'traditional-hammam',
    name: 'Traditional hammam',
    plural: 'Traditional hammams',
    aliases: ['traditional', 'traditional hammam', 'hammam traditionnel', 'beldi'],
  },
  { id: 'luxury-spa', name: 'Luxury spa', plural: 'Luxury spas', aliases: ['luxury', 'luxury spa', 'luxe', 'palace'] },
  {
    id: 'wellness-centre',
    name: 'Wellness centre',
    plural: 'Wellness centres',
    aliases: ['wellness centre', 'wellness center', 'centre de bien etre'],
  },
]

export const FACILITIES: Facility[] = [
  { id: 'pool', name: 'Pool', aliases: ['pool', 'piscine', 'swimming pool'] },
  { id: 'sauna', name: 'Sauna', aliases: ['sauna'] },
  { id: 'jacuzzi', name: 'Jacuzzi', aliases: ['jacuzzi', 'hot tub', 'whirlpool'] },
  { id: 'private-hammam', name: 'Private hammam', aliases: ['private hammam', 'hammam prive', 'hammam privatif'] },
  { id: 'couples-room', name: 'Couples room', aliases: ['couples room', 'duo room', 'cabine duo', 'double cabin'] },
  { id: 'gym', name: 'Gym', aliases: ['gym', 'fitness', 'salle de sport'] },
  { id: 'outdoor', name: 'Garden or terrace', aliases: ['outdoor', 'garden', 'terrace', 'jardin', 'terrasse', 'rooftop'] },
  { id: 'hotel-access', name: 'Hotel facilities', aliases: ['hotel access', 'day pass'] },
]

/** What each facility means on a profile, written out so no icon stands alone. */
export const FACILITY_NOTES: Record<FacilityId, string> = {
  pool: 'A pool guests can use before or after treatments',
  sauna: 'A dry sauna',
  jacuzzi: 'A heated whirlpool',
  'private-hammam': 'A hammam room you can reserve for yourself',
  'couples-room': 'A treatment room for two',
  gym: 'A fitness room',
  outdoor: 'A garden, patio or terrace to rest in',
  'hotel-access': 'Access to the hotel’s shared facilities',
}

export const OCCASIONS: { id: OccasionId; name: string; aliases: string[] }[] = [
  { id: 'solo', name: 'Time for myself', aliases: ['solo', 'alone', 'me time'] },
  { id: 'couple', name: 'For two', aliases: ['for two', 'romantic', 'anniversary', 'honeymoon'] },
  { id: 'friends', name: 'With friends', aliases: ['friends', 'group', 'bridal', 'hen', 'evjf'] },
  { id: 'celebration', name: 'A celebration', aliases: ['celebration', 'birthday', 'wedding', 'gift'] },
  { id: 'first-hammam', name: 'My first hammam', aliases: ['first hammam', 'first time', 'beginner'] },
  { id: 'after-sport', name: 'After sport or travel', aliases: ['after sport', 'after hiking', 'jet lag', 'surf', 'golf', 'trek'] },
]

/** Bands follow the price of the signature experience, in dirhams. */
export const PRICE_BANDS: { id: PriceBandId; name: string; range: string; min: number; max: number }[] = [
  { id: 1, name: 'Accessible', range: 'Under 400 MAD', min: 0, max: 399 },
  { id: 2, name: 'Mid-range', range: '400 to 800 MAD', min: 400, max: 800 },
  { id: 3, name: 'Premium', range: '800 to 1,500 MAD', min: 801, max: 1500 },
  { id: 4, name: 'Luxury', range: 'Over 1,500 MAD', min: 1501, max: Number.POSITIVE_INFINITY },
]

export function priceBandOf(priceMad: number): PriceBandId {
  return PRICE_BANDS.find((band) => priceMad >= band.min && priceMad <= band.max)?.id ?? 4
}

export const DISTINCTIONS: Record<DistinctionLevel, { name: string; meaning: string }> = {
  3: { name: 'Exceptional', meaning: 'A destination in itself. Worth planning a trip around.' },
  2: { name: 'Highly Recommended', meaning: 'Stands out in its city for setting, technique and service.' },
  1: {
    name: 'Signature Selection',
    meaning: 'Selected by our editors. Recommended without reservation in its category.',
  },
}

export const DISTINCTION_LEVELS: DistinctionLevel[] = [3, 2, 1]

export const RATING_CATEGORIES = [
  { id: 'service', name: 'Service' },
  { id: 'cleanliness', name: 'Cleanliness' },
  { id: 'treatments', name: 'Treatments' },
  { id: 'value', name: 'Value' },
  { id: 'atmosphere', name: 'Atmosphere' },
] as const

/** Below this many reviews a spa shows "New" and no average. */
export const RATING_MIN_REVIEWS = 10

export const LANGUAGES: Record<LanguageCode, string> = {
  ar: 'Arabic',
  fr: 'French',
  en: 'English',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
  zgh: 'Tamazight',
}

export const WEEKDAYS: { id: Weekday; name: string; short: string }[] = [
  { id: 'mon', name: 'Monday', short: 'Mon' },
  { id: 'tue', name: 'Tuesday', short: 'Tue' },
  { id: 'wed', name: 'Wednesday', short: 'Wed' },
  { id: 'thu', name: 'Thursday', short: 'Thu' },
  { id: 'fri', name: 'Friday', short: 'Fri' },
  { id: 'sat', name: 'Saturday', short: 'Sat' },
  { id: 'sun', name: 'Sunday', short: 'Sun' },
]

export const TREATMENT_CATEGORIES: { id: TreatmentCategory; name: string }[] = [
  { id: 'hammam', name: 'Hammam' },
  { id: 'rituals', name: 'Rituals and packages' },
  { id: 'massage', name: 'Massage' },
  { id: 'face', name: 'Face' },
  { id: 'body', name: 'Body' },
  { id: 'recovery', name: 'Recovery and movement' },
]

export const VERIFIED_FIELDS: { id: VerifiedField; name: string }[] = [
  { id: 'address', name: 'Address' },
  { id: 'phone', name: 'Phone and WhatsApp' },
  { id: 'website', name: 'Website' },
  { id: 'hours', name: 'Opening hours' },
  { id: 'prices', name: 'Prices' },
  { id: 'treatments', name: 'Treatment menu' },
  { id: 'facilities', name: 'Facilities' },
  { id: 'languages', name: 'Languages spoken' },
]

export const REGIONS: { id: RegionId; name: string; line: string; soon: string[] }[] = [
  {
    id: 'imperial-cities',
    name: 'Imperial cities',
    line: 'Riads, palaces and the oldest hammam culture in the country.',
    soon: ['Fès', 'Meknès'],
  },
  {
    id: 'atlantic-coast',
    name: 'Atlantic coast',
    line: 'Sea air, thalasso and long light from Casablanca down to the Souss.',
    soon: ['Essaouira', 'El Jadida'],
  },
  {
    id: 'north',
    name: 'The North',
    line: 'Where the Atlantic meets the Mediterranean, above the Strait.',
    soon: ['Tétouan', 'Chefchaouen'],
  },
  {
    id: 'mountains-desert',
    name: 'Mountains and desert',
    line: 'Atlas valleys and the edge of the Sahara. Our editors are on the road.',
    soon: ['Ouirgane', 'Ouarzazate', 'Merzouga'],
  },
]
