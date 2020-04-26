import { createReducer } from 'typesafe-actions'
import { collapseBuilding, freeUpgradeBuilding, repairBuilding, upgradeBuilding } from './actions'
import { BuildingType } from '../../config/constants'
import { deepSet } from '../helpers'

type Building = { level: number; collapsed: boolean }

type BuildingsState = Record<BuildingType, Building>

export const buildings = createReducer<BuildingsState>({
  [BuildingType.Ossuary]: {
    level: 0,
    collapsed: false,
  },
  [BuildingType.SoulWell]: {
    level: 0,
    collapsed: false,
  },
  [BuildingType.Battlements]: {
    level: 0,
    collapsed: false,
  },
  [BuildingType.Catacombs]: {
    level: 0,
    collapsed: false,
  },
  [BuildingType.CharnelHouse]: {
    level: 0,
    collapsed: false,
  },
})
  .handleAction([upgradeBuilding, freeUpgradeBuilding], (state, { payload: { type } }) =>
    deepSet(state)(type)('level')()(state[type].level + 1),
  )
  .handleAction(collapseBuilding, (state, { payload: { type } }) => deepSet(state)(type)('collapsed')()(true))
  .handleAction(repairBuilding, (state, { payload: { type } }) => deepSet(state)(type)('collapsed')()(false))
