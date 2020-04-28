export const colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  GREY: '#3d3d3d',
  GREEN: '#41837c',
  DARK_GREEN: '#144D49',
  CYAN: '#80f4d2',
  RED: '#fb5d46',
  DARK_RED: '#3D0F0F',
  PURPLE: '#9a58fd',
  DARK_PURPLE: '#61458C',
  LIGHT_BLUE: '#80DDF4',
  BLUE: '#12c1f4',
  DARK_BLUE: '#2F839B',
  LIME: '#2bfd02',
  FOREST: '#2F9B47',
  BROWN: '#BA9F8A',
}

// eslint-disable-next-line max-len
const TEXT_FLAT = `0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}, 0 0 1px ${colors.BLACK}`
const ELEVATED = '0 3px 2px rgba(0, 0, 0, 0.8)'

export const shadows = {
  TEXT_FLAT,
  TEXT: `${TEXT_FLAT}, ${ELEVATED}`,
  TEXT_SOLID: `${TEXT_FLAT}, 1px 3px ${colors.BLACK}`,
  ELEVATED,
}

export const transitions = {
  SLOW: '300ms ease-in-out',
}

export const breakpoints = {
  SM: '@media screen and (min-width: 380px)',
}
