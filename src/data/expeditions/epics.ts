import { isActionOf } from 'typesafe-actions'
import { Epic } from 'redux-observable'
import { of } from 'rxjs'
import { filter, mapTo, mergeMapTo } from 'rxjs/operators'
import { RootAction } from '../actions'
import { RootState } from '../../store/mainReducer'
import { endExpedition, fleeExpedition } from './actions'
import { nextPhase } from '../turn/actions'
import { increasePaladinsCounter } from '../paladins/actions'

export const endExpeditionEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(endExpedition)), mapTo(nextPhase()))

export const fleeExpeditionEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(filter(isActionOf(fleeExpedition)), mergeMapTo(of(increasePaladinsCounter(), nextPhase())))
