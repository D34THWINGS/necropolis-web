import { createAction } from 'typesafe-actions'
import { Spell } from './helpers'
import { SpellEffect } from './effects'

export const castSpell = createAction('spells/CAST', (spell: Spell) => ({ spell }))()

export const applyEffects = createAction('spells/APPLY_EFFECTS', (effects: SpellEffect[]) => ({ effects }))()

export const blurEffects = createAction('spells/BLUR_EFFECTS', (effects: SpellEffect[]) => ({ effects }))()

export const learnSpell = createAction('spells/LEARN', (spell: Spell) => ({ spell }))()

export const readyUpSpells = createAction('spells/READY_UP_SPELLS')()
