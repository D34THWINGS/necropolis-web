import React, { useMemo } from 'react'
import { EventEmitter } from 'events'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { createAppStore } from '../store/createAppStore'
import { App } from './App'
import { TranslationProvider } from '../lang/useTranslation'
import { browserHistory } from '../config/history'
import { EventBusProvider } from './EventBusProvider'

export const Root = () => {
  const eventBus = useMemo(() => new EventEmitter(), [])
  const { store, persistor } = React.useMemo(
    () => createAppStore(browserHistory, action => eventBus.emit('action', action)),
    [eventBus],
  )

  return (
    <Router history={browserHistory}>
      <EventBusProvider eventBus={eventBus}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <TranslationProvider>
              <App />
            </TranslationProvider>
          </PersistGate>
        </Provider>
      </EventBusProvider>
    </Router>
  )
}
