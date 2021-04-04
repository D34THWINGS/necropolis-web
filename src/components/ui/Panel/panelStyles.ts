import { css } from '@emotion/react'
import { breakpoints } from '../../../config/theme'

export const fullPagePanel = css({
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
    maxHeight: 'none',
  },
})

export const fullPagePanelInner = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100%',
})
