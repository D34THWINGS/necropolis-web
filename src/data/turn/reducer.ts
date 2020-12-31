import { createReducer } from 'typesafe-actions'
import { loose, nextPhase, win } from './actions'
import { GameState, LooseReason, TURN_PHASES_ORDER, TurnPhase } from '../../config/constants'

export const turn = createReducer({
  currentTurn: 1,
  phase: TurnPhase.Action,
  gameState: GameState.Ongoing,
  looseReason: null as LooseReason | null,
})
  .handleAction(nextPhase, state => {
    const currentPhaseIndex = TURN_PHASES_ORDER.indexOf(state.phase)
    const shouldTriggerNextTurn = currentPhaseIndex + 1 >= TURN_PHASES_ORDER.length
    return {
      ...state,
      currentTurn: shouldTriggerNextTurn ? state.currentTurn + 1 : state.currentTurn,
      phase: shouldTriggerNextTurn ? TURN_PHASES_ORDER[0] : TURN_PHASES_ORDER[currentPhaseIndex + 1],
    }
  })
  .handleAction(loose, (state, { payload: { reason } }) => ({
    ...state,
    gameState: GameState.Loose,
    looseReason: reason,
  }))
  .handleAction(win, state => ({
    ...state,
    gameState: GameState.Win,
  }))
