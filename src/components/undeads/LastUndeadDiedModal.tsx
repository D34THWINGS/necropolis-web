import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { getUndeadCount } from '../../data/undeads/selectors'
import { darkPurpleSquareButton } from '../../styles/buttons'
import { loose } from '../../data/turn/actions'
import { LooseReason } from '../../config/constants'
import { smallMarginTop } from '../../styles/base'
import { layers } from '../../config/theme'

export const LastUndeadDiedModal = () => {
  const { t } = useTranslation()
  const undeadCount = useSelector(getUndeadCount)
  const dispatch = useDispatch()

  const handleLoose = () => dispatch(loose(LooseReason.UndeadsKilled))

  return (
    <Modal isOpen={undeadCount === 0} color={ModalColor.PURPLE} priority={layers.LOOSE_REASON}>
      {t('undeadAllDead')}
      <button type="button" css={[darkPurpleSquareButton, smallMarginTop]} onClick={handleLoose}>
        {t('rip')}
      </button>
    </Modal>
  )
}
