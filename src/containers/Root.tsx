import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { createAppStore } from '../store/createAppStore'
import { App } from './App'
import { TranslationProvider } from '../lang/useTranslation'
import { browserHistory } from '../config/history'

export const Root = () => {
  const { store, persistor } = React.useMemo(() => createAppStore(browserHistory), [])

  return (
    <Router history={browserHistory}>
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
