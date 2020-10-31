import React from 'react'
import { css } from '@emotion/core'
import { lighten } from 'polished'
import { Image } from '../../../components/images/Image'
import { colors } from '../../../config/theme'

export const eventImage = css({
  margin: '-4rem -1rem -1.5rem',
  borderBottom: `2px solid ${lighten(0.1, colors.DARK_RED)}`,
})

export type EventImageProps = {
  src: string
}

export const EventImage = ({ src }: EventImageProps) => <Image css={eventImage} src={src} size="calc(100% + 2rem)" />
