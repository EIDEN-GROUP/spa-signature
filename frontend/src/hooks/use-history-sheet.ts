import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router'

/**
 * A sheet that is also a history entry, so the phone's back button closes it.
 * With `keepSearch`, choices made while it was open survive that back press.
 */
export function useHistorySheet(name: string, options: { keepSearch?: boolean } = {}) {
  const location = useLocation()
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const open = (location.state as { sheet?: string } | null)?.sheet === name
  const here = { pathname: location.pathname, search: location.search, hash: location.hash }
  const openedHere = useRef(false)
  const searchWhileOpen = useRef<string | null>(null)

  // A reload can restore a history entry whose sheet was open. Start closed.
  const staleOnLoad = useRef(open)
  useEffect(() => {
    if (staleOnLoad.current) navigate(here, { replace: true, state: null })
    staleOnLoad.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (open) {
      searchWhileOpen.current = location.search
      return
    }
    const kept = searchWhileOpen.current
    searchWhileOpen.current = null
    if (options.keepSearch && navigationType === 'POP' && kept !== null && kept !== location.search) {
      navigate({ pathname: location.pathname, search: kept }, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, location.search])

  const show = useCallback(() => {
    openedHere.current = true
    navigate(here, { state: { sheet: name } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, location.hash, name])

  const hide = useCallback(() => {
    if (!open) return
    if (openedHere.current && !options.keepSearch) navigate(-1)
    else navigate(here, { replace: true, state: null })
    openedHere.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, location.pathname, location.search, location.hash])

  return { open: open && !staleOnLoad.current, show, hide }
}
