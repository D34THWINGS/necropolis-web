import { AnyAction, Middleware } from 'redux'

export type EventBusCallback = (action: AnyAction) => void

export const createEventBusMiddleware = (callback: EventBusCallback): Middleware => () => next => action => {
  callback(action)
  next(action)
}
