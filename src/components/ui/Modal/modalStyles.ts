import { css } from '@emotion/core'
import { fadeIn, fadeOut, wobble } from '../../../styles/animations'
import { breakpoints, colors, shadows, transitions } from '../../../config/theme'

export enum ModalColor {
  GREEN,
  PURPLE,
  BLUE,
  RED,
}

export const modalColorsMap: Record<ModalColor, [string, string]> = {
  [ModalColor.GREEN]: ['#448B84', '#1B655F'],
  [ModalColor.PURPLE]: ['#664991', '#3F216B'],
  [ModalColor.BLUE]: ['#457E8C', '#1C5766'],
  [ModalColor.RED]: ['#8C454E', '#661C25'],
}

export const modalOverlay = (isOpen: boolean, priority?: number) =>
  css({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: priority,
    animation: `${isOpen ? fadeIn : fadeOut} ${transitions.SLOW_DURATION}ms ${transitions.SLOW_EASING}`,
    animationFillMode: 'both',

    [breakpoints.SM]: {
      alignItems: 'center',
    },
  })

export const modalPanel = (color: ModalColor, shouldWobble?: boolean) =>
  css({
    position: 'relative',
    outline: 0,
    border: '2px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    margin: '10rem 0.5rem 0.5rem',
    padding: '0.6rem',
    maxWidth: '28rem',
    boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.5)',
    background: modalColorsMap[color][0],
    ...(shouldWobble
      ? {
          animationName: wobble,
          animationDelay: '50ms',
          animationDuration: '200ms',
          animationTimingFunction: 'ease-in-out',
        }
      : undefined),

    ':before': {
      display: 'block',
      content: '""',
      position: 'absolute',
      top: '1.2rem',
      borderRadius: '10px',
      width: 'calc(100% - 1.2rem)',
      height: '3rem',
      boxShadow: '0px -10px 0px rgba(0, 0, 0, 0.35)',
      zIndex: 1,
    },

    ':after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      bottom: '0.6rem',
      left: '0.6rem',
      width: 'calc(100% - 1.2rem)',
      height: '1rem',
      borderRadius: '15px',
      backgroundImage: `linear-gradient(to top, ${modalColorsMap[color][1]} 10%, transparent 100%)`,
    },

    [breakpoints.SM]: {
      margin: '1rem',
    },
  })

export const modalInner = (color: ModalColor) =>
  css({
    position: 'relative',
    padding: '1rem',
    overflowY: 'auto',
    maxHeight: '70vh',
    borderRadius: '10px',
    boxShadow: '0px 1px 1px rgba(255, 255, 255, 0.5)',
    backgroundColor: modalColorsMap[color][1],
    color: colors.WHITE,
    textShadow: shadows.TEXT_FLAT,

    [breakpoints.SM]: {
      maxHeight: '55vh',
    },
  })

export const modalCloseButton = css({
  position: 'absolute',
  top: '-0.5rem',
  right: '-0.5rem',
  padding: '0.3rem',
  zIndex: 1,
})

export const modalCloseIcon = css({
  display: 'block',
  width: '2rem',
})
