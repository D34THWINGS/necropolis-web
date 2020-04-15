import { createReducer } from 'typesafe-actions'
import { upgradeBuilding } from './actions'

const initialState = {
  ossuary: {
    level: 0,
  },
  soulWell: {
    level: 0,
  },
  battlements: {
    level: 0,
  },
  catacombs: {
    level: 0,
  },
  charnelHouse: {
    level: 0,
  },
}

export type BuildingName = keyof typeof initialState

export const buildings = createReducer(initialState).handleAction(upgradeBuilding, (state, { payload: { name } }) => ({
  ...state,
  [name]: {
    ...state[name],
    level: state[name].level + 1,
  },
}))
