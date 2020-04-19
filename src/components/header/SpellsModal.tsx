/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Modal, ModalColor } from '../ui/Modal'
import { useTranslation } from '../../lang/useTranslation'
import { backgroundImage, blueBox, h2Title } from '../../styles/base'
import { getSpells } from '../../data/spells/selectors'
import { colors, shadows } from '../../config/theme'
import { blueSquareButton } from '../../styles/buttons'
import { ResourceIcon } from '../icons/ResourceIcon'
import soulStormBackgroundUrl from '../../assets/images/spells/soul-storm.png'
import theKeyBackgroundUrl from '../../assets/images/spells/the-key.png'
import {
  ResourceType,
  SOUL_STORM_DEFENSE_BONUS,
  SOUL_STORM_LETHALITY_BONUS,
  Spell,
  SPELLS_SOUL_COSTS,
} from '../../config/constants'

const spellBox = (backgroundUrl: string) => [
  blueBox,
  css({
    marginTop: '0.3rem',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
]

const spellName = css({
  margin: '0 0 0.4rem',
  fontSize: '1.2rem',
  color: colors.LIGHT_BLUE,
  textAlign: 'center',
  textShadow: shadows.TEXT_SOLID,
})

const spellDetails = css({
  display: 'flex',
  alignItems: 'center',
})

const spellDescription = css({
  marginRight: '0.4rem',
  flex: '1 1 auto',
  fontSize: '0.9rem',
})

const spellCastButton = [
  ...blueSquareButton,
  css({
    width: 'auto',
  }),
]

const spellsBackgroundMap: Record<Spell, string> = {
  [Spell.SoulStorm]: soulStormBackgroundUrl,
  [Spell.TheKey]: theKeyBackgroundUrl,
}

export type SpellsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SpellsModal = ({ isOpen, onClose }: SpellsModalProps) => {
  const { t } = useTranslation()
  const spells = useSelector(getSpells)

  const getSpellDescription = (spell: Spell) => {
    switch (spell) {
      case Spell.SoulStorm:
        return t('soulStormDescription', SOUL_STORM_DEFENSE_BONUS, SOUL_STORM_LETHALITY_BONUS)
      case Spell.TheKey:
        return t('theKeyDescription')
      default:
        throw new Error('Unknown spell')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => (
        <div key={spell} css={spellBox(spellsBackgroundMap[spell])}>
          <h3 css={spellName}>{t('spellName', spell)}</h3>
          <div css={spellDetails}>
            <div css={spellDescription}>{getSpellDescription(spell)}</div>
            <button type="button" css={spellCastButton}>
              <ResourceIcon type={ResourceType.Souls} marginRight="0.3rem" />
              {SPELLS_SOUL_COSTS[spell]}
            </button>
          </div>
        </div>
      ))}
    </Modal>
  )
}
