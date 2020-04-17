import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import { resources } from '../data/resources/reducer'
import { buildings } from '../data/buildings/reducer'
import { turn } from '../data/turn/reducer'
import { undeads } from '../data/undeads/reducer'

export const mainReducer = combineReducers({
  resources,
  buildings,
  turn,
  undeads,
})

export type RootState = StateType<typeof mainReducer>
