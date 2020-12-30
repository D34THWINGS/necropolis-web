import { Epic } from 'redux-observable'
import { EMPTY, merge, of } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { ActionType, isActionOf } from 'typesafe-actions'
import { ResourceType } from '../../config/constants'
import { RootState } from '../../store/mainReducer'
import { RootAction } from '../actions'
import { getIsInExpedition } from '../expeditions/selectors'
import {
  breakPaladinShield,
  damageActivePaladin,
  doDamagesToPaladin,
  markPaladinsRevealed,
  repairStructure,
} from '../paladins/actions'
import { getPaladinsAssaultOngoing, getRemainingPaladins, getUnrevealedPaladins } from '../paladins/selectors'
import { spendResources } from '../resources/actions'
import { healUndead } from '../undeads/actions'
import { getMostInjuredUndead } from '../undeads/selectors'
import { applyEffects, blurEffects, castSpell } from './actions'
import { isPrediction, isRestoration, isSoulStorm, isTheKey } from './helpers'
import { fleeExpedition, setExpeditionStep } from '../expeditions/actions'
import { getEffectsBlurringOnStepChange } from './effects'
import { getActiveSpellEffects, getLearntSpells } from './selectors'
import { changeSecrets } from '../buildings/actions'
import { makeSecretsBatch } from '../buildings/secrets'
import { getOssuary } from '../buildings/selectors'

export const castSpellEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(castSpell)),
    map(({ payload: { spell } }) => spendResources({ [ResourceType.Souls]: spell.cost })),
  )

const mapToSpell = map(({ payload: { spell } }: ActionType<typeof castSpell>) => spell)

export const castSoulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const cast$ = action$.pipe(filter(isActionOf(castSpell)), mapToSpell, filter(isSoulStorm))

  const castDuringExpedition$ = cast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    map(soulStorm => applyEffects(soulStorm.effects)),
  )

  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    mergeMap(soulStorm => {
      const remainingPaladins = getRemainingPaladins(state$.value)
      if (remainingPaladins.length === 0) {
        return EMPTY
      }
      const { actions: finalActions } = remainingPaladins.reduce(
        ({ leftDamages, actions }, paladinCard) => {
          if (leftDamages === 0) {
            return { leftDamages, actions }
          }
          const appliedDamages = Math.min(leftDamages, paladinCard.health)
          return {
            leftDamages: leftDamages - appliedDamages,
            actions: [...actions, damageActivePaladin(appliedDamages, soulStorm.targetCategories)],
          }
        },
        {
          leftDamages: soulStorm.damages,
          actions: new Array<RootAction>(),
        },
      )
      return of(...finalActions)
    }),
  )

  return merge(castDuringExpedition$, castDuringAssault$)
}

export const castRestorationEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const cast$ = action$.pipe(filter(isActionOf(castSpell)), mapToSpell, filter(isRestoration))

  const castDuringExpedition$ = cast$.pipe(
    filter(() => getIsInExpedition(state$.value)),
    mergeMap(restoration => {
      const mostInjuredUndead = getMostInjuredUndead(state$.value)
      if (mostInjuredUndead) {
        return of(healUndead(mostInjuredUndead.id, restoration.healthRestored))
      }
      return EMPTY
    }),
  )

  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    map(restoration => repairStructure(restoration.structureRepairAmount)),
  )

  return merge(castDuringExpedition$, castDuringAssault$)
}

export const castTheKeyEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(castSpell)),
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    mapToSpell,
    filter(isTheKey),
    mergeMap(theKey => {
      const remainingPaladins = getRemainingPaladins(state$.value)
      const firstRemainingPaladin = remainingPaladins[0]
      if (!firstRemainingPaladin) {
        return EMPTY
      }
      return of(
        breakPaladinShield(firstRemainingPaladin.id),
        doDamagesToPaladin(firstRemainingPaladin.id, theKey.damages, theKey.targetCategories),
      )
    }),
  )

export const castPredictionEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const cast$ = action$.pipe(filter(isActionOf(castSpell)), mapToSpell, filter(isPrediction))
  const castDuringAssault$ = cast$.pipe(
    filter(() => getPaladinsAssaultOngoing(state$.value)),
    mergeMap(prediction => {
      const unrevealedPaladins = getUnrevealedPaladins(state$.value)
      if (unrevealedPaladins.length === 0) {
        return EMPTY
      }
      const paladinIdsToReveal = unrevealedPaladins.slice(0, prediction.revealBonus).map(paladin => paladin.id)
      return of(markPaladinsRevealed(paladinIdsToReveal))
    }),
  )
  const castOutsideAssault$ = cast$.pipe(
    filter(() => !getPaladinsAssaultOngoing(state$.value)),
    mergeMap(() => {
      const ossuary = getOssuary(state$.value)
      if (!ossuary) {
        return EMPTY
      }
      return of(changeSecrets(makeSecretsBatch(ossuary.secretsAmount, getLearntSpells(state$.value))))
    }),
  )
  return merge(castOutsideAssault$, castDuringAssault$)
}

export const blurEffectsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
  const blurOnExpeditionStep$ = action$.pipe(
    filter(isActionOf([setExpeditionStep, fleeExpedition])),
    map(() => getEffectsBlurringOnStepChange(getActiveSpellEffects(state$.value))),
  )

  return merge(blurOnExpeditionStep$).pipe(
    filter(effects => effects.length > 0),
    map(blurEffects),
  )
}
