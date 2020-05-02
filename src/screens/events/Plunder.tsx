/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { h2Title, textCenter } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { EventAction } from './components/EventAction'
import { ResourceType } from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import { gainResources, spendResources } from '../../data/resources/actions'
import { getLethality } from '../../data/selectors'
import { PaladinsIcon } from '../../components/images/PaladinsIcon'
import { getPaladinsCounter } from '../../data/paladins/selectors'
import { increasePaladinsCounter } from '../../data/paladins/actions'

const PLUNDER_FIGHT_LETHALITY = 4
const PLUNDER_REWARD_MEAT = 1
const PLUNDER_REWARD_BONES = 3
const PLUNDER_LEAVE_MEAT_COST = 5

enum PlunderStep {
  Setup,
  Battle,
  Leave,
}

export const Plunder = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const paladinsCounter = useSelector(getPaladinsCounter)
  const lethality = useSelector(getLethality)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <h2 css={h2Title}>{t('plunderTitle')}</h2>
      {renderStep<PlunderStep>((step, { renderAcknowledgeButton, goToStep }) => {
        switch (step) {
          case PlunderStep.Setup:
            return (
              <Fragment>
                {t('plunderStep1')}
                <EventAction
                  onClick={goToStep(PlunderStep.Battle)}
                  extra={t('plunderAction1Prerequisite', PLUNDER_FIGHT_LETHALITY)}
                  disabled={lethality < PLUNDER_FIGHT_LETHALITY}
                >
                  {t('plunderAction1')}
                </EventAction>
                <EventAction onClick={goToStep(PlunderStep.Leave)}>{t('plunderAction2')}</EventAction>
              </Fragment>
            )
          case PlunderStep.Battle: {
            const handleFight = () => {
              dispatch(
                gainResources({ [ResourceType.Meat]: PLUNDER_REWARD_MEAT, [ResourceType.Bones]: PLUNDER_REWARD_BONES }),
              )
              dispatch(increasePaladinsCounter())
            }

            return (
              <Fragment>
                {t('plunderStep2', PLUNDER_REWARD_MEAT, PLUNDER_REWARD_BONES)}
                <p css={textCenter}>
                  <PaladinsIcon counter={paladinsCounter + 1} />
                </p>
                {renderAcknowledgeButton(handleFight)}
              </Fragment>
            )
          }
          case PlunderStep.Leave: {
            const meatCost = Math.min(PLUNDER_LEAVE_MEAT_COST, materials)

            const handleLeave = () => {
              dispatch(spendResources({ [ResourceType.Meat]: meatCost }))
              dispatch(increasePaladinsCounter())
            }

            return (
              <Fragment>
                {t('plunderStep3', meatCost)}
                <p css={textCenter}>
                  <PaladinsIcon counter={paladinsCounter + 1} />
                </p>
                {renderAcknowledgeButton(handleLeave)}
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
