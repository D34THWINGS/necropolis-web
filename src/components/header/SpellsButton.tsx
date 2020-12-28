import React from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Image } from '../images/Image'
import spellImageUrl from '../../assets/images/header/spells.png'
import { SpellsModal } from '../spells/SpellsModal'
import { buttonBase } from '../../styles/buttons'
import { layers } from '../../config/theme'
import { useModalState } from '../ui/Modal/Modal'
import { getCanCastSpells } from '../../data/spells/selectors'
import { getIsInExpedition } from '../../data/expeditions/selectors'
import { OSSUARY } from '../../config/routes'
import { getPaladinsAssaultOngoing } from '../../data/paladins/selectors'

const spellsButton = [buttonBase, css({ zIndex: layers.SPELLS_MODAL })]

export type SpellsButtonProps = {
  className?: string
  size?: string
}

export const SpellsButton = ({ className, size = '3.5rem' }: SpellsButtonProps) => {
  const { isOpen: isSpellsModalOpen, close: closeSpells, open: openSpells } = useModalState()
  const match = useRouteMatch(OSSUARY)
  const hasSpells = useSelector(getCanCastSpells)
  const isInExpedition = useSelector(getIsInExpedition)
  const isPaladinsAssaultOngoing = useSelector(getPaladinsAssaultOngoing)

  const isOnOssuary = match && match.isExact
  if (!isOnOssuary && !isInExpedition && !isPaladinsAssaultOngoing) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className={className}
        css={spellsButton}
        disabled={!hasSpells}
        onClick={openSpells}
        data-test-id="spellsButton"
      >
        <Image src={spellImageUrl} size={size} />
      </button>
      <SpellsModal isOpen={isSpellsModalOpen} onClose={closeSpells} />
    </>
  )
}
