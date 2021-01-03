import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { ResourceType } from '../../config/constants'
import { ResourcesState } from '../resources/reducer'
import {
  Building,
  isBuildingFullyUpgraded,
  getProducingBuildings,
  isArsenal,
  isCatacombs,
  isCharnelHouse,
  isOssuary,
  isSoulWell,
  isBuildingConstructed,
} from './helpers'

export const getBuildings = (state: RootState) => state.buildings.list

export const getBuilding = <T extends Building>(predicate: (building: Building) => building is T) => (
  state: RootState,
) => getBuildings(state).find(predicate)

export const getOssuary = getBuilding(isOssuary)

export const getArsenal = getBuilding(isArsenal)

export const getSoulWell = getBuilding(isSoulWell)

export const getCharnelHouse = getBuilding(isCharnelHouse)

export const getCatacombs = getBuilding(isCatacombs)

export const getBuildingsProduction = createSelector(
  getBuildings,
  (buildings): Partial<ResourcesState> =>
    getProducingBuildings(buildings)
      .map(building => Object.entries(building.produces) as [ResourceType, number][])
      .flat()
      .reduce<Partial<ResourcesState>>((acc, [key, value]) => ({ ...acc, [key]: (acc[key] ?? 0) + value }), {}),
)

export const getConstructedBuildings = createSelector(getBuildings, buildings =>
  buildings.filter(building => isBuildingConstructed(building)),
)

export const getUpgradableBuildings = createSelector(getBuildings, buildings =>
  buildings.filter(building => isBuildingConstructed(building) && !isBuildingFullyUpgraded(building)),
)

export const getAreAllBuildingsFullyUpgraded = (state: RootState) => getBuildings(state).every(isBuildingFullyUpgraded)

const getIsBuildingBuilt = <T extends Building>(predicate: (building: Building) => building is T) => (
  state: RootState,
) => {
  const building = getBuilding(predicate)(state)
  return !!building && isBuildingConstructed(building)
}

export const getIsOssuaryBuilt = getIsBuildingBuilt(isOssuary)

export const getIsCatacombsBuilt = getIsBuildingBuilt(isCatacombs)
