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
import { getBattlementsDefenseBonus } from './helpers'

export const getBuildings = (state: RootState) => state.buildings

export const getBuilding = (name: BuildingType) => (state: RootState) => getBuildings(state)[name]

export const getOssuary = getBuilding(BuildingType.Ossuary)

export const getBattlements = getBuilding(BuildingType.Battlements)

export const getSoulWell = getBuilding(BuildingType.SoulWell)

export const getCharnelHouse = getBuilding(BuildingType.CharnelHouse)

export const getCatacombs = getBuilding(BuildingType.Catacombs)

export const getBuildingsProduction = (state: RootState): ResourcesState => {
  const turn = getTurn(state)
  const charnelHouse = getCharnelHouse(state)
  const soulWell = getSoulWell(state)

  return {
    meat: CHARNEL_HOUSE_MEAT_PRODUCTION[charnelHouse.level],
    bones:
      turn % CHARNEL_HOUSE_PRODUCTION_TURNS[charnelHouse.level] === 0
        ? CHARNEL_HOUSE_BONES_PRODUCTION[charnelHouse.level]
        : 0,
    souls: SOUL_WELL_SOUL_PRODUCTION[soulWell.level],
    materials: 0,
  }
}

export const getDefenseBonus = (state: RootState) => getBattlementsDefenseBonus(getBattlements(state).level)
