import React from 'react'
import { css, keyframes } from '@emotion/react'
import { useSelector } from 'react-redux'
import { Building } from './Building'
import { useTranslation } from '../../lang/useTranslation'
import { ARSENAL, CATACOMBS, CHARNEL_HOUSE, OSSUARY, SOUL_WELL } from '../../config/routes'
import { getBuildings } from '../../data/buildings/selectors'
import { ARTIFACT_DEFENSE_BONUS, BuildingType, OnboardingStep, ResourceType } from '../../config/constants'
import { getHasArtifact } from '../../data/events/selectors'
import { Panel } from '../../components/ui/Panel/Panel'
import { breakpoints, colors, fonts, shadows, transitions } from '../../config/theme'
import runeImageUrl from '../../assets/images/items/rune.png'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import backgroundImageUrl from '../../assets/images/background.jpg'
import chainsUrl from '../../assets/images/buildings/chains.png'
import { OnboardingHighlight } from '../onboarding/components/OnboardingHighlight'
import { isArsenal, isCatacombs, isCharnelHouse, isOssuary, isSoulWell } from '../../data/buildings/helpers'

const slideIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-400px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const mainHubWrapper = css({
  [breakpoints.SM]: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
})

const mainHubList = css({
  paddingTop: '2rem',
  backgroundImage: `url("${chainsUrl}")`,
  backgroundSize: 'contain',
  animation: `${slideIn} ${transitions.SLOW_DURATION}ms ease-out both`,
  animationDelay: `${transitions.SLOW_DURATION}ms`,
})

const artifactPanel = css({
  position: 'relative',

  '&::before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    top: '0.4rem',
    left: 0,
    width: 'calc(100% - 0.2rem)',
    height: 'calc(100% - 0.4rem)',
    backgroundImage: `url(${runeImageUrl})`,
    backgroundPosition: 'right center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
})

const artifactText = css({
  position: 'relative',
  paddingRight: '6rem',
})

const artifactTitle = css({
  margin: 0,
  fontSize: '1.2rem',
  fontFamily: fonts.TITLES,
  textShadow: shadows.TEXT_SOLID,
  color: colors.CYAN,
})

const disabledBuilding = css({
  pointerEvents: 'none',
  cursor: 'not-allowed',
})

const charnelHouseHighlight = [OnboardingStep.HighlightCharnelHouse, OnboardingStep.HighlightProduction]
const soulWellHighlight = [OnboardingStep.HighlightProduction, OnboardingStep.BuildSoulWell]

export const MainHub = () => {
  const { t } = useTranslation()
  const buildings = useSelector(getBuildings)
  const hasArtifact = useSelector(getHasArtifact)

  return (
    <ScreenWrapper css={mainHubWrapper} backgroundUrl={backgroundImageUrl}>
      <div css={mainHubList}>
        {buildings.map(building => {
          if (isCharnelHouse(building)) {
            return (
              <OnboardingHighlight<HTMLAnchorElement> key={building.type} step={charnelHouseHighlight}>
                {({ className, ref, onClick, step }) => (
                  <Building
                    ref={ref}
                    css={step === OnboardingStep.HighlightProduction ? disabledBuilding : undefined}
                    className={className}
                    name={t(BuildingType.CharnelHouse)}
                    level={building.level}
                    description={t('charnelHouseDescription', building.produces[ResourceType.Meat] ?? 0)}
                    route={CHARNEL_HOUSE}
                    onClick={onClick}
                  />
                )}
              </OnboardingHighlight>
            )
          }
          if (isSoulWell(building)) {
            return (
              <OnboardingHighlight<HTMLAnchorElement> key={building.type} step={soulWellHighlight}>
                {({ className, ref, onClick, step }) => (
                  <Building
                    ref={ref}
                    css={step === OnboardingStep.HighlightProduction ? disabledBuilding : undefined}
                    className={className}
                    name={t(BuildingType.SoulWell)}
                    level={building.level}
                    description={t('soulWellDescription', building.produces[ResourceType.Souls] ?? 0)}
                    route={SOUL_WELL}
                    onClick={onClick}
                  />
                )}
              </OnboardingHighlight>
            )
          }
          if (isCatacombs(building)) {
            return (
              <Building
                key={building.type}
                name={t(building.type)}
                level={building.level}
                description={t('catacombDescription')}
                route={CATACOMBS}
              />
            )
          }
          if (isOssuary(building)) {
            return (
              <Building
                key={building.type}
                name={t(building.type)}
                level={building.level}
                description={t('ossuaryDescription')}
                route={OSSUARY}
              />
            )
          }
          if (isArsenal(building)) {
            return (
              <Building
                key={building.type}
                name={t(building.type)}
                level={building.level}
                description={t('arsenalDescription', building.trapsPerAssault)}
                route={ARSENAL}
              />
            )
          }
          return ((_: never) => _)(building)
        })}
        {hasArtifact && (
          <Panel css={artifactPanel}>
            <div css={artifactText}>
              <h2 css={artifactTitle}>{t('artifact')}</h2>
              <div>{t('artifactDescription', ARTIFACT_DEFENSE_BONUS)}</div>
            </div>
          </Panel>
        )}
      </div>
    </ScreenWrapper>
  )
}
