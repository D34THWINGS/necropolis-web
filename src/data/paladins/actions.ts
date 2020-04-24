import { createAction } from 'typesafe-actions'

export const increasePaladinsStrength = createAction('paladins/INCREASE_STRENGTH')()

export const resetPaladinsStrength = createAction('paladins/RESET_STRENGTH')()

export const callToArms = createAction('paladins/CALL_TO_ARMS', (turn: number) => ({ turn }))()

export const killPaladins = createAction('paladins/KILL')()
