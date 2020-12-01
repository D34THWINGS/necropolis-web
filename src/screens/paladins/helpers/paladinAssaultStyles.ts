import { css } from '@emotion/react'
import { breakpoints } from '../../../config/theme'

export const paladinAssaultPanel = css({
  position: 'relative',
  margin: '0 -1.7rem',
  width: 'calc(100% + 3.5rem)',
  maxWidth: 'none',
  maxHeight: 'none',
  flex: 1,
  overflowY: 'auto',

  [breakpoints.SM]: {
    margin: '0 -1.7rem',
    width: 'calc(100% + 3.5rem)',
  },
})

export const paladinAssaultPanelInner = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100%',
})
