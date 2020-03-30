import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { mainReducer } from './mainReducer'

export const createAppStore = () => createStore(mainReducer, applyMiddleware(createSagaMiddleware()))
