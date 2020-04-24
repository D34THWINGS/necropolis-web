import { createAction } from 'typesafe-actions'

export const increasePaladinsStrength = createAction('paladins/INCREASE_STRENGTH')()

export const increasePaladinsCounter = createAction('paladins/INCREASE_COUNTER')()

export const resetPaladinsCounter = createAction('paladins/RESET_COUNTER')()

export const callToArms = createAction('paladins/CALL_TO_ARMS', (turn: number) => ({ turn }))()

export const killPaladins = createAction('paladins/KILL')()
