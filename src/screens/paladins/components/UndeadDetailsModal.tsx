import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { Undead } from '../../../data/undeads/helpers'
import { useTranslation } from '../../../lang/useTranslation'
import { UndeadPortrait } from '../../../components/undeads/UndeadPortrait'
import { colors, fonts } from '../../../config/theme'
import { purpleBox, smallMarginTop } from '../../../styles/base'
import { darkPurpleSquareButton } from '../../../styles/buttons'
import { UndeadAbilityDescription } from '../../../components/undeads/UndeadAbilityDescription'
import { castUndeadAbility } from '../../../data/undeads/actions'
import { getActivePaladin, getPaladinsAssaultPhase } from '../../../data/paladins/selectors'
import { PaladinsAssaultPhase } from '../../../config/constants'
import { isSeduction } from '../../../data/undeads/abilities'
import { isPaladinConsecrated } from '../../../data/paladins/helpers'

const undeadDetailsHeader = css({
  display: 'flex',
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
}

export const UndeadDetailsModal = ({ undead, onClose }: UndeadDetailsModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const assaultPhase = useSelector(getPaladinsAssaultPhase)
  const activePaladin = useSelector(getActivePaladin)

  const getCanCastAbility = () => {
    if (!undead || undead.ability.used || assaultPhase !== PaladinsAssaultPhase.Fighting) {
      return false
    }
    if (isSeduction(undead.ability)) {
      return activePaladin.health <= undead.ability.targetPaladinMaxHealth && !isPaladinConsecrated(activePaladin)
    }
    return true
  }

  const handleCastAbility = undead
    ? () => {
        onClose()
        dispatch(castUndeadAbility(undead.id, undead.ability))
      }
    : undefined

  return (
    <Modal isOpen={!!undead} color={ModalColor.PURPLE} onClose={onClose}>
      {undead && (
        <>
          <div css={undeadDetailsHeader}>
            <UndeadPortrait type={undead.type} marginRight="0.5rem" />
            <div>
              <div>{t('undeadDetailsAbility')}</div>
              <div css={undeadDetailsName}>{t('undeadName', undead.type)}</div>
            </div>
          </div>
          <div css={purpleBox}>
            <UndeadAbilityDescription ability={undead.ability} showAssault />
          </div>
          <button
            type="button"
            css={[...darkPurpleSquareButton, smallMarginTop]}
            disabled={!getCanCastAbility()}
            onClick={handleCastAbility}
          >
            {t(undead.ability.used ? 'undeadDetailsUsed' : 'undeadDetailsUse')}
          </button>
        </>
      )}
    </Modal>
  )
}
