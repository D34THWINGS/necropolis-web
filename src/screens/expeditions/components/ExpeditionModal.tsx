/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal'
import { ExpeditionType } from '../../../config/constants'
import { cyanSquareButton, greenSquareButton } from '../../../styles/buttons'
import { useTranslation } from '../../../lang/useTranslation'
import { greenBox, h2Title, textColor } from '../../../styles/base'
import {
  beginExpedition,
  closeExpedition,
  endExpedition,
  fleeExpedition,
  setExpeditionStep,
} from '../../../data/expeditions/actions'
import { getExpeditionStep, getOpenedExpedition } from '../../../data/expeditions/selectors'
import { Image } from '../../../components/images/Image'
import greenArrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'
import treasureUrl from '../../../assets/images/expeditions/treasure.png'

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
    fontSize: '0.9rem',
    textAlign: 'left',
  }),
]

const fleeButtonText = css({
  flex: '1 1 auto',
})

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

export type ExpeditionModalProps<TStep> = {
  type: ExpeditionType
  title: ReactNode
  renderOverview: () => ReactNode
  renderStep: (
    step: TStep,
    actions: {
      goToStep: (step: TStep) => () => void
      renderEndButton: (onClick?: () => void) => ReactNode
      renderFleeButton: () => ReactNode
      renderContinueButton: (step: TStep, onClick?: () => void) => ReactNode
    },
  ) => ReactNode
  renderTreasure: () => ReactNode
}

export const ExpeditionModal = <TStep extends number = number>({
  type,
  title,
  renderOverview,
  renderStep,
  renderTreasure,
}: ExpeditionModalProps<TStep>) => {
  const { t } = useTranslation()
  const step = useSelector(getExpeditionStep(type))
  const openedExpedition = useSelector(getOpenedExpedition)
  const dispatch = useDispatch()

  const handleBeginExpedition = () => dispatch(beginExpedition(type))
  const handleCloseOverview = () => dispatch(closeExpedition())

  const getContent = () => {
    if (step === undefined) {
      return (
        <Fragment>
          {renderOverview()}
          <div css={treasureContainer}>
            <Image css={treasureImage} src={treasureUrl} size="14rem" />
            <div css={greenBox}>
              <span css={textColor('CYAN')}>{t('expeditionTreasure')}</span> {renderTreasure()}
            </div>
          </div>
          <button type="button" css={expeditionButton} onClick={handleBeginExpedition}>
            {t('beginExpedition')}
          </button>
        </Fragment>
      )
    }

    const goToStep = (newStep: TStep) => () => dispatch(setExpeditionStep(type, newStep))
    return (
      <Fragment>
        {renderStep(step as TStep, {
          goToStep,
          renderFleeButton: () => {
            const handleFleeExpedition = () => dispatch(fleeExpedition())
            return (
              <button type="button" css={fleeExpeditionButton} onClick={handleFleeExpedition}>
                <Image src={greenArrowUrl} block marginRight="0.4rem" />
                <span css={fleeButtonText}>{t('fleeExpedition')}</span>
              </button>
            )
          },
          renderEndButton: onClick => {
            const handleEndExpedition = () => {
              if (onClick) {
                onClick()
              }
              dispatch(endExpedition(type))
            }
            return (
              <button type="button" css={expeditionButton} onClick={handleEndExpedition}>
                {t('endExpedition')}
              </button>
            )
          },
          renderContinueButton: (newStep, onClick) => {
            const handleContinue = () => {
              if (onClick) {
                onClick()
              }
              goToStep(newStep)()
            }
            return (
              <button type="button" css={expeditionButton} onClick={handleContinue}>
                {t('expeditionContinue')}
              </button>
            )
          },
        })}
      </Fragment>
    )
  }

  return (
    <Modal isOpen={openedExpedition === type} onClose={step === undefined ? handleCloseOverview : undefined}>
      <h2 css={h2Title}>{title}</h2>
      {openedExpedition === type && getContent()}
    </Modal>
  )
}
