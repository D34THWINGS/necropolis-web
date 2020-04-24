import { RootState } from '../../store/mainReducer'
import { DISCOVERABLE_SPELLS, Spell } from '../../config/constants'

export const getSpells = (state: RootState) => state.spells.list

export const getHasSpells = (state: RootState) => getSpells(state).length > 0

export const getHasTheKey = (state: RootState) => getSpells(state).includes(Spell.TheKey)

export const getDiscoverableSpells = (state: RootState) =>
  DISCOVERABLE_SPELLS.filter(spell => !getSpells(state).includes(spell))

export const getHasDiscoverableSpells = (state: RootState) => getDiscoverableSpells(state).length > 0

export const getIsSoulStormActive = (state: RootState) => state.spells.soulStormActive
