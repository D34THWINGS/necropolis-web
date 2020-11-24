import React from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title } from '../../styles/base'
import { blueSquareButton } from '../../styles/buttons'
import { ResourceIcon } from '../resources/ResourceIcon'
import { ResourceType } from '../../config/constants'
import { castSpell } from '../../data/spells/actions'
import { SpellBox } from './SpellBox'
import { getSouls } from '../../data/resources/selectors'
import { layers } from '../../config/theme'
import { SpellView } from '../../config/constants/spellConstants'
import { useSpells } from '../../hooks/useSpells'

const spellCastButton = [
  ...blueSquareButton,
  css({
    width: 'auto',
  }),
]

export type SpellsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SpellsModal = ({ isOpen, onClose }: SpellsModalProps) => {
  const { t } = useTranslation()
  const spells = useSpells()
  const souls = useSelector(getSouls)
  const dispatch = useDispatch()

  const handleCastSpell = (spell: SpellView) => () => {
    dispatch(castSpell(spell))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={layers.SPELLS_MODAL}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {Object.values(spells).map(spell => (
        <SpellBox key={spell.key} spell={spell}>
          {spell.canBeCasted && (
            <button type="button" css={spellCastButton} disabled={souls < spell.cost} onClick={handleCastSpell(spell)}>
              <ResourceIcon type={ResourceType.Souls} marginRight="0.3rem" />
              {spell.cost}
            </button>
          )}
        </SpellBox>
      ))}
    </Modal>
  )
}
