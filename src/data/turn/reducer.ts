import { createReducer } from 'typesafe-actions'
import { nextTurn } from './actions'

export const turn = createReducer(1).handleAction(nextTurn, state => state + 1)
