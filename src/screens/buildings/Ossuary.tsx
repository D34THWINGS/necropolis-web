/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import researchIconUrl from '../../assets/images/icons/research.png'
import {
  buildingLevel,
  buildingTitle,
  buildingWrapper,
  buildingActionLocked,
  buildingActionButton,
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
import { BuildingUpgrade } from './components/BuildingUpgrade'
import { Icon } from '../../components/icons/Icon'
import { discoverSpell } from '../../data/spells/actions'

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

  const handleDiscoverSpell = () => dispatch(discoverSpell())
  const handleUpgrade = () => dispatch(upgradeBuilding(BuildingType.Ossuary, level + 1))

  return (
    <div css={buildingWrapper}>
      <button
        type="button"
        disabled={bonesCost > bones || level === 0}
        css={buildingActionButton}
        onClick={handleDiscoverSpell}
      >
        {level === 0 && <div css={buildingActionLocked} />}
        <Icon src={researchIconUrl} size="3rem" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('ossuary')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('ossuaryDescription', 3)}</p>}
        {level < maxLevel && (
          <BuildingUpgrade
            level={level + 1}
            description={level === 0 ? t('ossuaryUnlock') : t('ossuaryUpgrade', upgradeBonusMeat, upgradeBonusBones)}
            upgradeCost={upgradeCost}
            canUpgrade={upgradeCost > materials}
            onUpgrade={handleUpgrade}
          />
        )}
      </Panel>
    </div>
  )
}
