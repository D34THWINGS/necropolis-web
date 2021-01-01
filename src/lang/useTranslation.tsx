import React, { ComponentType, FC, ReactNode, useContext, useMemo, useState } from 'react'
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
        if (!translation) {
          // eslint-disable-next-line no-console
          console.warn(`Missing translation key "${key}"`)
        }
        return typeof translation === 'function' ? (translation as CallableFunction)(...args) : translation
      },
      lang: currentLanguage,
      setLang: lang => setCurrentLanguage(lang),
    }),
    [currentLanguage],
  )

  return <i18nContext.Provider value={translator}>{children}</i18nContext.Provider>
}

export const useTranslation = () => useContext(i18nContext)

export type WithTranslationProps = {
  t: Translator['t']
}

export const withTranslation = <TProps extends WithTranslationProps>(Component: ComponentType<TProps>) => {
  const WrappedComponent: FC<Omit<TProps, keyof WithTranslationProps>> = props => {
    const { t } = useTranslation()
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(props as TProps)} t={t} />
  }

  WrappedComponent.displayName = `WithTranslation(${Component.displayName})`

  return WrappedComponent
}
