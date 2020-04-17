import { createAction } from 'typesafe-actions'
import { BuildingType } from '../../config/constants'

export const upgradeBuilding = createAction('buildings/UPGRADE', (type: BuildingType, level: number) => ({
  type,
  level,
}))<{ type: BuildingType; level: number }>()
