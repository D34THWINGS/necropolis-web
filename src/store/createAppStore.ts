import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mainReducer, RootState } from './mainReducer'
import { rootEpic } from '../data/epics'
import { RootAction } from '../data/actions'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

export const createAppStore = () => {
  const persistedReducer = persistReducer(persistConfig, mainReducer)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(epicMiddleware)))
  const persistor = persistStore(store)

  epicMiddleware.run(rootEpic)

  return { store, persistor }
}
