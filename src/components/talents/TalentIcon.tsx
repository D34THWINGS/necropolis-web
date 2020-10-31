import React, { ReactNode } from 'react'
import { css } from '@emotion/core'
import { Image, IconProps } from '../images/Image'
import { UndeadTalent } from '../../config/constants'
import musclesImageUrl from '../../assets/images/icons/muscles.png'
import lethalityImageUrl from '../../assets/images/icons/lethality.png'
import { colors } from '../../config/theme'
import { textColor } from '../../styles/base'

const talentIconWrapper = css({
  display: 'inline-flex',
  alignItems: 'center',
})

const iconMap: Record<UndeadTalent, string> = {
  [UndeadTalent.Muscles]: musclesImageUrl,
  [UndeadTalent.Lethality]: lethalityImageUrl,
}

const colorMap: Record<UndeadTalent, keyof typeof colors> = {
  [UndeadTalent.Muscles]: 'RED',
  [UndeadTalent.Lethality]: 'NIGHT_BLUE',
}

export type TalentIconProps = Omit<IconProps, 'src'> & {
  type: UndeadTalent
  text?: ReactNode
}

export const TalentIcon = ({ type, text, className, marginLeft, marginRight, size, block }: TalentIconProps) => (
  <span className={className} css={[talentIconWrapper, textColor(colorMap[type])]}>
    {text}
    <Image
      src={iconMap[type]}
      marginLeft={text ? '0.2rem' : marginLeft}
      marginRight={marginRight}
      size={size}
      block={block}
    />
  </span>
)
