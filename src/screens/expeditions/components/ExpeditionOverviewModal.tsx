import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../../components/ui/Modal/Modal'
import { Image } from '../../../components/images/Image'
import treasureUrl from '../../../assets/images/expeditions/treasure.png'
import { greenBox, textColor } from '../../../styles/base'
import { cyanSquareButton } from '../../../styles/buttons'
import { beginExpedition } from '../../../data/expeditions/actions'
import { useTranslation } from '../../../lang/useTranslation'
import { ExpeditionType } from '../../../config/constants'

const treasureContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  margin: '0.4rem 0',
  textAlign: 'center',
})

const treasureImage = css({
  alignSelf: 'center',
})

const expeditionButton = [
  ...cyanSquareButton,
  css({
    marginTop: '0.4rem',
  }),
]

export type ExpeditionOverviewModalProps = {
  type: ExpeditionType | null
  renderReward: (type: ExpeditionType) => ReactNode
  renderOverview: (type: ExpeditionType) => ReactNode
  onClose: () => void
}

export const ExpeditionOverviewModal = ({
  onClose,
  type,
  renderReward,
  renderOverview,
}: ExpeditionOverviewModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleBeginExpedition = () => {
    if (type) {
      dispatch(beginExpedition(type))
    }
  }

  return (
    <Modal isOpen={!!type} onClose={onClose}>
      {type && (
        <>
          {renderOverview(type)}
          <div css={treasureContainer}>
            <Image css={treasureImage} src={treasureUrl} size="14rem" />
            <div css={greenBox}>
              <span css={textColor('CYAN')}>{t('expeditionTreasure')}</span> {renderReward(type)}
            </div>
          </div>
          <button
            type="button"
            css={expeditionButton}
            onClick={handleBeginExpedition}
            data-test-id="beginExpeditionButton"
          >
            {t('beginExpedition')}
          </button>
        </>
      )}
    </Modal>
  )
}
