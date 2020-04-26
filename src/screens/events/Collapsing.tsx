/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { h2Title, textCenter } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { ARTIFACT_DEFENSE_BONUS } from '../../config/constants'
import { EventImage } from './components/EventImage'
import { eventStepDescription } from './helpers/eventStyles'
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
import { getTurn } from '../../data/turn/selectors'
import { getConstructedBuildings } from '../../data/buildings/selectors'

enum CollapsingStep {
  Setup,
  Shovel,
}

export const Collapsing = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const paladinsCounter = useSelector(getPaladinsCounter)
  const hasArtifact = useSelector(getHasArtifact)
  const turn = useSelector(getTurn)
  const constructedBuildings = useSelector(getConstructedBuildings)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <h2 css={h2Title}>{t('collapsingTitle')}</h2>
      {renderStep<CollapsingStep>((step, { renderAcknowledgeButton, goToStep }) => {
        switch (step) {
          case CollapsingStep.Setup: {
            const collapsedBuilding = constructedBuildings[turn % constructedBuildings.length]
            const handleLeave = () => {
              dispatch(collapseBuilding(collapsedBuilding))
              dispatch(endEvent())
            }
            const handleShovel = () => {
              dispatch(nextPhase())
              dispatch(endEvent())
            }
            return (
              <Fragment>
                <EventImage src={collapsingImageUrl} />
                <div css={eventStepDescription}>{t('collapsingStep1', t(collapsedBuilding))}</div>
                <EventAction
                  extra={t('collapsingAction1Cost')}
                  onClick={hasArtifact ? handleShovel : goToStep(CollapsingStep.Shovel)}
                >
                  {t('collapsingAction1')}
                </EventAction>
                <EventAction onClick={handleLeave}>{t('collapsingAction2')}</EventAction>
              </Fragment>
            )
          }
          case CollapsingStep.Shovel: {
            const handleShovel = () => {
              dispatch(gainArtifact())
              dispatch(increasePaladinsCounter())
              dispatch(nextPhase())
            }
            return (
              <Fragment>
                <EventImage src={artifactImageUrl} />
                <div css={eventStepDescription}>{t('collapsingStep2', ARTIFACT_DEFENSE_BONUS)}</div>
                <p css={textCenter}>
                  <PaladinsIcon counter={paladinsCounter + 1} />
                </p>
                {renderAcknowledgeButton(handleShovel)}
              </Fragment>
            )
          }
          default:
            throw new Error('Unknown step')
        }
      })}
    </Fragment>
  )
}
