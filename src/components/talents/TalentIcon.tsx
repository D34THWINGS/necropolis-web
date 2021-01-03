import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { Image, IconProps } from '../images/Image'
import { UndeadTalent } from '../../config/constants'
import musclesImageUrl from '../../assets/images/icons/muscles.png'
import lethalityImageUrl from '../../assets/images/icons/lethality.png'
import dexterityImageUrl from '../../assets/images/icons/dexterity.png'
import subjugationImageUrl from '../../assets/images/icons/subjugation.png'
import necromancyImageUrl from '../../assets/images/icons/necromancy.png'
import { colors } from '../../config/theme'
import { textColor } from '../../styles/base'

const talentIconWrapper = css({
  display: 'inline-flex',
  alignItems: 'center',
})

const iconMap: Record<UndeadTalent, string> = {
  [UndeadTalent.Muscles]: musclesImageUrl,
  [UndeadTalent.Lethality]: lethalityImageUrl,
  [UndeadTalent.Dexterity]: dexterityImageUrl,
  [UndeadTalent.Subjugation]: subjugationImageUrl,
  [UndeadTalent.Necromancy]: necromancyImageUrl,
}

const colorMap: Record<UndeadTalent, keyof typeof colors> = {
  [UndeadTalent.Muscles]: 'RED',
  [UndeadTalent.Lethality]: 'NIGHT_BLUE',
  [UndeadTalent.Dexterity]: 'LIME',
  [UndeadTalent.Subjugation]: 'DARK_BLUE',
  [UndeadTalent.Necromancy]: 'PURPLE',
}

export type TalentIconProps = Omit<IconProps, 'src'> & {
  type: UndeadTalent
  text?: ReactNode
}

export const TalentIcon = ({ type, text, className, marginLeft, marginRight, size, block }: TalentIconProps) => (
  <span className={className} css={[talentIconWrapper, textColor(colorMap[type])]}>
    {text}
    {!!text && <>&nbsp;</>}
    <Image src={iconMap[type]} marginLeft={marginLeft} marginRight={marginRight} size={size} block={block} />
  </span>
)
