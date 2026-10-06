import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { type CSSProperties, useRef } from 'react'
import { Picture } from '@/components/ui/Picture'
import { settle, unveil } from '@/lib/motion'
import type { Media } from '@/lib/types'
import { cx } from '@/lib/utils'

interface DoorProps {
  media: Media
  /** Width over height of the doorway. Wider than 1 reads as a gate. */
  ratio?: number
  /** How far the photograph drifts behind the frame as the page scrolls, in percent. */
  drift?: number
  priority?: boolean
  decorative?: boolean
  className?: string
}

/**
 * A photograph cut as a doorway: a full arch over straight jambs. It rises
 * from its threshold when revealed (give a parent `initial`/`whileInView`, or
 * a Stagger) and the picture drifts slightly behind the frame on scroll.
 */
export function Door({ media, ratio = 3 / 4, drift = 6, priority, decorative, className }: DoorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-drift}%`, `${drift}%`])

  return (
    <motion.div
      ref={ref}
      className={cx('door', className)}
      style={{ '--ratio': ratio } as CSSProperties}
      variants={unveil}
    >
      <motion.div className="door-drift" style={still ? undefined : { y }}>
        <motion.div className="door-settle" variants={settle}>
          <Picture media={media} priority={priority} decorative={decorative} className="door-picture" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
