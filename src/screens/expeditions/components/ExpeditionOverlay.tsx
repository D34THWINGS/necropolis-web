import React from 'react'
import { ActionSheet } from '../../../components/ui/ActionSheet'
import { useModalState } from '../../../components/ui/Modal/Modal'
import { Frame, FrameColor } from '../../../components/ui/Frame'

export const ExpeditionOverlay = () => {
  const { isOpen, close } = useModalState()
  return (
    <ActionSheet isOpen={isOpen} onClose={close}>
      <Frame color={FrameColor.PURPLE} />
    </ActionSheet>
  )
}
