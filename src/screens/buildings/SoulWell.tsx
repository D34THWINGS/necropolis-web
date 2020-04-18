/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { buildingLevel, buildingTitle, buildingWrapper } from './helpers/buildingsStyles'
import { getSoulWell } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BuildingType } from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import { getBuildingMaxLevel, getBuildingUpgradeCost, getSoulWellSoulProduction } from '../../data/buildings/helpers'
import { BuildingUpgrade } from './components/BuildingUpgrade'

export const SoulWell = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getSoulWell)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const maxLevel = getBuildingMaxLevel(BuildingType.SoulWell)
  const upgradeCost = getBuildingUpgradeCost(BuildingType.SoulWell, level + 1)
  const soulProduction = getSoulWellSoulProduction(level)
  const upgradeSoulProduction = getSoulWellSoulProduction(level + 1)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.SoulWell, level + 1))

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('soulWell')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('soulWellDescription', soulProduction)}</p>}
        {level < maxLevel && (
          <BuildingUpgrade
            level={level + 1}
            description={(() => {
              switch (level) {
                case 0:
                  return t('soulWellUnlock', upgradeSoulProduction)
                case 1:
                  return t('soulWellUpgradeStorm')
                default:
                  return t('soulWellUpgrade', upgradeSoulProduction)
              }
            })()}
            upgradeCost={upgradeCost}
            canUpgrade={upgradeCost > materials}
            onUpgrade={handleUpgrade}
          />
        )}
      </Panel>
    </div>
  )
}
