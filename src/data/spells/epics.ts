import { isActionOf } from 'typesafe-actions'
import { Epic } from 'redux-observable'
import { filter, map, mapTo } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { nextPhase } from '../turn/actions'
import { endEvent } from '../events/actions'
import { setExpeditionStep } from '../expeditions/actions'
import { getIsSoulStormActive } from './selectors'
import { castSpell, disableSoulStorm } from './actions'
import { spendResources } from '../resources/actions'
import { ResourceType } from '../../config/constants'

export const soulStormEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([nextPhase, endEvent, setExpeditionStep])),
    filter(() => getIsSoulStormActive(state$.value)),
    mapTo(disableSoulStorm(false)),
  )

export const castSpellEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(castSpell)),
    map(({ payload: { spell } }) => spendResources({ [ResourceType.Souls]: spell.cost })),
  )
