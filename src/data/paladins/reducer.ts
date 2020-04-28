import { createReducer } from 'typesafe-actions'
import {
  callToArms,
  increasePaladinsCounter,
  increasePaladinsStrength,
  killPaladins,
  resetPaladinsCounter,
  triggerPaladinsAttack,
} from './actions'
import { PALADINS_ATTACK_THRESHOLD } from '../../config/constants'

export const paladins = createReducer({
  strength: 0,
  counter: 0,
  calledToArms: false as false | number,
})
  .handleAction(increasePaladinsStrength, state => ({ ...state, strength: state.strength + 1 }))
  .handleAction(increasePaladinsCounter, state => ({ ...state, counter: state.counter + 1 }))
  .handleAction(triggerPaladinsAttack, state => ({ ...state, counter: PALADINS_ATTACK_THRESHOLD }))
  .handleAction(callToArms, (state, { payload: { turn } }) => ({
    calledToArms: turn,
    counter: state.counter + 1,
    strength: 1,
  }))
  .handleAction(killPaladins, state => ({ ...state, calledToArms: false }))
  .handleAction(resetPaladinsCounter, state => ({ ...state, counter: 0 }))
