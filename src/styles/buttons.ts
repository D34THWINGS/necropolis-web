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
    backgroundColor,
    border: '2px solid #0F3D3A',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 8px 4px rgba(255, 255, 255, 0.7), inset 0px -8px 4px rgba(67, 180, 155, 0.9)',
    borderRadius: '100%',
  }),
]

export const cyanRoundButton = roundButton()

const squareButton = (backgroundColor: string = colors.CYAN) => [
  ...buttonBase,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.3rem',
    backgroundColor,
    border: '2px solid #0F3D36',
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 10px 10px rgba(255, 255, 255, 0.5), inset 0px -10px 3px #40B099',
    borderRadius: '15px',
    color: colors.WHITE,
    textShadow: shadows.TEXT_FLAT,
  }),
]

export const cyanSquareButton = squareButton()
