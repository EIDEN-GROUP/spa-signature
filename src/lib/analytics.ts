// One tracking layer for the whole product.
//
// Eleven events turn browsing into evidence a spa can read in its monthly
// report: how often it appeared, how often it was opened, and how often someone
// reached for WhatsApp, the phone or the map.
//
// Rules kept here so no component can break them:
//   · no personal data in any event, ever;
//   · we record the tap on WhatsApp, never the conversation;
//   · nothing is sent before consent. Events queue in `window.dataLayer`, and
//     a vendor tag is only attached once consent is granted.

export type ContactPlacement = 'profile_header' | 'profile_rail' | 'sticky_bar' | 'signature_experience' | 'final_cta' | 'location'

export interface AnalyticsEvents {
  // Reach
  profile_view: { spa_id: string; city: string; selected: boolean }
  search: { query: string; filters: string; results: number; spa_ids: string[]; sort: string }
  filter_used: { filter: string; value: string; active: boolean; surface: 'sheet' | 'rail' | 'chips' | 'home' }
  // Interest
  search_result_click: { spa_id: string; position: number; list: string }
  editorial_view: { article_id: string; category: string }
  selection_view: { city: string | null }
  // Leads
  whatsapp_click: { spa_id: string; placement: ContactPlacement }
  call_click: { spa_id: string; placement: ContactPlacement }
  contact_submit: { form: 'partnership' | 'listing_update' | 'suggest_spa'; city: string }
  // Visit intent
  directions_click: { spa_id: string; placement: ContactPlacement }
  website_click: { spa_id: string; placement: ContactPlacement }
}

export type AnalyticsEventName = keyof AnalyticsEvents

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track<Name extends AnalyticsEventName>(name: Name, payload: AnalyticsEvents[Name]): void {
  if (typeof window === 'undefined') return
  const event = { event: name, ...payload, page_path: window.location.pathname }
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(event)
  window.dispatchEvent(new CustomEvent('sms:track', { detail: event }))
  if (import.meta.env.DEV) console.debug(`[track] ${name}`, payload)
}
