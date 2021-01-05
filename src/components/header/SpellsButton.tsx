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
import { getLearntSpells } from '../../data/spells/selectors'
import { getIsInExpedition } from '../../data/expeditions/selectors'
import { OSSUARY } from '../../config/routes'
import { getPaladinsAssaultOngoing, getPaladinsAssaultPhase } from '../../data/paladins/selectors'
import { PaladinsAssaultPhase } from '../../config/constants'
import { canCastInAssaultFight, canCastInExpeditions, canCastInPaladinsReveal } from '../../data/spells/helpers'

const spellsButton = [buttonBase, css({ zIndex: layers.SPELLS_MODAL })]

export type SpellsButtonProps = {
  className?: string
  size?: string
}

export const SpellsButton = ({ className, size = '3.5rem' }: SpellsButtonProps) => {
  const { isOpen: isSpellsModalOpen, close: closeSpells, open: openSpells } = useModalState()
  const match = useRouteMatch(OSSUARY)
  const isPaladinsAssaultOngoing = useSelector(getPaladinsAssaultOngoing)
  const spells = useSelector(getLearntSpells)
  const assaultPhase = useSelector(getPaladinsAssaultPhase)
  const isInExpedition = useSelector(getIsInExpedition)

  const isOnOssuary = match && match.isExact
  const sortedSpells = spells
    .sort((a, b) => Number(a.used) - Number(b.used))
    .filter(spell => {
      if (assaultPhase === PaladinsAssaultPhase.Revealing && canCastInPaladinsReveal(spell)) {
        return true
      }
      if (assaultPhase === PaladinsAssaultPhase.Fighting && canCastInAssaultFight(spell)) {
        return true
      }
      if (isInExpedition && canCastInExpeditions(spell)) {
        return true
      }
      return isOnOssuary
    })

  if (sortedSpells.length === 0) {
    return null
  }

  if (!isOnOssuary && !isInExpedition && !isPaladinsAssaultOngoing) {
    return null
  }

  return (
    <>
      <button type="button" className={className} css={spellsButton} onClick={openSpells} data-test-id="spellsButton">
        <Image src={spellImageUrl} size={size} />
      </button>
      <SpellsModal spells={sortedSpells} isOpen={isSpellsModalOpen} onClose={closeSpells} />
    </>
  )
}
