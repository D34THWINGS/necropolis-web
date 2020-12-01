import { Subject } from 'rxjs'
import { ActionsObservable, Epic, StateObservable } from 'redux-observable'
import { RootAction } from '../src/data/actions'
import { mainReducer, RootState } from '../src/store/mainReducer'
import { init } from '../src/data/settings/actions'

export const buildEpicObservables = (epic: Epic<RootAction, RootAction, RootState>) => {
  const actionsInput$ = new Subject<RootAction>()
  const stateInput$ = new Subject<RootState>()
  const action$ = new ActionsObservable(actionsInput$)
  const state$ = new StateObservable(stateInput$, mainReducer(undefined, init()))

  const actions: RootAction[] = []
  epic(action$, state$, {}).subscribe(value => actions.push(value))

  return { actionsInput$, action$, stateInput$, state$, actions }
}
