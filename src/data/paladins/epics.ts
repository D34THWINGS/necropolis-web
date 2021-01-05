import { EMPTY, of } from 'rxjs'
import { concatMap, delay, filter, map, mergeMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from '../actions'
import {
  breakPaladinShield,
  changeAssaultPhase,
  changePaladinCategories,
  doDamagesToPaladin,
  increasePaladinHealth,
  changePaladinsDamages,
  setChangingPaladinCategories,
  triggerPaladinBattleCry,
  triggerTrap,
  shieldPaladin,
  skipPaladin,
  triggerPaladinAttack,
  increasePaladinsCounter,
  forwardDamages,
} from './actions'
import {
  getPaladinById,
  getPaladinsAssaultPhase,
  getPaladinsCalledToArms,
  getRemainingPaladins,
  isAssaultFinished,
} from './selectors'
import {
  PaladinCategory,
  PaladinsAssaultPhase,
  PaladinType,
  TrapType,
  EXTRA_CHAKRAM_DAMAGE,
  HEALER_BONUS_HP,
  PUTRID_PITCH_EXTRA_DAMAGE,
  WIZARD_BONUS_DAMAGES,
  WIZARD_TARGETS_COUNT,
  TurnPhase,
} from '../../config/constants'
import { getAnimationDelay, NecropolisEpic, shuffleArray } from '../helpers'
import { nextPhase } from '../turn/actions'
import { getCurrentPhase } from '../turn/selectors'
import { canTargetPaladin, isPaladinConsecrated } from './helpers'

export const displayAssaultResultsEpic: NecropolisEpic = (action$, state$) =>
  state$.pipe(
    filter(state => getPaladinsAssaultPhase(state) === PaladinsAssaultPhase.Fighting && isAssaultFinished(state)),
    delay(getAnimationDelay()),
    map(() => changeAssaultPhase(PaladinsAssaultPhase.Result)),
  )

export const trapsEpic = (instantTrigger = false): NecropolisEpic => (action$, state$) =>
  action$.pipe(
    filter(isActionOf(triggerTrap)),
    mergeMap(({ payload: { trap, paladinId } }) => {
      const actions: RootAction[] = []

      switch (trap.type) {
        case TrapType.Impaler:
          actions.push(
            breakPaladinShield(paladinId),
            doDamagesToPaladin(paladinId, trap.damages, trap.targetsCategories),
          )
          break
        case TrapType.Chakrams: {
          actions.push(
            doDamagesToPaladin(paladinId, trap.damages, trap.targetsCategories),
            forwardDamages(EXTRA_CHAKRAM_DAMAGE, Object.values(PaladinCategory)),
          )
          break
        }
        case TrapType.Profaner:
          actions.push(setChangingPaladinCategories())
          break
        case TrapType.PutridPitch: {
          const paladin = getPaladinById(paladinId)(state$.value)
          actions.push(
            doDamagesToPaladin(
              paladinId,
              trap.damages + (paladin?.buffed ? PUTRID_PITCH_EXTRA_DAMAGE : 0),
              trap.targetsCategories,
            ),
          )
          break
        }
        default:
          break
      }

      if (instantTrigger) {
        return of(...actions)
      }

      return of(...actions).pipe(
        concatMap((action, index) => (index === 0 ? of(action) : of(action).pipe(delay(getAnimationDelay())))),
      )
    }),
  )

export const paladinBattleCryEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(triggerPaladinBattleCry)),
    mergeMap(({ payload: { paladinId } }) => {
      const activePaladin = getPaladinById(paladinId)(state$.value)
      if (!activePaladin) {
        return EMPTY
      }

      const actions: RootAction[] = []
      const remainingPaladins = shuffleArray(
        getRemainingPaladins(state$.value).filter(paladin => paladin.id !== activePaladin.id),
      )
      switch (activePaladin.type) {
        case PaladinType.Healer: {
          const targetPaladin = remainingPaladins[0]
          if (targetPaladin) {
            actions.push(increasePaladinHealth(targetPaladin.id, HEALER_BONUS_HP))
          }
          break
        }
        case PaladinType.Wizard:
          actions.push(
            changePaladinsDamages(
              remainingPaladins.slice(0, WIZARD_TARGETS_COUNT).map(paladin => paladin.id),
              WIZARD_BONUS_DAMAGES,
            ),
          )
          break
        case PaladinType.Guardian: {
          const remainingPaladinsWithoutShield = remainingPaladins.filter(paladin => !paladin.shield)
          const targetPaladin = remainingPaladinsWithoutShield[0]
          if (targetPaladin) {
            actions.push(shieldPaladin(targetPaladin.id))
          }
          break
        }
        case PaladinType.Provost: {
          const targetPaladin = remainingPaladins[0]
          if (targetPaladin) {
            actions.push(changePaladinCategories(targetPaladin.id, targetPaladin.categories.fill(PaladinCategory.Pure)))
          }
          break
        }
        default:
          break
      }

      return of(...actions)
    }),
  )

export const paladinDeathRattleEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doDamagesToPaladin)),
    mergeMap(({ payload: { paladinId } }) => {
      const paladin = getPaladinById(paladinId)(state$.value)
      if (!paladin || paladin.health > 0) {
        return EMPTY
      }

      switch (paladin.type) {
        case PaladinType.Avenger:
          return of(triggerPaladinAttack(paladinId))
        default:
          return EMPTY
      }
    }),
  )

export const paladinSkipEpic: NecropolisEpic = action$ =>
  action$.pipe(
    filter(isActionOf(skipPaladin)),
    map(({ payload: { paladinId, damageReduction } }) => triggerPaladinAttack(paladinId, damageReduction)),
  )

export const paladinIncreaseCounterEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(() => getCurrentPhase(state$.value) === TurnPhase.Production && getPaladinsCalledToArms(state$.value)),
    map(() => increasePaladinsCounter()),
  )

export const forwardDamagesEpic: NecropolisEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([forwardDamages])),
    mergeMap(({ payload: { damages, targetCategories } }) => {
      const activePaladin = getRemainingPaladins(state$.value)[0]
      if (
        !activePaladin ||
        (!canTargetPaladin(activePaladin, targetCategories) && !isPaladinConsecrated(activePaladin))
      ) {
        return EMPTY
      }
      const doneDamages = Math.min(activePaladin.health, damages)
      const leftDamages = damages - doneDamages
      const actions: RootAction[] = [doDamagesToPaladin(activePaladin.id, doneDamages, targetCategories)]
      if (leftDamages > 0) {
        actions.push(forwardDamages(leftDamages, targetCategories))
      }
      return of(...actions).pipe(delay(getAnimationDelay()))
    }),
  )
