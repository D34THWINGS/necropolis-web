import { createReducer } from 'typesafe-actions'
import { spendResources } from './actions'

export type ResourcesState = {
  meat: number
  souls: number
  bones: number
  materials: number
}

const initialState: ResourcesState = {
  meat: 2,
  souls: 0,
  bones: 0,
  materials: 7,
}

export const resources = createReducer(initialState).handleAction(spendResources, (state, { payload }) => ({
  meat: state.meat - (payload.meat || 0),
  souls: state.souls - (payload.souls || 0),
  bones: state.bones - (payload.bones || 0),
  materials: state.materials - (payload.materials || 0),
}))
