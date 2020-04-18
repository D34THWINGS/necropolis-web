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

const coloredBox = (backgroundColor: string) =>
  css({
    border: '2px solid rgba(0, 0, 0, 0.75)',
    borderRadius: '15px',
    padding: '0.3rem 0.5rem',
    backgroundColor,
  })

export const cyanBox = coloredBox(colors.CYAN)

export const purpleBox = coloredBox(colors.DARK_PURPLE)
