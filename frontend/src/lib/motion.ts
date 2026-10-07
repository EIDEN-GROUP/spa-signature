import type { Variants } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** How much of a block must be on screen before it counts as seen. */
export const VIEWPORT = { amount: 0.2 } as const

/** Leaving is quicker than arriving. */
const LEAVE = { duration: 0.5, ease: EASE }

/** Fade up into place. `custom` is a delay in seconds. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 32, transition: LEAVE },
  shown: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE, delay } }),
}

export const fade: Variants = {
  hidden: { opacity: 0, transition: LEAVE },
  shown: (delay: number = 0) => ({ opacity: 1, transition: { duration: 1.1, ease: EASE, delay } }),
}

/** A doorway drawn up from its threshold. */
export const unveil: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', transition: { duration: 0.7, ease: EASE } },
  shown: (delay: number = 0) => ({ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.25, ease: EASE, delay } }),
}

/** The photograph settling behind it. */
export const settle: Variants = {
  hidden: { scale: 1.22, transition: { duration: 0.7, ease: EASE } },
  shown: (delay: number = 0) => ({ scale: 1, transition: { duration: 1.6, ease: EASE, delay } }),
}

export function stagger(gap = 0.09, delay = 0): Variants {
  return {
    hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
    shown: { transition: { staggerChildren: gap, delayChildren: delay } },
  }
}
