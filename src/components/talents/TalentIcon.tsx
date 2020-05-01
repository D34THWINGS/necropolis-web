/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { Image, IconProps } from '../images/Image'
import { UndeadTalent } from '../../config/constants'
import musclesImageUrl from '../../assets/images/icons/muscles.png'
import lethalityImageUrl from '../../assets/images/icons/lethality.png'
import { colors, shadows } from '../../config/theme'
import { textColor } from '../../styles/base'
import { useTalentsModalControls } from './useTalentsModalControls'
import { resetButton } from '../../styles/buttons'

const talentIconButton = [
  resetButton,
  css({
    display: 'inline-flex',
    alignItems: 'center',
    textShadow: shadows.TEXT_FLAT,
  }),
]

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

export const TalentIcon = ({ type, text, className, marginLeft, marginRight, size, block }: TalentIconProps) => {
  const { open } = useTalentsModalControls()
  return (
    <button type="button" className={className} css={[...talentIconButton, textColor(colorMap[type])]} onClick={open}>
      {text}
      <Image
        src={iconMap[type]}
        marginLeft={text ? '0.2rem' : marginLeft}
        marginRight={marginRight}
        size={size}
        block={block}
      />
    </button>
  )
}
