import { combineEpics } from 'redux-observable'
import { endEventEpic, eventsEpic } from './events/epics'
import { castRestorationEpic, castSpellEpic, soulStormEpic } from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic, upgradeBuildingRewardsEpic } from './buildings/epics'
import { endExpeditionEpic, fleeExpeditionEpic } from './expeditions/epics'
import { looseUndeadEpic, raiseUndeadEpic, valetEpic } from './undeads/epics'
import { resetGameEpic } from './settings/epics'
import {
  displayAssaultResultsEpic,
  paladinDeathRattleEpic,
  paladinBattleCryEpic,
  trapsEpic,
  paladinIncreaseStrengthEpic,
  paladinSkipEpic,
} from './paladins/epics'

export const rootEpic = combineEpics(
  upgradeBuildingEpic,
  upgradeBuildingRewardsEpic,
  repairBuildingEpic,
  valetEpic,
  looseUndeadEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  castSpellEpic,
  castRestorationEpic,
  endExpeditionEpic,
  fleeExpeditionEpic,
  soulStormEpic,
  resetGameEpic,
  displayAssaultResultsEpic,
  trapsEpic,
  paladinBattleCryEpic,
  paladinDeathRattleEpic,
  paladinIncreaseStrengthEpic,
  paladinSkipEpic,
)
