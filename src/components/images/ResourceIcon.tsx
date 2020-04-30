/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, ReactNode } from 'react'
import { Image, IconProps } from './Image'
import { ResourceType } from '../../config/constants'
import bonesImageUrl from '../../assets/images/resources/bones.png'
import materialsImageUrl from '../../assets/images/resources/materials.png'
import meatImageUrl from '../../assets/images/resources/meat.png'
import soulsImageUrl from '../../assets/images/resources/souls.png'
import { textColor } from '../../styles/base'
import { colors } from '../../config/theme'

const iconMap: Record<ResourceType, string> = {
  [ResourceType.Materials]: materialsImageUrl,
  [ResourceType.Bones]: bonesImageUrl,
  [ResourceType.Meat]: meatImageUrl,
  [ResourceType.Souls]: soulsImageUrl,
}

const colorMap: Record<ResourceType, keyof typeof colors> = {
  [ResourceType.Materials]: 'GREEN',
  [ResourceType.Bones]: 'BROWN',
  [ResourceType.Meat]: 'RED',
  [ResourceType.Souls]: 'BLUE',
}

export type ResourceIconProps = Omit<IconProps, 'src'> & {
  type: ResourceType
  text?: ReactNode
}

export const ResourceIcon = ({ type, text, className, marginLeft, marginRight, size, block }: ResourceIconProps) => (
  <Fragment>
    {text === undefined ? null : <span css={textColor(colorMap[type])}>{text}</span>}
    <Image
      src={iconMap[type]}
      className={className}
      marginLeft={text ? '0.2rem' : marginLeft}
      marginRight={marginRight}
      size={size}
      block={block}
    />
  </Fragment>
)
