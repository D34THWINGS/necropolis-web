import { createAction } from 'typesafe-actions'
import { Building } from './helpers'

export const upgradeBuilding = createAction('buildings/UPGRADE', (building: Building) => ({
  building,
}))()

export const freeUpgradeBuilding = createAction('buildings/FREE_UPGRADE', (building: Building) => ({
  building,
}))()

export const collapseBuilding = createAction('buildings/COLLAPSE', (building: Building) => ({ building }))()

export const repairBuilding = createAction('buildings/REPAIR', (building: Building) => ({ building }))()
