import { css } from '@emotion/core'
import { colors } from '../config/theme'
import upgradeButtonBackgroundUrl from '../assets/images/upgrade-button.png'

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

export const buttonBase = [
  resetButton,
  css({
    position: 'absolute',
    bottom: '-1.2rem',
    right: '-1.4rem',
    width: '3rem',
    height: '3rem',
    backgroundImage: `url(${upgradeButtonBackgroundUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
  buttonPress,
]

export const textColor = (color: keyof typeof colors) =>
  css({
    color: colors[color],
  })
