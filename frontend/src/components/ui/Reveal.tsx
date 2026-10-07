import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReplay } from '@/hooks/use-replay'
import { rise, stagger } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to wait after entering the viewport. */
  delay?: number
}

/** Fades its content up as it scrolls into view, and lets it go when it drops back out. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const replay = useReplay()
  return (
    <motion.div className={className} variants={rise} custom={delay} {...replay}>
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol' | 'article'
}

/** Reveals its motion children one after another. Children bring their own variants. */
export function Stagger({ children, className, gap, delay, as = 'div' }: StaggerProps) {
  const Tag = motion[as]
  const replay = useReplay()
  return (
    <Tag className={className} variants={stagger(gap, delay)} {...replay}>
      {children}
    </Tag>
  )
}
