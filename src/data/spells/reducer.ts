import { createReducer } from 'typesafe-actions'
import { Spell } from '../../config/constants'
import { addSpell, castSpell, disableSoulStorm } from './actions'

export const spells = createReducer({
  list: [] as Spell[],
  soulStormActive: false,
})
  .handleAction(addSpell, (state, { payload: { spell } }) => ({
    ...state,
    list: [...state.list, spell],
  }))
  .handleAction(disableSoulStorm, (state, { payload: { active } }) => ({
    ...state,
    soulStormActive: active,
  }))
  .handleAction(castSpell, (state, { payload: { spell } }) =>
    spell === Spell.SoulStorm ? { ...state, soulStormActive: true } : state,
  )
