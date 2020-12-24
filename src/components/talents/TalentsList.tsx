import React from 'react'
import { UndeadTalent } from '../../config/constants'
import { TalentButton } from './TalentButton'

export type TalentsListProps = {
  values: [UndeadTalent, number][]
}

export const TalentsList = ({ values }: TalentsListProps) => (
  <>
    {Object.values(UndeadTalent).map(talent => (
      <TalentButton
        key={talent}
        type={talent}
        text={values.filter(([key]) => key === talent).reduce((sum, [, value]) => sum + value, 0)}
      />
    ))}
  </>
)
