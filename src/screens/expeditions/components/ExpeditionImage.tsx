import React from 'react'
import { css } from '@emotion/react'
import { darken } from 'polished'
import { Image } from '../../../components/images/Image'
import { colors } from '../../../config/theme'

export const expeditionImage = css({
  margin: '-4rem -1rem -1.5rem',
  borderBottom: `2px solid ${darken(0.1, colors.GREEN)}`,
})

export type ExpeditionImageProps = {
  src: string
}

export const ExpeditionImage = ({ src }: ExpeditionImageProps) => (
  <Image css={expeditionImage} src={src} size="calc(100% + 2rem)" />
)
