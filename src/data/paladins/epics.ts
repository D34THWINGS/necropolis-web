import { Epic } from 'redux-observable'
import { filter, map, mergeMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import {
  breakPaladinShield,
  changeAssaultPhase,
  damageActivePaladin,
  doDamagesToPaladin,
  reducePaladinDamages,
  setChangingPaladinCategories,
  useTrap,
} from './actions'
import { getActivePaladin, getTrapById, isAssaultFinished } from './selectors'
import { EXTRA_CHAKRAM_DAMAGE, PaladinsAssaultPhase, PUTRID_PITCH_MALUS, TrapType } from '../../config/constants'

export const displayAssaultResultsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(doDamagesToPaladin)),
    filter(() => isAssaultFinished(state$.value)),
    map(() => changeAssaultPhase(PaladinsAssaultPhase.Result)),
  )

export const trapsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(useTrap)),
    mergeMap(({ payload: { id } }) => {
      const activePaladin = getActivePaladin(state$.value)
      const trap = getTrapById(id)(state$.value)

      if (!trap || !activePaladin) {
        return EMPTY
      }

      switch (trap.type) {
        case TrapType.Impaler:
          return of(breakPaladinShield(activePaladin.id), doDamagesToPaladin(activePaladin.id, trap.damages))
        case TrapType.Chakrams:
          return of(doDamagesToPaladin(activePaladin.id, trap.damages), damageActivePaladin(EXTRA_CHAKRAM_DAMAGE))
        case TrapType.Profaner:
          return of(setChangingPaladinCategories())
        case TrapType.PutridPitch:
          return of(
            reducePaladinDamages(activePaladin.id, PUTRID_PITCH_MALUS),
            doDamagesToPaladin(activePaladin.id, trap.damages),
          )
        default:
          return EMPTY
      }
    }),
  )
