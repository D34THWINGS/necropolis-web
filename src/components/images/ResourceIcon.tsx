import React from 'react'
import { Image, IconProps } from './Image'
import { ResourceType } from '../../config/constants'
import bonesImageUrl from '../../assets/images/resources/bones.png'
import materialsImageUrl from '../../assets/images/resources/materials.png'
import meatImageUrl from '../../assets/images/resources/meat.png'
import soulsImageUrl from '../../assets/images/resources/souls.png'

const iconMap: Record<ResourceType, string> = {
  [ResourceType.Materials]: materialsImageUrl,
  [ResourceType.Bones]: bonesImageUrl,
  [ResourceType.Meat]: meatImageUrl,
  [ResourceType.Souls]: soulsImageUrl,
}

export type ResourceIconProps = Omit<IconProps, 'src'> & {
  type: ResourceType
}

export const ResourceIcon = ({ type, className, marginLeft, marginRight, size, block }: ResourceIconProps) => (
  <Image
    src={iconMap[type]}
    className={className}
    marginLeft={marginLeft}
    marginRight={marginRight}
    size={size}
    block={block}
  />
)
