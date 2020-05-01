import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getSpells } from '../../data/spells/selectors'
import { Modal, useModalState } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { darkBlueSquareButton } from '../../styles/buttons'
import { Spell } from '../../config/constants'
import { SpellBox } from './SpellBox'
import { h2Title, smallMarginTop } from '../../styles/base'

export const DiscoverSpellModal = () => {
  const { t } = useTranslation()
  const { isOpen, open, close } = useModalState()
  const spells = useSelector(getSpells)
  const previousSpellsRef = useRef(spells)
  const newSpellRef = useRef<Spell | null>(null)

  useEffect(() => {
    const newSpell = spells.find(spell => !previousSpellsRef.current.includes(spell))
    if (newSpell !== undefined) {
      newSpellRef.current = newSpell
      open()
    }
    previousSpellsRef.current = spells
  }, [spells, open])

  return (
    <Modal color={ModalColor.BLUE} isOpen={isOpen}>
      <h2 css={h2Title}>{t('discoverSpellTitle')}</h2>
      {newSpellRef.current && <SpellBox spell={newSpellRef.current} />}
      <button type="button" css={[...darkBlueSquareButton, smallMarginTop]} onClick={close}>
        {t('discoverSpellOk')}
      </button>
    </Modal>
  )
}
