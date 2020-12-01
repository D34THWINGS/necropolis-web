import React from 'react'
import { css } from '@emotion/react'

export type IconProps = {
  src: string
  block?: boolean
  className?: string
  size?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  'data-test-id'?: string
}

export const Image = ({
  className,
  marginLeft,
  marginRight,
  size = '1.5rem',
  src,
  block,
  'data-test-id': testId,
}: IconProps) => (
  <img
    className={className}
    src={src}
    alt=""
    css={css({
      width: size,
      marginLeft,
      marginRight,
      display: block ? 'block' : 'inline-block',
      verticalAlign: 'middle',
    })}
    data-test-id={testId}
  />
)
