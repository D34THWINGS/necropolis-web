import { createSelector } from 'reselect'
import { RootState } from '../store/mainReducer'
import { getUndeadArmyLethality } from './undeads/selectors'
import { getIsSoulStormActive } from './spells/selectors'
import {
  ARTIFACT_DEFENSE_BONUS,
  EventType,
  PLUNDER_ACTIVATION_TURN,
  SOUL_STORM_DEFENSE_BONUS,
  SOUL_STORM_LETHALITY_BONUS,
} from '../config/constants'
import { getBattlementsDefenseBonus } from './buildings/helpers'
import { getBattlements, getConstructedBuildings } from './buildings/selectors'
import { getHasArtifact, getPastEvents } from './events/selectors'
import { getTurn } from './turn/selectors'

export const getLethality = (state: RootState) =>
  getUndeadArmyLethality(state) + (getIsSoulStormActive(state) ? SOUL_STORM_LETHALITY_BONUS : 0)

export const getDefense = (state: RootState) =>
  getBattlementsDefenseBonus(getBattlements(state).level) +
  (getIsSoulStormActive(state) ? SOUL_STORM_DEFENSE_BONUS : 0) +
  (getHasArtifact(state) ? ARTIFACT_DEFENSE_BONUS : 0)

export const getRandomEventPool = createSelector(
  getTurn,
  getConstructedBuildings,
  getPastEvents,
  (turn, hasBuilding, pastEvents) => {
    const eventPool = [EventType.Collapsing]
    if (turn >= PLUNDER_ACTIVATION_TURN) {
      eventPool.push(EventType.Plunder)
    }
    if (hasBuilding) {
      eventPool.push(EventType.Offering)
    }
    return eventPool.filter(event => !pastEvents.includes(event))
  },
)
