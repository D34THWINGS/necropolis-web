import { createAction } from 'typesafe-actions'
import { Undead } from './helpers'
import { UndeadType } from '../../config/constants'

export const banUndead = createAction('undeads/BAN', (type: UndeadType) => ({ type }))()

export const killUndead = createAction('undeads/KILL', (type: UndeadType) => ({ type }))()

export const raiseUndead = createAction('undeads/RAISE', (undead: Undead) => ({ undead }))()

export const addUndead = createAction('undeads/ADD', (undead: Undead) => ({ undead }))()

export const requireSacrifice = createAction('undeads/REQUIRE_SACRIFICE', (count: number) => ({ count }))()

export const upgradeValet = createAction('undeads/UPGRADE_VALET')()
