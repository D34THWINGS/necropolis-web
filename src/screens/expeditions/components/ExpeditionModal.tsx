import React, { ReactNode, useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ExpeditionType } from '../../../config/constants'
import { cyanSquareButton, greenSquareButton } from '../../../styles/buttons'
import { useTranslation } from '../../../lang/useTranslation'
import { greenBox, h2Title, textColor } from '../../../styles/base'
import { beginExpedition, closeExpedition, endExpedition, setExpeditionStep } from '../../../data/expeditions/actions'
import { getExpeditionStep, getOpenedExpedition } from '../../../data/expeditions/selectors'
import { Image } from '../../../components/images/Image'
import greenArrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'
import treasureUrl from '../../../assets/images/expeditions/treasure.png'
import lootUrl from '../../../assets/images/expeditions/loot.png'
import { ExpeditionFlee } from './ExpeditionFlee'

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

const lootWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '0.5rem 0',
})

const lootInner = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  filter: 'brightness(1.3)',
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
      renderLoot: (children?: ReactNode) => ReactNode
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
  const [isFleeing, setIsFleeing] = useState(false)
  const step = useSelector(getExpeditionStep(type))
  const openedExpedition = useSelector(getOpenedExpedition)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!openedExpedition && isFleeing) {
      setIsFleeing(false)
    }
  }, [openedExpedition])

  const handleBeginExpedition = () => dispatch(beginExpedition(type))
  const handleCloseOverview = () => dispatch(closeExpedition())

  const getContent = () => {
    if (step === undefined) {
      return (
        <>
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
        </>
      )
    }

    if (isFleeing) {
      return <ExpeditionFlee />
    }

    const goToStep = (newStep: TStep) => () => dispatch(setExpeditionStep(type, newStep))
    return (
      <>
        {renderStep(step as TStep, {
          goToStep,
          renderFleeButton: () => {
            const handleFleeExpedition = () => setIsFleeing(true)
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
          renderLoot: (children?: ReactNode) => (
            <div css={lootWrapper}>
              <Image src={lootUrl} size="10rem" />
              <div css={lootInner}>{children}</div>
            </div>
          ),
        })}
      </>
    )
  }

  return (
    <Modal isOpen={openedExpedition === type} onClose={step === undefined ? handleCloseOverview : undefined} noWobble>
      <h2 css={h2Title}>{title}</h2>
      {openedExpedition === type && getContent()}
    </Modal>
  )
}
