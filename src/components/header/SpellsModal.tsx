/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalColor } from '../ui/Modal'
import { useTranslation } from '../../lang/useTranslation'
import { blueBox, h2Title } from '../../styles/base'
import { getSpells } from '../../data/spells/selectors'
import { colors, shadows } from '../../config/theme'
import { blueSquareButton } from '../../styles/buttons'
import { ResourceIcon } from '../images/ResourceIcon'
import soulStormBackgroundUrl from '../../assets/images/spells/soul-storm.jpg'
import theKeyBackgroundUrl from '../../assets/images/spells/the-key.jpg'
import {
  CASTABLE_SPELLS,
  ResourceType,
  SOUL_STORM_DEFENSE_BONUS,
  SOUL_STORM_LETHALITY_BONUS,
  Spell,
  SPELLS_SOUL_COSTS,
} from '../../config/constants'
import { spendResources } from '../../data/resources/actions'
import { castSpell } from '../../data/spells/actions'

const spellBox = (backgroundUrl: string) => [
  blueBox,
  css({
    marginTop: '0.3rem',
    minHeight: '6rem',
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
  const dispatch = useDispatch()

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

  const handleCastSpell = (spell: Spell) => () => {
    dispatch(castSpell(spell))
    dispatch(spendResources({ [ResourceType.Souls]: SPELLS_SOUL_COSTS[spell] }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={1}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => (
        <div key={spell} css={spellBox(spellsBackgroundMap[spell])}>
          <h3 css={spellName}>{t('spellName', spell)}</h3>
          <div css={spellDetails}>
            <div css={spellDescription}>{getSpellDescription(spell)}</div>
            {CASTABLE_SPELLS.includes(spell) && (
              <button type="button" css={spellCastButton} onClick={handleCastSpell(spell)}>
                <ResourceIcon type={ResourceType.Souls} marginRight="0.3rem" />
                {SPELLS_SOUL_COSTS[spell]}
              </button>
            )}
          </div>
        </div>
      ))}
    </Modal>
  )
}
