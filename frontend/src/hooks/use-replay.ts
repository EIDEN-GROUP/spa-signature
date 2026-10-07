import { useState } from 'react'
import { VIEWPORT } from '@/lib/motion'

/**
 * Props for a motion element that arrives every time the page scrolls down to
 * it. It hides again only once it has dropped back below the fold; what has
 * gone past the top of the screen stays in place for the way back up.
 */
export function useReplay() {
  const [shown, setShown] = useState(false)

  return {
    initial: 'hidden',
    animate: shown ? 'shown' : 'hidden',
    viewport: VIEWPORT,
    onViewportEnter: () => setShown(true),
    onViewportLeave: (entry: IntersectionObserverEntry | null) => {
      if (entry && entry.boundingClientRect.top > 0) setShown(false)
    },
  } as const
}
