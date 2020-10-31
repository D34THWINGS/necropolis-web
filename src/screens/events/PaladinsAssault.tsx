import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { textColor } from '../../styles/base'
import { EventModalContentProps } from './helpers/eventModalContentProps'
import { EventAction } from './components/EventAction'
import { getPaladinsStrength } from '../../data/paladins/selectors'
import { getUndeadCount } from '../../data/undeads/selectors'
import { gainResources } from '../../data/resources/actions'
import { LooseReason, ResourceType } from '../../config/constants'
import { requireSacrifice } from '../../data/undeads/actions'
import { resetPaladinsCounter } from '../../data/paladins/actions'
import { getDefense } from '../../data/selectors'
import paladinsAssault1ImageUrl from '../../assets/images/events/paladins-assault-1.jpg'
import paladinsAssault2ImageUrl from '../../assets/images/events/paladins-assault-2.jpg'
import paladinsAssault3ImageUrl from '../../assets/images/events/paladins-assault-3.jpg'
import { EventImage } from './components/EventImage'
import { eventStepDescription, eventTitle } from './helpers/eventStyles'
import { loose } from '../../data/turn/actions'

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
  const defense = useSelector(getDefense)
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

  const getImageUrl = () => {
    if (paladinsStrength <= PALADINS_ASSAULT_WEAK) {
      return paladinsAssault1ImageUrl
    }
    if (paladinsStrength <= PALADINS_ASSAULT_MEDIUM) {
      return paladinsAssault2ImageUrl
    }
    return paladinsAssault3ImageUrl
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
    <>
      <h2 css={eventTitle}>{t('paladinsAssaultTitle')}</h2>
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
              <>
                <EventImage src={getImageUrl()} />
                <div css={eventStepDescription}>
                  {getDescription()}
                  <br />
                  <span css={textColor('LIME')}>{t('currentDefense', defense)}</span>
                </div>
                <EventAction
                  extra={t('paladinsAssaultPrerequisite', paladinsStrength)}
                  onClick={goToStep(getNextStep())}
                >
                  {t('paladinsAssaultAction1')}
                </EventAction>
              </>
            )
          case PaladinsAssaultStep.Victory: {
            return (
              <>
                {t('paladinsAssaultVictory', Math.abs(diff))}
                {renderAcknowledgeButton(handleEndAssault)}
              </>
            )
          }
          case PaladinsAssaultStep.Defeat: {
            const handleDefeat = () => {
              dispatch(requireSacrifice(Math.abs(diff)))
              handleEndAssault()
            }
            return (
              <>
                {t('paladinsAssaultDefeat', Math.abs(diff), Math.abs(diff))}
                {renderAcknowledgeButton(handleDefeat)}
              </>
            )
          }
          case PaladinsAssaultStep.TotalDefeat: {
            const handleTotalDefeat = () => dispatch(loose(LooseReason.PaladinsAssault))
            return (
              <>
                {t('paladinsAssaultTotalDefeat')}
                {renderAcknowledgeButton(handleTotalDefeat)}
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
