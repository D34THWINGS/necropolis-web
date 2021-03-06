import { createReducer } from 'typesafe-actions'
import {
  buySecret,
  changeSecrets,
  changeUndeadPool,
  collapseBuilding,
  freeUpgradeBuilding,
  repairBuilding,
  upgradeBuilding,
} from './actions'
import { setInArray } from '../helpers'
import { Building, isCatacombs, isOssuary, makeInitialBuildings, makeUpgradedBuilding } from './helpers'
import { addUndead } from '../undeads/actions'
import { increaseMajorTalent } from '../undeads/helpers'

const updateGivenBuilding = (state: BuildingsState, { type }: Building, callback: (building: Building) => Building) => {
  const buildingIndex = state.list.findIndex(building => building.type === type)
  if (buildingIndex === -1) {
    return state
  }
  return {
    ...state,
    list: setInArray(state.list, buildingIndex, callback(state.list[buildingIndex])),
  }
}

const findAndUpdateBuilding = <T extends Building>(
  state: BuildingsState,
  predicate: (building: Building) => building is T,
  callback: (building: T) => T,
) => {
  const building = state.list.find(predicate)
  if (!building) {
    return state
  }
  return {
    ...state,
    list: setInArray(state.list, state.list.indexOf(building), callback(building)),
  }
}

export type BuildingsState = {
  list: Building[]
}

export const buildings = createReducer<BuildingsState>({
  list: makeInitialBuildings(),
})
  .handleAction([upgradeBuilding, freeUpgradeBuilding], (state, { payload: { building } }) =>
    updateGivenBuilding(state, building, () => {
      const upgradedBuilding = makeUpgradedBuilding(building)
      if (isCatacombs(upgradedBuilding) && upgradedBuilding.level === 3) {
        return {
          ...upgradedBuilding,
          undeadPool: upgradedBuilding.undeadPool.map(undead =>
            increaseMajorTalent(undead, upgradedBuilding.fortifyBonus),
          ),
        }
      }
      return upgradedBuilding
    }),
  )
  .handleAction(collapseBuilding, (state, { payload: { building } }) =>
    updateGivenBuilding(state, building, buildingToCollapse => ({
      ...buildingToCollapse,
      collapsed: true,
    })),
  )
  .handleAction(repairBuilding, (state, { payload: { building } }) =>
    updateGivenBuilding(state, building, buildingToRepair => ({
      ...buildingToRepair,
      collapsed: false,
    })),
  )
  .handleAction(changeSecrets, (state, { payload: { secrets } }) =>
    findAndUpdateBuilding(state, isOssuary, ossuary => ({ ...ossuary, secrets })),
  )
  .handleAction(changeUndeadPool, (state, { payload: { undeadPool } }) =>
    findAndUpdateBuilding(state, isCatacombs, ossuary => ({ ...ossuary, undeadPool })),
  )
  .handleAction(buySecret, (state, { payload: { secret } }) =>
    findAndUpdateBuilding(state, isOssuary, ossuary => ({
      ...ossuary,
      secrets: ossuary.secrets.filter(({ id }) => secret.id !== id),
    })),
  )
  .handleAction(addUndead, (state, { payload: { undead } }) =>
    findAndUpdateBuilding(state, isCatacombs, catacombs => ({
      ...catacombs,
      undeadPool: catacombs.undeadPool.filter(({ type }) => undead.type !== type),
    })),
  )
