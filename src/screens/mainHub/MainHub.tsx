import React from 'react'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Building } from './Building'
import { useTranslation } from '../../lang/useTranslation'
import { BATTLEMENTS, CATACOMBS, CHARNEL_HOUSE, OSSUARY, SOUL_WELL } from '../../config/routes'
import { getBuildings } from '../../data/buildings/selectors'
import { ARTIFACT_DEFENSE_BONUS, BuildingType, OnboardingStep } from '../../config/constants'
import {
  getBattlementsDefenseBonus,
  getCharnelHouseBonesProduction,
  getCharnelHouseMeatProduction,
  getCharnelHouseProductionTurns,
  getMaxUndeadRaising,
  getSoulWellSoulProduction,
} from '../../data/buildings/helpers'
import { getRaisedUndeadCount } from '../../data/undeads/selectors'
import { getHasArtifact } from '../../data/events/selectors'
import { Panel } from '../../components/ui/Panel'
import { breakpoints, colors, shadows } from '../../config/theme'
import runeImageUrl from '../../assets/images/items/rune.png'
import { ScreenWrapper } from '../../components/ui/ScreenWrapper'
import backgroundImageUrl from '../../assets/images/background.jpg'
import { OnboardingHighlight } from '../onboarding/components/OnboardingHighlight'

const mainHubWrapper = css({
  [breakpoints.SM]: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
})

const artifactPanel = css({
  position: 'relative',

  '&::before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    top: '0.3rem',
    left: 0,
    width: 'calc(100% - 0.2rem)',
    height: 'calc(100% - 0.5rem)',
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
  const raisedUndead = useSelector(getRaisedUndeadCount)
  const hasArtifact = useSelector(getHasArtifact)

  return (
    <ScreenWrapper css={mainHubWrapper} backgroundUrl={backgroundImageUrl}>
      <OnboardingHighlight<HTMLAnchorElement> step={charnelHouseHighlight}>
        {({ className, ref, onClick, step }) => (
          <Building
            ref={ref}
            css={step === OnboardingStep.HighlightProduction ? disabledBuilding : undefined}
            className={className}
            name={t(BuildingType.CharnelHouse)}
            level={buildings.charnelHouse.level}
            description={t(
              'charnelHouseDescription',
              getCharnelHouseMeatProduction(buildings.charnelHouse.level || 1),
              getCharnelHouseBonesProduction(buildings.charnelHouse.level || 1),
              getCharnelHouseProductionTurns(buildings.charnelHouse.level || 1),
            )}
            route={CHARNEL_HOUSE}
            onClick={onClick}
          />
        )}
      </OnboardingHighlight>
      <OnboardingHighlight<HTMLAnchorElement> step={soulWellHighlight}>
        {({ className, ref, onClick, step }) => (
          <Building
            ref={ref}
            css={step === OnboardingStep.HighlightProduction ? disabledBuilding : undefined}
            className={className}
            name={t(BuildingType.SoulWell)}
            level={buildings.soulWell.level}
            description={t('soulWellDescription', getSoulWellSoulProduction(buildings.soulWell.level || 1))}
            route={SOUL_WELL}
            onClick={onClick}
          />
        )}
      </OnboardingHighlight>
      <Building
        name={t(BuildingType.Catacombs)}
        level={buildings.catacombs.level}
        description={t('catacombDescription', raisedUndead, getMaxUndeadRaising(buildings.catacombs.level || 1))}
        route={CATACOMBS}
      />
      <Building
        name={t(BuildingType.Ossuary)}
        level={buildings.ossuary.level}
        description={t('ossuaryDescription')}
        route={OSSUARY}
      />
      <Building
        name={t(BuildingType.Battlements)}
        level={buildings.battlements.level}
        description={t('battlementDescription', getBattlementsDefenseBonus(buildings.battlements.level || 1))}
        route={BATTLEMENTS}
      />
      {hasArtifact && (
        <Panel css={artifactPanel}>
          <div css={artifactText}>
            <h2 css={artifactTitle}>{t('artifact')}</h2>
            <div>{t('artifactDescription', ARTIFACT_DEFENSE_BONUS)}</div>
          </div>
        </Panel>
      )}
    </ScreenWrapper>
  )
}
