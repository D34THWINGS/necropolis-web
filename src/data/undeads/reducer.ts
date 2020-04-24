import { createReducer } from 'typesafe-actions'
import { createUndead } from './helpers'
import { UndeadType } from '../../config/constants'
import { addUndead, killUndead, killAllUndead, requireSacrifice, banUndead } from './actions'

export const undeads = createReducer({
  list: [createUndead(UndeadType.Valet)],
  requiredSacrifices: 0,
  killed: [] as UndeadType[],
  banned: [] as UndeadType[],
})
  .handleAction(banUndead, (state, { payload: { type } }) => ({
    ...state,
    list: state.list.filter(undead => undead.type !== type),
    killed: type !== UndeadType.BloodPrince ? [...state.killed, type] : state.killed,
    banned: type === UndeadType.BloodPrince ? [...state.killed, type] : state.killed,
  }))
  .handleAction(killUndead, (state, { payload: { type } }) => ({
    ...state,
    list: state.list.filter(undead => undead.type !== type),
    requiredSacrifices: Math.max(state.requiredSacrifices - 1, 0),
    killed: [...state.killed, type],
  }))
  .handleAction(addUndead, (state, { payload: { undead } }) => ({ ...state, list: [...state.list, undead] }))
  .handleAction(killAllUndead, state => ({
    list: [],
    requiredSacrifices: 0,
    killed: [...state.killed, ...state.list.map(({ type }) => type)],
    banned: [],
  }))
  .handleAction(requireSacrifice, (state, { payload: { count } }) => ({
    ...state,
    requiredSacrifices: state.requiredSacrifices + count,
  }))
