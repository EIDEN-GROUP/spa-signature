import { media } from '@/lib/media'
import { meanRating, reviewCount, summarise } from '@/lib/rating'
import { SPAS } from '@/lib/spas'
import { priceBandOf, SPA_TYPES } from '@/lib/taxonomy'
import type {
  City,
  CityId,
  Experience,
  ExperienceId,
  Neighbourhood,
  PriceBandId,
  Spa,
  SpaCardData,
  Treatment,
} from '@/lib/types'

// ── Cities ──────────────────────────────────────────────────────────────────────

export const CITIES: City[] = [
  {
    id: 'marrakech',
    slug: 'marrakech',
    name: 'Marrakech',
    aliases: ['marrakech', 'marrakesh', 'marakech', 'marrakech medina', 'kech'],
    region: 'imperial-cities',
    tagline: 'The capital of the hammam, from neighbourhood bathhouse to palace ritual.',
    intro: [
      'Marrakech is where most visitors meet the Moroccan hammam for the first time, and no city offers a wider range. Within a short taxi ride there are neighbourhood bathhouses where a scrub costs less than the fare, riad hammams tiled a century ago, and spas built around courtyards that ask for a whole afternoon.',
      'The Médina and the Kasbah hold the oldest rooms and the most atmosphere. Guéliz and Hivernage have the urban day spas, easier to reach and easier to book. The Palmeraie, twenty minutes north, trades history for gardens and space.',
      'The city is fierce in summer: from June to September, book mornings or evenings and keep the hours after lunch for shade. November to March is high season, when the best addresses fill several days ahead. Whatever the month, a good hammam here follows the same slow order: heat, black soap, a thorough gommage, clay, rest, tea.',
    ],
    image: media('city-marrakech'),
    neighbourhoods: [
      { id: 'medina', name: 'Médina', aliases: ['medina', 'old town', 'vieille ville', 'mouassine'] },
      { id: 'kasbah', name: 'Kasbah', aliases: ['kasbah', 'casbah', 'bab agnaou'] },
      { id: 'gueliz', name: 'Guéliz', aliases: ['gueliz', 'ville nouvelle'] },
      { id: 'hivernage', name: 'Hivernage', aliases: ['hivernage'] },
      { id: 'palmeraie', name: 'Palmeraie', aliases: ['palmeraie', 'palm grove'] },
    ],
    practical: {
      prices:
        'Entry to a public hammam is usually 15 to 30 MAD, with a scrub by an attendant from 50 to 100 MAD. A private hammam with gommage in a riad or day spa runs from 250 to 500 MAD. Full rituals in the most refined spas start around 1,200 MAD.',
      etiquette:
        'Public hammams are single-sex or keep separate hours. You keep your underwear on; private spas provide a disposable pair. A tip of 10 to 20 MAD for the attendant in a public hammam, or around ten percent in a spa, is customary.',
      gettingAround:
        'Cars cannot enter most of the Médina. Ask the spa to send someone to meet you at the nearest gate, and allow ten minutes on foot. Petits taxis are metered; agree on the meter before you set off.',
      ramadan:
        'During Ramadan many spas open later, close before sunset and reopen after the evening meal. Each profile lists Ramadan hours; confirm by WhatsApp the day before.',
    },
    faq: [
      {
        question: 'Do I need to book a hammam in Marrakech in advance?',
        answer:
          'For a private hammam or a spa ritual, yes: two or three days ahead in high season, the day before otherwise. Public hammams take no reservations; you simply arrive.',
      },
      {
        question: 'Which area is best for a first hammam?',
        answer:
          'The Médina, for the atmosphere and the choice. Pick a spa that meets you at a gate, because the lanes are hard to navigate the first time.',
      },
      {
        question: 'Can couples go to a hammam together in Marrakech?',
        answer:
          'Not in a public hammam, which is single-sex. Many private spas have a room for two; look for “Couples room” in the facilities.',
      },
    ],
  },
  {
    id: 'casablanca',
    slug: 'casablanca',
    name: 'Casablanca',
    aliases: ['casablanca', 'casa', 'dar el beida'],
    region: 'atlantic-coast',
    tagline: 'A working city that takes its skin, its massage and its Atlantic seriously.',
    intro: [
      'Casablanca does not perform for visitors, and its spas are better for it. This is where Moroccans who care about treatments come for them: therapists stay for years, standards are checked by regulars, and nobody is selling an experience to someone who will never return.',
      'The city spreads along the ocean. Aïn Diab and the Corniche have the hotel spas with sea light and pools. Gauthier and Maârif, in the centre, are where the beauty ateliers work quietly on first floors. The Habous quarter, built in the 1920s, keeps the neighbourhood hammam alive beside its bookshops and olive sellers.',
      'Come here for a facial before an event, for a massage after a long flight, or for a public hammam shared with the quarter rather than with other travellers. Traffic is the only real obstacle: leave twice the time you think you need, or take the tram.',
    ],
    image: media('city-casablanca'),
    neighbourhoods: [
      { id: 'ain-diab', name: 'Aïn Diab', aliases: ['ain diab', 'corniche', 'la corniche'] },
      { id: 'anfa', name: 'Anfa', aliases: ['anfa'] },
      { id: 'gauthier', name: 'Gauthier', aliases: ['gauthier', 'centre ville'] },
      { id: 'maarif', name: 'Maârif', aliases: ['maarif'] },
      { id: 'habous', name: 'Habous', aliases: ['habous', 'quartier des habous', 'nouvelle medina'] },
    ],
    practical: {
      prices:
        'A neighbourhood hammam costs 20 to 30 MAD to enter, with a private room and scrub from around 280 MAD. Facials in the city’s ateliers run from 400 to 750 MAD. A massage in a hotel spa on the Corniche is typically 850 to 1,200 MAD.',
      etiquette:
        'Casablanca is relaxed and largely French-speaking in its spas. In public hammams, bring or buy a glove and black soap at the door, and keep your underwear on. Tipping ten percent in a spa is appreciated, not expected.',
      gettingAround:
        'The tram reaches Aïn Diab and the centre; red petits taxis are metered and shared. Avoid crossing the city between 17:00 and 19:30.',
      ramadan:
        'Hotel spas keep close to normal hours. Independent spas and hammams often open at 10:00, close by 17:00 and reopen from about 20:30.',
    },
    faq: [
      {
        question: 'Is Casablanca worth it for a spa day?',
        answer:
          'Yes, if you value the treatment over the setting. The city’s therapists are among the most experienced in the country, especially for facials and massage.',
      },
      {
        question: 'Where can I find a traditional hammam in Casablanca?',
        answer: 'The Habous quarter has working neighbourhood hammams, some with private rooms that can be reserved.',
      },
      {
        question: 'Can I use a hotel spa without staying at the hotel?',
        answer:
          'Usually yes, with a treatment booked. Access to the pool and sauna is often included; the profile says so under Facilities.',
      },
    ],
  },
  {
    id: 'agadir',
    slug: 'agadir',
    name: 'Agadir',
    aliases: ['agadir', 'taghazout', 'souss'],
    region: 'atlantic-coast',
    tagline: 'Argan country and Atlantic swell: thalasso on the bay, recovery up the coast.',
    intro: [
      'Agadir sits at the mouth of the Souss, the only place in the world where the argan tree grows wild. The oil pressed in the cooperatives behind the city ends up on massage tables across Morocco; here it is local, and it shows in the treatments.',
      'The bay has the resort spas: seawater pools, thalasso circuits and long menus, built for guests who want everything in one place. Talborjt, the neighbourhood rebuilt after the 1960 earthquake, has the hammams that people who live here actually use, at prices that have little to do with tourism.',
      'Twenty minutes north, Taghazout and Tamraght have turned surf culture into something useful: small wellness houses where the massage is sports massage and the therapists know what paddling does to shoulders. The season never really ends. Winter brings the swell and the visitors; summer is cooler than Marrakech by ten degrees.',
    ],
    image: media('city-agadir'),
    neighbourhoods: [
      { id: 'founty', name: 'Founty', aliases: ['founty', 'baie d agadir', 'agadir bay', 'the bay'] },
      { id: 'talborjt', name: 'Talborjt', aliases: ['talborjt', 'nouveau talborjt'] },
      { id: 'marina', name: 'Marina', aliases: ['marina'] },
      { id: 'taghazout', name: 'Taghazout', aliases: ['taghazout', 'taghazout bay', 'tamraght'] },
    ],
    practical: {
      prices:
        'A neighbourhood hammam in Talborjt costs about 20 MAD to enter, or around 250 MAD for a private room with scrub. A sports massage in Taghazout is 450 to 550 MAD. Thalasso packages on the bay start near 900 MAD.',
      etiquette:
        'Agadir is easy-going and used to visitors. Swimwear is expected in resort pools and thalasso circuits; in a traditional hammam, keep your underwear on as elsewhere.',
      gettingAround:
        'Orange petits taxis cover the city. Taghazout is 20 to 30 minutes by grand taxi or the coastal bus; most wellness houses can arrange a transfer.',
      ramadan:
        'Resort spas keep normal hours. Neighbourhood hammams and the houses in Taghazout shorten the day and reopen after the evening meal.',
    },
    faq: [
      {
        question: 'Is Taghazout part of Agadir on this guide?',
        answer:
          'Yes. We list Taghazout and Tamraght under Agadir, because most people stay in one and visit the other. The neighbourhood filter separates them.',
      },
      {
        question: 'What is thalasso?',
        answer:
          'A set of treatments using heated seawater, seaweed and marine mud: pools with jets, baths and wraps. Agadir’s bay is one of the few places in Morocco that offers it.',
      },
      {
        question: 'Where should I go after surfing?',
        answer: 'Filter by the Recovery experience. The wellness houses around Taghazout specialise in sports massage and cold-water circuits.',
      },
    ],
  },
  {
    id: 'rabat',
    slug: 'rabat',
    name: 'Rabat',
    aliases: ['rabat', 'sale', 'rabat sale'],
    region: 'imperial-cities',
    tagline: 'The quiet capital: classical rituals in the Kasbah, calm clubs in the green quarters.',
    intro: [
      'Rabat is the imperial city people forget, which is exactly its charm. The capital is green, orderly and unhurried, and its spas reflect that temperament: fewer than in Marrakech, less theatrical, often better kept.',
      'The Kasbah des Oudayas, blue and white above the mouth of the Bouregreg, hides a handful of riads where the classical ritual is practised with precision. Agdal is the modern residential centre, with bright urban spas used by people who work nearby. Souissi and Hay Riad, the embassy quarters, have the clubs: lap pools, saunas and gardens behind high hedges.',
      'Rabat rewards the traveller who has seen the hammam as spectacle and now wants it as habit. Autumn and spring are the best months, with clear river light and mild evenings. The tram makes the city easy; so does the fact that almost nobody is trying to sell you anything.',
    ],
    image: media('city-rabat'),
    neighbourhoods: [
      { id: 'oudayas', name: 'Kasbah des Oudayas', aliases: ['oudayas', 'oudaias', 'oudaya', 'kasbah des oudayas'] },
      { id: 'medina', name: 'Médina', aliases: ['medina'] },
      { id: 'hassan', name: 'Hassan', aliases: ['hassan', 'tour hassan'] },
      { id: 'agdal', name: 'Agdal', aliases: ['agdal'] },
      { id: 'souissi', name: 'Souissi', aliases: ['souissi', 'hay riad'] },
    ],
    practical: {
      prices:
        'An urban spa in Agdal charges 300 to 400 MAD for a hammam with scrub. A classical ritual in the Kasbah runs from 600 to 1,400 MAD. Day passes to the clubs of Souissi are around 350 MAD on weekdays.',
      etiquette:
        'Rabat is formal by Moroccan standards. Arrive on time, and note that several clubs in Souissi receive day guests on weekdays only.',
      gettingAround:
        'The tram links Agdal, Hassan and the edge of the Médina. The Kasbah is on foot only; blue petits taxis will leave you at the main gate.',
      ramadan:
        'Most spas open from 10:00 to 17:00 and again in the evening. Clubs keep reduced daytime hours for the pool.',
    },
    faq: [
      {
        question: 'Is Rabat a good alternative to Marrakech for a hammam?',
        answer:
          'For the classical ritual in a calm setting, yes. There is less choice, but the best addresses are excellent and far less crowded.',
      },
      {
        question: 'Can non-members use the wellness clubs in Souissi?',
        answer: 'Several sell weekday day passes. The profile states when day guests are received.',
      },
      {
        question: 'How far is Rabat from Casablanca?',
        answer: 'About an hour by train, with departures all day. A spa day in Rabat from Casablanca is easy.',
      },
    ],
  },
  {
    id: 'tangier',
    slug: 'tangier',
    name: 'Tangier',
    aliases: ['tangier', 'tanger', 'tangiers', 'tanja'],
    region: 'north',
    tagline: 'White rooms above the Strait, and bathhouses the Kasbah never closed.',
    intro: [
      'Tangier looks north. From the cliffs at Marshan you can see Spain on a clear day, and the city has always taken something from each shore. Its spas do the same: Andalusian tiles, French linen, Moroccan heat.',
      'The Kasbah and the Médina below it still have working bathhouses, some of the last inside old city walls anywhere on this coast. They are plain, properly hot and used by the people who live there. Marshan, the residential plateau to the west, has the grand villas, a few of them now small hotels with serious spas. Out towards Cap Spartel, where the Atlantic meets the Mediterranean, new addresses are opening among the pines.',
      'The light is the reason to come: white, maritime, different from anywhere else in the country. Summer is busy with Moroccans returning from Europe. Spring and October are the months we would choose.',
    ],
    image: media('city-tangier'),
    neighbourhoods: [
      { id: 'kasbah', name: 'Kasbah', aliases: ['kasbah', 'casbah'] },
      { id: 'medina', name: 'Médina', aliases: ['medina', 'petit socco'] },
      { id: 'marshan', name: 'Marshan', aliases: ['marshan', 'marchane'] },
      { id: 'malabata', name: 'Malabata', aliases: ['malabata'] },
      { id: 'cap-spartel', name: 'Cap Spartel', aliases: ['cap spartel', 'spartel', 'california'] },
    ],
    practical: {
      prices:
        'A Kasbah bathhouse costs about 20 MAD to enter and under 200 MAD with a scrub. Treatments in the villa hotels of Marshan run from 700 to 1,700 MAD.',
      etiquette:
        'Spanish is as useful as French in the old town. Bathhouses in the Kasbah keep strict women’s and men’s hours; check before you walk up.',
      gettingAround:
        'The Kasbah is steep and on foot only. Turquoise petits taxis are metered; for Cap Spartel, agree a return time with the driver.',
      ramadan: 'Bathhouses shift to the evening. Hotel spas keep daytime hours and add a late session after sunset.',
    },
    faq: [
      {
        question: 'Are there traditional hammams inside Tangier’s Kasbah?',
        answer:
          'Yes, a few bathhouses still work inside the walls, with separate hours for women and men. They are simple; go for the heat and the atmosphere.',
      },
      {
        question: 'When is the best time to visit Tangier for a spa stay?',
        answer: 'April to June and late September to October: clear light, mild air and room at the best addresses.',
      },
      {
        question: 'Is Tangier easy to combine with other cities?',
        answer: 'The high-speed train reaches Rabat in about an hour and twenty minutes and Casablanca in just over two hours.',
      },
    ],
  },
]

// ── Experiences ─────────────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [
  {
    id: 'hammam',
    slug: 'hammam',
    name: 'Hammam',
    promise: 'Steam, black soap and a proper gommage.',
    inTheirWords: 'I want a proper hammam with a real gommage.',
    intro: [
      'The hammam is Morocco’s oldest wellness practice and still its most democratic: a sequence of warm and hot rooms, a paste of black olive soap, and a scrub with a rough glove that leaves the skin new.',
      'In a neighbourhood bathhouse you do most of it yourself among neighbours. In a private hammam an attendant takes you through the sequence in a room of your own. The steps are the same in both; what changes is the pace, the privacy and the price.',
    ],
    expect: [
      {
        title: 'Heat first',
        text: 'Ten to fifteen minutes in the hot room, rinsing with warm water from a brass bowl, until the skin softens.',
      },
      {
        title: 'Black soap, then the glove',
        text: 'Savon beldi is spread over the body and left to work. The kessa glove follows: firm, thorough, never painful if you say so.',
      },
      {
        title: 'Clay, rinse, rest',
        text: 'Rhassoul clay on skin and hair, a long rinse, then tea somewhere cool. Allow an hour and a quarter in all.',
      },
    ],
    image: media('exp-hammam'),
    aliases: ['hammam', 'hamam', 'hamman', 'hammams', 'gommage', 'bain maure', 'steam bath', 'scrub'],
    faq: [
      {
        question: 'What do I wear in a hammam?',
        answer:
          'Underwear or a swimsuit bottom. Private spas give you a disposable pair. Nudity is not the custom in Moroccan hammams.',
      },
      {
        question: 'Does the gommage hurt?',
        answer:
          'It is vigorous, not painful. Attendants adapt their pressure; say “b’shwiya” (gently) or simply ask in French or English.',
      },
      {
        question: 'Can I go to a hammam with sunburn?',
        answer: 'Wait until the skin has recovered. The scrub and the heat are both too much for burnt skin.',
      },
    ],
  },
  {
    id: 'massage',
    slug: 'massage',
    name: 'Massage',
    promise: 'Hands that know what a long journey does to a back.',
    inTheirWords: 'My back hurts after the trip.',
    intro: [
      'A Moroccan massage is traditionally a long, enveloping one, done with warm argan oil after the hammam. The best spas now add trained deep-tissue and sports work, and the difference between a pleasant hour and a useful one comes down to the therapist.',
      'That is why we rate consistency above décor. A spa earns its place here when the same massage is as good on a Tuesday morning as on a Saturday afternoon.',
    ],
    expect: [
      {
        title: 'A question before a touch',
        text: 'Good therapists ask about pressure, injuries and what you want from the hour before they begin.',
      },
      {
        title: 'Argan, warm',
        text: 'Cosmetic argan oil is light, absorbs well and carries a faint nutty scent. Tell the spa in advance about nut allergies.',
      },
      {
        title: 'Sixty minutes is the minimum',
        text: 'Thirty covers a back and neck. For the whole body, book sixty or more; after a hammam, seventy-five is ideal.',
      },
    ],
    image: media('exp-massage'),
    aliases: ['massage', 'massages', 'deep tissue', 'relaxing massage', 'argan massage', 'back pain', 'sports massage'],
    faq: [
      {
        question: 'Should I have the hammam before or after the massage?',
        answer: 'Before. Heat and the scrub loosen the muscles and let the oil do more.',
      },
      {
        question: 'Can I ask for a female or a male therapist?',
        answer: 'Yes, and most spas will ask you. In traditional hammams, attendants are always the same sex as the guests.',
      },
      {
        question: 'How much should I tip?',
        answer: 'Around ten percent, given directly to the therapist, is customary when you are happy with the treatment.',
      },
    ],
  },
  {
    id: 'beauty',
    slug: 'beauty',
    name: 'Beauty',
    promise: 'Facials and finishing touches, done with care.',
    inTheirWords: 'A facial before the wedding.',
    intro: [
      'Morocco’s beauty tradition is built on a short list of ingredients used well: rose water from the valley of Kelaat M’Gouna, prickly-pear seed oil, argan, orange-flower water, clay.',
      'The ateliers we list treat skin as something to be looked at before it is treated. Expect a conversation, a plan, and no pressure to buy at the end.',
    ],
    expect: [
      {
        title: 'A look at your skin',
        text: 'A proper facial begins with questions and a close look, not with a menu.',
      },
      {
        title: 'Clay and flower waters',
        text: 'Masks are often mixed to order from rhassoul or white clay with rose or orange-flower water.',
      },
      {
        title: 'Time it right',
        text: 'Book a facial two or three days before an event, not the morning of it.',
      },
    ],
    image: media('exp-beauty'),
    aliases: ['beauty', 'facial', 'facials', 'face', 'soin visage', 'soin du visage', 'skin', 'bride', 'manicure'],
    faq: [
      {
        question: 'When should I book a facial before an event?',
        answer: 'Two to three days ahead, so any redness has settled and the skin is at its best.',
      },
      {
        question: 'What is prickly-pear seed oil?',
        answer:
          'An oil pressed from the seeds of the Barbary fig. It takes a great many seeds to make a small bottle, which is why it is costly and used sparingly.',
      },
      {
        question: 'Are treatments suitable for sensitive skin?',
        answer: 'Tell the therapist at the start. Good ateliers adapt the products and skip steam or exfoliation where needed.',
      },
    ],
  },
  {
    id: 'wellness',
    slug: 'wellness',
    name: 'Wellness',
    promise: 'A whole day with nothing asked of you.',
    inTheirWords: 'A whole day to switch off.',
    intro: [
      'Some visits are about a treatment. Others are about the day around it: a pool, a sauna, a garden, lunch in a robe, and nobody checking the time.',
      'The addresses here have the space for that. Most sell a day pass with or without a treatment; a few include lunch.',
    ],
    expect: [
      {
        title: 'Arrive early',
        text: 'A day pass is only worth it if you take the day. Come when the doors open.',
      },
      {
        title: 'Water, heat, rest',
        text: 'Alternate pool, sauna or steam, and a long rest. One treatment in the middle is enough.',
      },
      {
        title: 'Check what is included',
        text: 'Towels and robes almost always are. Lunch and swimwear almost never.',
      },
    ],
    image: media('exp-wellness'),
    aliases: ['wellness', 'spa day', 'day pass', 'bien etre', 'bien-etre', 'thalasso', 'relax', 'pool day', 'yoga'],
    faq: [
      {
        question: 'Do I need to stay at the hotel to use its spa?',
        answer: 'Usually not. Most hotel spas receive outside guests with a treatment or a day pass.',
      },
      {
        question: 'What should I bring?',
        answer: 'Swimwear and a book. Robes, towels and slippers are provided almost everywhere.',
      },
      {
        question: 'Are children allowed?',
        answer: 'Rarely in the spa itself. Policies differ; each profile lists them under Good to know.',
      },
    ],
  },
  {
    id: 'couples',
    slug: 'couples',
    name: 'Couples',
    promise: 'Side by side, without the clichés.',
    inTheirWords: 'Something special for our anniversary.',
    intro: [
      'Public hammams are single-sex, so a hammam for two means a private one. The spas listed here have a room built for it, and a treatment room where two tables sit side by side.',
      'We leave out anything that exists only to be photographed. What we look for is a ritual that is as good for two as it would be for one.',
    ],
    expect: [
      {
        title: 'A private hammam',
        text: 'Yours alone for the session, with one or two attendants.',
      },
      {
        title: 'Two tables, two therapists',
        text: 'Massages run in parallel in the same room.',
      },
      {
        title: 'Book earlier than you think',
        text: 'Most spas have a single duo room. Weekends go first.',
      },
    ],
    image: media('exp-couples'),
    aliases: ['couples', 'couple', 'duo', 'for two', 'a deux', 'romantic', 'honeymoon', 'anniversary'],
    faq: [
      {
        question: 'Can a couple share a hammam in Morocco?',
        answer: 'In a private spa hammam, yes. In a public hammam, no: women and men bathe separately.',
      },
      {
        question: 'Is a duo treatment more expensive?',
        answer: 'It is usually priced at about twice the single treatment, sometimes slightly less.',
      },
      {
        question: 'Can friends book a duo room?',
        answer: 'Of course. Many do, especially before a wedding.',
      },
    ],
  },
  {
    id: 'recovery',
    slug: 'recovery',
    name: 'Recovery',
    promise: 'For legs that have met the Atlas or the Atlantic.',
    inTheirWords: 'After hiking in the Atlas.',
    intro: [
      'Toubkal, the dunes, a week of surf at Taghazout: Morocco is hard on legs and shoulders. A growing number of spas are built for the day after.',
      'Recovery here means trained sports massage, heat and cold, and therapists who stretch you properly. It is practical rather than indulgent, and often the best value on the menu.',
    ],
    expect: [
      {
        title: 'Say what you did',
        text: 'Tell the therapist where you walked, climbed or paddled. The session is built around it.',
      },
      {
        title: 'Heat and cold',
        text: 'Sauna or steam, then a cold plunge, repeated two or three times before the massage.',
      },
      {
        title: 'Firm pressure',
        text: 'Sports massage is purposeful. You should feel worked on, not hurt.',
      },
    ],
    image: media('exp-recovery'),
    aliases: ['recovery', 'recuperation', 'sport', 'sports', 'after hiking', 'after surf', 'jet lag', 'cold plunge', 'stretching'],
    faq: [
      {
        question: 'How soon after a trek should I book a massage?',
        answer: 'The next day is ideal. Drink water, eat, sleep, then come.',
      },
      {
        question: 'Is a hammam good after sport?',
        answer:
          'Many people find the heat welcome on tired muscles. Keep the first session short and drink plenty of water afterwards.',
      },
      {
        question: 'Do these spas treat injuries?',
        answer: 'No. They help you recover from effort. For pain that persists, see a doctor or a physiotherapist.',
      },
    ],
  },
]

// ── This month’s picks ──────────────────────────────────────────────────────────

/** The editors' picks for the month. They change monthly and are never sold. */
export const MONTHLY_PICKS = {
  month: 'October',
  year: 2026,
  items: [
    {
      spaId: 'jardin-argile',
      whyNow: 'The heat has broken. The palm garden is at its best: warm enough for the pool, cool enough for clay at noon.',
    },
    {
      spaId: 'asif-wellness',
      whyNow: 'The autumn swell has reached Taghazout, and with it the sore shoulders. The terrace is still quiet.',
    },
    {
      spaId: 'maison-oudaya',
      whyNow: 'Clear river light and no crowds. Rabat’s best month, and the easiest time to get one of the three rooms.',
    },
    {
      spaId: 'villa-marshan',
      whyNow: 'The summer crowds have crossed back over the Strait. White light, mild air, and the garden to yourself.',
    },
  ],
}

// ── Lookups and derived values ──────────────────────────────────────────────────

export { SPAS }

const bySlug = new Map(SPAS.map((spa) => [spa.slug, spa]))
const byId = new Map(SPAS.map((spa) => [spa.id, spa]))
const cityById = new Map(CITIES.map((city) => [city.id, city]))
const experienceById = new Map(EXPERIENCES.map((experience) => [experience.id, experience]))

// ── Lookups ─────────────────────────────────────────────────────────────────

export function getSpaBySlug(slug: string | undefined): Spa | undefined {
  return slug ? bySlug.get(slug) : undefined
}

export function getSpaById(id: string): Spa | undefined {
  return byId.get(id)
}

export function getSpasByIds(ids: string[]): Spa[] {
  return ids.map((id) => byId.get(id)).filter((spa): spa is Spa => spa !== undefined)
}

export function getCity(id: CityId): City {
  return cityById.get(id) as City
}

export function getCityBySlug(slug: string | undefined): City | undefined {
  return CITIES.find((city) => city.slug === slug)
}

export function getExperience(id: ExperienceId): Experience {
  return experienceById.get(id) as Experience
}

export function getExperienceBySlug(slug: string | undefined): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug)
}

export function neighbourhoodOf(spa: Spa): Neighbourhood {
  const city = getCity(spa.cityId)
  return city.neighbourhoods.find((n) => n.id === spa.neighbourhoodId) ?? { id: spa.neighbourhoodId, name: city.name }
}

export function typeName(spa: Spa): string {
  return SPA_TYPES.find((type) => type.id === spa.type)?.name ?? ''
}

// ── Derived values ──────────────────────────────────────────────────────────

/** The ritual a spa is known for. Its price is the "from" price on every card. */
export function signatureTreatment(spa: Spa): Treatment {
  return spa.treatments.find((t) => t.id === spa.signature.treatmentId) ?? spa.treatments[0]
}

export function priceFrom(spa: Spa): number {
  return signatureTreatment(spa).priceMad
}

export function priceBand(spa: Spa): PriceBandId {
  return priceBandOf(priceFrom(spa))
}

export function priceRange(spa: Spa): { min: number; max: number } {
  const prices = spa.treatments.map((t) => t.priceMad)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

const firstSentence = (text: string) => /^.*?[.!?](?=\s|$)/.exec(text)?.[0] ?? text

/** Project a spa to the only shape a card is allowed to read. */
export function toCard(spa: Spa): SpaCardData {
  const signature = signatureTreatment(spa)
  return {
    id: spa.id,
    slug: spa.slug,
    name: spa.name,
    typeLabel: typeName(spa),
    cityName: getCity(spa.cityId).name,
    neighbourhoodName: neighbourhoodOf(spa).name,
    image: spa.media.card,
    leadImage: spa.media.lead,
    selection: spa.selection ? { level: spa.selection.level, year: spa.selection.year } : null,
    rating: summarise(spa.rating),
    descriptor: spa.descriptor,
    signature: { name: signature.name, durationMin: signature.durationMin },
    priceFrom: signature.priceMad,
    verdictLine: firstSentence(spa.verdict.text),
  }
}

// ── Saved queries ───────────────────────────────────────────────────────────

const PRIOR_REVIEWS = 40
const PRIOR_MEAN = SPAS.reduce((sum, spa) => sum + meanRating(spa.rating), 0) / SPAS.length

export function weightedRating(spa: Spa): number {
  const count = reviewCount(spa.rating)
  return (count * meanRating(spa.rating) + PRIOR_REVIEWS * PRIOR_MEAN) / (count + PRIOR_REVIEWS)
}

export function byRecommendation(a: Spa, b: Spa): number { return (b.selection?.level ?? 0) - (a.selection?.level ?? 0) || weightedRating(b) - weightedRating(a) }

export function recommended(spas: Spa[] = SPAS): Spa[] { return [...spas].sort(byRecommendation) }

export function selectedSpas(): Spa[] { return recommended(SPAS.filter((spa) => spa.selection)) }

export function spasInCity(cityId: CityId): Spa[] { return recommended(SPAS.filter((spa) => spa.cityId === cityId)) }

export function spasWithExperience(experienceId: ExperienceId): Spa[] { return recommended(SPAS.filter((spa) => spa.experiences.includes(experienceId))) }

/** Three more to look at, so no profile is a dead end: same city first, then the same budget. */
export function relatedSpas(spa: Spa, limit = 3): Spa[] {
  const others = SPAS.filter((other) => other.id !== spa.id)
  const sameCity = recommended(others.filter((other) => other.cityId === spa.cityId))
  const sameBand = recommended(
    others.filter((other) => other.cityId !== spa.cityId && priceBand(other) === priceBand(spa)),
  )
  const rest = recommended(others.filter((other) => !sameCity.includes(other) && !sameBand.includes(other)))
  return [...sameCity, ...sameBand, ...rest].slice(0, limit)
}

export interface CityStats {
  count: number
  selected: number
  priceFrom: number
}

export function cityStats(cityId: CityId): CityStats {
  const spas = SPAS.filter((spa) => spa.cityId === cityId)
  return {
    count: spas.length,
    selected: spas.filter((spa) => spa.selection).length,
    priceFrom: spas.length ? Math.min(...spas.map(priceFrom)) : 0,
  }
}

/** A city page is indexed once it has enough spas to be useful. */
export const CITY_INDEX_MIN_SPAS = 3

export const TOTALS = {
  spas: SPAS.length,
  cities: CITIES.length,
  selected: SPAS.filter((spa) => spa.selection).length,
  reviews: SPAS.reduce((sum, spa) => sum + reviewCount(spa.rating), 0),
}
