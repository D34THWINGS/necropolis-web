/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingType } from '../../config/constants'
import { getSoulWellSoulProduction } from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'

export const SoulWell = () => {
  const { t } = useTranslation()

  return (
    <BuildingDetails
      type={BuildingType.SoulWell}
      renderDescription={level => t('soulWellDescription', getSoulWellSoulProduction(level))}
      renderUpgradeDescription={level => {
        switch (level) {
          case 1:
            return t('soulWellUnlock', getSoulWellSoulProduction(level))
          case 2:
            return t('soulWellUpgradeStorm')
          default:
            return t('soulWellUpgrade', getSoulWellSoulProduction(level))
        }
      }}
    />
  )
}
