export const colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  GREY: '#323232',
  GREEN: '#41837c',
  DARK_GREEN: '#144D49',
  CYAN: '#80f4d2',
  RED: '#fb5d46',
  PURPLE: '#9a58fd',
  DARK_PURPLE: '#61458C',
  LIGHT_BLUE: '#80DDF4',
  BLUE: '#12c1f4',
  LIME: '#2bfd02',
  BROWN: '#b8724b',
}

// eslint-disable-next-line max-len
const TEXT_FLAT = `-1px 1px ${colors.GREY}, 1px -1px ${colors.GREY}, -1px -1px ${colors.GREY}, 1px 1px ${colors.GREY}`
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
