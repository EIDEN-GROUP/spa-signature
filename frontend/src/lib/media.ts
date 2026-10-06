import type { Media } from '@/lib/types'

// Every photograph in src/assets, by file name. Vite gives each one its final address.
const FILES = import.meta.glob<string>('../assets/*.webp', { eager: true, import: 'default', query: '?url' })

interface Photo {
  alt: string
  focus?: string
}

/**
 * One line per photograph: what it shows (the alt text) and, when the subject
 * is off-centre, where to hold the crop (a CSS object-position).
 * Where each photograph came from is recorded in src/assets/sources.json.
 */
const PHOTOS = {
  'hero-palmeraie': { alt: 'A long, still pool lined with date palms, leading to a small rose-coloured pavilion' },
  'city-marrakech': { alt: 'A painted cedar door under a pointed arch, set in a rose-pink wall in Marrakech' },
  'city-casablanca': { alt: 'The Hassan II Mosque and its minaret above the Atlantic in Casablanca' },
  'city-agadir': { alt: 'Blue fishing boats on the beach below the white houses of Taghazout, near Agadir' },
  'city-rabat': { alt: 'Palm trees along the ramparts of the Kasbah des Oudayas in Rabat', focus: '77% 50%' },
  'city-tangier': { alt: 'White rooftops of the Tangier Kasbah above the bay, seen from a terrace with a zellige table' },
  'exp-hammam': { alt: 'A green tadelakt hammam with brass basins, dappled by the light of a pierced lantern', focus: '29% 50%' },
  'exp-massage': { alt: 'Rolled towels on a treatment table beneath two carved plaster panels' },
  'exp-beauty': { alt: 'Cupped hands holding freshly picked damask roses', focus: '24% 50%' },
  'exp-wellness': { alt: 'A keyhole arch reflected in a still green pool' },
  'exp-couples': { alt: 'Two glasses of mint tea and a silver teapot on a tray, on a blue zellige table' },
  'exp-recovery': { alt: 'Ridges of the High Atlas fading into morning haze' },
  'spa-riad-sahrij': { alt: 'A green zellige basin and its fountain in a terracotta courtyard, between two potted trees', focus: '50% 89%' },
  'spa-dar-tassa': { alt: 'Water poured from an engraved bowl into a tadelakt basin, beside two hammam pails', focus: '50% 26%' },
  'spa-jardin-argile': { alt: 'A green pool in a walled garden, seen through banana leaves and bougainvillea', focus: '50% 100%' },
  'spa-oceane': { alt: 'An indoor pool beneath a white arched pavilion hung with brass lanterns' },
  'spa-maison-gauthier': { alt: 'Roses floating in a scalloped marble basin beneath a running spout', focus: '50% 85%' },
  'spa-bains-habous': { alt: 'A round mosaic basin in a tiled niche, a jug and bowl on its rim', focus: '50% 76%' },
  'spa-asif': { alt: 'Woven rugs, cushions and low tables on a terrace above the rocky Atlantic shore', focus: '50% 74%' },
  'spa-tifawt': { alt: 'A keyhole-arched door in a wooden lattice, open onto the Atlantic', focus: '50% 63%' },
  'spa-talborjt': { alt: 'Tiled hammam benches in terracotta and sea-green zellige', focus: '50% 83%' },
  'spa-maison-oudaya': { alt: 'A horseshoe-arched alcove edged in green zellige, a white towel hanging beside it', focus: '50% 21%' },
  'spa-bains-agdal': { alt: 'A treatment table laid with linen in a grey tadelakt room', focus: '50% 85%' },
  'spa-cercle-souissi': { alt: 'A narrow indoor pool seen through an arch, lined with tall cacti in clay pots', focus: '50% 66%' },
  'spa-villa-marshan': { alt: 'A white arch opening onto garden windows, a green glass lantern hanging above', focus: '50% 30%' },
  'spa-bab-el-assa': { alt: 'A hand filling a brass bowl at a brass tap above a carved marble basin', focus: '50% 30%' },
  'spa-atelier-spartel': { alt: 'A pale pool under white arches, framed by banana leaves' },
  'door-arcade': { alt: 'Horseshoe arches in rose plaster around a marble fountain', focus: '64% 50%' },
  'door-gate': { alt: 'A brick horseshoe arch with a heavy wooden door, opening onto a sunlit lane' },
  'decor-zellige-green': { alt: 'Green and white zellige tiles' },
  'decor-zellige-star': { alt: 'A zellige star in black, ochre and green' },
  'decor-plaster': { alt: 'Carved white plaster in an interlaced pattern' },
  'decor-lantern': { alt: 'A pierced green lantern throwing rays of light' },
} satisfies Record<string, Photo>

export type MediaId = keyof typeof PHOTOS

/** Reference a photograph, with its default description or a more specific one. */
export function media(id: MediaId, alt?: string, caption?: string): Media {
  return { id, alt: alt ?? PHOTOS[id].alt, ...(caption ? { caption } : {}) }
}

export function mediaUrl(id: MediaId): string {
  return FILES[`../assets/${id}.webp`]
}

/** Where to hold the photograph when a frame crops it. */
export function mediaFocus(id: MediaId): string {
  const photo: Photo = PHOTOS[id]
  return photo.focus ?? '50% 50%'
}
