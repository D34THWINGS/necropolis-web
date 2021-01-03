import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { getUndeadTalents, Undead } from '../../data/undeads/helpers'
import { useTranslation } from '../../lang/useTranslation'
import { UndeadPortrait } from './UndeadPortrait'
import { colors, fonts, layers } from '../../config/theme'
import { purpleBox, smallMarginTop } from '../../styles/base'
import { darkPurpleSquareButton } from '../../styles/buttons'
import { UndeadAbilityDescription } from './UndeadAbilityDescription'
import { castUndeadAbility } from '../../data/undeads/actions'
import { getActivePaladin, getPaladinsAssaultPhase } from '../../data/paladins/selectors'
import { PaladinsAssaultPhase } from '../../config/constants'
import { isSeduction } from '../../data/undeads/abilities'
import { isPaladinConsecrated } from '../../data/paladins/helpers'
import { Health } from '../images/Health'
import { TalentsList } from '../talents/TalentsList'

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

export type UndeadDetailsModalProps = {
  undead: Undead | null
  onClose: () => void
  showAssault?: boolean
  showExpedition?: boolean
}

export const UndeadDetailsModal = ({ undead, onClose, showAssault, showExpedition }: UndeadDetailsModalProps) => {
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
        onClose()
        dispatch(castUndeadAbility(undead.id, undead.ability))
      }
    : undefined

  return (
    <Modal isOpen={!!undead} color={ModalColor.PURPLE} onClose={onClose} priority={layers.UNDEAD_OVERLAY}>
      {undead && (
        <>
          <div css={undeadDetailsHeader}>
            <UndeadPortrait type={undead.type} marginRight="0.5rem" />
            <div>
              <div css={undeadDetailsName}>{t('undeadName', undead.type)}</div>
              <Health health={undead.health} maxHealth={undead.maxHealth} />
              {showExpedition && <TalentsList values={getUndeadTalents(undead)} />}
            </div>
          </div>
          <div css={purpleBox}>
            <UndeadAbilityDescription
              ability={undead.ability}
              showAssault={showAssault}
              showExpedition={showExpedition}
            />
          </div>
          <button
            type="button"
            css={[...darkPurpleSquareButton, smallMarginTop]}
            disabled={!getCanCastAbility()}
            onClick={handleCastAbility}
          >
            {getButtonLabel()}
          </button>
        </>
      )}
    </Modal>
  )
}
