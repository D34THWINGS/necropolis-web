import { createAction } from 'typesafe-actions'

export const nextTurn = createAction('turns/NEXT_TURN')()

export const nextPhase = createAction('turns/NEXT_PHASE')()
