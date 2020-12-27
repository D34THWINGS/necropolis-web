import { combineEpics } from 'redux-observable'
import { endEventEpic, eventsEpic } from './events/epics'
import {
  castRestorationEpic,
  castSpellEpic,
  castSoulStormEpic,
  blurEffectsEpic,
  castTheKeyEpic,
  castPredictionEpic,
} from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic, upgradeBuildingWinEpic } from './buildings/epics'
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
  upgradeBuildingWinEpic,
  repairBuildingEpic,
  valetEpic,
  looseUndeadEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  castSpellEpic,
  castRestorationEpic,
  blurEffectsEpic,
  endExpeditionEpic,
  fleeExpeditionEpic,
  castSoulStormEpic,
  castTheKeyEpic,
  castPredictionEpic,
  resetGameEpic,
  displayAssaultResultsEpic,
  trapsEpic,
  paladinBattleCryEpic,
  paladinDeathRattleEpic,
  paladinIncreaseStrengthEpic,
  paladinSkipEpic,
)
