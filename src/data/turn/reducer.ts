import { createReducer } from 'typesafe-actions'
import { nextPhase, nextTurn } from './actions'
import { TURN_PHASES_ORDER, TurnPhase } from '../../config/constants'

export const turn = createReducer({
  currentTurn: 1,
  phase: TurnPhase.Action,
})
  .handleAction(nextTurn, state => ({ ...state, currentTurn: state.currentTurn + 1 }))
  .handleAction(nextPhase, state => {
    const currentPhaseIndex = TURN_PHASES_ORDER.indexOf(state.phase)
    const shouldTriggerNextTurn = currentPhaseIndex + 1 >= TURN_PHASES_ORDER.length
    return {
      ...state,
      currentTurn: shouldTriggerNextTurn ? state.currentTurn + 1 : state.currentTurn,
      phase: shouldTriggerNextTurn ? TURN_PHASES_ORDER[0] : TURN_PHASES_ORDER[currentPhaseIndex + 1],
    }
  })
