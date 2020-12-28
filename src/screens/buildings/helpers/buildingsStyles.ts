import { css } from '@emotion/react'
import { fonts, shadows } from '../../../config/theme'
import { greenBox, textColor } from '../../../styles/base'
import upArrowUrl from '../../../assets/images/icons/cyan-arrow.png'
import upgradeIconUrl from '../../../assets/images/icons/upgrade.png'
import { cyanSquareButton } from '../../../styles/buttons'

export const buildingWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
})

export const buildingTitle = [
  css({
    margin: 0,
    textAlign: 'center',
    fontSize: '1.2rem',
    textShadow: shadows.TEXT_SOLID,
    fontFamily: fonts.TITLES,
    fontWeight: 'normal',
  }),
  textColor('CYAN'),
]

export const buildingLevel = css({
  margin: 0,
  textAlign: 'center',
  fontSize: '1.2rem',
  textShadow: shadows.TEXT_SOLID,
  fontFamily: fonts.TITLES,
  fontWeight: 'normal',
})

export const buildingActionContainer = css({
  display: 'flex',
  marginTop: '0.4rem',
})

export const buildingActionFrame = [
  greenBox,
  css({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minHeight: '4rem',
    fontSize: '0.9rem',
  }),
]

export const buildingActionArrow = css({
  display: 'flex',
  alignItems: 'center',
  marginRight: '0.4rem',
  paddingLeft: '0.3rem',
  flex: '0 0 auto',
  width: '3.2rem',
  height: '3.2rem',
  backgroundImage: `url(${upArrowUrl})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  fontSize: '0.8rem',
})

export const buildingActionButton = [
  cyanSquareButton,
  css({
    marginLeft: '0.2rem',
    padding: '0 0.5rem',
    width: 'auto',
    minWidth: '5rem',
  }),
]

export const buildingUpgradeArrow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
  height: '80%',
  backgroundImage: `url(${upgradeIconUrl})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  fontFamily: fonts.TITLES,
  fontSize: '1.3rem',
  textShadow: shadows.TEXT_FLAT,
})
