import type { Experience } from '../domain/types'
import { media } from './media'

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
    image: media('redhammam-45'),
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
    image: media('towel-34'),
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
    image: media('facial-45'),
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
    image: media('courtyard-45'),
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
    image: media('courtyard-water'),
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
    image: media('towel-hands-11'),
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
