import React from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingDetails } from './components/BuildingDetails'
import { getOssuary } from '../../data/buildings/selectors'
import { MAIN_HUB } from '../../config/routes'
import { isBuildingConstructed, isBuildingFullyUpgraded, makeUpgradedBuilding } from '../../data/buildings/helpers'
import { BuildingShop } from './components/BuildingShop'
import { BuildingShopRow, buildingShopRowImage, buildingShopRowTitle } from './components/BuildingShopRow'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { ResourceType } from '../../config/constants'
import { buildingUpgradeArrow } from './helpers/buildingsStyles'
import { useGetSpellDetails } from '../../components/spells/useGetSpellDetails'
import { textColor } from '../../styles/base'
import { getBones, getMaterials } from '../../data/resources/selectors'
import { buySecret, upgradeBuilding } from '../../data/buildings/actions'

export const Ossuary = () => {
  const { t } = useTranslation()
  const ossuary = useSelector(getOssuary)
  const bones = useSelector(getBones)
  const materials = useSelector(getMaterials)
  const getSpellDetails = useGetSpellDetails()
  const dispatch = useDispatch()

  if (!ossuary) {
    return <Redirect to={MAIN_HUB} />
  }

  if (!isBuildingConstructed(ossuary) || ossuary.collapsed) {
    return <BuildingDetails building={ossuary} renderUpgradeDescription={() => t('ossuaryUnlock')} />
  }

  const handleUpgrade = () => dispatch(upgradeBuilding(ossuary))

  return (
    <BuildingShop title={t(ossuary.type)} level={ossuary.level}>
      {ossuary.secrets.map(secret => {
        const spellDetails = getSpellDetails(secret.spell)
        const handleBuySpell = () => dispatch(buySecret(secret))

        return (
          <BuildingShopRow
            key={secret.id}
            leftCircleContent={<div css={buildingShopRowImage(spellDetails.imageUrl)} />}
            buttonContent={<ResourceIcon type={ResourceType.Bones} text={secret.bonesPrice} size="1.1rem" />}
            disabled={bones < secret.bonesPrice}
            onClick={handleBuySpell}
          >
            <h2 css={[buildingShopRowTitle, textColor('BLUE')]}>{spellDetails.label}</h2>
            {spellDetails.description}
          </BuildingShopRow>
        )
      })}
      {!isBuildingFullyUpgraded(ossuary) && (
        <BuildingShopRow
          leftCircleContent={<div css={buildingUpgradeArrow}>{ossuary.level + 1}</div>}
          buttonContent={<ResourceIcon type={ResourceType.Materials} text={ossuary.upgradeCost} size="1.1rem" />}
          disabled={materials < ossuary.upgradeCost}
          onClick={handleUpgrade}
        >
          <h2 css={buildingShopRowTitle}>{t('buildingUpgrade')}</h2>
          <div>
            {ossuary.level === 1
              ? t('ossuaryUpgrade', makeUpgradedBuilding(ossuary).secretsAmount - ossuary.secretsAmount)
              : t('ossuaryDiscount', ossuary.bonesCostMultiplier * 100)}
          </div>
        </BuildingShopRow>
      )}
    </BuildingShop>
  )
}
