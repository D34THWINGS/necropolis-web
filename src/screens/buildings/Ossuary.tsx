import React from 'react'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingType } from '../../config/constants'
import { getOssuaryUpgradeBonusBones, getOssuaryUpgradeBonusMeat } from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'

export const Ossuary = () => {
  const { t } = useTranslation()

  return (
    <BuildingDetails
      type={BuildingType.Ossuary}
      renderUpgradeDescription={level =>
        level === 1
          ? t('ossuaryUnlock')
          : t('ossuaryUpgrade', getOssuaryUpgradeBonusMeat(level), getOssuaryUpgradeBonusBones(level))
      }
    />
  )
}
