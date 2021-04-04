import React, { HTMLAttributes, ReactNode } from 'react'
import { css } from '@emotion/react'
import { breakpoints, colors, frameColors, shadows } from '../../config/theme'
import { fullPagePanel, fullPagePanelInner } from './Panel/panelStyles'

export enum FrameColor {
  GREEN,
  PURPLE,
  BLUE,
  RED,
}

export const frameColorsMap: Record<FrameColor, [string, string]> = {
  [FrameColor.GREEN]: [frameColors.GREEN, frameColors.DARK_GREEN],
  [FrameColor.PURPLE]: [frameColors.PURPLE, frameColors.DARK_PURPLE],
  [FrameColor.BLUE]: [frameColors.BLUE, frameColors.DARK_BLUE],
  [FrameColor.RED]: [frameColors.RED, frameColors.DARK_RED],
}

const frameWrapper = (color: FrameColor) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    outline: 0,
    border: '2px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    margin: '0 0.5rem',
    padding: '0.6rem',
    minWidth: '18rem',
    maxWidth: '28rem',
    maxHeight: 'calc(100% - 11rem)',
    boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.5)',
    backgroundColor: frameColorsMap[color][0],

    ':before': {
      display: 'block',
      content: '""',
      position: 'absolute',
      top: '0.6rem',
      borderRadius: '10px',
      width: 'calc(100% - 1.2rem)',
      height: '3rem',
      boxShadow: 'inset 0px 5px 4px rgba(0, 0, 0, 0.35)',
      pointerEvents: 'none',
      zIndex: 1,
    },

    ':after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      bottom: '0.6rem',
      left: '0.6rem',
      width: 'calc(100% - 1.2rem)',
      height: '1rem',
      borderRadius: '15px',
      backgroundImage: `linear-gradient(to top, ${frameColorsMap[color][1]} 10%, transparent 100%)`,
    },

    [breakpoints.SM]: {
      margin: '0 1rem',
      minWidth: '22rem',
    },

    '@media screen and (min-height: 960px)': {
      maxHeight: '50rem',
    },
  })

type FrameWrapperProps = {
  color?: FrameColor
  className?: string
  children?: ReactNode
  fullPage?: boolean
  otherProps?: HTMLAttributes<HTMLDivElement>
}

export const FrameWrapper = React.forwardRef<HTMLDivElement, FrameWrapperProps>(
  ({ className, fullPage, color = FrameColor.GREEN, otherProps, children }, ref) => (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      ref={ref}
      className={className}
      css={fullPage ? [frameWrapper(color), fullPagePanel] : frameWrapper(color)}
    >
      {children}
    </div>
  ),
)

const frameInner = (color: FrameColor) =>
  css({
    position: 'relative',
    padding: '1rem',
    overflowY: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 1px 1px rgba(255, 255, 255, 0.5)',
    backgroundColor: frameColorsMap[color][1],
    color: colors.WHITE,
    textShadow: shadows.TEXT_FLAT,
  })

type FrameInnerProps = { color?: FrameColor; className?: string; children?: ReactNode; fullPage?: boolean }

export const FrameInner = ({ color = FrameColor.GREEN, className, fullPage, children }: FrameInnerProps) => (
  <div className={className} css={fullPage ? [frameInner(color), fullPagePanelInner] : frameInner(color)}>
    {children}
  </div>
)

type FrameProps = { color?: FrameColor; className?: string; children?: ReactNode; fullPage?: boolean }

export const Frame = ({ color = FrameColor.GREEN, className, fullPage, children }: FrameProps) => (
  <FrameWrapper fullPage={fullPage} color={color}>
    <FrameInner fullPage={fullPage} color={color} className={className}>
      {children}
    </FrameInner>
  </FrameWrapper>
)
