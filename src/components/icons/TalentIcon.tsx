import React from 'react'
import { Icon, IconProps } from './Icon'
import { UndeadTalent } from '../../config/constants'
import musclesImageUrl from '../../assets/images/icons/muscles.png'
import lethalityImageUrl from '../../assets/images/icons/lethality.png'

const iconMap: Record<UndeadTalent, string> = {
  [UndeadTalent.Muscles]: musclesImageUrl,
  [UndeadTalent.Lethality]: lethalityImageUrl,
}

export type TalentIconProps = Omit<IconProps, 'src'> & {
  type: UndeadTalent
}

export const TalentIcon = ({ type, className, marginLeft, marginRight, size, block }: TalentIconProps) => (
  <Icon
    src={iconMap[type]}
    className={className}
    marginLeft={marginLeft}
    marginRight={marginRight}
    size={size}
    block={block}
  />
)
