import { createReducer } from 'typesafe-actions'
import { upgradeBuilding } from './actions'
import { BuildingType } from '../../config/constants'

const initialState = {
  [BuildingType.Ossuary]: {
    level: 0,
  },
  [BuildingType.SoulWell]: {
    level: 0,
  },
  [BuildingType.Battlements]: {
    level: 0,
  },
  [BuildingType.Catacombs]: {
    level: 0,
  },
  [BuildingType.CharnelHouse]: {
    level: 0,
  },
}

export const buildings = createReducer(initialState).handleAction(
  upgradeBuilding,
  (state, { payload: { type, level } }) => ({
    ...state,
    [type]: {
      ...state[type],
      level,
    },
  }),
)
