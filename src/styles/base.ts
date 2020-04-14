import { css } from '@emotion/core'
import { colors } from '../config/theme'

export const backgroundImage = (url: string) =>
  css({
    backgroundImage: `url(${url})`,
  })

export const textColor = (color: keyof typeof colors) =>
  css({
    color: colors[color],
  })

export const contentCover = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})
