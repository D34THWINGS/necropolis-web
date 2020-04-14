import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import type { TranslationBundle, TranslationKey } from './fr'

export enum SupportedLanguages {
  FR = 'fr',
}

type Translator = {
  t: <K extends TranslationKey>(
    key: K,
    ...args: TranslationBundle[K] extends (...args: any) => any ? Parameters<TranslationBundle[K]> : []
  ) => ReactNode
  setLang: (lang: SupportedLanguages) => void
}

const bundleImporters: Record<SupportedLanguages, () => Promise<TranslationBundle>> = {
  [SupportedLanguages.FR]: async () => (await import('./fr')).fr,
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
      const bundle = await bundleImporters[currentLanguage]()
      setBundle(bundle)
    }

    doTask()
  }, [currentLanguage])

  return <i18nContext.Provider value={translator}>{children}</i18nContext.Provider>
}

export const useTranslation = () => useContext(i18nContext)
