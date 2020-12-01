import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

import { blueBox } from '../../styles/base'
import { colors, fonts, shadows } from '../../config/theme'

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
  fontFamily: fonts.TITLES,
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

export type SpellBoxProps = {
  imageUrl: string
  label: ReactNode
  description: ReactNode
  children?: ReactNode
}

export const SpellBox = ({ imageUrl, label, description, children }: SpellBoxProps) => (
  <div css={spellBox(imageUrl)}>
    <h3 css={spellName}>{label}</h3>
    <div css={spellDetails}>
      <div css={spellDescription}>{description}</div>
      {children}
    </div>
  </div>
)
