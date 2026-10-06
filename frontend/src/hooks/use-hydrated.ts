import { useSyncExternalStore } from 'react'

function subscribeToNothing() {
  return () => {}
}

/** False on the server and during hydration, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  )
}
