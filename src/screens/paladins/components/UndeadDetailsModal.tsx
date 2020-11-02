import React from 'react'
import { css } from '@emotion/core'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { Undead } from '../../../data/undeads/helpers'
import { useTranslation } from '../../../lang/useTranslation'
import { UndeadPortrait } from '../../../components/undeads/UndeadPortrait'
import { colors, fonts } from '../../../config/theme'
import { purpleBox, smallMarginTop, textColor } from '../../../styles/base'
import { darkPurpleSquareButton } from '../../../styles/buttons'

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
            <span css={textColor('PURPLE')}>{t('undeadAbility')}</span> {t('undeadAbilityDescription', undead.type)}
          </div>
          <button type="button" css={[...darkPurpleSquareButton, smallMarginTop]}>
            {t('undeadDetailsUse')}
          </button>
        </>
      )}
    </Modal>
  )
}
