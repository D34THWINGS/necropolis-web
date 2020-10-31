import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { textCenter } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { EventAction } from './components/EventAction'
import { ResourceType } from '../../config/constants'
import { getMeat } from '../../data/resources/selectors'
import { gainResources, spendResources } from '../../data/resources/actions'
import { getLethality } from '../../data/selectors'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { getPaladinsCounter } from '../../data/paladins/selectors'
import { increasePaladinsCounter } from '../../data/paladins/actions'
import { preventSelectorUpdate } from '../../data/helpers'
import { EventImage } from './components/EventImage'
import plunderImageUrl from '../../assets/images/events/plunder.jpg'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'

const PLUNDER_FIGHT_LETHALITY = 4
const PLUNDER_REWARD_MEAT = 1
const PLUNDER_REWARD_BONES = 3
const PLUNDER_LEAVE_MEAT_COST = 10

enum PlunderStep {
  Setup,
  Battle,
  Leave,
}

export const Plunder = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const paladinsCounter = useSelector(getPaladinsCounter, preventSelectorUpdate)
  const lethality = useSelector(getLethality)
  const meat = useSelector(getMeat)
  const dispatch = useDispatch()

  return (
    <>
      <h2 css={eventTitle}>{t('plunderTitle')}</h2>
      {renderStep<PlunderStep>((step, { renderAcknowledgeButton, goToStep }) => {
        switch (step) {
          case PlunderStep.Setup:
            return (
              <>
                <EventImage src={plunderImageUrl} />
                <div css={eventStepDescription}>{t('plunderStep1')}</div>
                <EventAction
                  onClick={goToStep(PlunderStep.Battle)}
                  extra={t('plunderAction1Prerequisite', PLUNDER_FIGHT_LETHALITY)}
                  disabled={lethality < PLUNDER_FIGHT_LETHALITY}
                >
                  {t('plunderAction1')}
                </EventAction>
                <EventAction onClick={goToStep(PlunderStep.Leave)}>{t('plunderAction2')}</EventAction>
              </>
            )
          case PlunderStep.Battle: {
            const handleFight = () => {
              dispatch(
                gainResources({ [ResourceType.Meat]: PLUNDER_REWARD_MEAT, [ResourceType.Bones]: PLUNDER_REWARD_BONES }),
              )
              dispatch(increasePaladinsCounter())
            }

            return (
              <>
                {t('plunderStep2', PLUNDER_REWARD_MEAT, PLUNDER_REWARD_BONES)}
                <p css={textCenter}>
                  <PaladinsIcon counter={paladinsCounter + 1} />
                </p>
                {renderAcknowledgeButton(handleFight)}
              </>
            )
          }
          case PlunderStep.Leave: {
            const meatCost = Math.min(PLUNDER_LEAVE_MEAT_COST, meat)

            const handleLeave = () => {
              dispatch(spendResources({ [ResourceType.Meat]: meatCost }))
              dispatch(increasePaladinsCounter())
            }

            return (
              <>
                {t('plunderStep3', meatCost)}
                <p css={textCenter}>
                  <PaladinsIcon counter={paladinsCounter + 1} />
                </p>
                {renderAcknowledgeButton(handleLeave)}
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
