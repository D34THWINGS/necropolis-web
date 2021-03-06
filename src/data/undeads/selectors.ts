import { createSelector } from 'reselect'
import { RootState } from '../../store/mainReducer'
import { UndeadTalent, UndeadType } from '../../config/constants'
import { getMostInjured, getUndeadTalents, isBloodPrince, isInjured, isUndeadAlive, Undead, UndeadId } from './helpers'

export const getUndeads = (state: RootState) => state.undeads.list

export const getUndeadById = (undeadId: UndeadId) => (state: RootState) =>
  state.undeads.list.find(undead => undead.id === undeadId)

export const getAliveUndeads = createSelector(getUndeads, undeads => undeads.filter(isUndeadAlive))

export const getDeadUndeads = createSelector(getUndeads, undeads => undeads.filter(undead => !isUndeadAlive(undead)))

export const getUndeadCount = (state: RootState) => getAliveUndeads(state).length

export const getUpkeep = (state: RootState) => getAliveUndeads(state).length

const getUndeadTalent = (undead: Undead, searchedTalent: UndeadTalent) =>
  (getUndeadTalents(undead).find(([talent]) => talent === searchedTalent) || [])[1] || 0

export const getUndeadArmyTalentTotal = (talent: UndeadTalent) => (state: RootState) =>
  getAliveUndeads(state).reduce((sum, undead) => sum + getUndeadTalent(undead, talent), 0)

export const getUndeadArmyMuscles = getUndeadArmyTalentTotal(UndeadTalent.Muscles)

export const getUndeadArmyDexterity = getUndeadArmyTalentTotal(UndeadTalent.Dexterity)

export const getUndeadArmyLethality = getUndeadArmyTalentTotal(UndeadTalent.Lethality)

export const getIsBloodPrinceInJail = (state: RootState) => !getUndeads(state).some(isBloodPrince)

export const getRequiredSacrifices = (state: RootState) => state.undeads.requiredSacrifices

export const getMostInjuredUndead = (state: RootState) => getMostInjured(getAliveUndeads(state))

export const getInjuredUndeads = createSelector(getAliveUndeads, undeads => undeads.filter(isInjured))

export const getCursedUndeads = (state: RootState) => getAliveUndeads(state).filter(undead => undead.cursed)

export const getValet = (state: RootState) => getUndeads(state).find(undead => undead.type === UndeadType.Valet)

export const getHasEffectToBlur = (state: RootState) =>
  getUndeads(state).some(undead => undead.activeEffects.length > 0)
