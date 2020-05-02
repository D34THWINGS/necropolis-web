import { css } from '@emotion/core'
import { colors, layers, shadows, transitions } from '../../../config/theme'
import { fadeIn, slideFromTop } from '../../../styles/animations'

export const gameEndContainer = (backgroundUrl: string) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    '&.enter': {
      zIndex: layers.SETTINGS,
      opacity: 0,
    },

    '&.enter-active': {
      zIndex: layers.SETTINGS,
      opacity: 1,
      transition: `opacity ${transitions.SLOW}`,
    },
  })

export const gameEndImage = css({
  animation: `${slideFromTop} ${transitions.SLOW_DURATION}ms ease-out both`,
  animationDelay: '400ms',
})

export const gameEndText = (marginTop: string, backgroundColor: string) =>
  css({
    marginTop,
    marginBottom: '2rem',
    borderRadius: '20px',
    padding: '0.4rem',
    maxWidth: '18rem',
    backgroundColor,
    fontSize: '1.3rem',
    fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
    color: colors.WHITE,
    textShadow: shadows.TEXT,
    textAlign: 'center',
    zIndex: 1,
    animation: `${fadeIn} ${transitions.SLOW_DURATION}ms ease-out both`,
    animationDelay: '800ms',
  })

export const gameEndButton = css({
  maxWidth: '18rem',
  animation: `${fadeIn} ${transitions.SLOW_DURATION}ms ease-out both`,
  animationDelay: '1200ms',
})
