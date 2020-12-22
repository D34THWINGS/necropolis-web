import { Epic } from 'redux-observable'
import { EMPTY, of } from 'rxjs'
import { concatMap, delay, filter, map, mergeMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import {
  breakPaladinShield,
  changeAssaultPhase,
  changePaladinCategories,
  damageActivePaladin,
  doDamagesToPaladin,
  increasePaladinHealth,
  changePaladinsDamages,
  setChangingPaladinCategories,
  triggerPaladinBattleCry,
  triggerTrap,
  shieldPaladin,
  skipPaladin,
  triggerPaladinAttack,
  swapPaladinPostions,
  increasePaladinsStrength,
} from './actions'
import {
  getPaladinById,
  getPaladinsAssaultPhase,
  getPaladinsCalledToArms,
  getPaladinsDeck,
  getRemainingPaladins,
  getShouldIncreasePaladinsStrength,
  getTrapById,
  isAssaultFinished,
} from './selectors'
import {
  PaladinCategory,
  PaladinsAssaultPhase,
  PaladinType,
  TrapType,
  EXTRA_CHAKRAM_DAMAGE,
  HEALER_BONUS_HP,
  PUTRID_PITCH_MALUS,
  WIZARD_BONUS_DAMAGES,
  WIZARD_TARGETS_COUNT,
  DELAY_BETWEEN_TRAP_EFFECTS,
  TurnPhase,
} from '../../config/constants'
import { shuffleArray } from '../helpers'
import { random } from '../seeder'
import { nextPhase } from '../turn/actions'
import { getCurrentPhase } from '../turn/selectors'

export const displayAssaultResultsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  state$.pipe(
    filter(state => getPaladinsAssaultPhase(state) === PaladinsAssaultPhase.Fighting && isAssaultFinished(state)),
    map(() => changeAssaultPhase(PaladinsAssaultPhase.Result)),
  )

export const trapsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(triggerTrap)),
    mergeMap(({ payload: { trapId, paladinId } }) => {
      let activePaladin = getPaladinById(paladinId)(state$.value)
      const trap = getTrapById(trapId)(state$.value)

      if (!trap || !activePaladin) {
        return EMPTY
      }

      const actions: RootAction[] = []

      if (activePaladin.type === PaladinType.Commander) {
        const deck = getPaladinsDeck(state$.value)
        const commanderIndex = deck.indexOf(activePaladin)
        if (commanderIndex === 0) {
          const remainingPaladins = getPaladinsDeck(state$.value).slice(commanderIndex + 1)
          const swappedPaladin = shuffleArray(remainingPaladins)[0]
          if (swappedPaladin) {
            actions.push(swapPaladinPostions(activePaladin.id, swappedPaladin.id))
            activePaladin = swappedPaladin
          }
        }
      }

      switch (trap.type) {
        case TrapType.Impaler:
          if (activePaladin.shield) {
            actions.push(breakPaladinShield(activePaladin.id))
          }
          actions.push(doDamagesToPaladin(activePaladin.id, trap.damages, trap.targetsCategories))
          break
        case TrapType.Chakrams:
          actions.push(
            doDamagesToPaladin(activePaladin.id, trap.damages, trap.targetsCategories),
            damageActivePaladin(EXTRA_CHAKRAM_DAMAGE, Object.values(PaladinCategory)),
          )
          break
        case TrapType.Profaner:
          actions.push(setChangingPaladinCategories())
          break
        case TrapType.PutridPitch:
          actions.push(
            changePaladinsDamages([activePaladin.id], PUTRID_PITCH_MALUS),
            doDamagesToPaladin(activePaladin.id, trap.damages, trap.targetsCategories),
          )
          break
        default:
          break
      }

      return of(...actions).pipe(
        concatMap((action, index) => (index === 0 ? of(action) : of(action).pipe(delay(DELAY_BETWEEN_TRAP_EFFECTS)))),
      )
    }),
  )

export const paladinBattleCryEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(triggerPaladinBattleCry)),
    mergeMap(({ payload: { paladinId } }) => {
      const activePaladin = getPaladinById(paladinId)(state$.value)
      if (!activePaladin) {
        return EMPTY
      }

      const actions: RootAction[] = []

      const hasPureCategory = activePaladin.categories.indexOf(PaladinCategory.Pure) >= 0
      if (hasPureCategory) {
        const updatedCategories = activePaladin.categories.reduce<PaladinCategory[]>((acc, existingCategory) => {
          if (existingCategory === PaladinCategory.Pure) {
            const possibleCategories = Object.values(PaladinCategory).filter(
              category => category !== PaladinCategory.Pure && acc.indexOf(category) === -1,
            )
            return [
              ...acc,
              possibleCategories[Math.floor(random() * possibleCategories.length)] ?? PaladinCategory.Physical,
            ]
          }
          return [...acc, existingCategory]
        }, [])
        actions.push(changePaladinCategories(activePaladin.id, updatedCategories))
      }

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

export const paladinDeathRattleEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
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

export const paladinSkipEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(skipPaladin)),
    map(({ payload: { paladinId } }) => triggerPaladinAttack(paladinId)),
  )

export const paladinIncreaseStrengthEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(nextPhase)),
    filter(
      () =>
        getCurrentPhase(state$.value) === TurnPhase.Event &&
        getPaladinsCalledToArms(state$.value) &&
        getShouldIncreasePaladinsStrength(state$.value),
    ),
    map(() => increasePaladinsStrength()),
  )
