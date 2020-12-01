import { keyframes } from '@emotion/react'

export const fadeIn = keyframes({
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
})

export const fadeOut = keyframes({
  from: {
    opacity: 1,
  },

  to: {
    opacity: 0,
  },
})

export const slideFromTop = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-6rem)',
  },

  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const wobble = keyframes({
  '0%': {
    transform: 'scale(1, 1)',
  },

  '30%': {
    transform: 'scale(0.95, 1.05)',
  },

  '80%': {
    transform: 'scale(1.05, 0.95)',
  },

  '100%': {
    transform: 'scale(1, 1)',
  },
})

export const glow = keyframes({
  '0%': {
    opacity: 0,
  },

  '40%': {
    opacity: 1,
  },

  '60%': {
    opacity: 1,
  },

  '100%': {
    opacity: 0,
  },
})
