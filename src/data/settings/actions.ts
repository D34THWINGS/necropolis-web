import { createAction } from 'typesafe-actions'

export const resetGame = createAction('settings/RESET_GAME', (hard?: boolean) => ({ hard }))()

export const gameCreated = createAction('settings/GAME_CREATED')()

export const gameEnded = createAction('settings/GAME_ENDED')()
