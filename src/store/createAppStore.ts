import { History } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as Sentry from '@sentry/react'
import { mainReducer, RootState } from './mainReducer'
import { rootEpic } from '../data/epics'
import { RootAction } from '../data/actions'
import { resetReducer } from './resetableStore'
import { loadReducer } from './loadableStore'

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
  }

  interface Dependencies {
    history: History
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

export const createAppStore = (history: History) => {
  const persistedReducer = persistReducer(persistConfig, resetReducer(loadReducer(mainReducer)))
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Dependencies>({
    dependencies: { history },
  })
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(epicMiddleware), Sentry.createReduxEnhancer()),
  )
  const persistor = persistStore(store)

  epicMiddleware.run(rootEpic)

  return { store, persistor }
}
