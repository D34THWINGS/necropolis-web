import { RootState } from '../../store/mainReducer'
import { DISCOVERABLE_SPELLS, Spell } from '../../config/constants'

export const getSpells = (state: RootState) => state.spells

export const getHasSpells = (state: RootState) => getSpells(state).length > 0

export const getHasTheKey = (state: RootState) => getSpells(state).includes(Spell.TheKey)

export const getDiscoverableSpells = (state: RootState) =>
  DISCOVERABLE_SPELLS.filter(spell => !state.spells.includes(spell))
