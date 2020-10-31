import React, { ReactNode } from 'react'
import { css } from '@emotion/core'
import { breakpoints, transitions } from '../../config/theme'

const wrapper = (backgroundUrl?: string) =>
  css({
    padding: '8rem 0 5rem',
    width: '100%',
    height: '100%',
    backgroundImage: backgroundUrl && `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    '&.enter': {
      position: 'absolute',
      opacity: 0,
    },

    '&.enter-active': {
      position: 'absolute',
      opacity: 1,
      transition: `opacity ${transitions.SLOW_DURATION}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
    },

    '&.exit-active': {
      opacity: 0,
      transition: `opacity ${transitions.SLOW_DURATION}ms cubic-bezier(0.55, 0.06, 0.68, 0.19)`,
    },

    [breakpoints.SM]: {
      padding: '8rem 0 7rem',
    },
  })

const inner = css({
  padding: '0 1rem',
  height: '100%',
  overflowY: 'auto',
})

export type ScreenWrapperProps = {
  className?: string
  backgroundUrl?: string
  children?: ReactNode
}

export const ScreenWrapper = ({ className, backgroundUrl, children }: ScreenWrapperProps) => (
  <div css={wrapper(backgroundUrl)}>
    <div className={className} css={inner}>
      {children}
    </div>
  </div>
)
