/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import {
  buildingActionLocked,
  buildingLevel,
  buildingResourceCost,
  buildingTitle,
  buildingUpgradeArrow,
  buildingUpgradeButton,
  buildingUpgradeContainer,
  buildingUpgradeFrame,
  buildingWrapper,
} from './helpers/buildingsStyles'
import resourcesIconUrl from '../../assets/images/resources/resources.png'
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

const reanimateButton = css({
  position: 'relative',
  alignSelf: 'center',
})

const reanimateIcon = css({
  width: '3rem',
})

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
      <button type="button" disabled={level === 0 || soulCost > souls} css={[...cyanSquareButton, reanimateButton]}>
        {level === 0 && <div css={buildingActionLocked} />}
        <img css={reanimateIcon} src={reanimateIconUrl} alt="" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('catacomb')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('catacombDescription', raisedUndead, maxUndeadRaising, soulCost)}</p>}
        {level < maxLevel && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>{level === 0 ? t('catacombUnlock') : t('catacombUpgrade', maxUndeadRaisingUpgrade)}</span>
            </div>
            <button
              type="button"
              disabled={upgradeCost > materials}
              css={buildingUpgradeButton}
              onClick={handleUpgrade}
            >
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{upgradeCost}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
