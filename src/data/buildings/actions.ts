import { createAction } from 'typesafe-actions'
import { Building } from './helpers'
import { Secret } from './secrets'
import { Undead } from '../undeads/helpers'

export const upgradeBuilding = createAction('buildings/UPGRADE', (building: Building) => ({
  building,
}))()

export const freeUpgradeBuilding = createAction('buildings/FREE_UPGRADE', (building: Building) => ({
  building,
}))()

export const collapseBuilding = createAction('buildings/COLLAPSE', (building: Building) => ({ building }))()

export const repairBuilding = createAction('buildings/REPAIR', (building: Building) => ({ building }))()

export const changeSecrets = createAction('buildings/CHANGE_SECRETS', (secrets: Secret[]) => ({
  secrets,
}))()

export const buySecret = createAction('buildings/BUY_SECRET', (secret: Secret) => ({ secret }))()

export const raiseUndead = createAction('buildings/RAISE_UNDEAD', (undead: Undead) => ({ undead }))()
