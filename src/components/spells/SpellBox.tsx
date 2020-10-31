import React, { ReactNode } from 'react'
import { css } from '@emotion/core'

import { SOUL_STORM_DEFENSE_BONUS, SOUL_STORM_LETHALITY_BONUS, Spell } from '../../config/constants'
import soulStormBackgroundUrl from '../../assets/images/spells/soul-storm.jpg'
import theKeyBackgroundUrl from '../../assets/images/spells/the-key.jpg'
import { useTranslation } from '../../lang/useTranslation'
import { blueBox } from '../../styles/base'
import { colors, shadows } from '../../config/theme'

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
  fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
  fontWeight: 'normal',
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

const spellsBackgroundMap: Record<Spell, string> = {
  [Spell.SoulStorm]: soulStormBackgroundUrl,
  [Spell.TheKey]: theKeyBackgroundUrl,
}

export type SpellBoxProps = {
  spell: Spell
  children?: ReactNode
}

export const SpellBox = ({ spell, children }: SpellBoxProps) => {
  const { t } = useTranslation()

  const getSpellDescription = () => {
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
    <div css={spellBox(spellsBackgroundMap[spell])}>
      <h3 css={spellName}>{t('spellName', spell)}</h3>
      <div css={spellDetails}>
        <div css={spellDescription}>{getSpellDescription()}</div>
        {children}
      </div>
    </div>
  )
}
