import React from 'react'
import { Redirect } from 'react-router'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { OnboardingStep, ResourceType } from '../../config/constants'
import { getMaterials, getSouls } from '../../data/resources/selectors'
import { BuildingDetails } from './components/BuildingDetails'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { Undead } from '../../data/undeads/helpers'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { nextOnboardingStep } from '../../data/onboarding/actions'
import { getCatacombs } from '../../data/buildings/selectors'
import { isBuildingConstructed, isBuildingFullyUpgraded, makeUpgradedBuilding } from '../../data/buildings/helpers'
import { MAIN_HUB } from '../../config/routes'
import { BuildingShop } from './components/BuildingShop'
import { BuildingShopRow, buildingShopRowTitle } from './components/BuildingShopRow'
import { raiseUndead, upgradeBuilding } from '../../data/buildings/actions'
import { buildingUpgradeArrow } from './helpers/buildingsStyles'
import { colors } from '../../config/theme'
import { UndeadPortrait } from '../../components/undeads/UndeadPortrait'
import { TalentsList } from '../../components/talents/TalentsList'
import { Health } from '../../components/images/Health'
import { UndeadAbilityDescription } from '../../components/undeads/UndeadAbilityDescription'

const undeadPortraitCircle = css({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  padding: '0.5rem',
  width: '100%',
  height: '100%',
  backgroundColor: colors.DARK_PURPLE,

  '& > img': {
    height: '100%',
  },
})

const undeadStats = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: '0.5rem',
})

export const Catacombs = () => {
  const { t } = useTranslation()
  const catacombs = useSelector(getCatacombs)
  const onboardingStep = useSelector(getOnboardingStep)
  const souls = useSelector(getSouls)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  if (!catacombs) {
    return <Redirect to={MAIN_HUB} />
  }

  if (!isBuildingConstructed(catacombs) || catacombs.collapsed) {
    return <BuildingDetails building={catacombs} renderUpgradeDescription={() => t('catacombUnlock')} />
  }

  const handleRaiseUndead = (undead: Undead) => () => {
    dispatch(raiseUndead(undead))
    if (onboardingStep === OnboardingStep.AwaitUndeadRaising) {
      dispatch(nextOnboardingStep())
    }
  }

  const handleUpgrade = () => dispatch(upgradeBuilding(catacombs))

  return (
    <BuildingShop title={t(catacombs.type)} level={catacombs.level}>
      {catacombs.undeadPool.map(undead => (
        <BuildingShopRow
          key={undead.id}
          leftCircleContent={
            <div css={undeadPortraitCircle}>
              <UndeadPortrait type={undead.type} size="auto" />
            </div>
          }
          buttonContent={<ResourceIcon type={ResourceType.Souls} text={catacombs.raiseUndeadSoulCost} size="1.1rem" />}
          disabled={souls < catacombs.raiseUndeadSoulCost}
          onClick={handleRaiseUndead(undead)}
        >
          <h2 css={buildingShopRowTitle}>{t('undeadName', undead.type)}</h2>
          <div css={undeadStats}>
            <TalentsList values={undead.talents} />
            <Health health={undead.health} maxHealth={undead.maxHealth} />
          </div>
          <UndeadAbilityDescription ability={undead.ability} showExpedition showAssault />
        </BuildingShopRow>
      ))}
      {!isBuildingFullyUpgraded(catacombs) && (
        <BuildingShopRow
          leftCircleContent={<div css={buildingUpgradeArrow}>{catacombs.level + 1}</div>}
          buttonContent={<ResourceIcon type={ResourceType.Materials} text={catacombs.upgradeCost} size="1.1rem" />}
          disabled={materials < catacombs.upgradeCost}
          onClick={handleUpgrade}
        >
          <h2 css={buildingShopRowTitle}>{t('buildingUpgrade')}</h2>
          <div>
            {catacombs.level === 1
              ? t('catacombUnlockRevive')
              : t('catacombFortify', makeUpgradedBuilding(catacombs).fortifyBonus)}
          </div>
        </BuildingShopRow>
      )}
    </BuildingShop>
  )
}
