import { RootState } from '../../store/mainReducer'
import { getTurn } from '../turn/selectors'
import {
  CHARNEL_HOUSE_BONES_PRODUCTION,
  CHARNEL_HOUSE_MEAT_PRODUCTION,
  CHARNEL_HOUSE_PRODUCTION_TURNS,
  SOUL_WELL_SOUL_PRODUCTION,
} from '../../config/constants'
import { ResourcesState } from '../resources/reducer'

export const getBuildings = (state: RootState) => state.buildings

export const getBuilding = <T extends keyof RootState['buildings']>(name: T) => (state: RootState) =>
  getBuildings(state)[name]

export const getOssuary = getBuilding('ossuary')

export const getBattlements = getBuilding('battlements')

export const getSoulWell = getBuilding('soulWell')

export const getCharnelHouse = getBuilding('charnelHouse')

export const getCatacombs = getBuilding('catacombs')

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
