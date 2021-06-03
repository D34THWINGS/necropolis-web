import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { Image, IconProps } from '../images/Image'
import { ResourceType } from '../../config/constants'
import bonesImageUrl from '../../assets/images/resources/bones.png'
import materialsImageUrl from '../../assets/images/resources/materials.png'
import meatImageUrl from '../../assets/images/resources/meat.png'
import soulsImageUrl from '../../assets/images/resources/souls.png'
import { textColor } from '../../styles/base'
import { colors } from '../../config/theme'

const resourceText = css({
  display: 'inline-flex',
  alignItems: 'center',
})

const iconMap: Record<ResourceType, string> = {
  [ResourceType.Materials]: materialsImageUrl,
  [ResourceType.Bones]: bonesImageUrl,
  [ResourceType.Meat]: meatImageUrl,
  [ResourceType.Souls]: soulsImageUrl,
}

const colorMap: Record<ResourceType, keyof typeof colors> = {
  [ResourceType.Materials]: 'FOREST',
  [ResourceType.Bones]: 'BROWN',
  [ResourceType.Meat]: 'RED',
  [ResourceType.Souls]: 'LIGHT_BLUE',
}

export type ResourceIconProps = Omit<IconProps, 'src'> & {
  type: ResourceType
  text?: ReactNode
}

export const ResourceIcon = ({ type, text, className, marginLeft, marginRight, size, block }: ResourceIconProps) => {
  const icon = (
    <Image
      src={iconMap[type]}
      className={className}
      marginLeft={text !== undefined ? '0.2rem' : marginLeft}
      marginRight={marginRight}
      size={size}
      block={block}
    />
  )

  if (!text) {
    return icon
  }

  return (
    <span css={[textColor(colorMap[type]), resourceText]}>
      {text}
      {icon}
    </span>
  )
}
