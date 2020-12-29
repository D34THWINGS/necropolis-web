import React from 'react'
import { UndeadTalent } from '../../config/constants'
import { TalentButton } from './TalentButton'

export type TalentsListProps = { className?: string; values: [UndeadTalent, number][] }

export const TalentsList = ({ className, values }: TalentsListProps) => (
  <span css={className}>
    {Object.values(UndeadTalent).map(talent => {
      const text = values.filter(([key]) => key === talent).reduce((sum, [, value]) => sum + value, 0)
      return text === 0 ? null : <TalentButton key={talent} type={talent} text={text} />
    })}
  </span>
)
