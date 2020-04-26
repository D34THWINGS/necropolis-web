import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { filter, flatMap, mapTo, throttle } from 'rxjs/operators'
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
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf([nextPhase, killUndead]))), { leading: false, trailing: true }),
    filter(state => getCurrentPhase(state) === TurnPhase.Upkeep && getMeat(state) >= getUpkeep(state)),
    flatMap(state => of(spendResources({ [ResourceType.Meat]: getUpkeep(state) }), nextPhase())),
  )

const productionEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf(nextPhase))), { leading: false, trailing: true }),
    filter(state => getCurrentPhase(state) === TurnPhase.Production),
    flatMap(state => of(gainResources(getBuildingsProduction(state)), nextPhase())),
  )

const raiseUndeadEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf(raiseUndead))), { leading: false, trailing: true }),
    flatMap(state => {
      const types = getRaisableUndeadTypes(state)
      const undead = createUndead(types[Math.round(Math.random() * (types.length - 1))], true)
      return of(
        spendResources({ [ResourceType.Souls]: getRaiseUndeadSoulCost(getCatacombs(state).level) }),
        addUndead(undead),
        nextPhase(),
      )
    }),
  )

const discoverSpellEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    throttle(() => action$.pipe(filter(isActionOf(discoverSpell))), { leading: false, trailing: true }),
    flatMap(state => {
      const discoverableSpells = getDiscoverableSpells(state)
      const discoveredSpell = discoverableSpells[Math.round(Math.random() * (discoverableSpells.length - 1))]
      return of(
        spendResources({ [ResourceType.Bones]: getOssuaryBonesCost(getOssuary(state).level) }),
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
