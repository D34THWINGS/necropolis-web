/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Image } from '../../../components/images/Image'

export const expeditionImage = css({
  margin: '0 -1rem -1.5rem',
  border: '2px solid #3D0F0F',
  borderRadius: '20px',
})

export type ExpeditionImageProps = {
  src: string
}

export const ExpeditionImage = ({ src }: ExpeditionImageProps) => (
  <Image css={expeditionImage} src={src} size="calc(100% + 2rem)" />
)
