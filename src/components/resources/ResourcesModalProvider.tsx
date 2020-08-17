import React, { ReactNode, useMemo } from 'react'
import { resourcesModalControlsContext } from './useResourcesModalControls'
import { useModalState } from '../ui/Modal/Modal'
import { ResourcesModal } from './ResourcesModal'

export type TalentsModalProviderProps = {
  children?: ReactNode
}

export const ResourcesModalProvider = ({ children }: TalentsModalProviderProps) => {
  const { isOpen, open, close } = useModalState(false)

  const contextValue = useMemo(
    () => ({
      open,
    }),
    [open],
  )

  return (
    <resourcesModalControlsContext.Provider value={contextValue}>
      {children}
      <ResourcesModal isOpen={isOpen} onClose={close} />
    </resourcesModalControlsContext.Provider>
  )
}
