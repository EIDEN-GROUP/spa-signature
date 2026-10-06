import { media } from '@/lib/media'
import type { ArticleCategory, EditorialArticle } from '@/lib/types'

export const ARTICLE_CATEGORIES: Record<ArticleCategory, { name: string; purpose: string }> = {
  guide: { name: 'Guide', purpose: 'Compare and choose' },
  ritual: { name: 'Rituals', purpose: 'Understand before you go' },
  picks: { name: 'Editors’ picks', purpose: 'A confident shortcut' },
  education: { name: 'Know before you go', purpose: 'Choose the right treatment' },
  destination: { name: 'Destination', purpose: 'Plan around a trip' },
}

export const BYLINE = 'The Spa Maroc Signature editors'

// Editorial that helps people decide. Every article ends one step from a
// contact action, through live spa cards.

export const ARTICLES: EditorialArticle[] = [
  {
    id: 'what-to-expect-hammam',
    slug: 'what-to-expect-from-a-moroccan-hammam',
    title: 'What to expect from a Moroccan hammam',
    dek: 'A hammam is a sequence, not a treatment. Learn the five steps and every bathhouse in the country makes sense.',
    category: 'guide',
    author: BYLINE,
    publishedOn: '2026-06-02',
    updatedOn: '2026-09-29',
    readMinutes: 4,
    image: media('exp-hammam'),
    experienceId: 'hammam',
    spaIds: ['dar-tassa', 'hammam-talborjt', 'maison-oudaya'],
    body: [
      {
        type: 'p',
        text: 'Once you know the order, every hammam in Morocco makes sense, from a twenty-dirham neighbourhood bathhouse to a ritual that takes an afternoon. The rooms change. The sequence does not.',
      },
      { type: 'h2', id: 'sequence', text: 'The sequence, in five steps' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Warm up. You sit or lie in the hot room for ten to fifteen minutes, pouring warm water over yourself from a brass bowl. Nothing else happens yet, and that is the point: the skin needs time to soften.',
          'Black soap. Savon beldi, a dark paste made from olives, is spread over the body and left for a few minutes. It does not lather.',
          'The gommage. An attendant scrubs you with a kessa, a rough glove, in long firm strokes. Grey rolls of dead skin come away. It looks alarming and feels remarkable.',
          'Clay. Rhassoul, a mineral clay from the Middle Atlas, goes on skin and hair and is rinsed away with a great deal of water.',
          'Rest. You cool down slowly with a glass of mint tea. Skipping this is the commonest mistake.',
        ],
      },
      { type: 'h2', id: 'public-or-private', text: 'Public or private?' },
      {
        type: 'p',
        text: 'In a public hammam the neighbourhood bathes together, women and men separately, at different hours or in different rooms. You bring or buy soap and a glove, find a place on the warm floor, and either scrub yourself or pay an attendant, the tayaba, to do it. It costs very little and it is the real thing.',
      },
      {
        type: 'p',
        text: 'A private hammam gives you the same sequence in a room of your own, with an attendant throughout. It is the easier choice the first time, and the only way for a couple to go together.',
      },
      {
        type: 'facts',
        caption: 'At a glance',
        rows: [
          { label: 'Time needed', value: '60 to 90 minutes, plus rest' },
          { label: 'What to wear', value: 'Underwear or a swimsuit bottom; spas provide a disposable pair' },
          { label: 'What to bring', value: 'Nothing to a spa. To a public hammam: a towel, sandals, clean underwear' },
          { label: 'Tipping', value: '10 to 20 MAD in a public hammam, about ten percent in a spa' },
        ],
      },
      { type: 'h2', id: 'courtesies', text: 'A few courtesies' },
      {
        type: 'list',
        items: [
          'Say if the scrub is too firm. “B’shwiya” means gently.',
          'Do not shave or wax the same day; the scrub will sting.',
          'Drink water before and after. The heat is real.',
          'Leave jewellery at the hotel. Black soap dulls silver.',
        ],
      },
      { type: 'h2', id: 'when-not', text: 'When not to go' },
      {
        type: 'p',
        text: 'Give it a miss with sunburn, a fever or broken skin. If you are pregnant or have a heart condition, ask your doctor first and tell the spa; many offer a cooler, shorter version.',
      },
      { type: 'spas', title: 'Three hammams for a first time', ids: ['dar-tassa', 'hammam-talborjt', 'maison-oudaya'] },
    ],
  },
  {
    id: 'hammam-cost',
    slug: 'how-much-does-a-hammam-cost-in-morocco',
    title: 'How much does a hammam cost in Morocco?',
    dek: 'From 20 dirhams to more than 2,000. What you pay for is privacy, time and setting, and rarely the quality of the scrub.',
    category: 'guide',
    author: BYLINE,
    publishedOn: '2026-07-14',
    updatedOn: '2026-09-28',
    readMinutes: 3,
    image: media('spa-dar-tassa'),
    experienceId: 'hammam',
    spaIds: ['hammam-talborjt', 'dar-tassa', 'riad-sahrij'],
    body: [
      {
        type: 'p',
        text: 'The sequence barely changes between a neighbourhood bathhouse and a palace spa. What changes is how private it is, how long it lasts and how much is done for you. These are the prices we recorded across our five cities in 2026.',
      },
      {
        type: 'facts',
        caption: 'Typical prices, 2026',
        rows: [
          { label: 'Public hammam, entry', value: '15 to 30 MAD' },
          { label: 'Scrub by an attendant, public hammam', value: '50 to 100 MAD' },
          { label: 'Private room with gommage, neighbourhood hammam', value: '250 to 300 MAD' },
          { label: 'Hammam and gommage, riad or day spa', value: '300 to 700 MAD' },
          { label: 'Hammam with clay wrap or massage', value: '480 to 980 MAD' },
          { label: 'Full ritual, most refined spas', value: '1,350 to 2,400 MAD' },
        ],
      },
      { type: 'h2', id: 'what-changes', text: 'What changes with the price' },
      {
        type: 'p',
        text: 'Privacy first. In a public hammam you share the room; from about 250 MAD you have one to yourself. Then time: a neighbourhood scrub takes twenty minutes, a spa ritual two hours or more. Then the setting, the products, and the tea you are given afterwards.',
      },
      {
        type: 'quote',
        text: 'What does not reliably change is the skill of the scrub. Some of the most thorough gommages we had this year cost 250 dirhams.',
      },
      { type: 'h2', id: 'city-by-city', text: 'City by city' },
      {
        type: 'p',
        text: 'Marrakech has the widest spread and the highest ceiling. Casablanca and Rabat are a little cheaper for the same standard and far less seasonal. Agadir’s neighbourhood hammams are the best value in our selection. Tangier’s Kasbah bathhouses are the cheapest of all.',
      },
      { type: 'h2', id: 'extras', text: 'Extras and tipping' },
      {
        type: 'list',
        items: [
          'Tips are not included: 10 to 20 MAD for an attendant in a public hammam, about ten percent in a spa.',
          'A walk-in from the nearest gate, or a transfer from your hotel, is sometimes offered free. Ask.',
          'Prices on every profile are checked by us and dated. If you are quoted something different, tell us.',
        ],
      },
      { type: 'spas', title: 'Three price points, three good hammams', ids: ['hammam-talborjt', 'dar-tassa', 'riad-sahrij'] },
    ],
  },
  {
    id: 'ritual-glossary',
    slug: 'black-soap-rhassoul-argan-a-glossary',
    title: 'Black soap, rhassoul, argan: a short glossary of the ritual',
    dek: 'Five ingredients do most of the work in a Moroccan spa. Know them and any treatment menu becomes readable.',
    category: 'ritual',
    author: BYLINE,
    publishedOn: '2026-05-20',
    updatedOn: '2026-09-15',
    readMinutes: 4,
    image: media('spa-bab-el-assa'),
    experienceId: 'hammam',
    spaIds: ['jardin-argile', 'dar-tassa', 'maison-gauthier'],
    body: [
      {
        type: 'p',
        text: 'None of these is exotic here. They are sold by weight in every souk, and most Moroccan households keep all five. Spas differ mainly in how fresh their ingredients are and how well they are used.',
      },
      { type: 'h2', id: 'savon-beldi', text: 'Savon beldi' },
      {
        type: 'p',
        text: 'Black soap: a soft, dark paste made from olives and olive oil. It does not foam. Spread on warm, damp skin and left for five minutes, it loosens the surface layer so the glove can lift it. Good black soap smells of olives, sometimes of eucalyptus.',
      },
      { type: 'h2', id: 'kessa', text: 'Kessa' },
      {
        type: 'p',
        text: 'The glove: a crêped mitt, rougher than it looks. Used in long strokes on softened skin, it removes dead cells in visible grey rolls. Every guest should be given a new one; in good hammams it is yours to keep.',
      },
      { type: 'h2', id: 'rhassoul', text: 'Rhassoul' },
      {
        type: 'p',
        text: 'Also written ghassoul. A mineral clay mined in the Moulouya valley of the Middle Atlas and used for washing for centuries. It arrives as dry brown flakes, is mixed with warm water or flower water into a smooth paste, and is applied to skin and hair. It cleans without soap and rinses away easily.',
      },
      { type: 'h2', id: 'argan', text: 'Argan oil' },
      {
        type: 'p',
        text: 'Pressed from the kernels of the argan tree, which grows wild only in south-western Morocco, between Essaouira and the Souss. Cosmetic argan oil is cold-pressed from raw kernels and has almost no scent; the culinary oil is roasted and smells of hazelnut. The argan forest is a UNESCO biosphere reserve, and much of the oil is still produced by women’s cooperatives.',
      },
      { type: 'h2', id: 'flower-waters', text: 'Rose and orange-flower water' },
      {
        type: 'p',
        text: 'Distilled each spring: roses in the Dadès valley around Kelaat M’Gouna, bitter-orange blossom around Marrakech and Fès. Both are used to mix clay, to rinse the face, and to scent the hands of guests on arrival.',
      },
      { type: 'spas', title: 'Where these are used well', ids: ['jardin-argile', 'dar-tassa', 'maison-gauthier'] },
    ],
  },
  {
    id: 'weekend-picks-october',
    slug: 'three-spas-we-would-visit-this-weekend',
    title: 'Three spas we would visit this weekend',
    dek: 'October’s picks from the editors: a palm garden, a terrace above the surf and a riad over the river.',
    category: 'picks',
    author: BYLINE,
    publishedOn: '2026-10-01',
    updatedOn: '2026-10-01',
    readMinutes: 2,
    image: media('exp-couples'),
    spaIds: ['jardin-argile', 'asif-wellness', 'maison-oudaya'],
    body: [
      {
        type: 'p',
        text: 'Every month the editors choose a few addresses that suit the season. Nothing here is sponsored, and a spa cannot ask to be included.',
      },
      { type: 'h2', id: 'jardin-argile', text: 'Jardin d’Argile, Marrakech' },
      {
        type: 'p',
        text: 'The heat has broken. October is when the palm garden is at its best: warm enough for the pool, cool enough for a clay wrap at noon. Go on a weekday, when the long tables are half empty.',
      },
      { type: 'h2', id: 'asif', text: 'Asif Wellness House, Taghazout' },
      {
        type: 'p',
        text: 'The autumn swell has arrived, and with it the sore shoulders. The terrace is at its quietest before the winter season begins in November.',
      },
      { type: 'h2', id: 'oudaya', text: 'Maison Oudaya, Rabat' },
      {
        type: 'p',
        text: 'Clear river light and no crowds. This is Rabat’s best month, and the one time of year you can book the Kasbah ritual with only a few days’ notice.',
      },
      { type: 'spas', title: 'This month’s three', ids: ['jardin-argile', 'asif-wellness', 'maison-oudaya'] },
    ],
  },
  {
    id: 'agadir-weekend',
    slug: 'a-slow-spa-weekend-in-agadir-and-taghazout',
    title: 'A slow spa weekend in Agadir and Taghazout',
    dek: 'Two days built around heat, water and good hands: a neighbourhood hammam on Saturday, recovery above the surf on Sunday.',
    category: 'destination',
    author: BYLINE,
    publishedOn: '2026-08-18',
    updatedOn: '2026-09-22',
    readMinutes: 3,
    image: media('spa-asif'),
    cityId: 'agadir',
    spaIds: ['hammam-talborjt', 'asif-wellness'],
    body: [
      {
        type: 'p',
        text: 'Agadir is the easiest city in Morocco to do nothing in, which makes it ideal for two days of being looked after. This is the weekend we would plan.',
      },
      { type: 'h2', id: 'saturday-morning', text: 'Saturday morning: the neighbourhood hammam' },
      {
        type: 'p',
        text: 'Start in Talborjt, away from the bay. Hammam Talborjt opens at 06:30 and is quietest before ten. Reserve the private room by WhatsApp the day before, bring nothing, and allow seventy minutes. Afterwards, walk two streets to Place Lahcen Tamri for bread, amlou and coffee.',
      },
      { type: 'h2', id: 'saturday-afternoon', text: 'Saturday afternoon: stay out of the sun' },
      {
        type: 'p',
        text: 'Skin that has just been scrubbed should be kept in the shade. Take the afternoon slowly: a long lunch, the promenade at dusk, grilled fish at the port.',
      },
      { type: 'h2', id: 'sunday', text: 'Sunday: up the coast' },
      {
        type: 'p',
        text: 'Take the coast road north to Taghazout, twenty-five minutes by taxi. If you surf, surf first. Then Asif Wellness House: the sauna and cold plunge, an hour of sports massage, and verbena on the terrace until the light goes.',
      },
      {
        type: 'facts',
        caption: 'The weekend in numbers',
        rows: [
          { label: 'Private hammam, Talborjt', value: '250 MAD' },
          { label: 'Surfer’s recovery, Taghazout', value: '690 MAD' },
          { label: 'Agadir to Taghazout', value: '25 minutes by taxi' },
          { label: 'Best months', value: 'October to April' },
        ],
      },
      { type: 'spas', title: 'The two addresses', ids: ['hammam-talborjt', 'asif-wellness'] },
    ],
  },
  {
    id: 'which-massage',
    slug: 'which-massage-a-plain-guide',
    title: 'Which massage? A plain guide to what the menu means',
    dek: 'Spa menus are written to sound appealing, not to be understood. Most come down to five kinds of massage.',
    category: 'education',
    author: BYLINE,
    publishedOn: '2026-07-01',
    updatedOn: '2026-09-08',
    readMinutes: 3,
    image: media('exp-massage'),
    experienceId: 'massage',
    spaIds: ['spa-oceane', 'villa-marshan', 'asif-wellness'],
    body: [
      {
        type: 'p',
        text: 'Here is what each one is and who it suits. If a menu uses a name you do not recognise, ask which of these it is closest to.',
      },
      { type: 'h2', id: 'relaxing', text: 'Relaxing, or Moroccan' },
      {
        type: 'p',
        text: 'Long, slow, enveloping strokes with warm argan oil, at medium pressure. Traditionally given after the hammam. Choose it to unwind; do not expect it to undo a knot.',
      },
      { type: 'h2', id: 'deep-tissue', text: 'Deep tissue' },
      {
        type: 'p',
        text: 'Slower and firmer, working into specific muscles. Good for stiff shoulders and backs after travel. It should be intense, never painful: say so if it is.',
      },
      { type: 'h2', id: 'sports', text: 'Sports' },
      {
        type: 'p',
        text: 'Deep work with stretching, aimed at the muscles you have been using. The therapist should ask what you did that week. Best the day after a long walk, a climb or a surf session.',
      },
      { type: 'h2', id: 'hot-stone', text: 'Hot stone' },
      {
        type: 'p',
        text: 'Smooth heated stones are placed on the body and used to massage. Deeply warming, lighter on technique. A good choice in winter.',
      },
      { type: 'h2', id: 'four-hands', text: 'Four hands' },
      { type: 'p', text: 'Two therapists working in unison. More sensation than therapy, and wonderful once.' },
      { type: 'h2', id: 'how-to-choose', text: 'How to choose' },
      {
        type: 'list',
        items: [
          'Tired and tense all over: relaxing, sixty minutes or more.',
          'One problem area: deep tissue, and say where.',
          'After effort: sports.',
          'After the hammam: any of them, for at least sixty minutes.',
        ],
      },
      { type: 'spas', title: 'Three spas we trust for massage', ids: ['spa-oceane', 'villa-marshan', 'asif-wellness'] },
    ],
  },
]

export function getArticleBySlug(slug: string | undefined): EditorialArticle | undefined {
  return ARTICLES.find((article) => article.slug === slug)
}

/** Newest first. */
export function latestArticles(): EditorialArticle[] {
  return [...ARTICLES].sort((a, b) => b.updatedOn.localeCompare(a.updatedOn))
}

/** The homepage lead and the order beneath it. */
export const FEATURED_ARTICLE_IDS = ['what-to-expect-hammam', 'hammam-cost', 'ritual-glossary', 'which-massage']
