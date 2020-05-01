import React from 'react'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { h2Title, smallMarginTop } from '../../../styles/base'
import { UndeadBox } from '../../../components/undeads/UndeadBox'
import { useTranslation } from '../../../lang/useTranslation'
import { Undead } from '../../../data/undeads/helpers'
import { darkPurpleSquareButton } from '../../../styles/buttons'

export type ReanimatedUndeadModalProps = {
  isOpen: boolean
  onAcknowledge: () => void
  undead: Undead | null
}

export const ReanimatedUndeadModal = ({ isOpen, onAcknowledge, undead }: ReanimatedUndeadModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal color={ModalColor.PURPLE} isOpen={isOpen}>
      <h2 css={h2Title}>{t('reanimatedUndeadTitle')}</h2>
      {undead && <UndeadBox undead={undead} />}
      <button type="button" css={[...darkPurpleSquareButton, smallMarginTop]} onClick={onAcknowledge}>
        {t('reanimatedUndeadOk')}
      </button>
    </Modal>
  )
}
