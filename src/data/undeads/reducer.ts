import { createReducer } from 'typesafe-actions'
import { createUndead } from './helpers'
import { UndeadType } from '../../config/constants'
import { addUndead, banUndead, killAllUndead, requireSacrifice } from './actions'

export const undeads = createReducer({ list: [createUndead(UndeadType.Valet)], requiredSacrifices: 0 })
  .handleAction(banUndead, (state, { payload: { id } }) => ({
    list: state.list.filter(undead => undead.id !== id),
    requiredSacrifices: Math.max(state.requiredSacrifices - 1, 0),
  }))
  .handleAction(addUndead, (state, { payload: { undead } }) => ({ ...state, list: [...state.list, undead] }))
  .handleAction(killAllUndead, () => ({ list: [], requiredSacrifices: 0 }))
  .handleAction(requireSacrifice, (state, { payload: { count } }) => ({
    ...state,
    requiredSacrifices: state.requiredSacrifices + count,
  }))
