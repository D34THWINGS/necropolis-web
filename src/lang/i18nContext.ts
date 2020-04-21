import { createContext, ReactNode } from 'react'
import type { TranslationBundle, TranslationKey as FrTranslationKey } from './fr'

export enum SupportedLanguages {
  FR = 'fr',
}

export type Translator = {
  t: <K extends FrTranslationKey>(
    key: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: TranslationBundle[K] extends (...args: any) => any ? Parameters<TranslationBundle[K]> : []
  ) => ReactNode
  lang: SupportedLanguages
  setLang: (lang: SupportedLanguages) => void
}

export const defaultLanguage = SupportedLanguages.FR

export const i18nContext = createContext<Translator>({
  t: () => null,
  lang: defaultLanguage,
  setLang: () => {
    /* Do nothing */
  },
})
