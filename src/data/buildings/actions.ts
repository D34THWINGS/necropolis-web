import { ActionType, createAction } from 'typesafe-actions'
import type { BuildingName } from './reducer'

export const upgradeBuilding = createAction('buildings/UPGRADE', (name: BuildingName) => ({
  name,
}))<{ name: BuildingName }>()
