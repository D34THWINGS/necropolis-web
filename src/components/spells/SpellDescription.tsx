import React from 'react'
import { css } from '@emotion/react'
import { Image } from '../images/Image'
import excursionIconUrl from '../../assets/images/icons/excursion-mini.png'
import assaultIconUrl from '../../assets/images/icons/assault-mini.png'
import { useTranslation } from '../../lang/useTranslation'
import { isPrediction, isRestoration, isSoulStorm, isTheKey, Spell } from '../../data/spells/helpers'
import { getLethalityBonusFromEffects } from '../../data/spells/effects'

const descriptionsSeparator = css({
  height: '0.5rem',
})

export type SpellDescriptionProps = {
  spell: Spell
  showAssault?: boolean
  showExpedition?: boolean
}

export const SpellDescription = ({ showAssault, showExpedition, spell }: SpellDescriptionProps) => {
  const { t } = useTranslation()

  const getSpellExpeditionDescription = () => {
    if (isSoulStorm(spell)) {
      return t('soulStormExpedition', getLethalityBonusFromEffects(spell.effects))
    }
    if (isTheKey(spell)) {
      return t('theKeyExpedition')
    }
    if (isPrediction(spell)) {
      return t('predictionExpedition')
    }
    if (isRestoration(spell)) {
      return t('restorationExpedition', spell.healthRestored, spell.targetsCleansed)
    }
    return ((_: never) => _)(spell)
  }

  const getSpellAssaultDescription = () => {
    if (isSoulStorm(spell)) {
      return t('soulStormAssault', spell.damages, spell.targetCategories)
    }
    if (isTheKey(spell)) {
      return t('theKeyAssault', spell.damages, spell.targetCategories)
    }
    if (isPrediction(spell)) {
      return t('predictionAssault', spell.revealBonus)
    }
    if (isRestoration(spell)) {
      return t('restorationAssault', spell.structureRepairAmount)
    }
    return ((_: never) => _)(spell)
  }

  if (showExpedition && !showAssault) {
    return <>{getSpellExpeditionDescription()}</>
  }

  if (!showExpedition && showAssault) {
    return <>{getSpellAssaultDescription()}</>
  }

  return (
    <>
      <Image src={excursionIconUrl} />
      &nbsp;:&nbsp;
      {getSpellExpeditionDescription()}
      <div css={descriptionsSeparator} />
      <Image src={assaultIconUrl} />
      &nbsp;:&nbsp;
      {getSpellAssaultDescription()}
    </>
  )
}
