import { combineEpics } from 'redux-observable'
import { endEventEpic, eventsEpic } from './events/epics'
import { castSpellEpic, discoverSpellEpic, soulStormEpic } from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic, upgradeBuildingRewardsEpic } from './buildings/epics'
import { endExpeditionEpic, fleeExpeditionEpic } from './expeditions/epics'
import { raiseUndeadEpic, valetEpic } from './undeads/epics'
import { resetGameEpic } from './settings/epics'

export const rootEpic = combineEpics(
  upgradeBuildingEpic,
  upgradeBuildingRewardsEpic,
  repairBuildingEpic,
  valetEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  discoverSpellEpic,
  castSpellEpic,
  endExpeditionEpic,
  fleeExpeditionEpic,
  soulStormEpic,
  resetGameEpic,
)
