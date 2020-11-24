import { createReducer } from 'typesafe-actions'
import { castSpell, disableSoulStorm } from './actions'
import { isSoulStorm } from '../../config/constants/spellConstants'

export const spells = createReducer({
  soulStormActive: false,
})
  .handleAction(disableSoulStorm, (state, { payload: { active } }) => ({
    ...state,
    soulStormActive: active,
  }))
  .handleAction(castSpell, (state, { payload: { spell } }) =>
    isSoulStorm(spell) ? { ...state, soulStormActive: true } : state,
  )
