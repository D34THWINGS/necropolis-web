import React from 'react'
import { css } from '@emotion/react'
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
import { canCast, Spell } from '../../data/spells/helpers'
import { getLearntSpells } from '../../data/spells/selectors'
import { useGetSpellDetails } from './useGetSpellDetails'

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
  const souls = useSelector(getSouls)
  const spells = useSelector(getLearntSpells)
  const dispatch = useDispatch()
  const getSpellDetails = useGetSpellDetails()

  const handleCastSpell = (spell: Spell) => () => {
    dispatch(castSpell(spell))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={layers.SPELLS_MODAL}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => {
        const spellDetails = getSpellDetails(spell)
        return (
          <SpellBox
            key={spell.key}
            imageUrl={spellDetails.imageUrl}
            label={spellDetails.label}
            description={spellDetails.description}
          >
            {spell.canBeCasted && (
              <button
                type="button"
                css={spellCastButton}
                disabled={!canCast(spell, souls)}
                onClick={handleCastSpell(spell)}
                data-test-id="castSpellButton"
              >
                <ResourceIcon type={ResourceType.Souls} marginRight="0.3rem" />
                {spell.cost}
              </button>
            )}
          </SpellBox>
        )
      })}
    </Modal>
  )
}
