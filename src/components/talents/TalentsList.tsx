import React, { ReactNode } from 'react'
import { UndeadTalent } from '../../config/constants'
import { TalentButton } from './TalentButton'

export type TalentsListProps = {
  className?: string
  values: [UndeadTalent, number][]
  renderText?: (text: ReactNode) => ReactNode
}

export const TalentsList = ({ className, values, renderText }: TalentsListProps) => (
  <span css={className}>
    {Object.values(UndeadTalent).map(talent => {
      const text = values.filter(([key]) => key === talent).reduce((sum, [, value]) => sum + value, 0)
      return text === 0 ? null : <TalentButton key={talent} type={talent} text={renderText ? renderText(text) : text} />
    })}
  </span>
)
