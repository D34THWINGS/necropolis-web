import React from 'react'
import { css } from '@emotion/core'
import { TRAP_DAMAGES_MAP, TRAP_NEMESIS_MAP, TrapType } from '../../../config/constants'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { Image } from '../../../components/images/Image'
import { trapsImageMap } from '../helpers/trapsImageMap'
import { greenBox, h2Title, textColor } from '../../../styles/base'
import { useTranslation } from '../../../lang/useTranslation'
import damageIcon from '../../../assets/images/traps/trap-damages.png'
import { colors } from '../../../config/theme'

const trapImage = css({
  margin: '-4rem -1rem 1rem',
})

const trapDetailsHeader = css({
  display: 'flex',
  alignItems: 'stretch',
  marginBottom: '1rem',
})

const trapDetailsBox = [
  greenBox,
  css({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
  }),
]

const trapDamages = [
  ...trapDetailsBox,
  css({
    marginRight: '1rem',
    color: colors.CYAN,
  }),
]

const trapType = [
  ...trapDetailsBox,
  css({
    flex: 1,
  }),
]

const trapNemesis = [
  ...trapDetailsBox,
  css({
    marginBottom: '1rem',
  }),
]

export type TrapDetailsModalProps = {
  type: TrapType | null
  onClose: () => void
}

export const TrapDetailsModal = ({ type, onClose }: TrapDetailsModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal isOpen={!!type} onClose={onClose} color={ModalColor.GREEN}>
      {type && (
        <>
          <h2 css={h2Title}>{t('trapName', type)}</h2>
          <Image css={trapImage} src={trapsImageMap[type]} size="calc(100% + 2rem)" />
          <div css={trapDetailsHeader}>
            <div css={trapDamages}>
              {TRAP_DAMAGES_MAP[type]}&nbsp;
              <Image src={damageIcon} />
            </div>
            <div css={trapType}>{t('paladinType')}</div>
          </div>
          <div css={trapNemesis}>
            <span css={textColor('RED')}>{t('trapNemesis')}</span>&nbsp;{t('paladinName', TRAP_NEMESIS_MAP[type])}
          </div>
          <div css={trapDetailsBox}>{t('trapDescription', type)}</div>
        </>
      )}
    </Modal>
  )
}
