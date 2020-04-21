import React, { ReactNode, useContext, useMemo, useState } from 'react'
import { fr, TranslationBundle } from './fr'
import { defaultLanguage, Translator, i18nContext, SupportedLanguages } from './i18nContext'

const bundlesMap: Record<SupportedLanguages, TranslationBundle> = {
  [SupportedLanguages.FR]: fr,
}

export type TranslationProviderProps = {
  children: ReactNode
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)

  const translator = useMemo(
    (): Translator => ({
      t: (key, ...args) => {
        const translation = bundlesMap[currentLanguage][key]
        return typeof translation === 'function' ? (translation as Function)(...args) : translation
      },
      lang: currentLanguage,
      setLang: lang => setCurrentLanguage(lang),
    }),
    [currentLanguage],
  )

  return <i18nContext.Provider value={translator}>{children}</i18nContext.Provider>
}

export const useTranslation = () => useContext(i18nContext)
