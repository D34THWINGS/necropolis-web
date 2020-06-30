/** @jsx jsx */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { jsx } from '@emotion/core'
import { Modal, useModalState } from './ui/Modal/Modal'
import { h2Title, smallMarginTop } from '../styles/base'
import { greenSquareButton } from '../styles/buttons'
import { gainResources } from '../data/resources/actions'
import { BuildingType, ResourceType, UndeadType } from '../config/constants'
import { freeUpgradeBuilding } from '../data/buildings/actions'
import { discoverSpell } from '../data/spells/actions'
import { raiseUndead } from '../data/undeads/actions'
import { createUndead } from '../data/undeads/helpers'
import { resetOnboarding } from '../data/onboarding/actions'
import { layers } from '../config/theme'

declare global {
  interface Window {
    cheats: () => void
  }
}

const cheatButton = [...greenSquareButton, smallMarginTop]

export const CheatsModal = () => {
  const { isOpen, open, close } = useModalState()
  const dispatch = useDispatch()

  useEffect(() => {
    window.cheats = open
  }, [])

  const handleAddResources = () => {
    dispatch(
      gainResources({
        [ResourceType.Materials]: 100,
        [ResourceType.Meat]: 100,
        [ResourceType.Bones]: 100,
        [ResourceType.Souls]: 100,
      }),
    )
    close()
  }

  const handleBasicSetup = () => {
    Object.values(BuildingType).forEach(type => dispatch(freeUpgradeBuilding(type)))
    dispatch(
      gainResources({
        [ResourceType.Bones]: 3,
        [ResourceType.Souls]: 2,
      }),
    )
    dispatch(discoverSpell())
    dispatch(raiseUndead(createUndead(UndeadType.BloodPrince)))
  }

  const handleResetOnboarding = () => {
    dispatch(resetOnboarding())
    close()
  }

  return (
    <Modal isOpen={isOpen} onClose={close} priority={layers.SETTINGS}>
      <h2 css={h2Title}>Cheats</h2>
      <button type="button" css={cheatButton} onClick={handleBasicSetup}>
        Basic setup
      </button>
      <button type="button" css={cheatButton} onClick={handleAddResources}>
        Add resources
      </button>
      <button type="button" css={cheatButton} onClick={handleResetOnboarding}>
        Reset onboarding
      </button>
    </Modal>
  )
}
