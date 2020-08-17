/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title } from '../../styles/base'
import { getSpells } from '../../data/spells/selectors'
import { blueSquareButton } from '../../styles/buttons'
import { ResourceIcon } from '../resources/ResourceIcon'
import { CASTABLE_SPELLS, ResourceType, Spell, SPELLS_SOUL_COSTS } from '../../config/constants'
import { castSpell } from '../../data/spells/actions'
import { SpellBox } from './SpellBox'
import { getSouls } from '../../data/resources/selectors'
import { layers } from '../../config/theme'

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
  const spells = useSelector(getSpells)
  const dispatch = useDispatch()

  const handleCastSpell = (spell: Spell) => () => {
    dispatch(castSpell(spell))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={layers.SPELLS_MODAL}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => (
        <SpellBox key={spell} spell={spell}>
          {CASTABLE_SPELLS.includes(spell) && (
            <button
              type="button"
              css={spellCastButton}
              disabled={souls < SPELLS_SOUL_COSTS[spell]}
              onClick={handleCastSpell(spell)}
            >
              <ResourceIcon type={ResourceType.Souls} marginRight="0.3rem" />
              {SPELLS_SOUL_COSTS[spell]}
            </button>
          )}
        </SpellBox>
      ))}
    </Modal>
  )
}
