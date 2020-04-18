import { createAction } from 'typesafe-actions'

export const banUndead = createAction('undeads/BAN', (id: number) => ({
  id,
}))<{ id: number }>()
