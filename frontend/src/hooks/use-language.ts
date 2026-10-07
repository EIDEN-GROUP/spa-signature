import { createContext, useContext } from 'react'
import { en } from '@/locales/en'
import { type Dictionary, fr } from '@/locales/fr'

export type Language = 'fr' | 'en'

export const SITE_LANGUAGES: { code: Language; name: string }[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
]

const DICTIONARIES: Record<Language, Dictionary> = { fr, en }
const KEY = 'language'

/** The site opens in French. A visitor who chose English keeps it on the next visit. */
export function storedLanguage(): Language {
  try {
    return window.localStorage.getItem(KEY) === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

export function storeLanguage(language: Language) {
  try {
    window.localStorage.setItem(KEY, language)
  } catch {
    // Private browsing may refuse storage; the choice then lasts for this visit.
  }
}

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageState>({ language: 'fr', setLanguage: () => {} })

export function useLanguage(): LanguageState {
  return useContext(LanguageContext)
}

/** The words of the site in the visitor's language: `const t = useT()`, then `t.nav.search`. */
export function useT(): Dictionary {
  return DICTIONARIES[useContext(LanguageContext).language]
}
