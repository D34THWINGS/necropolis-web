/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import {
  buildingActionButton,
  buildingActionLocked,
  buildingLevel,
  buildingTitle,
  buildingWrapper,
} from './helpers/buildingsStyles'
import { getCatacombs } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BuildingType } from '../../config/constants'
import { getMaterials, getSouls } from '../../data/resources/selectors'
import {
  getBuildingMaxLevel,
  getBuildingUpgradeCost,
  getCatacombsUpgradeMaxRaising,
  getMaxUndeadRaising,
  getRaiseUndeadSoulCost,
} from '../../data/buildings/helpers'
import { getRaisedUndeadCount } from '../../data/undeads/selectors'
import { BuildingUpgrade } from './components/BuildingUpgrade'
import { Icon } from '../../components/icons/Icon'

export const Catacombs = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getCatacombs)
  const materials = useSelector(getMaterials)
  const souls = useSelector(getSouls)
  const raisedUndead = useSelector(getRaisedUndeadCount)
  const dispatch = useDispatch()

  const upgradeCost = getBuildingUpgradeCost(BuildingType.Catacombs, level + 1)
  const soulCost = getRaiseUndeadSoulCost(level)
  const maxUndeadRaising = getMaxUndeadRaising(level)
  const maxUndeadRaisingUpgrade = getCatacombsUpgradeMaxRaising(level)
  const maxLevel = getBuildingMaxLevel(BuildingType.Catacombs)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.Catacombs, level + 1))

  return (
    <div css={buildingWrapper}>
      <button type="button" disabled={level === 0 || soulCost > souls} css={buildingActionButton}>
        {level === 0 && <div css={buildingActionLocked} />}
        <Icon src={reanimateIconUrl} size="3rem" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('catacomb')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('catacombDescription', raisedUndead, maxUndeadRaising, soulCost)}</p>}
        {level < maxLevel && (
          <BuildingUpgrade
            level={level + 1}
            description={level === 0 ? t('catacombUnlock') : t('catacombUpgrade', maxUndeadRaisingUpgrade)}
            upgradeCost={upgradeCost}
            canUpgrade={upgradeCost > materials}
            onUpgrade={handleUpgrade}
          />
        )}
      </Panel>
    </div>
  )
}
