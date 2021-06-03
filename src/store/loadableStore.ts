import { Reducer } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { RootState } from './mainReducer'
import { RootAction } from '../data/actions'
import { loadGameState } from '../data/settings/actions'

export const loadReducer =
  (reducer: Reducer<RootState, RootAction>) => (state: RootState | undefined, action: RootAction) => {
    if (isActionOf(loadGameState, action)) {
      return reducer(action.payload.gameState as RootState, action)
    }
    return reducer(state, action)
  }
