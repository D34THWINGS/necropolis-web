import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { RAISABLE_UNDEADS, UndeadTalent, UndeadType } from '../../config/constants'
import { isUndeadAlive, Undead } from './helpers'

export const getUndeads = (state: RootState) => state.undeads.list

export const getAliveUndeads = createSelector(getUndeads, undeads => undeads.filter(isUndeadAlive))

export const getUndeadCount = (state: RootState) => getUndeads(state).length

export const getUpkeep = (state: RootState) =>
  getAliveUndeads(state).filter(undead => undead.type !== UndeadType.Skeleton).length

export const getUndeadTypes = createSelector(getUndeads, (undeads): UndeadType[] => undeads.map(undead => undead.type))

export const getRaisedUndeadCount = (state: RootState) =>
  RAISABLE_UNDEADS.filter(type => getUndeadTypes(state).includes(type)).length

export const getRaisableUndeadTypes = (state: RootState) =>
  RAISABLE_UNDEADS.filter(type => !getUndeadTypes(state).includes(type))

const getUndeadTalent = (undead: Undead, searchedTalent: UndeadTalent) =>
  (undead.talents.find(([talent]) => talent === searchedTalent) || [])[1] || 0

export const getUndeadArmyTalentTotal = (talent: UndeadTalent) => (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => sum + getUndeadTalent(undead, talent), 0)

export const getUndeadArmyMuscles = getUndeadArmyTalentTotal(UndeadTalent.Muscles)

export const getUndeadArmyLethality = getUndeadArmyTalentTotal(UndeadTalent.Lethality)

export const getIsBloodPrinceInJail = (state: RootState) => !getUndeadTypes(state).includes(UndeadType.BloodPrince)

export const getRequiredSacrifices = (state: RootState) => state.undeads.requiredSacrifices
