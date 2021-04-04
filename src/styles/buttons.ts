import { css } from '@emotion/react'
import darken from 'polished/lib/color/darken'
import lighten from 'polished/lib/color/lighten'
import { colors, shadows } from '../config/theme'

export const resetButton = css({
  borderStyle: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',

  ':disabled': {
    cursor: 'not-allowed',
  },
})

export const buttonPress = css({
  ':not(:disabled):active': {
    transform: 'translateY(0.1rem)',
  },
})

export const buttonDisabled = css({
  ':disabled': {
    cursor: 'not-allowed',
    filter: 'grayscale(1)',
  },
})

export const buttonBase = [resetButton, buttonPress, buttonDisabled]

const roundButton = (backgroundColor: string, light: number, shade: number) => [
  ...buttonBase,
  css({
    padding: '0.3rem',
    backgroundColor,
    border: '1px solid rgba(0, 0, 0, 0.75)',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 7px 3px ${lighten(light, backgroundColor)}, inset 0px -7px 3px ${darken(
      shade,
      backgroundColor,
    )}`,
    borderRadius: '100%',
  }),
]

export const cyanRoundButton = roundButton(colors.DARK_CYAN, 0.2, 0.3)

export const blueRoundButton = roundButton(colors.LIGHT_BLUE, 0.2, 0.25)

export const purpleRoundButton = roundButton(colors.PURPLE, 0.2, 0.25)

export const redRoundButton = roundButton(colors.RED, 0.2, 0.2)

export const darkGreenRoundButton = roundButton(colors.DARK_GREEN, 0.1, 0.1)

const squareButton = (backgroundColor: string, light: number, shade: number) => [
  resetButton,
  buttonDisabled,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem',
    width: '100%',
    backgroundColor,
    border: '1px solid rgba(0, 0, 0, 0.75)',
    boxSizing: 'border-box',
    boxShadow: `inset 0px 5px 3px ${lighten(light, backgroundColor)}, inset 0px -5px 3px ${darken(
      shade,
      backgroundColor,
    )}`,
    borderRadius: '10px',
    color: colors.WHITE,
    fontSize: '1.2rem',
    lineHeight: 1,
    textShadow: shadows.TEXT_FLAT,

    ':active': {
      boxShadow: `inset 0 1px rgba(0, 0, 0, 0.75), inset 0px -4px 3px ${lighten(
        light,
        backgroundColor,
      )}, inset 0px 6px 3px ${darken(shade, backgroundColor)}`,
    },
  }),
]

export const cyanSquareButton = squareButton(colors.DARK_CYAN, 0.2, 0.3)

export const blueSquareButton = squareButton(colors.LIGHT_BLUE, 0.2, 0.25)

export const darkBlueSquareButton = squareButton(colors.DARK_BLUE, 0.3, 0.1)

export const greenSquareButton = squareButton(colors.DARK_GREEN, 0.1, 0.05)

export const redSquareButton = squareButton(colors.RED, 0.2, 0.2)

export const darkRedSquareButton = squareButton(colors.DARK_RED, 0.1, 0.03)

export const forestSquareButton = squareButton(colors.FOREST, 0.3, 0.1)

export const darkPurpleSquareButton = squareButton(colors.DARK_PURPLE, 0.3, 0.1)
