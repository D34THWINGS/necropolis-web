import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { UndeadPortrait } from './UndeadPortrait'
import { Health } from '../images/Health'
import { TalentsList } from '../talents/TalentsList'
import { getUndeadTalents, makeBaseDice, Undead } from '../../data/undeads/helpers'
import { colors, fonts, frameColors } from '../../config/theme'
import { useTranslation } from '../../lang/useTranslation'
import { getActivePaladin, getPaladinsAssaultPhase } from '../../data/paladins/selectors'
import { PaladinsAssaultPhase, UndeadTalent } from '../../config/constants'
import { isSeduction } from '../../data/undeads/abilities'
import { isPaladinConsecrated } from '../../data/paladins/helpers'
import { castUndeadAbility } from '../../data/undeads/actions'
import { ActionBox } from '../ui/ActionBox'
import { TalentIcon } from '../talents/TalentIcon'
import { UndeadAbilityDescription } from './UndeadAbilityDescription'
import { Dice } from '../images/Dice'
import rollDiceUrl from '../../assets/images/expeditions/dices/roll-dice.png'
import { Image } from '../images/Image'

const undeadDetailsHeader = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  fontFamily: fonts.TITLES,
  fontSize: '1.2rem',
})

const undeadDetailsName = css({
  fontSize: '1.8rem',
  color: colors.PURPLE,
})

type UndeadDetailsProps = {
  undead: Undead
  onCastAbility: () => void
  showExpedition?: boolean
  showAssault?: boolean
}

export const UndeadDetails = ({ undead, showExpedition, showAssault, onCastAbility }: UndeadDetailsProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assaultPhase = useSelector(getPaladinsAssaultPhase)
  const activePaladin = useSelector(getActivePaladin)

  const getCanCastAssaultAbility = () => {
    if (!undead || undead.ability.used || assaultPhase !== PaladinsAssaultPhase.Fighting) {
      return false
    }
    if (isSeduction(undead.ability)) {
      return activePaladin.health <= undead.ability.targetPaladinMaxHealth && !isPaladinConsecrated(activePaladin)
    }
    return true
  }

  const getCanCastExpeditionAbility = () => !!undead && !undead.ability.used

  const getCanCastAbility = () => {
    if (undead?.cursed) {
      return false
    }
    if (showAssault) {
      return getCanCastAssaultAbility()
    }
    return getCanCastExpeditionAbility()
  }

  const getButtonLabel = () => {
    if (!undead?.ability.used) {
      return t('undeadDetailsUse')
    }
    if (undead?.cursed) {
      return t('undeadDetailsCursed')
    }
    if (showAssault) {
      return t('undeadDetailsUsedAssault')
    }
    return t('undeadDetailsUsedExpedition')
  }

  const handleCastAbility = undead
    ? () => {
        onCastAbility()
        dispatch(castUndeadAbility(undead.id, undead.ability))
      }
    : undefined

  const canCastAbility = getCanCastAbility()
  const baseDice = makeBaseDice()

  return (
    <>
      <div css={undeadDetailsHeader}>
        <UndeadPortrait type={undead.type} marginRight="0.5rem" />
        <div>
          <div css={undeadDetailsName}>{t('undeadName', undead.type)}</div>
          <Health health={undead.health} maxHealth={undead.maxHealth} />
          {showExpedition && <TalentsList values={getUndeadTalents(undead)} />}
        </div>
      </div>
      {showExpedition && (
        <ActionBox
          horizontalLayout
          backgroundColor={frameColors.PURPLE}
          borderColor={frameColors.DARK_PURPLE}
          buttonContent={<Image src={rollDiceUrl} size="2.5rem" />}
          buttonColor={colors.LIGHT_PURPLE}
        >
          <div>
            <Dice type={baseDice.type} value={baseDice.maxValue} size="3rem" />
            {undead.dices.map(dice => (
              <Dice key={dice.id} type={dice.type} value={dice.maxValue} size="3rem" />
            ))}
          </div>
        </ActionBox>
      )}
      <ActionBox
        horizontalLayout
        backgroundColor={frameColors.PURPLE}
        borderColor={frameColors.DARK_PURPLE}
        buttonContent={<TalentIcon type={UndeadTalent.Muscles} size="2rem" />}
        buttonColor={colors.LIGHT_PURPLE}
        disabled={!canCastAbility}
        onClick={handleCastAbility}
        buttonTestId="useUndeadAbilityButton"
      >
        <div>
          {canCastAbility ? (
            <UndeadAbilityDescription
              ability={undead.ability}
              showAssault={showAssault}
              showExpedition={showExpedition}
            />
          ) : (
            getButtonLabel()
          )}
        </div>
      </ActionBox>
    </>
  )
}
