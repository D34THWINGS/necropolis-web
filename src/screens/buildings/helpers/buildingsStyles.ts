import { css } from '@emotion/core'
import { colors, shadows } from '../../../config/theme'
import { textColor } from '../../../styles/base'
import upgradeArrowUrl from '../../../assets/images/upgrade-arrow.png'
import { cyanSquareButton } from '../../../styles/buttons'

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

export const buildingUpgradeContainer = css({
  display: 'flex',
})

export const buildingUpgradeFrame = css({
  display: 'flex',
  alignItems: 'center',
  border: '2px solid #0F3D36',
  borderRadius: '15px',
  padding: '0.3rem 0.5rem',
  flex: 1,
  minHeight: '4rem',
  backgroundColor: colors.CYAN,
})

export const buildingUpgradeArrow = css({
  display: 'flex',
  alignItems: 'center',
  marginRight: '0.5rem',
  paddingLeft: '0.3rem',
  flex: '0 0 auto',
  width: '3.2rem',
  height: '3.2rem',
  backgroundImage: `url(${upgradeArrowUrl})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  fontSize: '0.8rem',
})

export const buildingUpgradeButton = [
  cyanSquareButton,
  css({
    marginLeft: '0.2rem',
    padding: '0 0.5rem',
  }),
]

export const buildingResourceCost = css({
  width: '2rem',
  marginRight: '0.3rem',
})
