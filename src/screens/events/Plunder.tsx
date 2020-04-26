/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { h2Title } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { EventAction } from './components/EventAction'
import {
  PLUNDER_FIGHT_LETHALITY,
  PLUNDER_LEAVE_MATERIAL_COST,
  PLUNDER_REWARD_BONES,
  PLUNDER_REWARD_MEAT,
  ResourceType,
} from '../../config/constants'
import { getMaterials } from '../../data/resources/selectors'
import { gainResources, spendResources } from '../../data/resources/actions'
import { getLethality } from '../../data/selectors'

enum PlunderStep {
  Setup,
  Battle,
  Leave,
}

export const Plunder = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
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
            const handleFight = () =>
              dispatch(
                gainResources({ [ResourceType.Meat]: PLUNDER_REWARD_MEAT, [ResourceType.Bones]: PLUNDER_REWARD_BONES }),
              )

            return (
              <Fragment>
                {t('plunderStep2', PLUNDER_REWARD_MEAT, PLUNDER_REWARD_BONES)}
                {renderAcknowledgeButton(handleFight)}
              </Fragment>
            )
          }
          case PlunderStep.Leave: {
            const materialsCost = Math.min(PLUNDER_LEAVE_MATERIAL_COST, materials)
            const meatCost = PLUNDER_LEAVE_MATERIAL_COST - materialsCost

            const handleLeave = () =>
              dispatch(spendResources({ [ResourceType.Materials]: materialsCost, [ResourceType.Meat]: meatCost }))

            return (
              <Fragment>
                {t('plunderStep3', materialsCost, meatCost)}
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
