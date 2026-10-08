import type { Dictionary } from '@/locales/fr'

const number = new Intl.NumberFormat('en-US')
const mad = (amount: number) => `${number.format(amount)} MAD`
const spas = (count: number) => `${count} ${count === 1 ? 'spa' : 'spas'}`

export const en: Dictionary = {
  code: 'en',
  locale: 'en_GB',

  site: {
    tagline: 'The independent guide to the spas of Morocco',
    description:
      'Find, compare and trust the best spas and hammams in Morocco. Selected by editors, rated by guests, never paid for. Contact each spa directly by WhatsApp or phone.',
    loading: 'Loading',
    skip: 'Skip to content',
    close: 'Close',
  },

  format: {
    mad,
    // from: (amount: number) => `from ${mad(amount)}`,
    spas,
    reviews: (count: number) => `${count} ${count === 1 ? 'review' : 'reviews'}`,
    score: (value: number) => value.toFixed(1),
    quote: (text: string) => `“${text}”`,
  },

  nav: {
    main: 'Main',
    discover: 'Discover',
    cities: 'Cities',
    experiences: 'Experiences',
    forSpas: 'For spas',
    search: 'Search',
    menu: 'Menu',
    language: 'Language',
    top: 'Back to top',
  },

  hero: {
    eyebrow: 'The guide to spas in Morocco',
    title: 'Find your *perfect* spa in Morocco',
    imageAlt: 'A serene spa setting in Morocco',
    promises: ['Selected by editors', 'Rated by guests', 'Never paid for'],
    picks: 'This month’s picks',
    allSpas: 'All spas',
  },

  search: {
    label: 'Find a spa',
    submit: 'Search',
    submitSpas: 'Search spas',
    count: (count: number) => `${spas(count)} to choose from`,
    none: 'No exact match yet: we will show the closest',
    fields: {
      city: { label: 'City', any: 'Anywhere' },
      experience: { label: 'Experience', any: 'Any experience' },
      budget: { label: 'Budget', any: 'Any budget' },
      occasion: { label: 'Occasion', any: 'Any occasion' },
    },
  },

  picks: {
    month: 'October',
    title: 'This month’s *picks*',
    lede: 'The addresses our editors would book right now. They change every month and are never sold.',
    seal: 'October picks',
    view: 'View spa',
    why: {
      'jardin-argile':
        'The heat has broken. The palm garden is at its best: warm enough for the pool, cool enough for clay at noon.',
      'asif-wellness': 'The autumn swell has reached Taghazout, and with it the sore shoulders. The terrace is still quiet.',
      'maison-oudaya':
        'Clear river light and no crowds. Rabat’s best month, and the easiest time to get one of the three rooms.',
      'villa-marshan': 'The summer crowds have crossed back over the Strait. White light, mild air, and the garden to yourself.',
    },
    signature: {
      'jardin-argile': 'Rhassoul garden wrap',
      'asif-wellness': 'Surfer’s recovery',
      'maison-oudaya': 'Rituel de la Kasbah',
      'villa-marshan': 'Soin du Détroit',
    },
  },

  cities: {
    eyebrow: 'Five cities',
    title: 'Discover by *city*',
    lede: 'Every city bathes differently. Start with the one you are going to.',
    all: 'All cities',
    known: 'Come for',
    see: (count: number) => (count === 1 ? 'See the spa' : `See the ${count} spas`),
    byId: {
      marrakech: {
        name: 'Marrakech',
        alt: 'A painted cedar door under a pointed arch, set in a rose-pink wall in Marrakech',
        line: 'The capital of the hammam, from neighbourhood bathhouse to palace ritual.',
        known: ['Hammam', 'Riads', 'Palaces'],
      },
      casablanca: {
        name: 'Casablanca',
        alt: 'The Hassan II Mosque and its minaret above the Atlantic in Casablanca',
        line: 'A working city that takes its skin, its massage and its Atlantic seriously.',
        known: ['Facials', 'Massage', 'Atlantic'],
      },
      agadir: {
        name: 'Agadir',
        alt: 'Blue fishing boats on the beach below the white houses of Taghazout, near Agadir',
        line: 'Argan country and Atlantic swell: thalasso on the bay, recovery up the coast.',
        known: ['Thalasso', 'Argan', 'Recovery'],
      },
      rabat: {
        name: 'Rabat',
        alt: 'Palm trees along the ramparts of the Kasbah des Oudayas in Rabat',
        line: 'The quiet capital: classical rituals in the Kasbah, calm clubs in the green quarters.',
        known: ['Rituals', 'Kasbah', 'Quiet'],
      },
      tangier: {
        name: 'Tangier',
        alt: 'White rooftops of the Tangier Kasbah above the bay, seen from a terrace with a zellige table',
        line: 'White rooms above the Strait, and bathhouses the Kasbah never closed.',
        known: ['Bathhouses', 'Kasbah', 'The Strait'],
      },
    },
  },

  experiences: {
    eyebrow: 'Six ways in',
    title: 'Explore by *experience*',
    lede: 'Start from what you want, in your own words.',
    all: 'All experiences',
    choose: 'Choose an experience',
    previous: 'Previous experience',
    next: 'Next experience',
    byId: {
      hammam: {
        name: 'Hammam',
        words: 'I want a proper hammam with a real gommage.',
        promise: 'Steam, black soap and a proper gommage.',
      },
      massage: {
        name: 'Massage',
        words: 'My back hurts after the trip.',
        promise: 'Hands that know what a long journey does to a back.',
      },
      beauty: {
        name: 'Beauty',
        words: 'A facial before the wedding.',
        promise: 'Facials and finishing touches, done with care.',
      },
      wellness: {
        name: 'Wellness',
        words: 'A whole day to switch off.',
        promise: 'A whole day with nothing asked of you.',
      },
      couples: {
        name: 'Couples',
        words: 'Something special for our anniversary.',
        promise: 'Side by side, without the clichés.',
      },
      recovery: {
        name: 'Recovery',
        words: 'After hiking in the Atlas.',
        promise: 'For legs that have met the Atlas or the Atlantic.',
      },
    },
  },

  closing: {
    eyebrow: 'Still deciding',
    title: 'Not sure yet? *Start with a city.*',
    lede: 'Tell us where you will be. We will show you who is worth the visit.',
    arcadeAlt: 'Horseshoe arches in rose plaster around a marble fountain',
  },

  forSpas: {
    eyebrow: 'For spa owners',
    title: 'Run a spa? Be found by people *choosing one*.',
    line: 'Visibility, content and demand reports. Selection stays editorial.',
    cta: 'For spas',
    doorAlt: 'A brick horseshoe arch with a heavy wooden door, opening onto a sunlit lane',
  },

  footer: {
    label: 'Footer',
    gloss: 'Selection is earned. Visibility is bought. The two never touch.',
    discover: 'Discover',
    cities: 'Cities',
    experiences: 'Experiences',
    about: 'About',
    contact: 'Contact',
    navigation: 'Navigation',
    allSpas: 'All spas',
    picks: 'This month’s picks',
    hammams: 'Traditional hammams',
    forSpas: 'For spas',
    write: 'Write to the editors',
    report: 'Report an error',
    correction: 'Correction',
    demo: 'Demonstration edition: the spas, ratings and prices shown are illustrative.',
  },

  menu: {
    allSpas: 'All spas',
    byCity: 'By city',
    byExperience: 'By experience',
    motto: 'Selected by editors. Rated by guests. Never paid for.',
  },

  overlay: {
    title: 'Search',
    label: 'Search the guide',
    placeholder: 'City, neighbourhood, ritual or spa',
    suggestions: 'Suggestions',
    allSpas: 'All spas',
    show: (count: number) => `Show ${spas(count)}`,
    closest: 'See the closest matches',
    startCity: 'Start with a city',
    orWant: 'Or with what you want',
    groups: { Places: 'Places', Experiences: 'Experiences', Spas: 'Spas' },
    withFeature: (feature: string) => `With ${feature.toLowerCase()}`,
    rated: (value: string) => `Rated ${value}+`,
  },

  rating: {
    fresh: 'New',
    labels: {
      Excellent: 'Excellent',
      'Very good': 'Very good',
      Good: 'Good',
      Fair: 'Fair',
      Poor: 'Poor',
    },
    spoken: (average: string, count: number, label: string) =>
      `Rated ${average} out of 5 by guests, ${count} ${count === 1 ? 'review' : 'reviews'}, ${label}`,
    spokenFresh: (count: number) => `New on the guide, ${count} ${count === 1 ? 'review' : 'reviews'} so far`,
  },

  comingSoon: {
    title: 'Coming soon',
    description: 'This part of the guide is on its way.',
    eyebrow: 'On its way',
    heading: 'This door opens *soon*.',
    lede: 'We are still preparing this part of the guide. The homepage is ready to explore.',
    back: 'Back to the homepage',
  },

  spaTypes: {
    'hotel-spa': { name: 'Hotel spa', plural: 'Hotel spas' },
    'day-spa': { name: 'Day spa', plural: 'Day spas' },
    'traditional-hammam': { name: 'Traditional hammam', plural: 'Traditional hammams' },
    'luxury-spa': { name: 'Luxury spa', plural: 'Luxury spas' },
    'wellness-centre': { name: 'Wellness centre', plural: 'Wellness centres' },
  },

  occasions: {
    solo: 'Time for myself',
    couple: 'For two',
    friends: 'With friends',
    celebration: 'A celebration',
    'first-hammam': 'My first hammam',
    'after-sport': 'After sport or travel',
  },

  priceBands: {
    1: { name: 'Accessible', range: 'Under 400 MAD' },
    2: { name: 'Mid-range', range: '400 to 800 MAD' },
    3: { name: 'Premium', range: '800 to 1,500 MAD' },
    4: { name: 'Luxury', range: 'Over 1,500 MAD' },
  },

  facilities: {
    pool: 'Pool',
    sauna: 'Sauna',
    jacuzzi: 'Jacuzzi',
    'private-hammam': 'Private hammam',
    'couples-room': 'Couples room',
    gym: 'Gym',
    outdoor: 'Garden or terrace',
    'hotel-access': 'Hotel facilities',
  },

  distinctions: {
    3: 'Exceptional',
    2: 'Highly Recommended',
    1: 'Signature Selection',
  },
}
