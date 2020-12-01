import { css } from '@emotion/react'
import { h2Title, redBox } from '../../../styles/base'

export const eventStepDescription = [
  redBox,
  css({
    marginBottom: '0.4rem',
    padding: '1.8rem 0.5rem 0.3rem',
    fontSize: '0.9rem',
  }),
]

export const eventTitle = [
  h2Title,
  css({
    position: 'relative',
    zIndex: 1,
  }),
]
