import type { City } from '../domain/types'
import { media } from './media'

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
    image: media('redhammam-45'),
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
    image: media('facial-45'),
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
    image: media('tea-34'),
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
    image: media('brass-34'),
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
    image: media('towel-34'),
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
