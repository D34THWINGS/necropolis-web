import { RootState } from '../../store/mainReducer'
import { RAISABLE_UNDEADS, UndeadTalent, UndeadType } from '../../config/constants'
import { Undead } from './helpers'

export const getUndeads = (state: RootState) => state.undeads.list

export const getUndeadCount = (state: RootState) => getUndeads(state).length

export const getUpkeep = getUndeadCount

export const getRaisedUndeadCount = (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => (undead.raised ? sum + 1 : sum), 0)

export const getUndeadTypes = (state: RootState) => getUndeads(state).map(undead => undead.type)

export const getRaisableUndeadTypes = (state: RootState) =>
  RAISABLE_UNDEADS.filter(type => !getUndeadTypes(state).includes(type))

const getUndeadTalent = (undead: Undead, searchedTalent: UndeadTalent) =>
  (undead.talents.find(([talent]) => talent === searchedTalent) || [])[1] || 0

export const getUndeadArmyTalentTotal = (talent: UndeadTalent) => (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => sum + getUndeadTalent(undead, talent), 0)

export const getUndeadArmyMuscles = getUndeadArmyTalentTotal(UndeadTalent.Muscles)

export const getUndeadArmyLethality = getUndeadArmyTalentTotal(UndeadTalent.Lethality)

export const getHasBloodPrince = (state: RootState) =>
  getUndeads(state).some(undead => undead.type === UndeadType.BloodPrince)

export const getRequiredSacrifices = (state: RootState) => state.undeads.requiredSacrifices
