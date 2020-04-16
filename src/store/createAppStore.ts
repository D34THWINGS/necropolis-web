import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { mainReducer, RootState } from './mainReducer'
import { rootEpic } from '../data/epics'
import { RootAction } from '../data/actions'

export const createAppStore = () => {
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()
  const store = createStore(mainReducer, applyMiddleware(epicMiddleware))

  epicMiddleware.run(rootEpic)

  return store
}
