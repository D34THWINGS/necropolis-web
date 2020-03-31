/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Modal } from '../ui/Modal'
import { useTranslation } from '../../lang/useTranslation'
import { shadows } from '../../config/theme'

const settingsTitle = css({
  margin: 0,
  fontSize: '1.8rem',
  textAlign: 'center',
  textShadow: shadows.TEXT_SOLID,
})

export type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 css={settingsTitle}>{t('settings')}</h1>
    </Modal>
  )
}
