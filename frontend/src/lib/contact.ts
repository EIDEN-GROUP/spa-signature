import type { Spa } from '@/lib/types'

type Contactable = Pick<Spa, 'name' | 'contact'>

/**
 * Opens WhatsApp with a first line that tells the spa where the guest came
 * from. We track the tap, never the conversation.
 */
export function whatsappUrl(spa: Contactable, about?: string): string | null {
  if (!spa.contact.whatsapp) return null
  const subject = about ? `I would like to ask about “${about}”.` : 'I would like to ask about a visit.'
  const text = `Bonjour, I am contacting ${spa.name} via Spa Maroc Signature. ${subject}`
  return `https://wa.me/${spa.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

export function telUrl(spa: Contactable): string {
  return `tel:${spa.contact.phone}`
}

/** Hands over to the reader's own maps app. No map SDK is loaded on the page. */
export function directionsUrl(spa: Contactable): string {
  const { lat, lng } = spa.contact.coordinates
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

/** The spa's own site, tagged so the visit is attributed to the guide. */
export function websiteUrl(spa: Contactable): string | null {
  if (!spa.contact.website) return null
  const url = new URL(spa.contact.website)
  url.searchParams.set('utm_source', 'spamarocsignature')
  url.searchParams.set('utm_medium', 'referral')
  return url.toString()
}

export function websiteHost(spa: Contactable): string | null {
  return spa.contact.website ? new URL(spa.contact.website).host.replace(/^www\./, '') : null
}
