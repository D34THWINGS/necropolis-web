import { createReducer } from 'typesafe-actions'
import { createUndead } from './helpers'
import { UndeadTalent, UndeadType } from '../../config/constants'
import { addUndead, killUndead, killAllUndead, requireSacrifice, banUndead, upgradeValet } from './actions'

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
  .handleAction(upgradeValet, state => {
    const valetIndex = state.list.findIndex(undead => undead.type === UndeadType.Valet)
    if (valetIndex < 0) {
      return state
    }
    const possibleTalents = Object.values(UndeadTalent)
    const randomTalent = possibleTalents[Math.round(Math.random() * (possibleTalents.length - 1))]
    const talentsMap = new Map(state.list[valetIndex].talents)
    talentsMap.set(randomTalent, (talentsMap.get(randomTalent) || 0) + 1)
    return {
      ...state,
      list: [
        ...state.list.slice(0, valetIndex),
        { ...state.list[valetIndex], talents: Array.from(talentsMap.entries()) },
        ...state.list.slice(valetIndex + 1),
      ],
    }
  })
