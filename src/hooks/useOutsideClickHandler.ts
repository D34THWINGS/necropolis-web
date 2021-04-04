import { useEffect, useRef } from 'react'

export const useOutsideClickHandler = <T extends HTMLElement>(callback: (e: Event) => void) => {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const listenForOutsideClick = (e: Event) => {
      if (
        containerRef.current &&
        e.target &&
        (e.target instanceof Window ||
          (containerRef.current !== e.target && !containerRef.current.contains(e.target as Node)))
      ) {
        callback(e)
      }
    }

    window.addEventListener('mousedown', listenForOutsideClick)
    return () => {
      window.removeEventListener('mousedown', listenForOutsideClick)
    }
  }, [callback])

  return containerRef
}
