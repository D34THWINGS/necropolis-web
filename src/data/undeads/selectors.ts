import { RootState } from '../../store/mainReducer'
import { RAISABLE_UNDEADS } from '../../config/constants'

export const getUndeads = (state: RootState) => state.undeads

export const getUpkeep = (state: RootState) => getUndeads(state).length

export const getRaisedUndeadCount = (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => (undead.raised ? sum + 1 : sum), 0)

export const getUndeadTypes = (state: RootState) => getUndeads(state).map(undead => undead.type)

export const getRaisableUndeadTypes = (state: RootState) =>
  RAISABLE_UNDEADS.filter(type => !getUndeadTypes(state).includes(type))
