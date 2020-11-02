import React from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'
import { breakpoints, fonts } from '../../config/theme'
import { TurnCounter } from './TurnCounter'
import { getResources } from '../../data/resources/selectors'
import { getTurn } from '../../data/turn/selectors'
import { OnboardingStep, ResourceType } from '../../config/constants'
import { OnboardingHighlight } from '../../screens/onboarding/components/OnboardingHighlight'
import { ResourceButton } from '../resources/ResourceButton'
import { SettingsButton } from './SettingsButton'
import { SpellsButton } from './SpellsButton'

const headerContainer = css({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: '0.4rem',
  padding: '0 0.5rem',
  width: '100%',
  height: '8rem',
  fontFamily: fonts.TITLES,
  fontWeight: 'normal',
})

const headerCountersWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  flex: '1 1 auto',
})

const headerButtons = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  padding: '0.4rem 0',
  flex: '0 0 auto',
  width: '3.5rem',

  [breakpoints.SM]: {
    padding: '0.4rem 0 0',
    width: '4rem',
  },
})

export const Header = () => {
  const resources = useSelector(getResources)
  const turn = useSelector(getTurn)

  return (
    <div css={headerContainer}>
      <TurnCounter currentTurn={turn} />
      <div css={headerCountersWrapper}>
        <OnboardingHighlight<HTMLButtonElement> step={OnboardingStep.HighlightMaterialsCounter}>
          {({ ref, className }) => (
            <ResourceButton
              ref={ref}
              type={ResourceType.Materials}
              className={className}
              color="#94C58C"
              text={resources.materials}
            />
          )}
        </OnboardingHighlight>
        <OnboardingHighlight<HTMLButtonElement> step={OnboardingStep.HighlightMeatCounter}>
          {({ ref, className }) => (
            <ResourceButton
              ref={ref}
              type={ResourceType.Meat}
              className={className}
              color="#C58C8F"
              text={resources.meat}
            />
          )}
        </OnboardingHighlight>
        <ResourceButton type={ResourceType.Souls} color="#83B9D6" text={resources.souls} />
        <ResourceButton type={ResourceType.Bones} color="#CDC59C" text={resources.bones} />
      </div>
      <div css={headerButtons}>
        <SettingsButton size="80%" />
        <SpellsButton size="100%" />
      </div>
    </div>
  )
}
