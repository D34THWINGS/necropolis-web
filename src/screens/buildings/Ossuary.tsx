/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import researchIconUrl from '../../assets/images/icons/research.png'
import resourcesIconUrl from '../../assets/images/resources/resources.png'
import {
  buildingLevel,
  buildingResourceCost,
  buildingTitle,
  buildingUpgradeArrow,
  buildingUpgradeButton,
  buildingUpgradeContainer,
  buildingUpgradeFrame,
  buildingWrapper,
  buildingActionLocked,
} from './helpers/buildingsStyles'
import { getOssuary } from '../../data/buildings/selectors'
import { BuildingType } from '../../config/constants'
import { upgradeBuilding } from '../../data/buildings/actions'
import { getBones, getMaterials } from '../../data/resources/selectors'
import {
  getBuildingMaxLevel,
  getBuildingUpgradeCost,
  getOssuaryBonesCost,
  getOssuaryUpgradeBonusBones,
  getOssuaryUpgradeBonusMeat,
} from '../../data/buildings/helpers'

const discoverSpellButton = css({
  alignSelf: 'center',
  position: 'relative',
})

const researchIcon = css({
  width: '3rem',
})

export const Ossuary = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getOssuary)
  const materials = useSelector(getMaterials)
  const bones = useSelector(getBones)
  const dispatch = useDispatch()

  const maxLevel = getBuildingMaxLevel(BuildingType.Ossuary)
  const upgradeCost = getBuildingUpgradeCost(BuildingType.Ossuary, level + 1)
  const bonesCost = getOssuaryBonesCost(level)
  const upgradeBonusMeat = getOssuaryUpgradeBonusMeat(level + 1)
  const upgradeBonusBones = getOssuaryUpgradeBonusBones(level + 1)

  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.Ossuary, level + 1))

  return (
    <div css={buildingWrapper}>
      <button
        type="button"
        disabled={bonesCost > bones || level === 0}
        css={[...cyanSquareButton, discoverSpellButton]}
      >
        {level === 0 && <div css={buildingActionLocked} />}
        <img css={researchIcon} src={researchIconUrl} alt="" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('ossuary')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('ossuaryDescription', 3)}</p>}
        {level < maxLevel && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>{level === 0 ? t('ossuaryUnlock') : t('ossuaryUpgrade', upgradeBonusMeat, upgradeBonusBones)}</span>
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
