import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo } from 'rxjs/operators'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'
import { nextPhase } from './turn/actions'
import { gainResources, spendResources } from './resources/actions'
import { getRaisableUndeadTypes, getUpkeep } from './undeads/selectors'
import { getBuildingsProduction, getCatacombs, getOssuary } from './buildings/selectors'
import { getOssuaryBonesCost, getRaiseUndeadSoulCost } from './buildings/helpers'
import { addUndead, killUndead, raiseUndead } from './undeads/actions'
import { ResourceType, TurnPhase } from '../config/constants'
import { getCurrentPhase } from './turn/selectors'
import { getMeat } from './resources/selectors'
import { createUndead } from './undeads/helpers'
import { addSpell, discoverSpell } from './spells/actions'
import { getDiscoverableSpells } from './spells/selectors'
import { endExpedition, fleeExpedition } from './expeditions/actions'
import { endEventEpic, eventsEpic } from './events/epics'
import { soulStormEpic } from './spells/epics'
import { repairBuildingEpic, upgradeBuildingEpic } from './buildings/epics'

const upkeepEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, killUndead])),
    filter(
      () => getCurrentPhase(state$.value) === TurnPhase.Upkeep && getMeat(state$.value) >= getUpkeep(state$.value),
    ),
    flatMap(() => of(spendResources({ [ResourceType.Meat]: getUpkeep(state$.value) }), nextPhase())),
  )

const productionEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Production),
    flatMap(() => of(gainResources(getBuildingsProduction(state$.value)), nextPhase())),
  )

const raiseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(raiseUndead)),
    flatMap(() => {
      const types = getRaisableUndeadTypes(state$.value)
      const undead = createUndead(types[Math.round(Math.random() * (types.length - 1))], true)
      return of(
        spendResources({ [ResourceType.Souls]: getRaiseUndeadSoulCost(getCatacombs(state$.value).level) }),
        addUndead(undead),
        nextPhase(),
      )
    }),
  )

const discoverSpellEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(discoverSpell)),
    flatMap(() => {
      const discoverableSpells = getDiscoverableSpells(state$.value)
      const discoveredSpell = discoverableSpells[Math.round(Math.random() * (discoverableSpells.length - 1))]
      return of(
        spendResources({ [ResourceType.Bones]: getOssuaryBonesCost(getOssuary(state$.value).level) }),
        addSpell(discoveredSpell),
        nextPhase(),
      )
    }),
  )

const fleeExpeditionEpic: Epic<RootAction, RootAction, RootState> = $action =>
  $action.pipe(filter(isActionOf([fleeExpedition, endExpedition])), mapTo(nextPhase()))

export const rootEpic = combineEpics(
  upgradeBuildingEpic,
  repairBuildingEpic,
  upkeepEpic,
  productionEpic,
  raiseUndeadEpic,
  eventsEpic,
  endEventEpic,
  discoverSpellEpic,
  fleeExpeditionEpic,
  soulStormEpic,
)
