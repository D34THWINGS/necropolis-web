/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { buildingLevel, buildingTitle, buildingWrapper } from './helpers/buildingsStyles'
import { getBattlements } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BuildingType } from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import {
  getBattlementsDefenseBonus,
  getBattlementsUpgradeDefenseBonus,
  getBuildingMaxLevel,
  getBuildingUpgradeCost,
} from '../../data/buildings/helpers'
import { BuildingUpgrade } from './components/BuildingUpgrade'

export const Battlements = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getBattlements)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const upgradeCost = getBuildingUpgradeCost(BuildingType.Battlements, level + 1)
  const maxLevel = getBuildingMaxLevel(BuildingType.Battlements)
  const defenseBonus = getBattlementsDefenseBonus(level)
  const upgradeDefenseBonus = getBattlementsUpgradeDefenseBonus(level)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.Battlements, level + 1))

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('battlements')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('battlementDescription', defenseBonus)}</p>}
        {level < maxLevel && (
          <BuildingUpgrade
            level={level + 1}
            description={t('battlementUpgrade', upgradeDefenseBonus)}
            upgradeCost={upgradeCost}
            canUpgrade={upgradeCost > materials}
            onUpgrade={handleUpgrade}
          />
        )}
      </Panel>
    </div>
  )
}
