import { Reducer } from 'redux'
import { createAction, isActionOf } from 'typesafe-actions'
import { RootState } from './mainReducer'
import { RootAction } from '../data/actions'

export const resetGame = createAction('settings/RESET_GAME')()

export const resetReducer = (reducer: Reducer<RootState, RootAction>) => (
  state: RootState | undefined,
  action: RootAction,
) => {
  if (isActionOf(resetGame, action)) {
    return reducer({ onboarding: state?.onboarding } as RootState, action)
  }
  return reducer(state, action)
}
