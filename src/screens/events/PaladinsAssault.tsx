/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title } from '../../styles/base'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { EventAction } from './components/EventAction'
import { getPaladinsStrength } from '../../data/paladins/selectors'
import { getUndeadCount } from '../../data/undeads/selectors'
import { gainResources } from '../../data/resources/actions'
import { ResourceType } from '../../config/constants'
import { killAllUndead, requireSacrifice } from '../../data/undeads/actions'
import { resetPaladinsCounter } from '../../data/paladins/actions'
import { getDefense } from '../../data/selectors'

enum PaladinsAssaultStep {
  Setup,
  Victory,
  Defeat,
  TotalDefeat,
}

const PALADINS_ASSAULT_WEAK = 3
const PALADINS_ASSAULT_MEDIUM = 6

export const PaladinsAssault = ({ renderStep }: EventModalContentProps) => {
  const { t } = useTranslation()
  const paladinsStrength = useSelector(getPaladinsStrength)
  const defenseBonus = useSelector(getDefense)
  const undeadCount = useSelector(getUndeadCount)
  const dispatch = useDispatch()

  const diff = paladinsStrength - defenseBonus

  const getDescription = () => {
    if (paladinsStrength <= PALADINS_ASSAULT_WEAK) {
      return t('paladinsAssaultWeak')
    }
    if (paladinsStrength <= PALADINS_ASSAULT_MEDIUM) {
      return t('paladinsAssaultMedium')
    }
    return t('paladinsAssaultStrong')
  }

  const getNextStep = () => {
    if (diff <= 0) {
      return PaladinsAssaultStep.Victory
    }
    if (diff >= undeadCount) {
      return PaladinsAssaultStep.TotalDefeat
    }
    return PaladinsAssaultStep.Defeat
  }

  return (
    <Fragment>
      <h2 css={h2Title}>{t('paladinsAssaultTitle')}</h2>
      {renderStep<PaladinsAssaultStep>((step, { goToStep, renderAcknowledgeButton }) => {
        const handleEndAssault = () => {
          if (Math.abs(diff) > 0) {
            dispatch(gainResources({ [ResourceType.Meat]: Math.abs(diff) }))
          }
          dispatch(resetPaladinsCounter())
        }
        switch (step) {
          case PaladinsAssaultStep.Setup:
            return (
              <Fragment>
                {getDescription()}
                <EventAction
                  extra={t('paladinsAssaultPrerequisite', paladinsStrength)}
                  onClick={goToStep(getNextStep())}
                >
                  {t('paladinsAssaultAction1')}
                </EventAction>
              </Fragment>
            )
          case PaladinsAssaultStep.Victory: {
            return (
              <Fragment>
                {t('paladinsAssaultVictory', Math.abs(diff))}
                {renderAcknowledgeButton(handleEndAssault)}
              </Fragment>
            )
          }
          case PaladinsAssaultStep.Defeat: {
            const handleDefeat = () => {
              dispatch(requireSacrifice(Math.abs(diff)))
              handleEndAssault()
            }
            return (
              <Fragment>
                {t('paladinsAssaultDefeat', Math.abs(diff), Math.abs(diff))}
                {renderAcknowledgeButton(handleDefeat)}
              </Fragment>
            )
          }
          case PaladinsAssaultStep.TotalDefeat: {
            const handleTotalDefeat = () => dispatch(killAllUndead())
            return (
              <Fragment>
                {t('paladinsAssaultTotalDefeat')}
                {renderAcknowledgeButton(handleTotalDefeat)}
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
