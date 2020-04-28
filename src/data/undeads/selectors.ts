import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { RAISABLE_UNDEADS, UndeadTalent, UndeadType } from '../../config/constants'
import { Undead } from './helpers'

export const getUndeads = (state: RootState) => state.undeads.list

export const getUndeadCount = (state: RootState) => getUndeads(state).length

export const getUpkeep = (state: RootState) =>
  getUndeads(state).filter(undead => undead.type !== UndeadType.Skeleton).length

export const getUndeadTypes = createSelector(getUndeads, (undeads): UndeadType[] => undeads.map(undead => undead.type))

export const getKilledUndeads = (state: RootState) => state.undeads.killed

export const getBannedUndeads = (state: RootState) => state.undeads.banned

export const getRaisedUndeadCount = (state: RootState) =>
  RAISABLE_UNDEADS.filter(
    type =>
      getUndeadTypes(state).includes(type) ||
      getKilledUndeads(state).includes(type) ||
      getBannedUndeads(state).includes(type),
  ).length

export const getRaisableUndeadTypes = createSelector(
  getUndeadTypes,
  getKilledUndeads,
  getBannedUndeads,
  (active, killed, banned) =>
    RAISABLE_UNDEADS.filter(type => !active.includes(type) && !killed.includes(type) && !banned.includes(type)),
)

const getUndeadTalent = (undead: Undead, searchedTalent: UndeadTalent) =>
  (undead.talents.find(([talent]) => talent === searchedTalent) || [])[1] || 0

export const getUndeadArmyTalentTotal = (talent: UndeadTalent) => (state: RootState) =>
  getUndeads(state).reduce((sum, undead) => sum + getUndeadTalent(undead, talent), 0)

export const getUndeadArmyMuscles = getUndeadArmyTalentTotal(UndeadTalent.Muscles)

export const getUndeadArmyLethality = getUndeadArmyTalentTotal(UndeadTalent.Lethality)

export const getIsBloodPrinceInJail = (state: RootState) =>
  !getUndeadTypes(state).includes(UndeadType.BloodPrince) && !getKilledUndeads(state).includes(UndeadType.BloodPrince)

export const getRequiredSacrifices = (state: RootState) => state.undeads.requiredSacrifices
