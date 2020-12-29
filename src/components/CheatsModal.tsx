import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { css } from '@emotion/react'
import { Modal, useModalState } from './ui/Modal/Modal'
import { h2Title, smallMarginTop } from '../styles/base'
import { greenSquareButton } from '../styles/buttons'
import { gainResources } from '../data/resources/actions'
import { ResourceType, UndeadType } from '../config/constants'
import { freeUpgradeBuilding } from '../data/buildings/actions'
import { addUndead } from '../data/undeads/actions'
import { createUndead } from '../data/undeads/helpers'
import { resetOnboarding } from '../data/onboarding/actions'
import { loadGameState, resetGame } from '../data/settings/actions'
import { layers } from '../config/theme'
import { persistConfig } from '../store/persistConfig'
import { PersistedRootState } from '../store/migrations'
import { getBuildings } from '../data/buildings/selectors'

declare global {
  interface Window {
    cheats: () => void
    injectState: (state: unknown) => void
    addResources: () => void
  }
}

const cheatButton = [...greenSquareButton, smallMarginTop]

const cheatsSeparator = css({
  border: 'solid 1px transparent',
  borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  margin: '1rem 0',
})

const hidden = css({
  display: 'none',
})

export const CheatsModal = () => {
  const { isOpen, open, close } = useModalState()
  const dispatch = useDispatch()
  const store = useStore()
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    window.cheats = open
    window.injectState = async state => {
      const migratedState = await persistConfig.migrate(state as PersistedRootState, persistConfig.version)
      if (migratedState) {
        const { _persist, ...gameState } = migratedState
        dispatch(loadGameState(gameState))
      }
    }
  }, [dispatch, open])

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
    const state = store.getState()
    const buildings = getBuildings(state)
    buildings.forEach(building => dispatch(freeUpgradeBuilding(building)))
    dispatch(
      gainResources({
        [ResourceType.Bones]: 3,
        [ResourceType.Souls]: 2,
      }),
    )
    dispatch(addUndead(createUndead(UndeadType.BloodPrince)))
  }

  const handleResetOnboarding = () => {
    dispatch(resetOnboarding())
    dispatch(resetGame())
    close()
  }

  const handleExportGame = () => {
    if (!linkRef.current) {
      return
    }
    const state = store.getState()
    const stringState = window.btoa(JSON.stringify(state))
    linkRef.current.setAttribute('href', `data:application/json;base64,${stringState}`)
    linkRef.current.click()
  }

  const handleImportGame = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = ({ target }) => {
      if (!target || !target.result) {
        return
      }
      const gameState = JSON.parse(target.result.toString())
      dispatch(loadGameState(gameState))
      close()
    }
    reader.readAsText(file)
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
      <hr css={cheatsSeparator} />
      <a ref={linkRef} css={hidden} href="#download" download="game_save.json">
        Download save file
      </a>
      <button type="button" css={cheatButton} onClick={handleExportGame}>
        Export game
      </button>
      <label htmlFor="game-save-upload" css={cheatButton}>
        Import game
        <input id="game-save-upload" type="file" accept="application/json" css={hidden} onChange={handleImportGame} />
      </label>
    </Modal>
  )
}
