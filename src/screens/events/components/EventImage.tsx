/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Image } from '../../../components/images/Image'

export const eventImage = css({
  margin: '0 -1rem -1.5rem',
  border: '2px solid #3D0F0F',
  borderRadius: '20px',
})

export type EventImageProps = {
  src: string
}

export const EventImage = ({ src }: EventImageProps) => <Image css={eventImage} src={src} size="calc(100% + 2rem)" />
