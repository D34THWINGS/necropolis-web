import { createAction } from 'typesafe-actions'
import { BuildingType } from '../../config/constants'

export const upgradeBuilding = createAction('buildings/UPGRADE', (type: BuildingType) => ({
  type,
}))()

export const freeUpgradeBuilding = createAction('buildings/FREE_UPGRADE', (type: BuildingType) => ({
  type,
}))()

export const collapseBuilding = createAction('buildings/COLLAPSE', (type: BuildingType) => ({ type }))()

export const repairBuilding = createAction('buildings/REPAIR', (type: BuildingType) => ({ type }))()
