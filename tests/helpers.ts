import { Subject } from 'rxjs'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootAction } from '../src/data/actions'
import { mainReducer, RootState } from '../src/store/mainReducer'
import { init } from '../src/data/settings/actions'

export const buildEpicObservables = () => {
  const actionsInput$ = new Subject<RootAction>()
  const stateInput$ = new Subject<RootState>()
  const action$ = new ActionsObservable(actionsInput$)
  const state$ = new StateObservable(stateInput$, mainReducer(undefined, init()))
  return { actionsInput$, action$, stateInput$, state$ }
}
