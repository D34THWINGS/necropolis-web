/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, ReactNode } from 'react'
import { Image, IconProps } from './Image'
import { UndeadTalent } from '../../config/constants'
import musclesImageUrl from '../../assets/images/icons/muscles.png'
import lethalityImageUrl from '../../assets/images/icons/lethality.png'
import { colors } from '../../config/theme'
import { textColor } from '../../styles/base'

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
