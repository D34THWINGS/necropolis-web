import { combineEpics } from 'redux-observable'
import { endEventEpic, eventsEpic } from './events/epics'
import {
  castRestorationEpic,
  castSpellEpic,
  castSoulStormEpic,
  blurEffectsEpic,
  castTheKeyEpic,
  castPredictionEpic,
  readyUpSpellsEpic,
} from './spells/epics'
import {
  buySecretEpic,
  repairBuildingEpic,
  reRollSecretsEpic,
  reRollUndeadPoolEpic,
  upgradeBuildingEpic,
  upgradeBuildingWinEpic,
  upgradeCatacombsEpic,
} from './buildings/epics'
import { endExpeditionEpic, fleeExpeditionEpic, rollObstacleDicesEpic } from './expeditions/epics'
import {
  blurAbilityEffectsEpic,
  castDevotionAbilityEpic,
  castLaborAbilityEpic,
  castProtectionAbilityEpic,
  castSectumSempraAbilityEpic,
  castSeductionAbilityEpic,
  raiseUndeadEpic,
  readyUpAbilitiesEpic,
} from './undeads/epics'
import { resetGameEpic } from './settings/epics'
import {
  displayAssaultResultsEpic,
  paladinDeathRattleEpic,
  paladinBattleCryEpic,
  trapsEpic,
  paladinIncreaseCounterEpic,
  paladinSkipEpic,
  forwardDamagesEpic,
} from './paladins/epics'

export const rootEpic = combineEpics(
  upgradeBuildingEpic,
  upgradeBuildingWinEpic,
  upgradeCatacombsEpic,
  repairBuildingEpic,
  reRollSecretsEpic,
  reRollUndeadPoolEpic,
  buySecretEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  castSpellEpic,
  castRestorationEpic,
  blurEffectsEpic,
  endExpeditionEpic,
  rollObstacleDicesEpic,
  fleeExpeditionEpic,
  castSoulStormEpic,
  castTheKeyEpic,
  castPredictionEpic,
  resetGameEpic,
  displayAssaultResultsEpic,
  trapsEpic(),
  forwardDamagesEpic,
  paladinBattleCryEpic,
  paladinDeathRattleEpic,
  paladinIncreaseCounterEpic,
  paladinSkipEpic,
  castDevotionAbilityEpic,
  castLaborAbilityEpic,
  castProtectionAbilityEpic,
  castSeductionAbilityEpic,
  castSectumSempraAbilityEpic,
  blurAbilityEffectsEpic,
  readyUpAbilitiesEpic,
  readyUpSpellsEpic,
)
