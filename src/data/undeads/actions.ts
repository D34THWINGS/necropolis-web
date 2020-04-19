import { createAction } from 'typesafe-actions'
import { Undead } from './helpers'

export const banUndead = createAction('undeads/BAN', (id: number) => ({
  id,
}))<{ id: number }>()

export const raiseUndead = createAction('undeads/RAISE')()

export const addUndead = createAction('undeads/ADD', (undead: Undead) => ({
  undead,
}))<{ undead: Undead }>()
