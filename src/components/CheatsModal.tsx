/** @jsx jsx */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { css, jsx } from '@emotion/core'
import { Modal, useModalState } from './ui/Modal'
import { h2Title } from '../styles/base'
import { greenSquareButton } from '../styles/buttons'
import { gainResources } from '../data/resources/actions'
import { ResourceType } from '../config/constants'

declare global {
  interface Window {
    cheats: () => void
  }
}

const cheatButton = [...greenSquareButton, css({ marginTop: '0.4rem' })]

export const CheatsModal = () => {
  const { isOpen, open, close } = useModalState()
  const dispatch = useDispatch()

  useEffect(() => {
    window.cheats = open
  }, [])

  const handleAddResources = () =>
    dispatch(
      gainResources({
        [ResourceType.Materials]: 100,
        [ResourceType.Meat]: 100,
        [ResourceType.Bones]: 100,
        [ResourceType.Souls]: 100,
      }),
    )

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <h2 css={h2Title}>Cheats</h2>
      <button type="button" css={cheatButton} onClick={handleAddResources}>
        Add resources
      </button>
    </Modal>
  )
}
