import React, { createContext, ReactNode, useCallback, useContext } from 'react'
import { EventEmitter } from 'events'
import { EventBusCallback } from '../store/createEventBusMiddleware'

type SubscribeFn = (callback: EventBusCallback) => () => void

const eventBusContext = createContext<SubscribeFn | null>(null)

export type EventBusProviderProps = {
  eventBus: EventEmitter
  children?: ReactNode
}

export const EventBusProvider = ({ eventBus, children }: EventBusProviderProps) => {
  const subscribe = useCallback(
    (callback: EventBusCallback) => {
      eventBus.addListener('action', callback)
      return () => eventBus.removeListener('action', callback)
    },
    [eventBus],
  )

  return <eventBusContext.Provider value={subscribe}>{children}</eventBusContext.Provider>
}

export const useEventBusSubscribe = () => {
  const subscribe = useContext(eventBusContext)
  if (!subscribe) {
    throw new Error('useEventBus must be used under EventBusProvider')
  }
  return subscribe
}
