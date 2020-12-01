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
import { canCast, prediction, restoration, soulStorm, SpellView, theKey } from '../../data/spells/helpers'
import soulStormBackgroundUrl from '../../assets/images/spells/soul-storm.jpg'
import theKeyBackgroundUrl from '../../assets/images/spells/the-key.jpg'

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
  const dispatch = useDispatch()

  const spells = [
    { ...theKey, label: t('theKeyLabel'), description: t('theKeyDescription'), imageUrl: theKeyBackgroundUrl },
    {
      ...soulStorm,
      label: t('soulStormLabel'),
      description: t('soulStormDescription', soulStorm.lethalityBonus ?? 0),
      imageUrl: soulStormBackgroundUrl,
    },
    {
      ...prediction,
      label: t('predictionLabel'),
      description: t('predictionDescription'),
      imageUrl: soulStormBackgroundUrl,
    },
    {
      ...restoration,
      label: t('restorationLabel'),
      description: t('restorationDescription', restoration.healthRestored ?? 0),
      imageUrl: soulStormBackgroundUrl,
    },
  ]

  const handleCastSpell = (spell: SpellView) => () => {
    dispatch(castSpell(spell))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={layers.SPELLS_MODAL}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => (
        <SpellBox key={spell.key} imageUrl={spell.imageUrl} label={spell.label} description={spell.description}>
          {spell.canBeCasted && (
            <button
              type="button"
              css={spellCastButton}
              disabled={!canCast(spell, souls)}
              onClick={handleCastSpell(spell)}
            >
              <ResourceIcon type={ResourceType.Souls} marginRight="0.3rem" />
              {spell.cost}
            </button>
          )}
        </SpellBox>
      ))}
    </Modal>
  )
}
