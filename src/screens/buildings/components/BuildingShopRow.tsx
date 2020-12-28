import React, { ReactNode } from 'react'
import lighten from 'polished/lib/color/lighten'
import darken from 'polished/lib/color/darken'
import { css } from '@emotion/react'
import { resetButton } from '../../../styles/buttons'
import { colors, fonts, shadows } from '../../../config/theme'
import { ModalColor, modalColorsMap } from '../../../components/ui/Modal/modalStyles'
import { greenBox } from '../../../styles/base'

const wrapper = css({
  position: 'relative',
  marginTop: '0.8rem',
})

const content = [
  greenBox,
  css({
    marginLeft: '2.5rem',
    marginRight: '1.5rem',
    paddingLeft: '3.5rem',
    paddingRight: '2.5rem',
    minHeight: '7rem',
  }),
]

const leftCircle = css({
  position: 'absolute',
  left: -7,
  top: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `solid 7px ${modalColorsMap[ModalColor.GREEN][1]}`,
  borderRadius: '50%',
  width: '6rem',
  height: '6rem',
  backgroundColor: colors.GREEN,
  transform: 'translateY(-50%)',
  overflow: 'hidden',
})

const button = [
  resetButton,
  css({
    position: 'absolute',
    right: -7,
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 7px ${modalColorsMap[ModalColor.GREEN][1]}`,
    borderRadius: '50%',
    padding: '0.3rem',
    width: '4rem',
    height: '4rem',
    backgroundColor: colors.CYAN,
    boxShadow: `inset 0px 7px 8px ${lighten(0.2, colors.CYAN)}, inset 0px -7px 8px ${darken(0.25, colors.CYAN)}`,
    transform: 'translateY(-50%)',
    textShadow: shadows.TEXT_FLAT,

    ':disabled': {
      backgroundColor: colors.LIGHT_GREY,
      boxShadow: `inset 0px 7px 8px ${lighten(0.2, colors.LIGHT_GREY)}, inset 0px -7px 8px ${darken(
        0.25,
        colors.LIGHT_GREY,
      )}`,

      '& > *': {
        filter: 'grayscale(1)',
      },
    },

    '&:not(:disabled):active': {
      boxShadow: `inset 0px 5px 3px ${darken(0.25, colors.CYAN)}, inset 0px -5px 3px ${lighten(0.2, colors.CYAN)}`,
    },
  }),
]

export const buildingShopRowTitle = css({
  margin: 0,
  textAlign: 'center',
  fontSize: '1.3rem',
  textShadow: shadows.TEXT_FLAT,
  fontFamily: fonts.TITLES,
  fontWeight: 'normal',
})

export const buildingShopRowImage = (backgroundUrl: string) =>
  css({
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
  })

export type BuildingShopRowProps = {
  leftCircleContent: ReactNode
  buttonContent: ReactNode
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const BuildingShopRow = ({
  leftCircleContent,
  buttonContent,
  children,
  disabled,
  onClick,
}: BuildingShopRowProps) => (
  <div css={wrapper}>
    <div css={leftCircle}>{leftCircleContent}</div>
    <div css={content}>{children}</div>
    <button type="button" disabled={disabled} onClick={onClick} css={button}>
      {buttonContent}
    </button>
  </div>
)
