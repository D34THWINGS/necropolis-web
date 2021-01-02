import React from 'react'
import { css } from '@emotion/react'
import {
  isDevotion,
  isLabor,
  isProtection,
  isSectumSempra,
  isSeduction,
  UndeadAbility,
} from '../../data/undeads/abilities'
import { Image } from '../images/Image'
import excursionIconUrl from '../../assets/images/icons/excursion-mini.png'
import assaultIconUrl from '../../assets/images/icons/assault-mini.png'
import { useTranslation } from '../../lang/useTranslation'

const descriptionsSeparator = css({
  height: '0.5rem',
})

export type UndeadAbilityDescriptionProps = {
  ability: UndeadAbility
  showAssault?: boolean
  showExpedition?: boolean
}

export const UndeadAbilityDescription = ({ showAssault, showExpedition, ability }: UndeadAbilityDescriptionProps) => {
  const { t } = useTranslation()

  const getAbilityExpeditionDescription = () => {
    if (isDevotion(ability)) {
      return t('devotionExpedition', ability.healthCost, ability.talentsBonus)
    }
    if (isLabor(ability)) {
      return t('laborExpedition')
    }
    if (isProtection(ability)) {
      return t('protectionExpedition', ability.damageBuffer)
    }
    if (isSeduction(ability)) {
      return t('seductionExpedition', ability.talentBonus)
    }
    if (isSectumSempra(ability)) {
      return t('sectumSempraExpedition', ability.lethalityBonus)
    }
    return ((_: never) => _)(ability)
  }

  const getAbilityAssaultDescription = () => {
    if (isDevotion(ability)) {
      return t('devotionAssault', ability.healthCost, ability.damages, ability.targetCategories)
    }
    if (isLabor(ability)) {
      return t('laborAssault')
    }
    if (isProtection(ability)) {
      return t('protectionAssault', ability.shieldValue)
    }
    if (isSeduction(ability)) {
      return t('seductionAssault', ability.targetPaladinMaxHealth)
    }
    if (isSectumSempra(ability)) {
      return t('sectumSempraAssault', ability.damages, ability.targetCategories)
    }
    return ((_: never) => _)(ability)
  }

  if (showExpedition && !showAssault) {
    return <>{getAbilityExpeditionDescription()}</>
  }

  if (!showExpedition && showAssault) {
    return <>{getAbilityAssaultDescription()}</>
  }

  return (
    <>
      <Image src={excursionIconUrl} />
      &nbsp;:&nbsp;
      {getAbilityExpeditionDescription()}
      <div css={descriptionsSeparator} />
      <Image src={assaultIconUrl} />
      &nbsp;:&nbsp;
      {getAbilityAssaultDescription()}
    </>
  )
}
