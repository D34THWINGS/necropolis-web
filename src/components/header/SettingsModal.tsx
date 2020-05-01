/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch } from 'react-redux'
import { Modal } from '../ui/Modal'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title } from '../../styles/base'
import { greenSquareButton } from '../../styles/buttons'
import { resetGame } from '../../data/settings/actions'
import { layers } from '../../config/theme'

export type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleResetGame = () => {
    dispatch(resetGame())
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} priority={layers.SETTINGS}>
      <h2 css={h2Title}>{t('settings')}</h2>
      <button type="button" css={greenSquareButton} onClick={handleResetGame}>
        {t('resetGame')}
      </button>
    </Modal>
  )
}
