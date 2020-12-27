import { createReducer } from 'typesafe-actions'
import { collapseBuilding, freeUpgradeBuilding, repairBuilding, upgradeBuilding } from './actions'
import { setInArray } from '../helpers'
import { Building, makeInitialBuildings, makeUpgradedBuilding } from './helpers'

const updateBuilding = (state: BuildingsState, { type }: Building, callback: (building: Building) => Building) => {
  const buildingIndex = state.list.findIndex(building => building.type === type)
  if (buildingIndex === -1) {
    return state
  }
  return {
    ...state,
    list: setInArray(state.list, buildingIndex, callback(state.list[buildingIndex])),
  }
}

export type BuildingsState = {
  list: Building[]
}

export const buildings = createReducer<BuildingsState>({
  list: makeInitialBuildings(),
})
  .handleAction([upgradeBuilding, freeUpgradeBuilding], (state, { payload: { building } }) =>
    updateBuilding(state, building, makeUpgradedBuilding),
  )
  .handleAction(collapseBuilding, (state, { payload: { building } }) =>
    updateBuilding(state, building, buildingToCollapse => ({
      ...buildingToCollapse,
      collapsed: true,
    })),
  )
  .handleAction(repairBuilding, (state, { payload: { building } }) =>
    updateBuilding(state, building, buildingToRepair => ({
      ...buildingToRepair,
      collapsed: false,
    })),
  )
