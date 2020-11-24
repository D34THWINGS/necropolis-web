import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { DISCOVERABLE_SPELLS, Spell } from '../../config/constants'

export const getSpells = () => Object.values(Spell)

export const getHasSpells = () => getSpells().length > 0

// TODO: Move this to buildings selector. Should be true when soul well level is above 1.
export const getHasTheKey = () => getSpells().includes(Spell.TheKey)

export const getDiscoverableSpells = createSelector(getSpells, spells =>
  DISCOVERABLE_SPELLS.filter(spell => !spells.includes(spell)),
)

export const getHasDiscoverableSpells = (state: RootState) => getDiscoverableSpells(state).length > 0

export const getIsSoulStormActive = (state: RootState) => state.spells.soulStormActive
