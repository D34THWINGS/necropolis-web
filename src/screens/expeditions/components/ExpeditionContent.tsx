import React, { ReactNode, useState } from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionType, ResourceType } from '../../../config/constants'
import { cyanSquareButton, greenSquareButton } from '../../../styles/buttons'
import { useTranslation } from '../../../lang/useTranslation'
import { h2Title } from '../../../styles/base'
import { endExpedition, setExpeditionStep } from '../../../data/expeditions/actions'
import { getExpeditionStep, getObstacle, getOpenedExpedition } from '../../../data/expeditions/selectors'
import { Image } from '../../../components/images/Image'
import greenArrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'
import { ExpeditionFlee } from './ExpeditionFlee'
import { ResourceLoot } from '../../../components/resources/ResourceLoot'
import { ExpeditionObstacle } from './obstacles/ExpeditionObstacle'
import { Obstacle } from '../../../data/expeditions/helpers'
import { Frame } from '../../../components/ui/Frame'

const expeditionPanelInner = [
  css({
    alignItems: 'stretch',
    padding: '1rem 2rem',
  }),
]

const expeditionTitle = [
  h2Title,
  css({
    position: 'relative',
    zIndex: 1,
  }),
]

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

export type ExpeditionModalProps<TStep extends number = number, TObstacle extends string = string> = {
  type: ExpeditionType
  title: ReactNode
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
  renderObstacle?: (
    obstacle: Obstacle<TObstacle>,
    actions: { goToStep: (step: TStep) => void; endExpedition: () => void },
  ) => {
    title: ReactNode
    rewardText: ReactNode
    rewardResources: [ResourceType, number][]
    renderRowTitle: (index: number) => ReactNode
    onEnd: () => void
  }
}

export const ExpeditionContent = <TStep extends number = number, TObstacle extends string = string>({
  type,
  title,
  renderStep,
  renderObstacle,
}: ExpeditionModalProps<TStep, TObstacle>) => {
  const { t } = useTranslation()
  const [isFleeing, setIsFleeing] = useState(false)
  const step = useSelector(getExpeditionStep(type))
  const openedExpedition = useSelector(getOpenedExpedition)
  const obstacle = useSelector(getObstacle)
  const dispatch = useDispatch()

  if (!!obstacle && !isFleeing && renderObstacle) {
    const {
      title: obstacleTitle,
      renderRowTitle,
      rewardText,
      rewardResources,
      onEnd,
    } = renderObstacle(obstacle as Obstacle<TObstacle>, {
      goToStep: (newStep: TStep) => dispatch(setExpeditionStep(type, newStep)),
      endExpedition: () => dispatch(endExpedition(type)),
    })
    return (
      <Frame css={expeditionPanelInner} fullPage>
        <ExpeditionObstacle
          title={obstacleTitle}
          rewardText={rewardText}
          rewardResources={rewardResources}
          obstacle={obstacle as Obstacle<TObstacle>}
          renderRowTitle={renderRowTitle}
          onEnd={onEnd}
          onFlee={() => setIsFleeing(true)}
        />
      </Frame>
    )
  }

  const getContent = () => {
    if (isFleeing) {
      const handleFleeExpedition = () => setIsFleeing(false)

      return <ExpeditionFlee onFlee={handleFleeExpedition} />
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
              <button
                type="button"
                css={expeditionButton}
                onClick={handleEndExpedition}
                data-test-id="endExpeditionButton"
              >
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
          renderLoot: (children?: ReactNode) => <ResourceLoot>{children}</ResourceLoot>,
        })}
      </>
    )
  }

  return (
    <Frame css={expeditionPanelInner} fullPage>
      <h2 css={expeditionTitle}>{title}</h2>
      <div>{openedExpedition === type && getContent()}</div>
    </Frame>
  )
}
