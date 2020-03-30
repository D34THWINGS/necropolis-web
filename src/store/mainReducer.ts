import { combineReducers } from 'redux'
import { resources } from '../data/resources/reducer'

export const mainReducer = combineReducers({
  resources,
})
