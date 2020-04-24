import { createReducer } from 'typesafe-actions'
import { callToArms, increasePaladinsStrength, killPaladins, resetPaladinsStrength } from './actions'

export const paladins = createReducer({
  strength: 0,
  calledToArms: false as false | number,
})
  .handleAction(increasePaladinsStrength, state => ({ ...state, strength: state.strength + 1 }))
  .handleAction(callToArms, (state, { payload: { turn } }) => ({ ...state, calledToArms: turn }))
  .handleAction(killPaladins, state => ({ ...state, calledToArms: false }))
  .handleAction(resetPaladinsStrength, state => ({ ...state, strength: 0 }))
