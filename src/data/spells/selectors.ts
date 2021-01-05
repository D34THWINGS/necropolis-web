import { RootState } from '../../store/mainReducer'
import { getLethalityBonusFromEffects } from './effects'
import { isTheKey } from './helpers'

export const getSpellsLethalityBonus = (state: RootState) => getLethalityBonusFromEffects(state.spells.activeEffects)

export const getLearntSpells = (state: RootState) => state.spells.spellBook

export const getTheKey = (state: RootState) => getLearntSpells(state).find(isTheKey)

export const getActiveSpellEffects = (state: RootState) => state.spells.activeEffects
