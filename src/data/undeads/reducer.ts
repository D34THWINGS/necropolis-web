import { createReducer } from 'typesafe-actions'
import { createUndead, Undead } from './helpers'
import { UndeadTalent, UndeadType } from '../../config/constants'
import {
  addUndead,
  sacrificeUndead,
  requireSacrifice,
  banUndead,
  upgradeValet,
  healUndead,
  damageUndead,
  curseUndead,
  cleanseUndead,
} from './actions'
import { deepSet } from '../helpers'

type UndeadsState = {
  list: Undead[]
  requiredSacrifices: number
}

const updateUndeadById = (
  state: UndeadsState,
  undeadId: Undead['id'],
  callback: (undead: Undead) => Partial<Undead>,
) => {
  const updatedUndead = state.list.find(undead => undead.id === undeadId)
  if (!updatedUndead) {
    return state
  }
  return deepSet(state)('list')(state.list.indexOf(updatedUndead))()({
    ...updatedUndead,
    ...callback(updatedUndead),
  })
}

export const undeads = createReducer<UndeadsState>({
  list: [createUndead(UndeadType.Valet)],
  requiredSacrifices: 0,
})
  .handleAction(banUndead, (state, { payload: { undeadId } }) =>
    updateUndeadById(state, undeadId, () => ({ banned: true })),
  )
  .handleAction(sacrificeUndead, (state, { payload: { undeadId } }) => ({
    ...updateUndeadById(state, undeadId, () => ({ health: 0 })),
    requiredSacrifices: Math.max(0, state.requiredSacrifices - 1),
  }))
  .handleAction(addUndead, (state, { payload: { undead } }) => ({ ...state, list: [...state.list, undead] }))
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
  .handleAction(healUndead, (state, { payload: { undeadId, amount } }) =>
    updateUndeadById(state, undeadId, undead => ({
      health: Math.min(undead.maxHealth, undead.health + amount),
    })),
  )
  .handleAction(damageUndead, (state, { payload: { undeadId, amount } }) =>
    updateUndeadById(state, undeadId, undead => ({
      health: Math.max(0, undead.health - amount),
    })),
  )
  .handleAction(curseUndead, (state, { payload: { undeadId } }) =>
    updateUndeadById(state, undeadId, () => ({ cursed: true })),
  )
  .handleAction(cleanseUndead, (state, { payload: { undeadId } }) =>
    updateUndeadById(state, undeadId, () => ({ cursed: false })),
  )
