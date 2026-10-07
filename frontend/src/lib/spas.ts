import spaAsif from '@/assets/spa-asif.webp'
import spaAtelierSpartel from '@/assets/spa-atelier-spartel.webp'
import spaBabElAssa from '@/assets/spa-bab-el-assa.webp'
import spaBainsAgdal from '@/assets/spa-bains-agdal.webp'
import spaBainsHabous from '@/assets/spa-bains-habous.webp'
import spaCercleSouissi from '@/assets/spa-cercle-souissi.webp'
import spaDarTassa from '@/assets/spa-dar-tassa.webp'
import spaJardinArgile from '@/assets/spa-jardin-argile.webp'
import spaMaisonGauthier from '@/assets/spa-maison-gauthier.webp'
import spaMaisonOudaya from '@/assets/spa-maison-oudaya.webp'
import spaOceane from '@/assets/spa-oceane.webp'
import spaRiadSahrij from '@/assets/spa-riad-sahrij.webp'
import spaTalborjt from '@/assets/spa-talborjt.webp'
import spaTifawt from '@/assets/spa-tifawt.webp'
import spaVillaMarshan from '@/assets/spa-villa-marshan.webp'
import type {
  DayHours,
  IsoDate,
  Media,
  OpeningHours,
  Spa,
  Treatment,
  TreatmentCategory,
  VerifiedField,
  Weekday,
} from '@/lib/types'

const riadSahrijPhoto: Media = { src: spaRiadSahrij, alt: 'A green zellige basin and its fountain in a terracotta courtyard, between two potted trees', focus: '50% 89%' }
const darTassaPhoto: Media = { src: spaDarTassa, alt: 'Water poured from an engraved bowl into a tadelakt basin, beside two hammam pails', focus: '50% 26%' }
const jardinArgilePhoto: Media = { src: spaJardinArgile, alt: 'A green pool in a walled garden, seen through banana leaves and bougainvillea', focus: '50% 100%' }
const oceanePhoto: Media = { src: spaOceane, alt: 'An indoor pool beneath a white arched pavilion hung with brass lanterns' }
const maisonGauthierPhoto: Media = { src: spaMaisonGauthier, alt: 'Roses floating in a scalloped marble basin beneath a running spout', focus: '50% 85%' }
const bainsHabousPhoto: Media = { src: spaBainsHabous, alt: 'A round mosaic basin in a tiled niche, a jug and bowl on its rim', focus: '50% 76%' }
const asifPhoto: Media = { src: spaAsif, alt: 'Woven rugs, cushions and low tables on a terrace above the rocky Atlantic shore', focus: '50% 74%' }
const tifawtPhoto: Media = { src: spaTifawt, alt: 'A keyhole-arched door in a wooden lattice, open onto the Atlantic', focus: '50% 63%' }
const talborjtPhoto: Media = { src: spaTalborjt, alt: 'Tiled hammam benches in terracotta and sea-green zellige', focus: '50% 83%' }
const maisonOudayaPhoto: Media = { src: spaMaisonOudaya, alt: 'A horseshoe-arched alcove edged in green zellige, a white towel hanging beside it', focus: '50% 21%' }
const bainsAgdalPhoto: Media = { src: spaBainsAgdal, alt: 'A treatment table laid with linen in a grey tadelakt room', focus: '50% 85%' }
const cercleSouissiPhoto: Media = { src: spaCercleSouissi, alt: 'A narrow indoor pool seen through an arch, lined with tall cacti in clay pots', focus: '50% 66%' }
const villaMarshanPhoto: Media = { src: spaVillaMarshan, alt: 'A white arch opening onto garden windows, a green glass lantern hanging above', focus: '50% 30%' }
const babElAssaPhoto: Media = { src: spaBabElAssa, alt: 'A hand filling a brass bowl at a brass tap above a carved marble basin', focus: '50% 30%' }
const atelierSpartelPhoto: Media = { src: spaAtelierSpartel, alt: 'A pale pool under white arches, framed by banana leaves' }

// ── Builders that keep the records readable ─────────────────────────────────────

const DAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

/** The same hours every day, with exceptions. `null` closes a day. */
function week(
  open: string,
  close: string,
  exceptions: Partial<Record<Weekday, DayHours | null>> = {},
): OpeningHours['weekly'] {
  const weekly = Object.fromEntries(DAYS.map((day) => [day, { open, close }])) as Record<Weekday, DayHours | null>
  return { ...weekly, ...exceptions }
}

function treatment(
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
function verifiedOn(date: IsoDate, exceptions: Partial<Record<VerifiedField, IsoDate>> = {}): Record<VerifiedField, IsoDate> {
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

// ── Marrakech ───────────────────────────────────────────────────────────────────

const MARRAKECH: Spa[] = [
  {
    id: 'riad-sahrij',
    slug: 'riad-sahrij-spa-marrakech',
    name: 'Le Spa du Riad Sahrij',
    type: 'luxury-spa',
    cityId: 'marrakech',
    neighbourhoodId: 'kasbah',
    descriptor: 'A courtyard pool, carved plaster and a hammam ritual that takes its time.',
    verdict: {
      text: 'Few places in Marrakech slow you down this completely. The spa is built around a still green pool under carved plaster, and everything follows from that calm: a hammam done at the pace of the old bathhouses, therapists who ask before they act, tea served where you can hear the water. Come for an afternoon, not an hour.',
      bestFor: ['A whole afternoon', 'Couples', 'A celebration'],
      visitedOn: '2026-03-14',
    },
    signature: {
      treatmentId: 'grand-rituel',
      summary:
        'The full Moroccan sequence in a private hammam, followed by an hour of argan oil massage and tea beside the pool.',
      includes: [
        'Private hammam with black soap and kessa gommage',
        'Rhassoul and rose-water body wrap',
        'Sixty-minute argan oil massage',
        'Mint tea and pastries by the courtyard pool',
        'Use of the pool before and after',
      ],
      forWhom: 'Anyone who wants the complete ritual once, done properly. Bookable for one, or for two in the duo suite.',
    },
    selection: {
      level: 3,
      year: 2026,
      assessedOn: '2026-03-14',
      reasons: {
        setting:
          'A riad courtyard restored without gilding: lime plaster, zellige to shoulder height and one pool. Nothing has been added to impress.',
        technique:
          'The gommage is slow and complete, the massage adapted after a real conversation. Two visits, two different therapists, the same standard.',
        hygiene: 'Fresh linen for every guest, hammam rooms rinsed and aired between sessions, products decanted in view.',
        welcome: 'Met at the gate, never hurried, never sold to. Staff remember how you take your tea.',
      },
    },
    rating: {
      distribution: [284, 32, 8, 2, 1],
      categories: { service: 4.7, cleanliness: 4.9, treatments: 4.8, value: 4.6, atmosphere: 4.9 },
    },
    treatments: [
      treatment('hammam-beldi', 'Hammam beldi and gommage', 'hammam', 60, 650),
      treatment('hammam-rhassoul', 'Hammam, rhassoul and rose', 'hammam', 90, 950),
      treatment('grand-rituel', 'Le Grand Rituel du Sahrij', 'rituals', 150, 2400),
      treatment('rituel-deux', 'Le Grand Rituel for two', 'rituals', 150, 4400, 'Price for two guests'),
      treatment('massage-argan', 'Argan oil massage', 'massage', 60, 900),
      treatment('massage-deep', 'Deep-tissue massage', 'massage', 75, 1150),
      treatment('massage-four', 'Four-hands massage', 'massage', 60, 1600),
      treatment('facial-rose', 'Rose and prickly-pear facial', 'face', 60, 850),
    ],
    facilities: ['pool', 'private-hammam', 'couples-room', 'outdoor', 'hotel-access'],
    experiences: ['hammam', 'massage', 'couples', 'wellness', 'beauty'],
    occasions: ['couple', 'celebration', 'solo', 'first-hammam'],
    languages: ['ar', 'fr', 'en', 'es'],
    hours: {
      weekly: week('10:00', '20:00'),
      ramadan: '10:00 to 17:00, then 20:30 to 23:00',
      lastEntry: 'The last ritual starts at 17:30',
    },
    contact: {
      phone: '+212500000101',
      whatsapp: '+212500000101',
      website: 'https://www.riad-sahrij.example',
      email: 'spa@riad-sahrij.example',
      address: { street: '12 Derb Sahrij, Kasbah', postalCode: '40040' },
      coordinates: { lat: 31.6168, lng: -7.9882 },
      accessNotes:
        'Cars stop at Bab Agnaou. The riad sends someone to meet you at the gate; allow five minutes on foot through the Kasbah.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Guarded car park at Bab Agnaou, 300 metres away',
      accessibility: 'Step-free from the lane to the courtyard and one treatment room. The hammam has two steps.',
      goodToKnow: [
        'Arrive twenty minutes early to use the pool',
        'Bring swimwear for the pool; everything else is provided',
        'Guests aged 16 and over',
      ],
    },
    media: {
      lead: riadSahrijPhoto,
      card: riadSahrijPhoto,
      gallery: [riadSahrijPhoto],
    },
    verified: verifiedOn('2026-09-12', { prices: '2026-09-28' }),
  },
  {
    id: 'dar-tassa',
    slug: 'hammam-dar-tassa-marrakech',
    name: 'Hammam Dar Tassa',
    type: 'traditional-hammam',
    cityId: 'marrakech',
    neighbourhoodId: 'medina',
    descriptor: 'A restored riad hammam where the gommage is done slowly and well.',
    verdict: {
      text: 'Dar Tassa is the hammam we send first-timers to. The rooms are small, vaulted and properly hot, the black soap is made for the house in the Ourika valley, and the attendants scrub the way their mothers did: without rushing and without theatre. There is no pool and no long menu to study. That is the point.',
      bestFor: ['A first hammam', 'The real sequence', 'Good value'],
      visitedOn: '2026-02-21',
    },
    signature: {
      treatmentId: 'hammam-beldi',
      summary: 'Steam, black soap, a thorough gommage by an attendant and rhassoul clay, in a vaulted room of your own.',
      includes: [
        'Private vaulted steam room',
        'House black soap from the Ourika valley',
        'Kessa gommage by an attendant',
        'Rhassoul mask on body and hair',
        'Mint tea in the salon',
      ],
      forWhom: 'First-timers and regulars alike. Women and men are received in separate rooms; a room for two can be reserved.',
    },
    selection: {
      level: 2,
      year: 2026,
      assessedOn: '2026-02-21',
      reasons: {
        setting:
          'Vaulted tadelakt rooms and a red zellige basin, restored with the original proportions. Small, warm and unmistakably a hammam.',
        technique: 'The best gommage we had in the Médina: firm, methodical, and adjusted the moment you ask.',
        hygiene: 'Rooms are rinsed with hot water between guests. Gloves are new for each visit and yours to keep.',
        welcome: 'Someone walks you in from the fountain and explains each step before it happens.',
      },
    },
    rating: {
      distribution: [318, 74, 14, 4, 2],
      categories: { service: 4.7, cleanliness: 4.6, treatments: 4.8, value: 4.8, atmosphere: 4.7 },
    },
    treatments: [
      treatment('hammam-beldi', 'Hammam beldi and gommage', 'hammam', 75, 450),
      treatment('hammam-long', 'Long ritual with rhassoul and henna', 'hammam', 105, 650),
      treatment('hammam-self', 'Self-service hammam', 'hammam', 60, 180, 'Entry, black soap and a new glove'),
      treatment('hammam-massage', 'Hammam and argan massage', 'rituals', 135, 820),
      treatment('massage-45', 'Argan oil massage', 'massage', 45, 350),
      treatment('massage-60', 'Argan oil massage, long', 'massage', 60, 450),
    ],
    facilities: ['private-hammam', 'outdoor'],
    experiences: ['hammam', 'massage', 'couples'],
    occasions: ['first-hammam', 'solo', 'friends', 'couple'],
    languages: ['ar', 'fr', 'en'],
    hours: {
      weekly: week('09:00', '21:00'),
      hammam: {
        women: 'Every day, ground-floor rooms',
        men: 'Every day, upper room',
        mixed: 'One private room for two, by reservation',
      },
      ramadan: '10:00 to 17:00, then 20:30 to 23:30',
      lastEntry: 'Last entry at 19:30',
    },
    contact: {
      phone: '+212500000102',
      whatsapp: '+212500000102',
      website: 'https://www.dar-tassa.example',
      email: 'bonjour@dar-tassa.example',
      address: { street: '7 Derb el Hammam, Mouassine, Médina', postalCode: '40030' },
      coordinates: { lat: 31.6312, lng: -7.9905 },
      accessNotes:
        'Five minutes on foot from the Mouassine fountain. Send a WhatsApp message from the fountain and someone comes to walk you in.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa'],
      parking: 'No parking in the Médina. Nearest taxi drop-off at Bab Laksour.',
      accessibility: 'Steep stairs to the upper room and a raised threshold at the door. Not step-free.',
      goodToKnow: [
        'Underwear is provided; bring nothing',
        'The salon terrace is open to guests after their hammam',
        'Cash is preferred for tips',
      ],
    },
    media: {
      lead: darTassaPhoto,
      card: darTassaPhoto,
      gallery: [darTassaPhoto],
    },
    verified: verifiedOn('2026-09-05', { hours: '2026-09-22' }),
  },
  {
    id: 'jardin-argile',
    slug: 'jardin-d-argile-marrakech',
    name: 'Jardin d’Argile',
    type: 'day-spa',
    cityId: 'marrakech',
    neighbourhoodId: 'palmeraie',
    descriptor: 'Clay, argan and long tables under the palms, twenty minutes from the Médina.',
    verdict: {
      text: 'Jardin d’Argile takes rhassoul seriously: the clay arrives in blocks from the Moulouya valley, is ground on site and mixed to order with rose or orange-flower water. The wrap that follows is the best we have had near Marrakech, and the garden does the rest. Service can slow at weekends, when half of Guéliz has the same idea.',
      bestFor: ['A day out of town', 'Body treatments', 'A group of friends'],
      visitedOn: '2026-04-09',
    },
    signature: {
      treatmentId: 'rhassoul-wrap',
      summary: 'A steam hammam, then a full-body wrap of rhassoul ground and mixed for you, with the garden for the rest of the day.',
      includes: [
        'Steam hammam and black soap',
        'Full-body rhassoul wrap, mixed to order',
        'Scalp massage while the clay sets',
        'Argan oil finish',
        'Garden and pool for the day',
      ],
      forWhom: 'Dry or tired skin, and anyone who wants a slow morning outdoors.',
    },
    selection: {
      level: 1,
      year: 2026,
      assessedOn: '2026-04-09',
      reasons: {
        setting: 'Low earth buildings in a walled palm garden, with a pool and long shaded tables. Open, green and quiet.',
        technique: 'Clay work of a rare standard: the right texture, applied warm, removed without scrubbing.',
        hygiene: 'Clay and oils are prepared per guest. Outdoor showers and changing rooms were spotless on both visits.',
        welcome: 'Warm and informal. Slower at weekends; go midweek if you can.',
      },
    },
    rating: {
      distribution: [141, 52, 13, 4, 2],
      categories: { service: 4.3, cleanliness: 4.6, treatments: 4.7, value: 4.4, atmosphere: 4.7 },
    },
    treatments: [
      treatment('rhassoul-wrap', 'Rhassoul garden wrap', 'body', 90, 780),
      treatment('scrub-argan', 'Argan and sugar scrub', 'body', 45, 420),
      treatment('hammam', 'Hammam and gommage', 'hammam', 60, 480),
      treatment('massage-argan', 'Argan oil massage', 'massage', 60, 550),
      treatment('massage-duo', 'Massage for two in the pavilion', 'massage', 60, 1100, 'Price for two guests'),
      treatment('facial-figue', 'Prickly-pear facial', 'face', 50, 520),
      treatment('garden-day', 'Garden day: hammam, wrap, massage and lunch', 'rituals', 240, 1650),
    ],
    facilities: ['pool', 'outdoor', 'private-hammam', 'couples-room'],
    experiences: ['hammam', 'massage', 'beauty', 'wellness', 'couples'],
    occasions: ['friends', 'solo', 'couple', 'celebration'],
    languages: ['ar', 'fr', 'en'],
    hours: {
      weekly: week('10:00', '19:00', { mon: null }),
      ramadan: '11:00 to 17:30',
      lastEntry: 'Last treatment at 17:30',
    },
    contact: {
      phone: '+212500000103',
      whatsapp: '+212500000103',
      website: 'https://www.jardin-argile.example',
      email: 'jardin@jardin-argile.example',
      address: { street: 'Route de Fès, km 6, Palmeraie', postalCode: '40060' },
      coordinates: { lat: 31.6695, lng: -7.9432 },
      accessNotes:
        'Twenty minutes by taxi from Jemaa el-Fna. The spa can arrange a return transfer for 150 MAD; ask when you book.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Free parking inside the walls',
      accessibility: 'Level paths throughout the garden. One accessible treatment room and shower.',
      goodToKnow: ['Closed on Mondays', 'Bring swimwear for the pool', 'Lunch is served from 12:30 to 15:00'],
    },
    media: {
      lead: jardinArgilePhoto,
      card: jardinArgilePhoto,
      gallery: [jardinArgilePhoto],
    },
    verified: verifiedOn('2026-08-30', { prices: '2026-09-18' }),
  },
]

// ── Casablanca ──────────────────────────────────────────────────────────────────

const CASABLANCA: Spa[] = [
  {
    id: 'spa-oceane',
    slug: 'spa-oceane-maison-ain-diab-casablanca',
    name: 'Spa Océane, Maison Aïn Diab',
    type: 'hotel-spa',
    cityId: 'casablanca',
    neighbourhoodId: 'ain-diab',
    descriptor: 'Sea light, cool plain rooms and the most consistent massage in Casablanca.',
    verdict: {
      text: 'Casablanca’s business hotels all have spas; this one has a point of view. The treatment floor faces the Atlantic, the rooms are plain and cool, and the massage team is the most consistent we tested in the city: the same pressure and the same care on three visits. The hammam is modern rather than traditional. Go for the hands.',
      bestFor: ['Massage', 'After a long flight', 'Couples'],
      visitedOn: '2026-05-06',
    },
    signature: {
      treatmentId: 'massage-atlantic',
      summary: 'Seventy-five minutes of deep work with warm argan oil, then the pool, the sauna and tea facing the ocean.',
      includes: [
        'A short consultation on pressure and problem areas',
        'Seventy-five-minute deep-tissue massage with warm argan oil',
        'Hot towel finish',
        'Sauna, steam room and indoor pool for the day',
        'Herbal tea facing the sea',
      ],
      forWhom: 'Stiff shoulders, long flights and long weeks.',
    },
    selection: {
      level: 2,
      year: 2026,
      assessedOn: '2026-05-06',
      reasons: {
        setting: 'A calm, light-filled floor above the Corniche. Unadorned rooms, good linen, the ocean in every window.',
        technique: 'Three visits, three therapists, one standard. The deep-tissue work is precise and never rough.',
        hygiene: 'Hotel-grade housekeeping: fresh linen, clean wet areas, a pool that is tested and posted daily.',
        welcome: 'Efficient and courteous. Outside guests are treated exactly like hotel residents.',
      },
    },
    rating: {
      distribution: [352, 121, 28, 9, 6],
      categories: { service: 4.7, cleanliness: 4.7, treatments: 4.7, value: 4.2, atmosphere: 4.5 },
    },
    treatments: [
      treatment('massage-atlantic', 'Atlantic deep-tissue massage', 'massage', 75, 1100),
      treatment('massage-relax', 'Relaxing argan massage', 'massage', 60, 850),
      treatment('massage-duo', 'Massage for two', 'massage', 60, 1700, 'Price for two guests'),
      treatment('jetlag', 'Jet-lag reset: scalp, neck and feet', 'recovery', 45, 650),
      treatment('hammam', 'Hammam and gommage', 'hammam', 50, 600),
      treatment('facial-marine', 'Marine facial', 'face', 60, 900),
      treatment('wrap-algae', 'Seaweed body wrap', 'body', 50, 700),
    ],
    facilities: ['pool', 'sauna', 'jacuzzi', 'couples-room', 'gym', 'hotel-access'],
    experiences: ['massage', 'wellness', 'couples', 'hammam', 'recovery', 'beauty'],
    occasions: ['solo', 'couple', 'after-sport', 'celebration'],
    languages: ['ar', 'fr', 'en', 'es'],
    hours: {
      weekly: week('09:00', '21:00'),
      ramadan: '10:00 to 18:00, then 20:30 to 23:00',
      lastEntry: 'Last treatment at 19:45',
    },
    contact: {
      phone: '+212500000104',
      whatsapp: '+212500000104',
      website: 'https://www.maison-ain-diab.example/spa',
      email: 'spa@maison-ain-diab.example',
      address: { street: '84 Boulevard de la Corniche, Aïn Diab', postalCode: '20180' },
      coordinates: { lat: 33.5942, lng: -7.6712 },
      accessNotes: 'Tram T1 to Aïn Diab Plage, then five minutes on foot. The spa has its own entrance on the sea side.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard', 'American Express'],
      parking: 'Hotel valet parking, free for spa guests',
      accessibility: 'Step-free throughout, with a lift to the spa floor and an accessible changing room.',
      goodToKnow: [
        'Outside guests are welcome with any treatment',
        'Bring swimwear for the pool and sauna',
        'Guests aged 16 and over',
      ],
    },
    media: {
      lead: oceanePhoto,
      card: oceanePhoto,
      gallery: [oceanePhoto],
    },
    verified: verifiedOn('2026-09-16'),
  },
  {
    id: 'maison-gauthier',
    slug: 'maison-gauthier-casablanca',
    name: 'Maison Gauthier',
    type: 'day-spa',
    cityId: 'casablanca',
    neighbourhoodId: 'gauthier',
    descriptor: 'A quiet atelier for skin: unhurried facials and no hard sell at the till.',
    verdict: {
      text: 'A first-floor apartment turned into four quiet rooms, Maison Gauthier does one thing better than anyone in Casablanca: facials. The therapists look at your skin before they reach for a product, explain what they are doing, and do not sell at the end. The hammam is small and there is no pool. Nobody comes here for the pool.',
      bestFor: ['Facials', 'Before an event', 'Regular care'],
      visitedOn: '2026-04-23',
    },
    signature: {
      treatmentId: 'facial-signature',
      summary: 'A seventy-five-minute facial built around your skin on the day, with rose water and prickly-pear seed oil.',
      includes: [
        'Skin consultation',
        'Double cleanse and gentle steam',
        'Clay mask applied by brush',
        'Facial massage with prickly-pear seed oil',
        'Neck and shoulder massage',
      ],
      forWhom: 'Brides, wedding guests, and anyone whose skin has had a long month.',
    },
    selection: {
      level: 1,
      year: 2026,
      assessedOn: '2026-04-23',
      reasons: {
        setting: 'Four calm rooms in a 1930s apartment, with daylight and almost no decoration.',
        technique: 'Facials planned around the skin in front of them. Extractions are careful, the massage unhurried.',
        hygiene: 'Tools are sterilised in view of the guest. Linen and headbands are changed for every treatment.',
        welcome: 'Discreet and precise. No product is offered unless you ask.',
      },
    },
    rating: {
      distribution: [128, 41, 9, 3, 2],
      categories: { service: 4.8, cleanliness: 4.7, treatments: 4.7, value: 4.4, atmosphere: 4.3 },
    },
    treatments: [
      treatment('facial-signature', 'Signature facial with rose and prickly pear', 'face', 75, 720),
      treatment('facial-express', 'Express glow', 'face', 40, 420),
      treatment('facial-deep', 'Deep-cleansing facial', 'face', 60, 580),
      treatment('body-polish', 'Argan body polish', 'body', 45, 450),
      treatment('hammam', 'Hammam and gommage', 'hammam', 45, 380),
      treatment('massage-head', 'Head, neck and shoulders', 'massage', 30, 300),
      treatment('bride', 'Bride’s day: facial, polish, hands and feet', 'rituals', 180, 1500),
    ],
    facilities: ['private-hammam'],
    experiences: ['beauty', 'hammam', 'massage'],
    occasions: ['celebration', 'solo', 'friends'],
    languages: ['ar', 'fr', 'en'],
    hours: {
      weekly: week('10:00', '19:30', { sun: null }),
      ramadan: '10:00 to 16:30, then 20:30 to 22:30',
      lastEntry: 'Last treatment at 18:15',
    },
    contact: {
      phone: '+212500000105',
      whatsapp: '+212500000105',
      website: 'https://www.maison-gauthier.example',
      email: 'rendezvous@maison-gauthier.example',
      address: { street: '41 Rue Jean Jaurès, first floor, Gauthier', postalCode: '20060' },
      coordinates: { lat: 33.5898, lng: -7.6306 },
      accessNotes: 'First floor, no sign at street level: ring “MG” at the door. Ten minutes on foot from the Arab League park.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Paid street parking; guarded car park on Rue d’Alger, 200 metres away',
      accessibility: 'One flight of stairs and no lift.',
      goodToKnow: ['Closed on Sundays', 'By appointment only', 'Book a facial two or three days before an event'],
    },
    media: {
      lead: maisonGauthierPhoto,
      card: maisonGauthierPhoto,
      gallery: [maisonGauthierPhoto],
    },
    verified: verifiedOn('2026-09-09'),
  },
  {
    id: 'bains-habous',
    slug: 'les-bains-des-habous-casablanca',
    name: 'Les Bains des Habous',
    type: 'traditional-hammam',
    cityId: 'casablanca',
    neighbourhoodId: 'habous',
    descriptor: 'A neighbourhood hammam with private rooms, at prices the quarter still pays.',
    verdict: {
      text: 'An honest neighbourhood hammam on the edge of the Habous quarter, with a public side that fills with families on Thursday evenings and four private rooms upstairs. The scrub is vigorous and the price is fair. Rooms and towels are simple. It is not in this year’s selection: we would like to see the private rooms renovated first.',
      bestFor: ['Good value', 'A local experience'],
      visitedOn: '2026-05-07',
    },
    signature: {
      treatmentId: 'hammam-private',
      summary: 'A private steam room, black soap and a firm gommage by an attendant, as the quarter has it every week.',
      includes: [
        'Private steam room for one or two',
        'Black soap and a new kessa glove',
        'Gommage by an attendant',
        'Rhassoul rinse',
        'Tea afterwards',
      ],
      forWhom: 'Travellers who want the neighbourhood hammam without the crowd.',
    },
    selection: null,
    rating: {
      distribution: [112, 58, 19, 6, 3],
      categories: { service: 4.4, cleanliness: 4.1, treatments: 4.5, value: 4.8, atmosphere: 4.2 },
    },
    treatments: [
      treatment('hammam-private', 'Private hammam and gommage', 'hammam', 60, 280),
      treatment('hammam-public', 'Public hammam entry', 'hammam', 90, 25, 'Bring or buy soap and a glove at the door'),
      treatment('gommage', 'Gommage by an attendant, public side', 'hammam', 20, 60),
      treatment('hammam-rhassoul', 'Hammam, gommage and rhassoul', 'rituals', 80, 380),
      treatment('massage', 'Argan oil massage', 'massage', 45, 300),
    ],
    facilities: ['private-hammam'],
    experiences: ['hammam', 'massage'],
    occasions: ['first-hammam', 'solo', 'friends'],
    languages: ['ar', 'fr'],
    hours: {
      weekly: week('07:00', '22:00'),
      hammam: {
        women: 'Public side, daily 07:00 to 19:00',
        men: 'Public side, daily 19:30 to 22:00',
        mixed: 'Private rooms all day, by reservation',
      },
      ramadan: '09:00 to 17:00, then 20:30 to 00:30',
      lastEntry: 'Last entry one hour before closing',
    },
    contact: {
      phone: '+212500000106',
      whatsapp: '+212500000106',
      address: { street: '18 Rue du Souk, Habous', postalCode: '20490' },
      coordinates: { lat: 33.5745, lng: -7.6035 },
      accessNotes: 'Beside the olive market. Any taxi driver knows the Habous; ask for the hammam by the olive souk.',
    },
    practical: {
      payment: ['Cash in dirhams only'],
      parking: 'Street parking around the Habous arcades',
      accessibility: 'Private rooms are upstairs with no lift. The public side is on the ground floor with a wet, uneven floor.',
      goodToKnow: [
        'Cash only',
        'Bring your own towel for the public side; private rooms include one',
        'Busiest on Thursday evenings and Sunday mornings',
      ],
    },
    media: {
      lead: bainsHabousPhoto,
      card: bainsHabousPhoto,
      gallery: [bainsHabousPhoto],
    },
    verified: verifiedOn('2026-09-02', { website: '2026-09-02' }),
  },
]

// ── Agadir ──────────────────────────────────────────────────────────────────────

const AGADIR: Spa[] = [
  {
    id: 'asif-wellness',
    slug: 'asif-wellness-house-taghazout',
    name: 'Asif Wellness House',
    type: 'wellness-centre',
    cityId: 'agadir',
    neighbourhoodId: 'taghazout',
    descriptor: 'Sports massage, a cold plunge and verbena on the terrace, above the surf.',
    verdict: {
      text: 'Built for people who arrive with salt in their hair. Asif’s therapists trained in sports massage and it shows: they find the problem quickly and work on it properly. The sauna and cold plunge are small, the terrace is large, and the verbena comes from a garden in Paradise Valley. Not a hammam address; a recovery one.',
      bestFor: ['After surfing or hiking', 'Sports massage', 'A slow afternoon'],
      visitedOn: '2026-06-11',
    },
    signature: {
      treatmentId: 'surfers-recovery',
      summary: 'Heat, cold, an hour of sports massage on the muscles that worked, and tea above the bay.',
      includes: [
        'Sauna and cold-plunge circuit',
        'Sixty-minute sports massage for shoulders, back and legs',
        'Argan and arnica balm',
        'Assisted stretching',
        'Verbena tea on the terrace',
      ],
      forWhom: 'Surfers, hikers and anyone whose legs or shoulders have been working.',
    },
    selection: {
      level: 1,
      year: 2026,
      assessedOn: '2026-06-11',
      reasons: {
        setting: 'A whitewashed house above the bay with a wide terrace. Simple, bright and open to the sea air.',
        technique: 'The most skilled sports massage we found on the coast, by therapists who ask what you did that week.',
        hygiene: 'The plunge pool is drained and refilled daily. Mats and linen are changed between guests.',
        welcome: 'Relaxed and knowledgeable. Nobody minds sandy feet.',
      },
    },
    rating: {
      distribution: [164, 45, 9, 2, 1],
      categories: { service: 4.8, cleanliness: 4.7, treatments: 4.8, value: 4.6, atmosphere: 4.6 },
    },
    treatments: [
      treatment('surfers-recovery', 'Surfer’s recovery', 'recovery', 90, 690),
      treatment('circuit', 'Sauna and cold-plunge circuit', 'recovery', 45, 180),
      treatment('stretch', 'Assisted stretching', 'recovery', 30, 250),
      treatment('massage-sport', 'Sports massage', 'massage', 60, 520),
      treatment('massage-argan', 'Relaxing argan massage', 'massage', 60, 480),
      treatment('massage-duo', 'Massage for two on the terrace', 'massage', 60, 960, 'Price for two guests'),
      treatment('scrub', 'Argan and sea-salt scrub', 'body', 40, 350),
    ],
    facilities: ['sauna', 'outdoor', 'couples-room'],
    experiences: ['recovery', 'massage', 'wellness', 'couples'],
    occasions: ['after-sport', 'solo', 'friends', 'couple'],
    languages: ['ar', 'fr', 'en', 'zgh', 'de'],
    hours: {
      weekly: week('09:00', '20:00'),
      ramadan: '10:00 to 17:30, then 21:00 to 23:00',
      lastEntry: 'Last massage at 18:45',
    },
    contact: {
      phone: '+212500000107',
      whatsapp: '+212500000107',
      website: 'https://www.asif-wellness.example',
      email: 'hello@asif-wellness.example',
      address: { street: 'Route d’Essaouira, Taghazout Bay', postalCode: '80022' },
      coordinates: { lat: 30.5411, lng: -9.7069 },
      accessNotes:
        'Twenty-five minutes north of Agadir on the coast road. White house on the inland side, 400 metres after the Taghazout Bay roundabout.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Free parking in front of the house',
      accessibility: 'Ground-floor treatment room with level access. The terrace and plunge pool are reached by stairs.',
      goodToKnow: [
        'Bring swimwear for the sauna and plunge',
        'Outdoor showers for rinsing off salt and sand',
        'Transfers from Agadir can be arranged',
      ],
    },
    media: {
      lead: asifPhoto,
      card: asifPhoto,
      gallery: [asifPhoto],
    },
    verified: verifiedOn('2026-09-19'),
  },
  {
    id: 'tifawt-thalasso',
    slug: 'tifawt-thalasso-spa-agadir',
    name: 'Tifawt Thalasso & Spa',
    type: 'hotel-spa',
    cityId: 'agadir',
    neighbourhoodId: 'founty',
    descriptor: 'A large resort spa on the bay, with a seawater pool and a long menu.',
    verdict: {
      text: 'A big, efficient resort spa that does what resort spas do: a seawater pool, a long menu and generous opening hours. Treatments are competent rather than memorable, and at busy times the pool area feels like the hotel it belongs to. Useful if you are staying on the bay and want everything in one place.',
      bestFor: ['Staying on the bay', 'Pool and thalasso', 'A spa day for two'],
      visitedOn: '2026-06-12',
    },
    signature: {
      treatmentId: 'thalasso-discovery',
      summary: 'Two hours through the seawater pool, a hydro-massage bath, a seaweed wrap and a short massage.',
      includes: [
        'Seawater pool circuit',
        'Hydro-massage bath',
        'Seaweed body wrap',
        'Thirty-minute massage',
        'Sauna and steam room',
      ],
      forWhom: 'First-time thalasso guests and couples sharing a spa day.',
    },
    selection: null,
    rating: {
      distribution: [262, 171, 71, 24, 12],
      categories: { service: 4.1, cleanliness: 4.4, treatments: 4.1, value: 3.9, atmosphere: 4.2 },
    },
    treatments: [
      treatment('thalasso-discovery', 'Thalasso discovery', 'rituals', 120, 950),
      treatment('spa-day-duo', 'Spa day for two', 'rituals', 180, 2200, 'Price for two guests'),
      treatment('hammam', 'Hammam and gommage', 'hammam', 45, 450),
      treatment('massage-relax', 'Relaxing massage', 'massage', 50, 600),
      treatment('massage-stone', 'Hot-stone massage', 'massage', 75, 850),
      treatment('wrap', 'Seaweed wrap', 'body', 40, 420),
      treatment('facial', 'Hydrating facial', 'face', 50, 550),
    ],
    facilities: ['pool', 'sauna', 'jacuzzi', 'private-hammam', 'couples-room', 'gym', 'outdoor', 'hotel-access'],
    experiences: ['wellness', 'massage', 'hammam', 'couples', 'beauty'],
    occasions: ['couple', 'friends', 'solo', 'celebration'],
    languages: ['ar', 'fr', 'en', 'de', 'es'],
    hours: {
      weekly: week('08:00', '21:00'),
      ramadan: '09:00 to 18:30, then 20:30 to 23:00',
      lastEntry: 'Last treatment at 19:30',
    },
    contact: {
      phone: '+212500000108',
      whatsapp: '+212500000108',
      website: 'https://www.tifawt-resort.example/thalasso',
      email: 'thalasso@tifawt-resort.example',
      address: { street: 'Chemin des Dunes, Founty', postalCode: '80010' },
      coordinates: { lat: 30.3962, lng: -9.6005 },
      accessNotes: 'On the southern end of the bay promenade. Enter through the hotel lobby and follow the signs to the thalasso wing.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard', 'American Express'],
      parking: 'Free hotel car park',
      accessibility: 'Step-free from the lobby, with a pool hoist and accessible changing rooms.',
      goodToKnow: [
        'Bring swimwear; a cap is required in the seawater pool and sold on site',
        'Guests aged 14 and over in the pool area',
        'Busy from 15:00 to 18:00',
      ],
    },
    media: {
      lead: tifawtPhoto,
      card: tifawtPhoto,
      gallery: [tifawtPhoto],
    },
    verified: verifiedOn('2026-09-20'),
  },
  {
    id: 'hammam-talborjt',
    slug: 'hammam-talborjt-agadir',
    name: 'Hammam Talborjt',
    type: 'traditional-hammam',
    cityId: 'agadir',
    neighbourhoodId: 'talborjt',
    descriptor: 'The neighbourhood’s own hammam: a stone basin, real heat and a fair price.',
    verdict: {
      text: 'Talborjt is where Agadir actually lives, and this is its hammam: rebuilt in the sixties, re-tiled since, never prettified. The private room has a stone basin, brass bowls and attendants who have worked here for twenty years. For 250 dirhams you get the real sequence, done with skill, and tea afterwards. Bring nothing and expect no frills.',
      bestFor: ['Best value', 'The real sequence', 'A first hammam'],
      visitedOn: '2026-06-10',
    },
    signature: {
      treatmentId: 'hammam-private',
      summary: 'A private room with a stone basin, eucalyptus steam, a proper gommage and a rhassoul hair mask.',
      includes: [
        'Private room with a stone basin',
        'Black soap and eucalyptus steam',
        'Kessa gommage by an attendant',
        'Rhassoul and henna hair mask',
        'Mint tea',
      ],
      forWhom: 'Anyone who wants the genuine sequence at a neighbourhood price. Private rooms take one or two people.',
    },
    selection: {
      level: 1,
      year: 2026,
      assessedOn: '2026-06-10',
      reasons: {
        setting: 'A working bathhouse with a domed hot room and a private room around a stone basin. Plain and honest.',
        technique: 'Attendants with two decades of practice. The gommage is among the most thorough we have had anywhere.',
        hygiene: 'Simple but scrupulous: rooms are scrubbed and sluiced with hot water after every guest.',
        welcome: 'Direct and kind. Little English is spoken; gestures and good humour do the rest.',
      },
    },
    rating: {
      distribution: [61, 21, 4, 1, 1],
      categories: { service: 4.6, cleanliness: 4.4, treatments: 4.7, value: 4.9, atmosphere: 4.5 },
    },
    treatments: [
      treatment('hammam-private', 'Private beldi hammam', 'hammam', 70, 250),
      treatment('hammam-public', 'Public hammam entry', 'hammam', 90, 20, 'Soap and glove sold at the door'),
      treatment('gommage', 'Gommage by an attendant, public side', 'hammam', 20, 50),
      treatment('hammam-massage', 'Hammam, rhassoul and argan massage', 'rituals', 110, 480),
      treatment('massage', 'Argan oil massage', 'massage', 45, 260),
    ],
    facilities: ['private-hammam'],
    experiences: ['hammam', 'massage'],
    occasions: ['first-hammam', 'solo', 'friends', 'after-sport'],
    languages: ['ar', 'fr', 'zgh'],
    hours: {
      weekly: week('06:30', '22:00'),
      hammam: {
        women: 'Public side, daily 06:30 to 18:30',
        men: 'Public side, daily 19:00 to 22:00',
        mixed: 'Private rooms all day',
      },
      ramadan: '09:00 to 17:30, then 20:30 to 01:00',
      lastEntry: 'Last entry one hour before closing',
    },
    contact: {
      phone: '+212500000109',
      whatsapp: '+212500000109',
      address: { street: '27 Rue de Marrakech, Talborjt', postalCode: '80000' },
      coordinates: { lat: 30.4218, lng: -9.5925 },
      accessNotes: 'Two streets behind Place Lahcen Tamri. Look for the green door with a brass hand.',
    },
    practical: {
      payment: ['Cash in dirhams only'],
      parking: 'Street parking nearby',
      accessibility: 'Ground floor, with a step at the entrance and wet stone floors inside.',
      goodToKnow: ['Cash only', 'Private rooms should be reserved a day ahead by WhatsApp', 'Quietest before 10:00'],
    },
    media: {
      lead: talborjtPhoto,
      card: talborjtPhoto,
      gallery: [talborjtPhoto],
    },
    verified: verifiedOn('2026-09-19', { website: '2026-09-19' }),
  },
]

// ── Rabat ───────────────────────────────────────────────────────────────────────

const RABAT: Spa[] = [
  {
    id: 'maison-oudaya',
    slug: 'maison-oudaya-rabat',
    name: 'Maison Oudaya',
    type: 'luxury-spa',
    cityId: 'rabat',
    neighbourhoodId: 'oudayas',
    descriptor: 'Hammered brass, black marble and river light in a riad above the Bouregreg.',
    verdict: {
      text: 'Rabat is discreet about its pleasures and Maison Oudaya is the proof. Behind a blue-and-white door in the Kasbah, three treatment rooms and a black-marble hammam look down to the river. The ritual is classical and exact, poured from hammered brass, and the therapists have the lightest hands in the capital. Book ahead: there are only three rooms.',
      bestFor: ['The classical ritual', 'Couples', 'A quiet treat'],
      visitedOn: '2026-05-19',
    },
    signature: {
      treatmentId: 'rituel-kasbah',
      summary: 'A private black-marble hammam, a rhassoul and orange-flower wrap, then argan oil massage and tea on the terrace.',
      includes: [
        'Private black-marble hammam',
        'Black soap and kessa gommage',
        'Rhassoul and orange-flower wrap',
        'Forty-five-minute argan oil massage',
        'Tea and almond pastries on the river terrace',
      ],
      forWhom: 'People who want the classical ritual in a private, exacting setting.',
    },
    selection: {
      level: 2,
      year: 2026,
      assessedOn: '2026-05-19',
      reasons: {
        setting: 'A small riad in the Kasbah des Oudayas: black marble, brass, whitewashed walls and a terrace over the river.',
        technique: 'Classical and precise. Water temperature, timing and pressure are judged, not guessed.',
        hygiene: 'Immaculate. Brassware is polished daily and the hammam is closed for twenty minutes between guests.',
        welcome: 'Quiet, attentive and unhurried, in the manner of a private house.',
      },
    },
    rating: {
      distribution: [118, 27, 5, 1, 1],
      categories: { service: 4.8, cleanliness: 4.8, treatments: 4.7, value: 4.4, atmosphere: 4.9 },
    },
    treatments: [
      treatment('rituel-kasbah', 'Rituel de la Kasbah', 'rituals', 120, 1350),
      treatment('rituel-deux', 'Rituel de la Kasbah for two', 'rituals', 120, 2500, 'Price for two guests'),
      treatment('hammam', 'Hammam and gommage', 'hammam', 60, 600),
      treatment('massage-argan', 'Argan oil massage', 'massage', 60, 750),
      treatment('massage-back', 'Orange-flower back massage', 'massage', 40, 520),
      treatment('facial-rose', 'Rose facial', 'face', 60, 700),
    ],
    facilities: ['private-hammam', 'couples-room', 'outdoor'],
    experiences: ['hammam', 'massage', 'couples', 'beauty'],
    occasions: ['couple', 'celebration', 'solo', 'first-hammam'],
    languages: ['ar', 'fr', 'en', 'es'],
    hours: {
      weekly: week('10:00', '20:00', { mon: null }),
      ramadan: '10:30 to 17:00, then 20:30 to 23:00',
      lastEntry: 'The last ritual starts at 18:00',
    },
    contact: {
      phone: '+212500000110',
      whatsapp: '+212500000110',
      website: 'https://www.maison-oudaya.example',
      email: 'reservation@maison-oudaya.example',
      address: { street: '9 Rue Bazzo, Kasbah des Oudayas', postalCode: '10030' },
      coordinates: { lat: 34.0312, lng: -6.8362 },
      accessNotes: 'Enter the Kasbah by the main gate, Bab Oudaya. The house is four minutes on foot; a blue door with a brass knocker.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Car park below the Kasbah walls, five minutes on foot',
      accessibility: 'Cobbled lanes and several steps inside the house. Not step-free.',
      goodToKnow: ['Closed on Mondays', 'Three rooms only: reserve several days ahead', 'Guests aged 16 and over'],
    },
    media: {
      lead: maisonOudayaPhoto,
      card: maisonOudayaPhoto,
      gallery: [maisonOudayaPhoto],
    },
    verified: verifiedOn('2026-09-11'),
  },
  {
    id: 'bains-agdal',
    slug: 'bains-agdal-rabat',
    name: 'Bains Agdal',
    type: 'day-spa',
    cityId: 'rabat',
    neighbourhoodId: 'agdal',
    descriptor: 'A bright, modern hammam and treatment rooms a short walk from the tram.',
    verdict: {
      text: 'A clean, well-run urban spa that Agdal’s office workers use at lunchtime. The modern steam hammam is spotless, the rhassoul wrap is good and the prices are sensible. What it lacks is a sense of place: you could be in any city. A reliable choice, and one we will revisit next year.',
      bestFor: ['A lunchtime treatment', 'Regular care', 'Good value'],
      visitedOn: '2026-05-20',
    },
    signature: {
      treatmentId: 'rhassoul-express',
      summary: 'A proper scrub and a clay wrap in an hour, in a modern steam hammam.',
      includes: ['Steam hammam', 'Black soap and gommage', 'Rhassoul body wrap', 'Argan oil finish', 'Tea'],
      forWhom: 'Locals and visitors who want a thorough scrub in an hour.',
    },
    selection: null,
    rating: {
      distribution: [58, 34, 11, 3, 2],
      categories: { service: 4.3, cleanliness: 4.7, treatments: 4.3, value: 4.5, atmosphere: 3.9 },
    },
    treatments: [
      treatment('rhassoul-express', 'Rhassoul express', 'hammam', 60, 390),
      treatment('hammam', 'Hammam and gommage', 'hammam', 45, 300),
      treatment('massage-relax', 'Relaxing massage', 'massage', 60, 450),
      treatment('massage-back', 'Back and neck massage', 'massage', 30, 260),
      treatment('facial', 'Classic facial', 'face', 50, 400),
      treatment('scrub', 'Sugar and argan scrub', 'body', 30, 250),
    ],
    facilities: ['private-hammam', 'sauna', 'couples-room'],
    experiences: ['hammam', 'massage', 'beauty'],
    occasions: ['solo', 'friends', 'first-hammam'],
    languages: ['ar', 'fr', 'en'],
    hours: {
      weekly: week('09:30', '20:30', { sun: { open: '10:00', close: '18:00' } }),
      ramadan: '10:00 to 17:00, then 20:30 to 23:00',
      lastEntry: 'Last treatment one hour before closing',
    },
    contact: {
      phone: '+212500000111',
      whatsapp: '+212500000111',
      website: 'https://www.bains-agdal.example',
      email: 'contact@bains-agdal.example',
      address: { street: '112 Avenue de France, Agdal', postalCode: '10090' },
      coordinates: { lat: 33.9955, lng: -6.8498 },
      accessNotes: 'Tram L1 to Agdal Avenue de France, then three minutes on foot. Ground floor, glass front.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Paid street parking',
      accessibility: 'Step-free entrance, with one accessible treatment room and shower.',
      goodToKnow: ['Walk-ins accepted before noon', 'Shorter hours on Sundays'],
    },
    media: {
      lead: bainsAgdalPhoto,
      card: bainsAgdalPhoto,
      gallery: [bainsAgdalPhoto],
    },
    verified: verifiedOn('2026-09-11'),
  },
  {
    id: 'cercle-souissi',
    slug: 'le-cercle-souissi-rabat',
    name: 'Le Cercle Souissi',
    type: 'wellness-centre',
    cityId: 'rabat',
    neighbourhoodId: 'souissi',
    descriptor: 'A members’ wellness club with a lap pool, open to day guests on weekdays.',
    verdict: {
      text: 'Primarily a members’ club for the embassy quarter, with a 25-metre pool, a serious gym and a small spa attached. Day guests are welcome on weekdays. Come for the pool and the sauna; the treatment menu is short and the massage is pleasant rather than skilled.',
      bestFor: ['Swimming', 'Sauna and steam', 'A weekday pass'],
      visitedOn: '2026-05-21',
    },
    signature: {
      treatmentId: 'day-pass-massage',
      summary: 'A weekday in the club: lap pool, sauna, steam, a forty-five-minute massage and tea in the garden.',
      includes: [
        'Lap pool, sauna and steam room for the day',
        'Forty-five-minute relaxing massage',
        'Towel, robe and locker',
        'Herbal tea in the garden',
      ],
      forWhom: 'Swimmers, and anyone in Rabat for work with a free afternoon.',
    },
    selection: null,
    rating: {
      distribution: [22, 27, 9, 3, 1],
      categories: { service: 4.0, cleanliness: 4.4, treatments: 3.8, value: 3.9, atmosphere: 4.2 },
    },
    treatments: [
      treatment('day-pass-massage', 'Day pass with massage', 'rituals', 180, 620),
      treatment('day-pass', 'Day pass: pool, sauna and steam', 'rituals', 240, 350),
      treatment('massage-relax', 'Relaxing massage', 'massage', 45, 380),
      treatment('massage-sport', 'Sports massage', 'massage', 60, 520),
      treatment('aqua', 'Aquatic recovery session', 'recovery', 45, 300),
    ],
    facilities: ['pool', 'sauna', 'jacuzzi', 'gym', 'outdoor'],
    experiences: ['wellness', 'massage', 'recovery'],
    occasions: ['solo', 'after-sport', 'friends'],
    languages: ['ar', 'fr', 'en'],
    hours: {
      weekly: week('07:00', '21:00', { sat: null, sun: null }),
      ramadan: '08:00 to 17:00, then 21:00 to 23:30',
      lastEntry: 'Day guests are received until 18:00',
    },
    contact: {
      phone: '+212500000112',
      website: 'https://www.cercle-souissi.example',
      email: 'accueil@cercle-souissi.example',
      address: { street: 'Avenue Mohammed VI, km 4, Souissi', postalCode: '10170' },
      coordinates: { lat: 33.9632, lng: -6.8306 },
      accessNotes: 'Ten minutes by taxi from Agdal. Present an identity document at the gatehouse.',
    },
    practical: {
      payment: ['Visa', 'Mastercard', 'Cash in dirhams'],
      parking: 'Free members’ car park',
      accessibility: 'Step-free, with a pool hoist and accessible changing rooms.',
      goodToKnow: [
        'Weekends are reserved for members',
        'Swimming cap required; identity document needed at the gate',
        'No WhatsApp line: call to reserve a day pass',
      ],
    },
    media: {
      lead: cercleSouissiPhoto,
      card: cercleSouissiPhoto,
      gallery: [cercleSouissiPhoto],
    },
    verified: verifiedOn('2026-09-10'),
  },
]

// ── Tangier ─────────────────────────────────────────────────────────────────────

const TANGIER: Spa[] = [
  {
    id: 'villa-marshan',
    slug: 'spa-du-detroit-villa-marshan-tangier',
    name: 'Spa du Détroit, Villa Marshan',
    type: 'hotel-spa',
    cityId: 'tangier',
    neighbourhoodId: 'marshan',
    descriptor: 'Above the Strait, a spa of white linen, warm towels and remarkable hands.',
    verdict: {
      text: 'The best treatment we had this year was in Tangier. On the cliff at Marshan, with Spain visible on a clear day, the Spa du Détroit keeps things almost severe: white rooms, warm towels, a window open to the sea. The facial massage is a quiet masterpiece. Add the hammam and a table on the terrace and the afternoon is gone.',
      bestFor: ['The best hands in the North', 'A view', 'A celebration'],
      visitedOn: '2026-04-30',
    },
    signature: {
      treatmentId: 'soin-detroit',
      summary: 'An hour of full-body massage and thirty minutes for the face, then rest on the terrace above the Strait.',
      includes: [
        'Warm-towel welcome and foot bath',
        'Sixty-minute massage with argan and fig-seed oil',
        'Thirty-minute facial massage',
        'Tea and almond pastries on the terrace',
        'Hammam and plunge pool before or after',
      ],
      forWhom: 'Anyone who believes a massage is about the hands, not the menu.',
    },
    selection: {
      level: 3,
      year: 2026,
      assessedOn: '2026-04-30',
      reasons: {
        setting: 'A 1920s villa on the cliff at Marshan. White rooms, old tiles, and the Strait filling every window.',
        technique: 'The finest hands we met this year. The facial massage alone justifies the journey.',
        hygiene: 'Faultless. Towels are warmed and wrapped for each guest; rooms are aired with the windows open between treatments.',
        welcome: 'Formal at the door, warm within minutes. Guests are never left waiting or wondering.',
      },
    },
    rating: {
      distribution: [203, 31, 6, 2, 1],
      categories: { service: 4.9, cleanliness: 4.8, treatments: 4.9, value: 4.5, atmosphere: 4.8 },
    },
    treatments: [
      treatment('soin-detroit', 'Soin du Détroit', 'rituals', 105, 1650),
      treatment('soin-deux', 'Soin du Détroit for two', 'rituals', 105, 3100, 'Price for two guests'),
      treatment('massage-argan', 'Argan and fig-seed oil massage', 'massage', 60, 1050),
      treatment('massage-back', 'Back, neck and scalp', 'massage', 45, 780),
      treatment('facial-massage', 'Facial massage', 'face', 45, 820),
      treatment('hammam', 'Hammam and gommage', 'hammam', 60, 700),
      treatment('hammam-rhassoul', 'Hammam, rhassoul and rose', 'hammam', 90, 980),
    ],
    facilities: ['pool', 'sauna', 'private-hammam', 'couples-room', 'outdoor', 'hotel-access'],
    experiences: ['massage', 'hammam', 'couples', 'wellness', 'beauty'],
    occasions: ['couple', 'celebration', 'solo'],
    languages: ['ar', 'fr', 'en', 'es'],
    hours: {
      weekly: week('10:00', '20:00'),
      ramadan: '10:00 to 17:30, then 20:30 to 23:00',
      lastEntry: 'Last treatment at 18:15',
    },
    contact: {
      phone: '+212500000113',
      whatsapp: '+212500000113',
      website: 'https://www.villa-marshan.example/spa',
      email: 'spa@villa-marshan.example',
      address: { street: '23 Rue de la Falaise, Marshan', postalCode: '90000' },
      coordinates: { lat: 35.7895, lng: -5.8242 },
      accessNotes: 'Ten minutes by taxi from the Grand Socco. Ring at the green gate; the spa is across the garden.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard', 'American Express'],
      parking: 'Private parking inside the gate',
      accessibility: 'Step-free through the garden to one treatment room. The hammam and terrace have steps.',
      goodToKnow: [
        'Outside guests are welcome with any treatment',
        'Reserve a terrace table when you book',
        'Guests aged 16 and over',
      ],
    },
    media: {
      lead: villaMarshanPhoto,
      card: villaMarshanPhoto,
      gallery: [villaMarshanPhoto],
    },
    verified: verifiedOn('2026-09-24'),
  },
  {
    id: 'bains-bab-el-assa',
    slug: 'les-bains-de-bab-el-assa-tangier',
    name: 'Les Bains de Bab el-Assa',
    type: 'traditional-hammam',
    cityId: 'tangier',
    neighbourhoodId: 'kasbah',
    descriptor: 'An old Kasbah bathhouse with brass taps, patched tiles and real heat.',
    verdict: {
      text: 'One of the last working bathhouses inside the Kasbah walls. The hot room is properly hot, the brass taps are original, and the tiles have been patched so often that the walls read like a quilt. Attendants are kind and brisk. Facilities are basic and little English is spoken; go with that in mind and it is a memorable hour.',
      bestFor: ['A local experience', 'Atmosphere', 'Good value'],
      visitedOn: '2026-05-01',
    },
    signature: {
      treatmentId: 'hammam-gommage',
      summary: 'Three rooms of rising heat, black soap, and a scrub by an attendant, as it has been done here for generations.',
      includes: [
        'Entry to the three rooms',
        'Black soap and a glove',
        'Gommage by an attendant',
        'Buckets and a brass bowl',
        'Tea on the bench outside',
      ],
      forWhom: 'Curious travellers who know the sequence, or want to learn it the old way.',
    },
    selection: null,
    rating: {
      distribution: [57, 29, 8, 3, 2],
      categories: { service: 4.3, cleanliness: 3.9, treatments: 4.5, value: 4.8, atmosphere: 4.7 },
    },
    treatments: [
      treatment('hammam-gommage', 'Hammam and gommage', 'hammam', 60, 180),
      treatment('hammam-entry', 'Hammam entry', 'hammam', 90, 20, 'Soap and glove sold at the door'),
      treatment('hammam-rhassoul', 'Gommage and rhassoul', 'hammam', 75, 260),
      treatment('massage', 'Argan oil massage', 'massage', 40, 220, 'During women’s hours only'),
    ],
    facilities: [],
    experiences: ['hammam'],
    occasions: ['solo', 'friends'],
    languages: ['ar', 'fr', 'es'],
    hours: {
      weekly: week('08:00', '21:00'),
      hammam: { women: 'Daily, 08:00 to 17:00', men: 'Daily, 17:30 to 21:00' },
      ramadan: '10:00 to 17:00, then 20:30 to 00:30',
      lastEntry: 'Last entry one hour before closing',
    },
    contact: {
      phone: '+212500000114',
      address: { street: '4 Rue Bab el-Assa, Kasbah', postalCode: '90030' },
      coordinates: { lat: 35.7889, lng: -5.8131 },
      accessNotes: 'Inside the Kasbah, just below the Bab el-Assa gate. On foot only; the climb from the Petit Socco takes ten minutes.',
    },
    practical: {
      payment: ['Cash in dirhams only'],
      parking: 'None. Nearest taxi drop-off at Place de la Kasbah.',
      accessibility: 'Steps at the entrance and wet stone floors. Not step-free.',
      goodToKnow: [
        'Cash only, and no WhatsApp: call or simply arrive',
        'Bring a towel and a change of underwear',
        'Check women’s and men’s hours before you walk up',
      ],
    },
    media: {
      lead: babElAssaPhoto,
      card: babElAssaPhoto,
      gallery: [babElAssaPhoto],
    },
    verified: verifiedOn('2026-09-24', { website: '2026-09-24' }),
  },
  {
    id: 'atelier-spartel',
    slug: 'atelier-spartel-tangier',
    name: 'Atelier Spartel',
    type: 'day-spa',
    cityId: 'tangier',
    neighbourhoodId: 'cap-spartel',
    descriptor: 'A new beauty atelier on the road to Cap Spartel. Early days, and promising.',
    verdict: {
      text: 'Opened in the summer of 2026 by two therapists who trained in Casablanca and Paris: three rooms, a small hammam, and a short menu of facials and rose-based body treatments. Our first visit was encouraging. It is too early for a verdict and too early for a rating average; we will return in the spring.',
      bestFor: ['Facials', 'Something new'],
      visitedOn: '2026-09-23',
    },
    signature: {
      treatmentId: 'rose-ritual',
      summary: 'Rose-water steam, a sugar and rose scrub, a short facial and a hand massage with argan oil.',
      includes: [
        'Rose-water steam',
        'Sugar and rose body scrub',
        'Thirty-minute facial',
        'Hand massage with argan oil',
        'Rose-petal infusion',
      ],
      forWhom: 'Anyone curious to try a new address before everyone else.',
    },
    selection: null,
    rating: {
      distribution: [5, 2, 0, 0, 0],
      categories: { service: 4.9, cleanliness: 4.9, treatments: 4.6, value: 4.4, atmosphere: 4.7 },
    },
    treatments: [
      treatment('rose-ritual', 'Rose ritual', 'rituals', 80, 560),
      treatment('facial-signature', 'Signature facial', 'face', 60, 480),
      treatment('facial-express', 'Express facial', 'face', 30, 280),
      treatment('scrub-rose', 'Sugar and rose scrub', 'body', 40, 320),
      treatment('hammam', 'Hammam and gommage', 'hammam', 45, 300),
      treatment('hands', 'Hand and arm massage', 'massage', 25, 180),
    ],
    facilities: ['private-hammam', 'outdoor'],
    experiences: ['beauty', 'hammam'],
    occasions: ['solo', 'friends', 'celebration'],
    languages: ['ar', 'fr', 'en', 'es'],
    hours: {
      weekly: week('10:00', '19:00', { sun: null, mon: null }),
      ramadan: 'To be confirmed for the spa’s first Ramadan',
      lastEntry: 'Last treatment at 17:30',
    },
    contact: {
      phone: '+212500000115',
      whatsapp: '+212500000115',
      website: 'https://www.atelier-spartel.example',
      email: 'bonjour@atelier-spartel.example',
      address: { street: 'Route du Cap Spartel, km 3', postalCode: '90040' },
      coordinates: { lat: 35.7868, lng: -5.8695 },
      accessNotes: 'Fifteen minutes by taxi from the centre. A white house among the pines, on the right after the third kilometre stone.',
    },
    practical: {
      payment: ['Cash in dirhams', 'Visa', 'Mastercard'],
      parking: 'Free parking under the pines',
      accessibility: 'Single storey and step-free throughout.',
      goodToKnow: ['Closed on Sundays and Mondays', 'By appointment only', 'Opened in July 2026'],
    },
    media: {
      lead: atelierSpartelPhoto,
      card: atelierSpartelPhoto,
      gallery: [atelierSpartelPhoto],
    },
    verified: verifiedOn('2026-09-23'),
  },
]

// ── Every spa in the guide ──────────────────────────────────────────────────────

export const SPAS: Spa[] = [...MARRAKECH, ...CASABLANCA, ...AGADIR, ...RABAT, ...TANGIER]
