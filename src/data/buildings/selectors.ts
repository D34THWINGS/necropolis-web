import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { getTurn } from '../turn/selectors'
import {
  BuildingType,
  CHARNEL_HOUSE_BONES_PRODUCTION,
  CHARNEL_HOUSE_MEAT_PRODUCTION,
  CHARNEL_HOUSE_PRODUCTION_TURNS,
  SOUL_WELL_SOUL_PRODUCTION,
} from '../../config/constants'
import { ResourcesState } from '../resources/reducer'
import { getBuildingMaxLevel } from './helpers'

export const getBuildings = (state: RootState) => state.buildings

export const getBuilding = (type: BuildingType) => (state: RootState) => getBuildings(state)[type]

export const getBuildingLevel = (type: BuildingType) => (state: RootState) => getBuildings(state)[type].level

export const getOssuary = getBuilding(BuildingType.Ossuary)

export const getBattlements = getBuilding(BuildingType.Battlements)

export const getSoulWell = getBuilding(BuildingType.SoulWell)

export const getCharnelHouse = getBuilding(BuildingType.CharnelHouse)

export const getCatacombs = getBuilding(BuildingType.Catacombs)

export const getBuildingsProduction = createSelector(
  getTurn,
  getCharnelHouse,
  getSoulWell,
  (turn, charnelHouse, soulWell): ResourcesState => ({
    meat: charnelHouse.collapsed ? 0 : CHARNEL_HOUSE_MEAT_PRODUCTION[charnelHouse.level],
    bones:
      turn % CHARNEL_HOUSE_PRODUCTION_TURNS[charnelHouse.level] === 0 && !charnelHouse.collapsed
        ? CHARNEL_HOUSE_BONES_PRODUCTION[charnelHouse.level]
        : 0,
    souls: soulWell.collapsed ? 0 : SOUL_WELL_SOUL_PRODUCTION[soulWell.level],
    materials: 0,
  }),
)

export const getIsBuildingsFullyUpgraded = (state: RootState) =>
  Object.values(BuildingType).every(type => getBuildingMaxLevel(type) === getBuilding(type)(state).level)

export const getIsBuildingCollapsed = (type: BuildingType) => (state: RootState) => getBuilding(type)(state).collapsed

export const getConstructedBuildings = (state: RootState) =>
  Object.values(BuildingType).filter(type => getBuilding(type)(state).level > 0)
