import { isActionOf } from 'typesafe-actions'
import { EMPTY, of } from 'rxjs'
import { Epic } from 'redux-observable'
import { filter, flatMap, map, mapTo } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { endEvent } from '../events/actions'
import { setExpeditionStep } from '../expeditions/actions'
import { getDiscoverableSpells, getIsSoulStormActive } from './selectors'
import { addSpell, castSpell, disableSoulStorm, discoverSpell } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType, SPELLS_SOUL_COSTS } from '../../config/constants'
import { getOssuaryBonesCost } from '../buildings/helpers'
import { getOssuary } from '../buildings/selectors'

export const soulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, endEvent, setExpeditionStep])),
    filter(() => getIsSoulStormActive(state$.value)),
    mapTo(disableSoulStorm(false)),
  )

export const discoverSpellEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(discoverSpell)),
    flatMap(() => {
      const discoverableSpells = getDiscoverableSpells(state$.value)

      if (discoverableSpells.length === 0) {
        return EMPTY
      }

      const discoveredSpell = discoverableSpells[Math.round(Math.random() * (discoverableSpells.length - 1))]
      return of(
        spendResources({ [ResourceType.Bones]: getOssuaryBonesCost(getOssuary(state$.value).level) }),
        addSpell(discoveredSpell),
        nextPhase(),
      )
    }),
  )

export const castSpellEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(castSpell)),
    map(({ payload: { spell } }) => spendResources({ [ResourceType.Souls]: SPELLS_SOUL_COSTS[spell] })),
  )
