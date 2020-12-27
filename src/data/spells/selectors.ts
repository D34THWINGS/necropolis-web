import { RootState } from '../../store/mainReducer'
import { getSoulWell } from '../buildings/selectors'
import { isBuildingConstructed } from '../buildings/helpers'
import { getLethalityBonusFromEffects } from './effects'
import { isTheKey } from './helpers'

export const getCanCastSpells = (state: RootState) => {
  const soulWell = getSoulWell(state)
  return !!soulWell && isBuildingConstructed(soulWell)
}

export const getSpellsLethalityBonus = (state: RootState) => getLethalityBonusFromEffects(state.spells.activeEffects)

export const getLearntSpells = (state: RootState) => state.spells.spellBook

export const getTheKey = (state: RootState) => getLearntSpells(state).find(isTheKey)

export const getActiveSpellEffects = (state: RootState) => state.spells.activeEffects
