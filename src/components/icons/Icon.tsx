/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export type IconProps = {
  src: string
  block?: boolean
  className?: string
  size?: string | number
  marginLeft?: string | number
  marginRight?: string | number
}

export const Icon = ({ className, marginLeft, marginRight, size = '1.5rem', src, block }: IconProps) => (
  <img
    className={className}
    src={src}
    alt=""
    css={css({ width: size, marginLeft, marginRight, display: block ? 'block' : 'inline-block' })}
  />
)
