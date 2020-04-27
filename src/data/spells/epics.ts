import { isActionOf } from 'typesafe-actions'
import { of } from 'rxjs'
import { Epic } from 'redux-observable'
import { filter, flatMap, mapTo } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { setEventStep } from '../events/actions'
import { setExpeditionStep } from '../expeditions/actions'
import { getDiscoverableSpells, getIsSoulStormActive } from './selectors'
import { addSpell, disableSoulStorm, discoverSpell } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'
import { getOssuaryBonesCost } from '../buildings/helpers'
import { getOssuary } from '../buildings/selectors'

export const soulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, setEventStep, setExpeditionStep])),
    filter(() => getIsSoulStormActive(state$.value)),
    mapTo(disableSoulStorm(false)),
  )

export const discoverSpellEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
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
