import { css } from '@emotion/core'
import { shadows } from '../../../config/theme'
import { contentCover, greenBox, textColor } from '../../../styles/base'
import upgradeArrowUrl from '../../../assets/images/icons/cyan-arrow.png'
import { cyanSquareButton } from '../../../styles/buttons'
import actionLockIconUrl from '../../../assets/images/icons/lock.png'

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

export const buildingActionContainer = css({
  display: 'flex',
  marginTop: '1rem',
})

export const buildingActionFrame = [
  greenBox,
  css({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minHeight: '4rem',
  }),
]

export const buildingActionArrow = css({
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

export const buildingActionButton = [
  cyanSquareButton,
  css({
    marginLeft: '0.2rem',
    padding: '0 0.5rem',
    width: 'auto',
    minWidth: '5rem',
  }),
]

export const buildingSpecialActionButton = [
  ...cyanSquareButton,
  css({
    alignSelf: 'center',
    position: 'relative',
    padding: '0.3rem',
    width: '6rem',
  }),
]
