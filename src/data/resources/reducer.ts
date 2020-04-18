import { createReducer } from 'typesafe-actions'
import { gainResources, spendResources } from './actions'
import { ResourceType } from '../../config/constants'

export type ResourcesState = Record<ResourceType, number>

const initialState: ResourcesState = {
  [ResourceType.Meat]: 2,
  [ResourceType.Souls]: 0,
  [ResourceType.Bones]: 0,
  [ResourceType.Materials]: 7,
}

export const resources = createReducer(initialState)
  .handleAction(spendResources, (state, { payload }) => ({
    meat: state.meat - (payload.meat || 0),
    souls: state.souls - (payload.souls || 0),
    bones: state.bones - (payload.bones || 0),
    materials: state.materials - (payload.materials || 0),
  }))
  .handleAction(gainResources, (state, { payload }) => ({
    meat: state.meat + (payload.meat || 0),
    souls: state.souls + (payload.souls || 0),
    bones: state.bones + (payload.bones || 0),
    materials: state.materials + (payload.materials || 0),
  }))
