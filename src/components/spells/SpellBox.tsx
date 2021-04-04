import React, { ReactNode } from 'react'
import { textColor } from '../../styles/base'
import { ActionBox, actionBoxImage, buildingShopRowTitle } from '../ui/ActionBox'
import { ResourceIcon } from '../resources/ResourceIcon'
import { ResourceType } from '../../config/constants'
import { colors, frameColors } from '../../config/theme'

export type SpellBoxProps = {
  imageUrl: string
  label: ReactNode
  description: ReactNode
  soulCost: number
  className?: string
  disabledButton?: boolean
  onClick?: () => void
}

export const SpellBox = ({
  className,
  imageUrl,
  label,
  description,
  soulCost,
  disabledButton,
  onClick,
}: SpellBoxProps) => (
  <ActionBox
    className={className}
    leftCircleContent={<div css={actionBoxImage(imageUrl)} />}
    buttonContent={onClick && <ResourceIcon type={ResourceType.Souls} text={soulCost} size="1.1rem" />}
    disabledButton={disabledButton}
    onClick={onClick}
    buttonColor={colors.LIGHT_BLUE}
    backgroundColor={colors.DARK_BLUE}
    borderColor={frameColors.DARK_BLUE}
    boxTestId="spellBox"
    buttonTestId="castSpellButton"
  >
    <h2 css={[buildingShopRowTitle, textColor('BLUE')]}>{label}</h2>
    <div>{description}</div>
  </ActionBox>
)
