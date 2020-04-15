import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { resources } from '../data/resources/reducer'
import { buildings } from '../data/buildings/reducer'

export const mainReducer = combineReducers({
  resources,
  buildings,
})

export type RootState = StateType<typeof mainReducer>
