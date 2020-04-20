/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal'
import { ExpeditionStep, ExpeditionType } from '../../../config/constants'
import { cyanSquareButton, greenSquareButton } from '../../../styles/buttons'
import { useTranslation } from '../../../lang/useTranslation'
import { h2Title } from '../../../styles/base'
import { beginExpedition, closeExpedition, endExpedition, fleeExpedition } from '../../../data/expeditions/actions'
import { getExpeditionStep, getOpenedExpedition } from '../../../data/expeditions/selectors'
import { Icon } from '../../../components/icons/Icon'
import greenArrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'

const expeditionButton = [
  ...cyanSquareButton,
  css({
    marginTop: '0.4rem',
  }),
]

const fleeExpeditionButton = [
  ...greenSquareButton,
  css({
    marginTop: '0.4rem',
    fontSize: '0.8rem',
    textAlign: 'left',
  }),
]

const fleeButtonText = css({
  flex: '1 1 auto',
})

export type ExpeditionModalProps = {
  type: ExpeditionType
  title: ReactNode
  renderOverview: () => ReactNode
  renderStep: (step: number) => ReactNode
  renderReward: () => ReactNode
  onCollectReward?: () => void
}

export const ExpeditionModal = ({
  type,
  title,
  renderOverview,
  renderStep,
  renderReward,
  onCollectReward,
}: ExpeditionModalProps) => {
  const { t } = useTranslation()
  const step = useSelector(getExpeditionStep(type)) ?? ExpeditionStep.Overview
  const openedExpedition = useSelector(getOpenedExpedition)
  const dispatch = useDispatch()

  const handleBeginExpedition = () => dispatch(beginExpedition(type))
  const handleEndExpedition = () => {
    if (onCollectReward) onCollectReward()
    dispatch(endExpedition(type))
  }
  const handleFleeExpedition = () => dispatch(fleeExpedition())
  const handleCloseOverview = () => dispatch(closeExpedition())

  const getContent = () => {
    switch (step) {
      case ExpeditionStep.Overview:
        return (
          <Fragment>
            {renderOverview()}
            <button type="button" css={expeditionButton} onClick={handleBeginExpedition}>
              {t('beginExpedition')}
            </button>
          </Fragment>
        )
      case ExpeditionStep.Reward:
        return (
          <Fragment>
            {renderReward()}
            <button type="button" css={expeditionButton} onClick={handleEndExpedition}>
              {t('endExpedition')}
            </button>
          </Fragment>
        )
      default:
        return (
          <Fragment>
            {renderStep(step)}
            <button type="button" css={fleeExpeditionButton} onClick={handleFleeExpedition}>
              <Icon src={greenArrowUrl} block marginRight="0.4rem" />
              <span css={fleeButtonText}>{t('fleeExpedition')}</span>
            </button>
          </Fragment>
        )
    }
  }

  return (
    <Modal
      isOpen={openedExpedition === type}
      onClose={step === ExpeditionStep.Overview ? handleCloseOverview : undefined}
    >
      <h2 css={h2Title}>{title}</h2>
      {getContent()}
    </Modal>
  )
}
