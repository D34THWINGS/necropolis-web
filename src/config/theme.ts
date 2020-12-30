export const colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  LIGHT_GREY: '#868686',
  GREY: '#3d3d3d',
  GREEN: '#41837c',
  DARK_GREEN: '#144D49',
  CYAN: '#80f4d2',
  DARK_CYAN: '#57dbb4',
  RED: '#ff0000',
  MEDIUM_RED: '#8C454E',
  DARK_RED: '#3D0F0F',
  LIGHT_PURPLE: '#AD8EE8',
  PURPLE: '#9a58fd',
  DARK_PURPLE: '#61458C',
  LIGHT_BLUE: '#80DDF4',
  BLUE: '#12c1f4',
  DARK_BLUE: '#2F839B',
  NIGHT_BLUE: '#6775ec',
  LIME: '#2bfd02',
  FOREST: '#2F9B47',
  BROWN: '#BA9F8A',
  CAMO: '#828E70',
}

const TEXT_FLAT = `0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}`
const ELEVATED = '0 3px 2px rgba(0, 0, 0, 0.8)'

export const shadows = {
  TEXT_FLAT,
  TEXT: `${TEXT_FLAT}, ${ELEVATED}`,
  TEXT_SOLID: `${TEXT_FLAT}, 1px 3px ${colors.BLACK}`,
  ELEVATED,
}

const SLOW_DURATION = 350
const FAST_DURATION = 200
const EASING = 'ease-in-out'

export const transitions = {
  SLOW_DURATION,
  SLOW_EASING: EASING,
  SLOW: `${SLOW_DURATION}ms ${EASING}`,
  FAST_DURATION,
  FAST_EASING: EASING,
  FAST: `${FAST_DURATION}ms ${EASING}`,
}

export const breakpoints = {
  SM: '@media screen and (min-width: 400px)',
  MAX_SM: '@media screen and (max-width: 400px)',
}

export const layers = {
  SPELLS_MODAL: 1,
  UNDEAD_OVERLAY: 2,
  SACRIFICE: 3,
  INFO_MODAL: 4,
  ONBOARDING: 5,
  SETTINGS: 6,
}

export const fonts = {
  TITLES: '"Greywall", Arial, Helvetica, sans-serif',
  CORPUS: '"Azo Sans", Arial, Helvetica, sans-serif',
}
