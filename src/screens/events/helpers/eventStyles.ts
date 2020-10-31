import { css } from '@emotion/core'
import { h2Title } from '../../../styles/base'

export const eventStepDescription = [
  css({
    marginBottom: '0.4rem',
    borderRadius: '5px',
    padding: '1.8rem 0.5rem 0.3rem',
    backgroundColor: '#8C454E',
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
