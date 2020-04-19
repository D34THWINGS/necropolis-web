import { RootState } from '../../store/mainReducer'
import { RAISABLE_UNDEADS, UndeadType } from '../../config/constants'

export const getUndeads = (state: RootState) => state.undeads

export const getUpkeep = (state: RootState) => getUndeads(state).length

export const getRaisedUndeadCount = (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => (undead.raised ? sum + 1 : sum), 0)

export const getRaisedUndeadTypes = (state: RootState) =>
  getUndeads(state).reduce<UndeadType[]>((acc, undead) => (undead.raised ? [...acc, undead.type] : acc), [])

export const getRaisableUndeadTypes = (state: RootState) =>
  RAISABLE_UNDEADS.filter(type => !getRaisedUndeadTypes(state).includes(type))
