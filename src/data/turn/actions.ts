import { createAction } from 'typesafe-actions'
import { LooseReason } from '../../config/constants'

export const nextTurn = createAction('turns/NEXT_TURN')()

export const nextPhase = createAction('turns/NEXT_PHASE')()

export const win = createAction('turns/WIN')()

export const loose = createAction('turns/LOOSE', (reason: LooseReason) => ({ reason }))()
