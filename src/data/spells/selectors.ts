import { RootState } from '../../store/mainReducer'
import { getSoulWell } from '../buildings/selectors'
import { isBuildingBuilt } from '../buildings/helpers'

export const getCanCastSpells = (state: RootState) => isBuildingBuilt(getSoulWell(state))

export const getHasTheKey = getCanCastSpells

export const getIsSoulStormActive = (state: RootState) => state.spells.soulStormActive
