import React from 'react'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'

enum TownHallStep {
  Entrance,
  Fire,
  KillRunners,
  Loot,
  Jail,
}

export const TownHall = () => {
  const { t } = useTranslation()
  return (
    <ExpeditionModal
      type={ExpeditionType.TownHall}
      title={t('townHallTitle')}
      renderOverview={() => t('townHallOverview')}
      renderStep={step => {
        switch (step as TownHallStep) {
          case TownHallStep.Entrance:
          case TownHallStep.Fire:
          case TownHallStep.Jail:
          case TownHallStep.KillRunners:
          case TownHallStep.Loot:
          default:
            throw new Error('Unknown step')
        }
      }}
    />
  )
}
