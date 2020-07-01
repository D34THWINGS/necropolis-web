import { Epic } from 'redux-observable'
import { filter, mapTo, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { gainResources } from '../resources/actions'
import { INITIAL_MATERIALS, INITIAL_MEAT, ResourceType } from '../../config/constants'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { resetGame } from './actions'
import { getIsOnboardingActive } from '../onboarding/selectors'
import { MAIN_HUB } from '../../config/routes'

export const resetGameEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, state$, { history }) =>
  action$.pipe(
    filter(isActionOf(resetGame)),
    tap(() => history.push(MAIN_HUB)),
    filter(() => !getIsOnboardingActive(state$.value)),
    mapTo(gainResources({ [ResourceType.Meat]: INITIAL_MEAT, [ResourceType.Materials]: INITIAL_MATERIALS })),
  )
