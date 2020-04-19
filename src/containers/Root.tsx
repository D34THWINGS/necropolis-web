import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { createAppStore } from '../store/createAppStore'
import { App } from './App'
import { TranslationProvider } from '../lang/useTranslation'

export const Root = () => {
  const { store, persistor } = React.useMemo(() => createAppStore(), [])

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TranslationProvider>
            <App />
          </TranslationProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}
