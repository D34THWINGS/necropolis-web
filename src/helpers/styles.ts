import { css } from '@emotion/core'
import { colors } from '../config/theme'

export const backgroundImage = (url: string) =>
  css({
    backgroundImage: `url(${url})`,
  })

export const resetButton = css({
  borderStyle: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',
})

export const buttonPress = css({
  ':active': {
    transform: 'translateY(0.1rem)',
  },
})

export const textColor = (color: keyof typeof colors) =>
  css({
    color: colors[color],
  })
