/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contentCover, h2Title } from '../styles/base'
import { getCurrentPhase } from '../data/turn/selectors'
import { greenSquareButton } from '../styles/buttons'
import { useTranslation } from '../lang/useTranslation'
import { nextPhase } from '../data/turn/actions'
import { OnboardingStep, ResourceType, TurnPhase } from '../config/constants'
import { getBuildingsProduction } from '../data/buildings/selectors'
import { ResourceIcon } from './images/ResourceIcon'
import { gainResources, spendResources } from '../data/resources/actions'
import { colors, shadows, transitions } from '../config/theme'
import { getUpkeep } from '../data/undeads/selectors'
import { fadeIn } from '../styles/animations'
import { Image } from './images/Image'
import arrowUrl from '../assets/images/onboarding/next-step-arrow.png'
import { getOnboardingStep } from '../data/onboarding/selectors'
import { nextOnboardingStep } from '../data/onboarding/actions'

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
          <Fragment>
            <h2 css={h2Title}>{t('productionPhaseTitle')}</h2>
            {isProducing ? (
              <Fragment>
                <p>{t('productionPhaseDescription')}</p>
                <div css={productionContainer}>
                  {Object.values(ResourceType)
                    .map(resource =>
                      production[resource] === 0 ? null : (
                        <span key={resource} css={productionCell}>
                          <ResourceIcon
                            type={resource}
                            text={<Fragment>+{production[resource]}</Fragment>}
                            marginLeft="0.5rem"
                            size="2rem"
                          />
                        </span>
                      ),
                    )
                    .filter(Boolean)}
                </div>
              </Fragment>
            ) : (
              <p>{t('productionPhaseNoProduction')}</p>
            )}
          </Fragment>
        )
      }
      case TurnPhase.Upkeep:
        return (
          <Fragment>
            <h2 css={h2Title}>{t('upkeepPhaseTitle')}</h2>
            <p>{t('upkeepPhaseDescription', upkeep)}</p>
          </Fragment>
        )
      default:
        throw new Error('Unkown phase')
    }
  }

  return (
    <div css={overlay}>
      <div css={content}>{getContent()}</div>
      <button type="button" css={nextPhaseButton} onClick={handleNextPhase}>
        <Image src={arrowUrl} marginRight="0.4rem" />
        {t('nextPhase')}
      </button>
    </div>
  )
}
