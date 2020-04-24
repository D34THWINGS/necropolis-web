import { createReducer } from 'typesafe-actions'
import { Spell } from '../../config/constants'
import { addSpell, toggleSoulStorm } from './actions'

export const spells = createReducer({
  list: [] as Spell[],
  soulStormActive: false,
})
  .handleAction(addSpell, (state, { payload: { spell } }) => ({
    ...state,
    list: [...state.list, spell],
  }))
  .handleAction(toggleSoulStorm, (state, { payload: { active } }) => ({
    ...state,
    soulStormActive: active,
  }))
