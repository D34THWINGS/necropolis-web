import { createReducer } from 'typesafe-actions'

export const resources = createReducer({
  meat: 0,
  souls: 0,
  bones: 0,
  materials: 0,
})
