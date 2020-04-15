import { RootState } from '../../store/mainReducer'

export const getBuildings = (state: RootState) => state.buildings

export const getBuilding = <T extends keyof RootState['buildings']>(name: T) => (state: RootState) =>
  getBuildings(state)[name]

export const getOssuary = getBuilding('ossuary')

export const getBattlements = getBuilding('battlements')

export const getSoulWell = getBuilding('soulWell')

export const getCharnelHouse = getBuilding('charnelHouse')

export const getCatacombs = getBuilding('catacombs')
