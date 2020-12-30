import React from 'react'
import { css } from '@emotion/react'
import { TRAP_DAMAGES_MAP, TRAP_NEMESIS_MAP, TRAP_TARGET_CATEGORIES_MAP, TrapType } from '../../../config/constants'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { Image } from '../../../components/images/Image'
import { trapsImageMap } from '../helpers/trapsImageMap'
import { greenBox, h2Title, textColor } from '../../../styles/base'
import { useTranslation } from '../../../lang/useTranslation'
import damageIcon from '../../../assets/images/traps/trap-damages.png'
import { colors } from '../../../config/theme'
import { DamageCategories } from '../../../components/images/DamageCategories'

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

  const nemesis = type !== null ? TRAP_NEMESIS_MAP[type] : null
  const damages = type !== null ? TRAP_DAMAGES_MAP[type] : 0

  return (
    <Modal isOpen={!!type} onClose={onClose} color={ModalColor.GREEN}>
      {type && (
        <>
          <h2 css={h2Title}>{t('trapName', type)}</h2>
          <Image css={trapImage} src={trapsImageMap[type]} size="calc(100% + 2rem)" />
          <div css={trapDetailsHeader}>
            <div css={trapDamages}>
              {damages}&nbsp;
              <Image src={damageIcon} />
            </div>
            <div css={trapType}>
              {t('paladinType')}
              <DamageCategories categories={TRAP_TARGET_CATEGORIES_MAP[type]} />
            </div>
          </div>
          {nemesis && (
            <div css={trapNemesis}>
              <span css={textColor('RED')}>{t('trapNemesis')}</span>&nbsp;{t('paladinName', nemesis)}
            </div>
          )}
          <div css={trapDetailsBox}>
            <p>{t('trapDescription', type)}</p>
          </div>
        </>
      )}
    </Modal>
  )
}
