/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ReactNode } from 'react'
import { breakpoints } from '../../config/theme'

const wrapper = (backgroundUrl?: string) =>
  css({
    position: 'absolute',
    padding: '8rem 0 5rem',
    width: '100%',
    height: '100%',
    backgroundImage: backgroundUrl && `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

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
