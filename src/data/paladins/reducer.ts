import { createReducer } from 'typesafe-actions'

export const paladins = createReducer({
  strength: 0,
  calledToArms: false,
})
