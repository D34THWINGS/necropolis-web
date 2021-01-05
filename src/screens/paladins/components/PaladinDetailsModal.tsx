import React from 'react'
import { css } from '@emotion/react'
import { Modal } from '../../../components/ui/Modal/Modal'
import { isPaladinConsecrated, PaladinCard } from '../../../data/paladins/helpers'
import { useTranslation } from '../../../lang/useTranslation'
import { Image } from '../../../components/images/Image'
import { paladinsImageMap } from '../helpers/paladinsImageMap'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { h2Title, redBox } from '../../../styles/base'
import { colors, layers } from '../../../config/theme'
import damageIcon from '../../../assets/images/paladins/paladin-damage.png'
import { PALADINS_DAMAGES_MAP } from '../../../config/constants'
import { DamageCategories } from '../../../components/images/DamageCategories'
import { Health } from '../../../components/images/Health'

const paladinName = css({
  position: 'relative',
  color: colors.RED,
  filter: 'drop-shadow(0 0 5px black)',
})

const paladinImage = css({
  margin: '-4rem -1rem 1rem',
})

const paladinDetailsHeader = css({
  display: 'flex',
  alignItems: 'stretch',
  marginBottom: '1rem',
})

const detailsBox = [
  redBox,
  css({
    padding: '0.5rem 1rem',
  }),
]

const centeredDetailsBox = [
  ...detailsBox,
  css({
    display: 'flex',
    alignItems: 'center',
  }),
]

const paladinHealth = (shielded: boolean) => [
  ...centeredDetailsBox,
  css({
    justifyContent: 'center',
    marginRight: '1rem',
    minWidth: '5rem',
    color: colors.LIME,
  }),
  shielded
    ? css({
        backgroundColor: colors.CHAOS,
        border: `solid 2px ${colors.DARK_CHAOS}`,
      })
    : undefined,
]

const paladinTypes = [
  ...centeredDetailsBox,
  css({
    flex: 1,
  }),
]

const paladinDamages = [
  ...centeredDetailsBox,
  css({
    justifyContent: 'center',
    color: colors.RED,
    marginBottom: '1rem',
  }),
]

export type PaladinDetailsModalProps = {
  card: PaladinCard | null
  onClose: () => void
}

export const PaladinDetailsModal = ({ card, onClose }: PaladinDetailsModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal isOpen={!!card} onClose={onClose} color={ModalColor.RED} priority={layers.INFO_MODAL}>
      {card && (
        <>
          <h2 css={[h2Title, paladinName]}>{t('paladinName', card.type)}</h2>
          <Image css={paladinImage} src={paladinsImageMap[card.type]} size="calc(100% + 2rem)" />
          <div css={paladinDetailsHeader}>
            <div css={paladinHealth(card.shield)}>
              <Health health={card.health} maxHealth={card.health} />
            </div>
            <div css={paladinTypes}>
              {t('paladinType')}
              <DamageCategories categories={card.categories} />
            </div>
          </div>
          <div css={paladinDamages}>
            {PALADINS_DAMAGES_MAP[card.type]}&nbsp;
            <Image src={damageIcon} />
          </div>
          <div css={detailsBox}>
            {card.shield && (
              <>
                {t('paladinShielded')}
                <br />
              </>
            )}
            {isPaladinConsecrated(card) && (
              <>
                {t('paladinConsecrated')}
                <br />
              </>
            )}
            {t('paladinAbility', card.type)}
          </div>
        </>
      )}
    </Modal>
  )
}
