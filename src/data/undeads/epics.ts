import { ActionType, isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import {
  addUndead,
  applyAbilityEffect,
  blurAbilityEffects,
  castUndeadAbility,
  damageUndead,
  upgradeValet,
} from './actions'
import { getHasEffectToBlur, getUndeads } from './selectors'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'
import { getCatacombs } from '../buildings/selectors'
import { nextPhase } from '../turn/actions'
import { endExpedition, setExpeditionStep } from '../expeditions/actions'
import { raiseUndead } from '../buildings/actions'
import { isValet } from './helpers'
import { NecropolisEpic } from '../helpers'
import { isDevotion, isLabor, isProtection, isSectumSempra, isSeduction } from './abilities'
import {
  breakPaladinShield,
  doDamagesToPaladin,
  forwardDamages,
  setBuildingExtraTrap,
  skipPaladin,
} from '../paladins/actions'
import { getActivePaladin, getPaladinsAssaultOngoing } from '../paladins/selectors'
import { getIsInExpedition } from '../expeditions/selectors'
import { makeAllTalentsIncreaseEffect, makeLethalityIncreaseEffect } from './abilityEffects'
import { BuildingExtraTrap } from '../paladins/helpers'

export const raiseUndeadEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(raiseUndead)),
    mergeMap(({ payload: { undead } }) => {
      const catacombs = getCatacombs(state$.value)
      if (!catacombs) {
        return EMPTY
      }
      return of(spendResources({ [ResourceType.Souls]: catacombs.raiseUndeadSoulCost }), addUndead(undead), nextPhase())
    }),
  )

export const valetEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(endExpedition)),
    filter(() => getUndeads(state$.value).some(isValet)),
    map(() => upgradeValet()),
  )

const filterCastAbility = filter(isActionOf(castUndeadAbility))
const mapToAbility = map(({ payload: { ability } }: ActionType<typeof castUndeadAbility>) => ability)

export const castDevotionAbilityEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filterCastAbility,
    mergeMap(({ payload: { ability, undeadId } }) => {
      if (!isDevotion(ability)) {
        return EMPTY
      }
      if (getIsInExpedition(state$.value)) {
        return of(
          damageUndead(undeadId, ability.healthCost),
          applyAbilityEffect(undeadId, makeAllTalentsIncreaseEffect(ability.talentsBonus)),
        )
      }
      if (getPaladinsAssaultOngoing(state$.value)) {
        const activePaladin = getActivePaladin(state$.value)
        return of(
          damageUndead(undeadId, ability.healthCost),
          breakPaladinShield(activePaladin.id),
          doDamagesToPaladin(activePaladin.id, ability.damages, ability.targetCategories),
        )
      }
      return EMPTY
    }),
  )

export const castLaborAbilityEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filterCastAbility,
    mapToAbility,
    filter(isLabor),
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    map(() => setBuildingExtraTrap(BuildingExtraTrap.Normal)),
  )

export const castProtectionAbilityEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filterCastAbility,
    mapToAbility,
    filter(isProtection),
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    map(ability => skipPaladin(getActivePaladin(state$.value).id, ability.shieldValue)),
  )

export const castSeductionAbilityEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filterCastAbility,
    mergeMap(({ payload: { undeadId, ability } }) => {
      if (!isSeduction(ability)) {
        return EMPTY
      }
      if (getPaladinsAssaultOngoing(state$.value)) {
        const activePaladin = getActivePaladin(state$.value)
        return of(
          doDamagesToPaladin(activePaladin.id, activePaladin.health, activePaladin.categories),
          forwardDamages(activePaladin.damages, activePaladin.categories),
        )
      }
      if (getIsInExpedition(state$.value)) {
        return of(applyAbilityEffect(undeadId, makeAllTalentsIncreaseEffect(ability.talentBonus)))
      }
      return EMPTY
    }),
  )

export const castSectumSempraAbilityEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filterCastAbility,
    mergeMap(({ payload: { undeadId, ability } }) => {
      if (!isSectumSempra(ability)) {
        return EMPTY
      }
      if (getPaladinsAssaultOngoing(state$.value)) {
        const activePaladin = getActivePaladin(state$.value)
        return of(doDamagesToPaladin(activePaladin.id, ability.damages, ability.targetCategories))
      }
      if (getIsInExpedition(state$.value)) {
        return of(applyAbilityEffect(undeadId, makeLethalityIncreaseEffect(ability.lethalityBonus)))
      }
      return EMPTY
    }),
  )

export const blurAbilityEffectsEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([setExpeditionStep, endExpedition])),
    filter(() => getHasEffectToBlur(state$.value)),
    map(() => blurAbilityEffects()),
  )
