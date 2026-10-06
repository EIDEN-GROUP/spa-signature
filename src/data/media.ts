import type { Media, MediaId } from '../domain/types'
import { MEDIA_FILES } from './media.generated'
import { asset } from './site'

/** What each photograph shows, in plain words. Used as alt text unless a page says more. */
const ALT: Record<MediaId, string> = {
  'courtyard-tall': 'A still green pool in a riad courtyard, framed by carved plaster arches and linen curtains',
  'courtyard-45': 'A still green pool in a riad courtyard, framed by carved plaster arches and linen curtains',
  'courtyard-43': 'Carved plaster arches and linen curtains around a courtyard pool',
  'courtyard-water': 'Lanterns at the edge of a courtyard pool, zellige pillars reflected in the water',
  'redhammam-45': 'A vaulted tadelakt hammam chamber with a red zellige basin and a tiled niche',
  'redhammam-43': 'A red zellige basin and marble benches beneath a tiled niche in a hammam',
  'redhammam-niche': 'The zellige niche of a hammam, with marble benches and brass bowls',
  'basin-32': 'A stone hammam basin with petals on the water, brass bowls and wax lanterns along its edge',
  'basin-45': 'A stone hammam basin with petals on the water, below a lantern and brass bowls',
  'basin-ledge-43': 'Brass bowls and wax lanterns along the edge of a stone hammam basin',
  'basin-taps-45': 'Two brass taps set in a wall of diamond-cut tiles',
  'basin-taps-43': 'Two brass taps set in a wall of diamond-cut tiles',
  'brass-34': 'Hammered brass hammam bowls, a pail and an engraved tray on dark marble',
  'brass-bowls-43': 'Three hammered brass hammam bowls stacked on dark marble',
  'brass-pail-45': 'A hammered brass water pail on a dark marble bench',
  'brass-pail-43': 'A hammered brass water pail on a dark marble bench',
  'brass-tray-11': 'A rose in a brass cup on an engraved tray, beside two lidded brass pots',
  'towel-34': 'A therapist’s hands pressing a warm towel around a guest’s face',
  'towel-43': 'A therapist’s hands pressing a warm towel around a guest’s face',
  'towel-hands-11': 'Hands resting on a warm brown towel',
  'facial-45': 'A therapist brushing a mask onto the face of a guest lying with eyes closed',
  'facial-43': 'A therapist brushing a mask onto the face of a guest lying with eyes closed',
  'oils-fringe-45': 'The fringed edge of a white woven cloth on a wooden treatment table',
  'oils-fringe-43': 'The fringed edge of a white woven cloth on a wooden treatment table',
  'oils-linen-43': 'A rolled white towel with two rose petals in a wood-panelled treatment room',
  'clay-34': 'Rhassoul clay seen from above: raw stones, dry flakes, fine powder and mixed paste',
  'clay-43': 'Ground rhassoul clay in a brass pot with a hammered lid',
  'clay-paste-11': 'Rhassoul clay mixed to a paste in a brass bowl',
  'clay-flakes-45': 'Dry flakes of rhassoul clay on a wooden plate',
  'clay-stones-11': 'Raw rhassoul stones beside a pot of ground clay',
  'tea-34': 'A silver teapot, a tin of dried verbena and two glasses of tea on a wooden tray',
  'tea-43': 'A silver teapot, a tin of dried verbena and two glasses of tea on a wooden tray',
  'tea-glasses-11': 'Two glasses of herbal tea and a walnut biscuit beside a tin of verbena',
  'tea-pot-45': 'A hammered silver Moroccan teapot on a wooden tray',
}

/** Reference a photograph, with its default description or a more specific one. */
export function media(id: MediaId, alt?: string, caption?: string): Media {
  return { id, alt: alt ?? ALT[id], ...(caption ? { caption } : {}) }
}

export function mediaFile(id: MediaId) {
  return MEDIA_FILES[id]
}

export function mediaUrl(id: MediaId, width: number, format: 'avif' | 'webp'): string {
  return asset(`media/${id}-${width}.${format}`)
}

export function mediaSrcSet(id: MediaId, format: 'avif' | 'webp'): string {
  return MEDIA_FILES[id].widths.map((width) => `${mediaUrl(id, width, format)} ${width}w`).join(', ')
}

/** The widest file no larger than `target`, for the plain `src` fallback. */
export function mediaFallback(id: MediaId, target = 720): string {
  const widths: readonly number[] = MEDIA_FILES[id].widths
  const width = [...widths].reverse().find((w) => w <= target) ?? widths[0]
  return mediaUrl(id, width, 'webp')
}

/** A 1200 by 630 JPEG for social cards, cut for lead photographs only. */
export function mediaSocial(id: MediaId): string | null {
  return MEDIA_FILES[id].og ? `/media/og/${id}.jpg` : null
}
