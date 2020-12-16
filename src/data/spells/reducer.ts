import { createReducer } from 'typesafe-actions'
import { applyEffects, blurEffects } from './actions'
import { Spell } from './helpers'
import { SpellEffect } from './effects'

type SpellsState = {
  spellBook: Spell[]
  activeEffects: SpellEffect[]
}

export const spells = createReducer<SpellsState>({
  spellBook: [],
  activeEffects: [],
})
  .handleAction(applyEffects, (state, { payload: { effects } }) => ({
    ...state,
    activeEffects: [...state.activeEffects, ...effects],
  }))
  .handleAction(blurEffects, (state, { payload: { effects } }) => ({
    ...state,
    activeEffects: state.activeEffects.filter(activeEffect => effects.indexOf(activeEffect) === -1),
  }))
