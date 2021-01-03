import { useEffect } from 'react'
import { AnyAction } from 'redux'
import { useEventBusSubscribe } from '../containers/EventBusProvider'

export const useReduxEventHook = <T extends AnyAction>(
  filter: (action: AnyAction) => action is T,
  callback: (action: T) => void,
) => {
  const subscribe = useEventBusSubscribe()

  useEffect(
    () =>
      subscribe(action => {
        if (filter(action)) {
          callback(action)
        }
      }),
    [filter, callback, subscribe],
  )
}
