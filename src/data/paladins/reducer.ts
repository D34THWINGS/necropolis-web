import { createReducer } from 'typesafe-actions'
import {
  callToArms,
  increasePaladinsCounter,
  increasePaladinsStrength,
  killPaladins,
  resetPaladinsCounter,
} from './actions'

export const paladins = createReducer({
  strength: 0,
  counter: 0,
  calledToArms: false as false | number,
})
  .handleAction(increasePaladinsStrength, state => ({ ...state, strength: state.strength + 1 }))
  .handleAction(increasePaladinsCounter, state => ({ ...state, counter: state.counter + 1 }))
  .handleAction(callToArms, (state, { payload: { turn } }) => ({ calledToArms: turn, counter: 1, strength: 1 }))
  .handleAction(killPaladins, state => ({ ...state, calledToArms: false }))
  .handleAction(resetPaladinsCounter, state => ({ ...state, counter: 0 }))
