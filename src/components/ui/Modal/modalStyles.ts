import { css } from '@emotion/react'
import { fadeIn, fadeOut } from '../../../styles/animations'
import { transitions } from '../../../config/theme'

export enum ModalColor {
  GREEN,
  PURPLE,
  BLUE,
  RED,
}

export enum ModalAlignment {
  Start = 'flex-start',
  Center = 'center',
  End = 'flex-end',
}

export const modalOverlay = (isOpen: boolean, priority?: number, align: ModalAlignment = ModalAlignment.Center) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: align,
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: priority,
    animation: `${isOpen ? fadeIn : fadeOut} ${transitions.SLOW_DURATION}ms ${transitions.SLOW_EASING}`,
    animationFillMode: 'both',

    ':before': {
      content: '""',
      flex: '0 0 auto',
      height: '10rem',
    },

    ':after': {
      content: '""',
      flex: '0 1 auto',
      height: '5rem',
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
