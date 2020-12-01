import React from 'react'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Image } from '../images/Image'
import spellImageUrl from '../../assets/images/header/spells.png'
import { SpellsModal } from '../spells/SpellsModal'
import { buttonBase } from '../../styles/buttons'
import { layers } from '../../config/theme'
import { useModalState } from '../ui/Modal/Modal'
import { getCanCastSpells } from '../../data/spells/selectors'

const spellsButton = [buttonBase, css({ zIndex: layers.SPELLS_MODAL })]

export type SpellsButtonProps = {
  className?: string
  size?: string
}

export const SpellsButton = ({ className, size = '3.5rem' }: SpellsButtonProps) => {
  const { isOpen: isSpellsModalOpen, close: closeSpells, open: openSpells } = useModalState()
  const hasSpells = useSelector(getCanCastSpells)

  return (
    <>
      <button type="button" className={className} css={spellsButton} disabled={!hasSpells} onClick={openSpells}>
        <Image src={spellImageUrl} size={size} />
      </button>
      <SpellsModal isOpen={isSpellsModalOpen} onClose={closeSpells} />
    </>
  )
}
