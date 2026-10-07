import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'
import { directionsUrl, telUrl, whatsappUrl } from '@/lib/contact'
import { signatureTreatment } from '@/lib/data'
import type { Spa } from '@/lib/types'
import { cx, formatDuration } from '@/lib/utils'

interface StickyContactBarProps {
  spa: Spa
  /** Shown once the in-page contact buttons have scrolled away. */
  visible: boolean
}

/**
 * On a phone, contact is always one tap away. The bar sits clear of the
 * system gesture area and is removed from the tab order while hidden.
 */
export function StickyContactBar({ spa, visible }: StickyContactBarProps) {
  const signature = signatureTreatment(spa)
  const whatsapp = whatsappUrl(spa)
  const event = { spa_id: spa.id, placement: 'sticky_bar' as const }

  return (
    <aside className={cx('sticky-contact-bar', visible && 'sticky-contact-bar-visible')} aria-label={`Contact ${spa.name}`} inert={!visible}>
      <p className="sticky-contact-bar-summary">
        <b>{signature.name}</b>
        <span>
          {formatDuration(signature.durationMin)}
        </span>
      </p>
      <div className="sticky-contact-bar-buttons">
        {whatsapp ? (
          <Button variant="primary" icon="chat" href={whatsapp} external onClick={() => track('whatsapp_click', event)}>
            WhatsApp
          </Button>
        ) : null}
        <Button
          variant={whatsapp ? 'secondary' : 'primary'}
          icon="phone"
          href={telUrl(spa)}
          onClick={() => track('call_click', event)}
        >
          Call
        </Button>
        <Button icon="directions" href={directionsUrl(spa)} external onClick={() => track('directions_click', event)}>
          <span className="sticky-contact-bar-wide">Directions</span>
          <span className="sticky-contact-bar-narrow">Map</span>
        </Button>
      </div>
    </aside>
  )
}
