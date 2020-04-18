import { css } from '@emotion/core'
import { colors, shadows } from '../config/theme'

export const resetButton = css({
  borderStyle: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',
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

const roundButton = (backgroundColor: string = colors.CYAN) => [
  ...buttonBase,
  css({
    padding: '0.3rem',
    backgroundColor,
    border: '2px solid rgba(0, 0, 0, 0.75)',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 8px 4px rgba(255, 255, 255, 0.7), inset 0px -8px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: '100%',
  }),
]

export const cyanRoundButton = roundButton()

export const purpleRoundButton = roundButton(colors.PURPLE)

const squareButton = (backgroundColor: string = colors.CYAN, lightOpacity = 0.5, darkOpacity = 0.15) => [
  ...buttonBase,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem',
    width: '100%',
    backgroundColor,
    border: '2px solid rgba(0, 0, 0, 0.75)',
    boxSizing: 'border-box',
    // eslint-disable-next-line max-len
    boxShadow: `inset 0px 10px 10px rgba(255, 255, 255, ${lightOpacity}), inset 0px -10px 3px rgba(0, 0, 0, ${darkOpacity})`,
    borderRadius: '15px',
    color: colors.WHITE,
    fontSize: '1.2rem',
    textShadow: shadows.TEXT_FLAT,
  }),
]

export const cyanSquareButton = squareButton()

export const greenSquareButton = squareButton(colors.DARK_GREEN, 0.1)
