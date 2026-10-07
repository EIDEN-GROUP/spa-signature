import { createContext, useContext } from 'react'

export const RevealedContext = createContext(true)

/**
 * False while the loader still covers the page, true from the moment its
 * curtain starts to rise. Whatever opens the page waits for it.
 */
export function useRevealed(): boolean {
  return useContext(RevealedContext)
}
