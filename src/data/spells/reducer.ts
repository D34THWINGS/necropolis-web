import { createReducer } from 'typesafe-actions'
import { applyEffects, blurEffects, castSpell, learnSpell, readyUpSpells } from './actions'
import { Spell } from './helpers'
import { SpellEffect } from './effects'
import { setInArray } from '../helpers'

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
  .handleAction(learnSpell, (state, { payload: { spell } }) => ({
    ...state,
    spellBook: [...state.spellBook, spell],
  }))
  .handleAction(castSpell, (state, { payload: { spell } }) => {
    const spellIndex = state.spellBook.findIndex(({ key }) => spell.key === key)
    if (spellIndex === -1) {
      return state
    }
    return {
      ...state,
      spellBook: setInArray(state.spellBook, spellIndex, { ...spell, used: true }),
    }
  })
  .handleAction(readyUpSpells, state => ({
    ...state,
    spellBook: state.spellBook.map(spell => ({ ...spell, used: false })),
  }))
