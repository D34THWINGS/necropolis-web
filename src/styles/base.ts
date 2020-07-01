import { css } from '@emotion/core'
import darken from 'polished/lib/color/darken'
import { colors, shadows } from '../config/theme'

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

const coloredBox = (backgroundColor: string, borderDarken = 0.2) =>
  css({
    border: `2px solid ${darken(borderDarken, backgroundColor)}`,
    borderRadius: '15px',
    padding: '0.3rem 0.5rem',
    backgroundColor,
  })

export const greenBox = coloredBox(colors.GREEN)

export const purpleBox = coloredBox(colors.DARK_PURPLE, 0.3)

export const blueBox = coloredBox(colors.BLUE, 0.35)

export const h2Title = css({
  margin: 0,
  fontSize: '1.8rem',
  textAlign: 'center',
  textShadow: shadows.TEXT_SOLID,
  fontFamily: '"Greywall"',
  fontWeight: 'normal',
})

export const noMargin = css({
  margin: 0,
})

export const textCenter = css({
  textAlign: 'center',
})

export const noBreak = css({
  whiteSpace: 'nowrap',
})

export const alignItemsCenter = css({
  display: 'inline-flex',
  alignItems: 'center',
})

export const smallMarginTop = css({
  marginTop: '0.4rem',
})

export const largeMarginTop = css({
  marginTop: '2rem',
})
