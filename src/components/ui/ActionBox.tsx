import React, { ReactNode } from 'react'
import lighten from 'polished/lib/color/lighten'
import darken from 'polished/lib/color/darken'
import { css } from '@emotion/react'
import { resetButton } from '../../styles/buttons'
import { colors, fonts, shadows } from '../../config/theme'
import { ModalColor, modalColorsMap } from './Modal/modalStyles'
import { coloredBox } from '../../styles/base'

const wrapper = css({
  position: 'relative',
  marginTop: '0.8rem',
})

const content = (color: string, hasButton: boolean) => [
  coloredBox(color),
  css({
    marginLeft: '2.5rem',
    marginRight: hasButton ? '1.5rem' : 0,
    paddingLeft: '3.5rem',
    paddingRight: hasButton ? '2.5rem' : '1rem',
    minHeight: '7rem',
  }),
]

const leftCircle = (borderColor: string) =>
  css({
    position: 'absolute',
    left: -7,
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 7px ${borderColor}`,
    borderRadius: '50%',
    width: '6rem',
    height: '6rem',
    backgroundColor: colors.GREEN,
    transform: 'translateY(-50%)',
    overflow: 'hidden',
  })

const button = (buttonColor: string, borderColor: string) => [
  resetButton,
  css({
    position: 'absolute',
    right: -7,
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 7px ${borderColor}`,
    borderRadius: '50%',
    padding: '0.3rem',
    width: '4rem',
    height: '4rem',
    backgroundColor: buttonColor,
    boxShadow: `inset 0px 7px 8px ${lighten(0.2, buttonColor)}, inset 0px -7px 8px ${darken(0.25, buttonColor)}`,
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
      boxShadow: `inset 0px 5px 3px ${darken(0.25, buttonColor)}, inset 0px -5px 3px ${lighten(0.2, buttonColor)}`,
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

export type ActionBoxProps = {
  leftCircleContent: ReactNode
  buttonContent?: ReactNode
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
  buttonColor?: string
  backgroundColor?: string
  borderColor?: string
  boxTestId?: string
  buttonTestId?: string
}

export const ActionBox = ({
  leftCircleContent,
  buttonContent,
  children,
  disabled,
  onClick,
  backgroundColor = colors.GREEN,
  buttonColor = colors.CYAN,
  borderColor = modalColorsMap[ModalColor.GREEN][1],
  boxTestId,
  buttonTestId,
}: ActionBoxProps) => (
  <div css={wrapper} data-test-id={boxTestId}>
    <div css={leftCircle(borderColor)}>{leftCircleContent}</div>
    <div css={content(backgroundColor, !!buttonContent)}>{children}</div>
    {buttonContent && (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        css={button(buttonColor, borderColor)}
        data-test-id={buttonTestId}
      >
        {buttonContent}
      </button>
    )}
  </div>
)