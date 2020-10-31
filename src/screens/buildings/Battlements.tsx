import React from 'react'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingType } from '../../config/constants'
import { getBattlementsDefenseBonus, getBattlementsUpgradeDefenseBonus } from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'

export const Battlements = () => {
  const { t } = useTranslation()

  return (
    <BuildingDetails
      type={BuildingType.Battlements}
      renderDescription={level => t('battlementDescription', getBattlementsDefenseBonus(level))}
      renderUpgradeDescription={level => t('battlementUpgrade', getBattlementsUpgradeDefenseBonus(level))}
    />
  )
}
