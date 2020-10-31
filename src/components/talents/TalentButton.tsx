import React, { ReactNode } from 'react'
import { css } from '@emotion/core'
import { resetButton } from '../../styles/buttons'
import { shadows } from '../../config/theme'
import { UndeadTalent } from '../../config/constants'
import { useTalentsModalControls } from './useTalentsModalControls'
import { TalentIcon } from './TalentIcon'

const talentIconButton = [
  resetButton,
  css({
    display: 'inline-flex',
    alignItems: 'center',
    textShadow: shadows.TEXT_FLAT,
  }),
]

export type TalentButtonProps = {
  type: UndeadTalent
  text: ReactNode
  className?: string
}

export const TalentButton = ({ type, text, className }: TalentButtonProps) => {
  const { open } = useTalentsModalControls()
  return (
    <button type="button" className={className} css={talentIconButton} onClick={open}>
      <TalentIcon type={type} text={text} size="1.2rem" marginLeft="0.2rem" marginRight="0.2rem" />
    </button>
  )
}
