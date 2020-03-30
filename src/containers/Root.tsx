import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createAppStore } from '../store/createAppStore'
import { App } from './App'
import { TranslationProvider } from '../lang/useTranslation'

export const Root = () => {
  const store = React.useMemo(() => createAppStore(), [])

  return (
    <BrowserRouter>
      <Provider store={store}>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </Provider>
    </BrowserRouter>
  )
}
