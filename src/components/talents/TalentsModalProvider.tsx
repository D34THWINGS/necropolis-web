import React, { ReactNode, useMemo } from 'react'
import { talentsModalControlsContext } from './useTalentsModalControls'
import { useModalState } from '../ui/Modal'
import { TalentsModal } from './TalentsModal'

export type TalentsModalProviderProps = {
  children?: ReactNode
}

export const TalentsModalProvider = ({ children }: TalentsModalProviderProps) => {
  const { isOpen, open, close } = useModalState(false)

  const contextValue = useMemo(
    () => ({
      open,
    }),
    [open],
  )

  return (
    <talentsModalControlsContext.Provider value={contextValue}>
      {children}
      <TalentsModal isOpen={isOpen} onClose={close} />
    </talentsModalControlsContext.Provider>
  )
}
