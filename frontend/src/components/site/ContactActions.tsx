import { Button } from '@/components/ui/Button'
import { type ContactPlacement, track } from '@/lib/analytics'
import { directionsUrl, telUrl, websiteUrl, whatsappUrl } from '@/lib/contact'
import type { Spa } from '@/lib/types'
import { cx } from '@/lib/utils'

interface ContactActionsProps {
  spa: Spa
  /** Where on the page these buttons sit. Reported with every tap. */
  placement: ContactPlacement
  /**
   * full:  WhatsApp, Call, Website, Directions. The profile header and rail.
   * short: the two that start a conversation. The closing call to action.
   */
  layout?: 'full' | 'short'
  className?: string
}

/**
 * The handover. Reservation, payment and the visit belong to the spa; our job
 * ends by putting the reader in touch, already informed. WhatsApp leads, in
 * our own green rather than the app's. Where a spa has no WhatsApp line, Call
 * takes its place as the primary action.
 */
export function ContactActions({ spa, placement, layout = 'full', className }: ContactActionsProps) {
  const whatsapp = whatsappUrl(spa)
  const website = websiteUrl(spa)
  const event = { spa_id: spa.id, placement }

  return (
    <div className={cx('contact-actions', `contact-actions-${layout}`, className)}>
      {whatsapp ? (
        <Button
          variant="primary"
          icon="chat"
          href={whatsapp}
          external
          className="contact-actions-lead"
          onClick={() => track('whatsapp_click', event)}
        >
          WhatsApp
        </Button>
      ) : null}
      <Button
        variant={whatsapp ? 'secondary' : 'primary'}
        icon="phone"
        href={telUrl(spa)}
        className={whatsapp ? undefined : 'contact-actions-lead'}
        onClick={() => track('call_click', event)}
      >
        Call
      </Button>
      {layout === 'full' && website ? (
        <Button icon="globe" href={website} external onClick={() => track('website_click', event)}>
          Website
        </Button>
      ) : null}
      {layout === 'full' ? (
        <Button icon="directions" href={directionsUrl(spa)} external onClick={() => track('directions_click', event)}>
          Directions
        </Button>
      ) : null}
    </div>
  )
}
