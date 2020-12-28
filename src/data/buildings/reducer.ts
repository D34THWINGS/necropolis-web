import { createReducer } from 'typesafe-actions'
import {
  buySecret,
  changeSecrets,
  collapseBuilding,
  freeUpgradeBuilding,
  repairBuilding,
  upgradeBuilding,
} from './actions'
import { setInArray } from '../helpers'
import { Building, isOssuary, makeInitialBuildings, makeUpgradedBuilding } from './helpers'

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
  .handleAction(changeSecrets, (state, { payload: { building, secrets } }) =>
    updateBuilding(state, building, buildingToUpdate => ({
      ...buildingToUpdate,
      secrets,
    })),
  )
  .handleAction(buySecret, (state, { payload: { secret } }) => {
    const ossuary = state.list.find(isOssuary)
    if (!ossuary) {
      return state
    }
    return {
      ...state,
      list: setInArray(state.list, state.list.indexOf(ossuary), {
        ...ossuary,
        secrets: ossuary.secrets.filter(({ id }) => secret.id !== id),
      }),
    }
  })
