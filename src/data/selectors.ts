import { RootState } from '../store/mainReducer'
import { getUndeadArmyLethality } from './undeads/selectors'
import { getIsSoulStormActive } from './spells/selectors'
import { ARTIFACT_DEFENSE_BONUS, SOUL_STORM_DEFENSE_BONUS, SOUL_STORM_LETHALITY_BONUS } from '../config/constants'
import { getBattlementsDefenseBonus } from './buildings/helpers'
import { getBattlements } from './buildings/selectors'
import { getHasArtifact } from './events/selectors'

export const getLethality = (state: RootState) =>
  getUndeadArmyLethality(state) + (getIsSoulStormActive(state) ? SOUL_STORM_LETHALITY_BONUS : 0)

export const getDefense = (state: RootState) =>
  getBattlementsDefenseBonus(getBattlements(state).level) +
  (getIsSoulStormActive(state) ? SOUL_STORM_DEFENSE_BONUS : 0) +
  (getHasArtifact(state) ? ARTIFACT_DEFENSE_BONUS : 0)
