import { RootState } from '../../store/mainReducer'
import { TurnPhase } from '../../config/constants'

export const getTurn = (state: RootState) => state.turn.currentTurn

export const getCurrentPhase = (state: RootState) => state.turn.phase

export const getGameState = (state: RootState) => state.turn.gameState

export const getLooseReason = (state: RootState) => state.turn.looseReason

export const getIsActionPhase = (state: RootState) => state.turn.phase === TurnPhase.Action
