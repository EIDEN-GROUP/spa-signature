import type Lenis from 'lenis'
import { createContext, useContext } from 'react'

export const LenisContext = createContext<Lenis | null>(null)

/** The smooth scroller, or null where it is off: reduced motion, or before mount. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}
