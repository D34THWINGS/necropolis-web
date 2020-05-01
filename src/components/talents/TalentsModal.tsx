/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Modal, ModalProps } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { greenBox, h2Title } from '../../styles/base'
import { UndeadTalent } from '../../config/constants'
import { TalentIcon } from './TalentIcon'
import { layers } from '../../config/theme'

const description = css({
  margin: '0',
})

const talentRow = [
  greenBox,
  css({
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.4rem',
  }),
]

export const TalentsModal = ({ isOpen, onClose }: Pick<ModalProps, 'isOpen' | 'onClose'>) => {
  const { t } = useTranslation()
  return (
    <Modal color={ModalColor.GREEN} isOpen={isOpen} onClose={onClose} priority={layers.TALENTS}>
      <h2 css={h2Title}>{t('talentsTitle')}</h2>
      <p css={description}>{t('talentsDescription')}</p>
      {Object.values(UndeadTalent).map(talent => (
        <div key={talent} css={talentRow}>
          <TalentIcon type={talent} size="2rem" marginRight="0.4rem" />
          <div>{t(talent)}</div>
        </div>
      ))}
    </Modal>
  )
}
