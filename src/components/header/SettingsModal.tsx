/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Modal } from '../ui/Modal'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title } from '../../styles/base'

export type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 css={h2Title}>{t('settings')}</h1>
    </Modal>
  )
}
