import { createReducer } from 'typesafe-actions'
import { gameCreated, gameEnded } from './actions'

export const settings = createReducer({
  hasActiveGame: false,
})
  .handleAction(gameCreated, state => ({ ...state, hasActiveGame: true }))
  .handleAction(gameEnded, state => ({ ...state, hasActiveGame: false }))
