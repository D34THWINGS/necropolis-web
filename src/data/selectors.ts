import { createSelector } from 'reselect'
import { RootState } from '../store/mainReducer'
import { getUndeadArmyLethality } from './undeads/selectors'
import { getSpellsLethalityBonus } from './spells/selectors'
import { ARTIFACT_DEFENSE_BONUS, EventType, PLUNDER_ACTIVATION_TURN } from '../config/constants'
import { getArsenal, getConstructedBuildings } from './buildings/selectors'
import { getHasArtifact, getPastEvents } from './events/selectors'
import { getTurn } from './turn/selectors'
import { getPaladinsShouldAttack } from './paladins/selectors'

export const getLethality = (state: RootState) => getUndeadArmyLethality(state) + getSpellsLethalityBonus(state)

export const getDefense = (state: RootState) =>
  (getArsenal(state)?.trapsPerAssault ?? 0) + (getHasArtifact(state) ? ARTIFACT_DEFENSE_BONUS : 0)

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
  if (getPaladinsShouldAttack(state)) {
    return EventType.PaladinsAssault
  }
  return null
}
