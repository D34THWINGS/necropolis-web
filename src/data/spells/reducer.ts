import { createReducer } from 'typesafe-actions'
import { Spell } from '../../config/constants'
import { addSpell } from './actions'

export const spells = createReducer([] as Spell[]).handleAction(addSpell, (state, { payload: { spell } }) => [
  ...state,
  spell,
])
