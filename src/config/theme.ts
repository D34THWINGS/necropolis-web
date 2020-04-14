export const colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  GREEN: '#41837c',
  CYAN: '#80f4d2',
  RED: '#fb5d46',
  PURPLE: '#9a58fd',
  BLUE: '#12c1f4',
  LIME: '#2bfd02',
}

const TEXT_FLAT = `-1px 1px ${colors.BLACK}, 1px -1px ${colors.BLACK}, -1px -1px ${colors.BLACK}, 1px 1px ${colors.BLACK}`
const ELEVATED = '0 3px 2px rgba(0, 0, 0, 0.8)'

export const shadows = {
  TEXT_FLAT,
  TEXT: `${TEXT_FLAT}, ${ELEVATED}`,
  TEXT_SOLID: `${TEXT_FLAT}, 1px 3px ${colors.BLACK}`,
  ELEVATED,
}
