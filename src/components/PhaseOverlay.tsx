import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { contentCover, h2Title } from '../styles/base'
import { getCurrentPhase } from '../data/turn/selectors'
import { greenSquareButton } from '../styles/buttons'
import { useTranslation } from '../lang/useTranslation'
import { loose, nextPhase } from '../data/turn/actions'
import { LooseReason, OnboardingStep, ResourceType, TurnPhase } from '../config/constants'
import { getBuildingsProduction } from '../data/buildings/selectors'
import { ResourceIcon } from './resources/ResourceIcon'
import { gainResources, spendResources } from '../data/resources/actions'
import { colors, shadows, transitions } from '../config/theme'
import { getUpkeep } from '../data/undeads/selectors'
import { fadeIn } from '../styles/animations'
import { Image } from './images/Image'
import arrowUrl from '../assets/images/onboarding/next-step-arrow.png'
import { getOnboardingStep } from '../data/onboarding/selectors'
import { nextOnboardingStep } from '../data/onboarding/actions'
import { getMeat } from '../data/resources/selectors'

const overlay = [
  contentCover,
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: colors.WHITE,
    textAlign: 'center',
    textShadow: shadows.TEXT_FLAT,
    animation: `${fadeIn} ${transitions.SLOW}`,
  }),
]

const content = css({
  marginTop: '5rem',
  minHeight: '40vh',
})

const productionContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: '0.4rem',
})

const productionCell = css({
  margin: '0 0.5rem',
})

const nextPhaseButton = [
  ...greenSquareButton,
  css({
    width: 'auto',
  }),
]

export const PhaseOverlay = () => {
  const { t } = useTranslation()
  const onboardingStep = useSelector(getOnboardingStep)
  const currentPhase = useSelector(getCurrentPhase)
  const production = useSelector(getBuildingsProduction)
  const upkeep = useSelector(getUpkeep)
  const meat = useSelector(getMeat)
  const dispatch = useDispatch()

  if (currentPhase === TurnPhase.Action || currentPhase === TurnPhase.Event) {
    return null
  }

  const handleNextPhase = () => {
    if (currentPhase === TurnPhase.Production && onboardingStep === OnboardingStep.AwaitNextTurn) {
      dispatch(nextOnboardingStep())
    }
    if (currentPhase === TurnPhase.Production) {
      dispatch(gainResources(production))
    }
    if (currentPhase === TurnPhase.Upkeep) {
      dispatch(spendResources({ [ResourceType.Meat]: upkeep }))
    }
    dispatch(nextPhase())
  }

  const getContent = () => {
    switch (currentPhase) {
      case TurnPhase.Production: {
        const isProducing = Object.values(production).some(Boolean)
        return (
          <>
            <h2 css={h2Title}>{t('productionPhaseTitle')}</h2>
            {isProducing ? (
              <>
                <p>{t('productionPhaseDescription')}</p>
                <div css={productionContainer}>
                  {Object.values(ResourceType)
                    .map(resource =>
                      !production[resource] ? null : (
                        <span key={resource} css={productionCell} data-test-id="productionCell">
                          <ResourceIcon
                            type={resource}
                            text={<>+{production[resource]}</>}
                            marginLeft="0.5rem"
                            size="2rem"
                          />
                        </span>
                      ),
                    )
                    .filter(Boolean)}
                </div>
              </>
            ) : (
              <p>{t('productionPhaseNoProduction')}</p>
            )}
          </>
        )
      }
      case TurnPhase.Upkeep:
        return (
          <>
            <h2 css={h2Title}>{t('upkeepPhaseTitle')}</h2>
            {meat > 0 && <p data-test-id="undeadUpKeep">{t('upkeepPhaseDescription', upkeep)}</p>}
            {meat === 0 && <p>{t('upkeepNoMeat')}</p>}
          </>
        )
      default:
        throw new Error('Unkown phase')
    }
  }

  const getActionButton = () => {
    if (currentPhase === TurnPhase.Upkeep && meat === 0) {
      const handleLoose = () => dispatch(loose(LooseReason.Famine))

      return (
        <button type="button" css={nextPhaseButton} onClick={handleLoose}>
          <Image src={arrowUrl} marginRight="0.4rem" />
          {t('rip')}
        </button>
      )
    }

    return (
      <button type="button" css={nextPhaseButton} onClick={handleNextPhase} data-test-id="nextPhaseButton">
        <Image src={arrowUrl} marginRight="0.4rem" />
        {t('nextPhase')}
      </button>
    )
  }

  return (
    <div css={overlay}>
      <div css={content}>{getContent()}</div>
      {getActionButton()}
    </div>
  )
}
