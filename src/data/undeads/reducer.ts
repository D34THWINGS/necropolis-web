import { createReducer } from 'typesafe-actions'
import { createUndead } from './helpers'
import { UndeadType } from '../../config/constants'
import { addUndead, banUndead, killAllUndead } from './actions'

export const undeads = createReducer([createUndead(UndeadType.Valet)])
  .handleAction(banUndead, (state, { payload: { id } }) => state.filter(undead => undead.id !== id))
  .handleAction(addUndead, (state, { payload: { undead } }) => [...state, undead])
  .handleAction(killAllUndead, () => [])
