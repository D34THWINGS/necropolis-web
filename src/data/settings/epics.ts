import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { filter, mergeMap, tap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { gainResources } from '../resources/actions'
import { INITIAL_MATERIALS, INITIAL_MEAT, ResourceType } from '../../config/constants'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { resetGame } from './actions'
import { MAIN_HUB } from '../../config/routes'
import { getIsOnboardingActive } from '../onboarding/selectors'
import { skipOnboarding } from '../onboarding/actions'

export const resetGameEpic: Epic<RootAction, RootAction, RootState, Dependencies> = (action$, state$, { history }) =>
  action$.pipe(
    filter(isActionOf(resetGame)),
    tap(() => history.push(MAIN_HUB)),
    mergeMap(() => {
      const actions: RootAction[] = [
        gainResources({ [ResourceType.Meat]: INITIAL_MEAT, [ResourceType.Materials]: INITIAL_MATERIALS }),
      ]

      if (getIsOnboardingActive(state$.value)) {
        actions.push(skipOnboarding())
      }

      return of(...actions)
    }),
  )
