import React from 'react'
import { css } from '@emotion/react'
import { Modal, ModalProps } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { greenBox, h2Title } from '../../styles/base'
import { ResourceType } from '../../config/constants'
import { ResourceIcon } from './ResourceIcon'
import { layers } from '../../config/theme'

const description = css({
  margin: '0',
})

const resourceRow = [
  greenBox,
  css({
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.4rem',
  }),
]

export const ResourcesModal = ({ isOpen, onClose }: Pick<ModalProps, 'isOpen' | 'onClose'>) => {
  const { t } = useTranslation()
  return (
    <Modal color={ModalColor.GREEN} isOpen={isOpen} onClose={onClose} priority={layers.INFO_MODAL}>
      <h2 css={h2Title}>{t('resourcesTitle')}</h2>
      <p css={description}>{t('resourcesDescription')}</p>
      {Object.values(ResourceType).map(resource => (
        <div key={resource} css={resourceRow}>
          <ResourceIcon type={resource} size="2rem" marginRight="0.4rem" />
          <div>{t(resource)}</div>
        </div>
      ))}
    </Modal>
  )
}
