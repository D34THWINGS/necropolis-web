import { Reducer } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { RootState } from './mainReducer'
import { RootAction } from '../data/actions'
import { resetGame } from '../data/settings/actions'

export const resetReducer = (reducer: Reducer<RootState, RootAction>) => (
  state: RootState | undefined,
  action: RootAction,
) => {
  if (isActionOf(resetGame, action)) {
    return reducer({ onboarding: state?.onboarding } as RootState, action)
  }
  return reducer(state, action)
}
