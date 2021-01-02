import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { textCenter } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { ARTIFACT_DEFENSE_BONUS } from '../../config/constants'
import { EventImage } from './components/EventImage'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'
import { EventAction } from './components/EventAction'
import { nextPhase } from '../../data/turn/actions'
import { endEvent, gainArtifact } from '../../data/events/actions'
import { getPaladinsCounter } from '../../data/paladins/selectors'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { increasePaladinsCounter } from '../../data/paladins/actions'
import collapsingImageUrl from '../../assets/images/events/collapsing.jpg'
import artifactImageUrl from '../../assets/images/events/artifact.jpg'
import { getHasArtifact } from '../../data/events/selectors'
import { collapseBuilding } from '../../data/buildings/actions'
import { getConstructedBuildings } from '../../data/buildings/selectors'
import { drawRandomInArray, preventSelectorUpdate } from '../../data/helpers'

enum CollapsingStep {
  Setup,
  Shovel,
}

export const Collapsing = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const paladinsCounter = useSelector(getPaladinsCounter, preventSelectorUpdate)
  const hasArtifact = useSelector(getHasArtifact)
  const constructedBuildings = useSelector(getConstructedBuildings)
  const dispatch = useDispatch()

  return (
    <>
      <h2 css={eventTitle}>{t('collapsingTitle')}</h2>
      {renderStep<CollapsingStep>((step, { renderAcknowledgeButton, goToStep }) => {
        switch (step) {
          case CollapsingStep.Setup: {
            const collapsedBuilding = drawRandomInArray(constructedBuildings)
            const handleLeave = () => {
              dispatch(collapseBuilding(collapsedBuilding))
              dispatch(endEvent())
            }
            const handleShovel = () => {
              dispatch(nextPhase())
              dispatch(endEvent())
            }
            return (
              <>
                <EventImage src={collapsingImageUrl} />
                <div css={eventStepDescription}>{t('collapsingStep1', t(collapsedBuilding.type))}</div>
                <EventAction
                  extra={t('collapsingAction1Cost')}
                  onClick={hasArtifact ? handleShovel : goToStep(CollapsingStep.Shovel)}
                >
                  {t('collapsingAction1')}
                </EventAction>
                <EventAction onClick={handleLeave}>{t('collapsingAction2')}</EventAction>
              </>
            )
          }
          case CollapsingStep.Shovel: {
            const handleShovel = () => {
              dispatch(gainArtifact())
              dispatch(increasePaladinsCounter())
              dispatch(nextPhase())
            }
            return (
              <>
                <EventImage src={artifactImageUrl} />
                <div css={eventStepDescription}>{t('collapsingStep2', ARTIFACT_DEFENSE_BONUS)}</div>
                <p css={textCenter}>
                  <PaladinsIcon counter={paladinsCounter + 1} />
                </p>
                {renderAcknowledgeButton(handleShovel)}
              </>
            )
          }
          default:
            throw new Error('Unknown step')
        }
      })}
    </>
  )
}
