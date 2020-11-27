import { createSelector } from 'reselect'
import { RootState } from '../store/mainReducer'
import { getUndeadArmyLethality, getUndeadTypes } from './undeads/selectors'
import { getIsSoulStormActive } from './spells/selectors'
import {
  ARTIFACT_DEFENSE_BONUS,
  EventType,
  LA_MOTTE_DEFENSE_BONUS,
  PLUNDER_ACTIVATION_TURN,
  UndeadType,
} from '../config/constants'
import { getArsenalTrapsCount } from './buildings/helpers'
import { getArsenal, getConstructedBuildings } from './buildings/selectors'
import { getHasArtifact, getIsEventPast, getPastEvents } from './events/selectors'
import { getTurn } from './turn/selectors'
import { getCarnage } from './expeditions/selectors'
import { getPaladinsShouldAttack } from './paladins/selectors'
import { soulStorm } from './spells/helpers'

export const getLethality = (state: RootState) =>
  getUndeadArmyLethality(state) + (getIsSoulStormActive(state) ? soulStorm.lethalityBonus ?? 0 : 0)

export const getDefense = (state: RootState) =>
  getArsenalTrapsCount(getArsenal(state).level) +
  (getHasArtifact(state) ? ARTIFACT_DEFENSE_BONUS : 0) +
  (getUndeadTypes(state).includes(UndeadType.LaMotte) ? LA_MOTTE_DEFENSE_BONUS : 0)

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

export const getQuestEvent = (state: RootState) => {
  if (getCarnage(state) && !getIsEventPast(EventType.StateOfEmergency)(state)) {
    return EventType.StateOfEmergency
  }
  if (getPaladinsShouldAttack(state)) {
    return EventType.PaladinsAssault
  }
  return null
}
