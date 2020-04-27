import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { PersistGate } from 'redux-persist/integration/react'
import { createAppStore } from '../store/createAppStore'
import { App } from './App'
import { TranslationProvider } from '../lang/useTranslation'

export const Root = () => {
  const history = useMemo(() => createBrowserHistory(), [])
  const { store, persistor } = React.useMemo(() => createAppStore(history), [history])

  return (
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TranslationProvider>
            <App />
          </TranslationProvider>
        </PersistGate>
      </Provider>
    </Router>
  )
}
