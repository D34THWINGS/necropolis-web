import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { fr, TranslationBundle, TranslationKey } from './fr'

export enum SupportedLanguages {
  FR = 'fr',
}

type Translator = {
  t: <K extends TranslationKey>(
    key: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: TranslationBundle[K] extends (...args: any) => any ? Parameters<TranslationBundle[K]> : []
  ) => ReactNode
  setLang: (lang: SupportedLanguages) => void
}

const bundleImporters: Record<SupportedLanguages, TranslationBundle> = {
  [SupportedLanguages.FR]: fr,
}

const i18nContext = createContext<Translator>({
  t: () => null,
  setLang: () => {
    /* Do nothing */
  },
})

export type TranslationProviderProps = {
  children: ReactNode
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState(SupportedLanguages.FR)
  const [bundle, setBundle] = useState<TranslationBundle | null>(null)

  const translator = useMemo(
    (): Translator => ({
      t: (key, ...args) => {
        if (!bundle) {
          return null
        }
        const translation = bundle[key]
        return typeof translation === 'function' ? (translation as Function)(...args) : translation
      },
      setLang: lang => setCurrentLanguage(lang),
    }),
    [bundle],
  )

  useEffect(() => {
    const doTask = async () => {
      const translationBundle = bundleImporters[currentLanguage]
      setBundle(translationBundle)
    }

    doTask()
  }, [currentLanguage])

  return <i18nContext.Provider value={translator}>{children}</i18nContext.Provider>
}

export const useTranslation = () => useContext(i18nContext)
