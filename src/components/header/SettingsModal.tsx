/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title, smallMarginTop } from '../../styles/base'
import { greenSquareButton } from '../../styles/buttons'
import { resetGame } from '../../data/settings/actions'
import { layers } from '../../config/theme'
import { MAIN_MENU } from '../../config/routes'

export type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleResetGame = () => {
    dispatch(resetGame())
    onClose()
  }

  const handleGoToMainMenu = () => history.push(MAIN_MENU)

  return (
    <Modal isOpen={isOpen} onClose={onClose} priority={layers.SETTINGS}>
      <h2 css={h2Title}>{t('settings')}</h2>
      <button type="button" css={[...greenSquareButton, smallMarginTop]} onClick={handleResetGame}>
        {t('resetGame')}
      </button>
      <button type="button" css={[...greenSquareButton, smallMarginTop]} onClick={handleGoToMainMenu}>
        {t('goToMainMenu')}
      </button>
    </Modal>
  )
}
