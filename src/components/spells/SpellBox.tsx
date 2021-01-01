import React, { ReactNode } from 'react'
import { textColor } from '../../styles/base'
import { ActionBox, buildingShopRowImage, buildingShopRowTitle } from '../ui/ActionBox'
import { ResourceIcon } from '../resources/ResourceIcon'
import { ResourceType } from '../../config/constants'
import { colors } from '../../config/theme'
import { ModalColor, modalColorsMap } from '../ui/Modal/modalStyles'

export type SpellBoxProps = {
  imageUrl: string
  label: ReactNode
  description: ReactNode
  soulCost: number
  disabled?: boolean
  onClick?: () => void
}

export const SpellBox = ({ imageUrl, label, description, soulCost, disabled, onClick }: SpellBoxProps) => (
  <ActionBox
    leftCircleContent={<div css={buildingShopRowImage(imageUrl)} />}
    buttonContent={onClick && <ResourceIcon type={ResourceType.Souls} text={soulCost} size="1.1rem" />}
    disabled={disabled}
    onClick={onClick}
    buttonColor={colors.LIGHT_BLUE}
    backgroundColor={colors.DARK_BLUE}
    borderColor={modalColorsMap[ModalColor.BLUE][1]}
    boxTestId="spellBox"
    buttonTestId="castSpellButton"
  >
    <h2 css={[buildingShopRowTitle, textColor('BLUE')]}>{label}</h2>
    {description}
  </ActionBox>
)
