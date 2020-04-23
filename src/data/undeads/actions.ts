import { createAction } from 'typesafe-actions'
import { Undead } from './helpers'

export const banUndead = createAction('undeads/BAN', (id: number) => ({
  id,
}))<{ id: number }>()

export const raiseUndead = createAction('undeads/RAISE')()

export const addUndead = createAction('undeads/ADD', (undead: Undead) => ({
  undead,
}))<{ undead: Undead }>()

export const killAllUndead = createAction('undeads/KILL_ALL')()

export const requireSacrifice = createAction('undeads/REQUIRE_SACRIFICE', (count: number) => ({ count }))()
