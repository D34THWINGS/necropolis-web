import { css } from '@emotion/core'
import { shadows } from '../../../config/theme'
import { textColor } from '../../../styles/base'

export const buildingWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  padding: '0 1rem',
  height: '100%',
})

export const buildingTitle = [
  css({ margin: 0, textAlign: 'center', fontSize: '1.2rem', textShadow: shadows.TEXT_SOLID }),
  textColor('CYAN'),
]

export const buildingLevel = css({ margin: 0, textAlign: 'center', fontSize: '1.2rem', textShadow: shadows.TEXT_SOLID })
