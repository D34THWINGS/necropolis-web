import React from 'react'
import { css } from '@emotion/react'
import { Image } from '../images/Image'
import settingsImageUrl from '../../assets/images/header/settings.png'
import { SettingsModal } from './SettingsModal'
import { buttonBase } from '../../styles/buttons'
import { layers } from '../../config/theme'
import { useModalState } from '../ui/Modal/Modal'

const settingsButton = [buttonBase, css({ zIndex: layers.SETTINGS })]

export type SettingsButtonProps = {
  className?: string
  size?: string
}

export const SettingsButton = ({ className, size = '3.5rem' }: SettingsButtonProps) => {
  const { isOpen: isSettingsModalOpen, close: closeSettings, open: openSettings } = useModalState()

  return (
    <>
      <button type="button" className={className} css={settingsButton} onClick={openSettings}>
        <Image src={settingsImageUrl} size={size} />
      </button>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />
    </>
  )
}
