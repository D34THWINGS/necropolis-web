import { createAction } from 'typesafe-actions'

export const resetGame = createAction('settings/RESET_GAME')()

export const gameCreated = createAction('settings/GAME_CREATED')()

export const gameEnded = createAction('settings/GAME_ENDED')()
