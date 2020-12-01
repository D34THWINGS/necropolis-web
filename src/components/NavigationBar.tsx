import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { CATACOMBS, EXPEDITIONS, MAIN_HUB, OSSUARY } from '../config/routes'
import buttonBackgroundUrl from '../assets/images/footer/button.png'
import buildIconUrl from '../assets/images/footer/build.png'
import expeditionsIconUrl from '../assets/images/footer/expeditions.png'
import spellsIconUrl from '../assets/images/footer/spells.png'
import researchIconUrl from '../assets/images/footer/research.png'
import { backgroundImage } from '../styles/base'
import { buttonPress } from '../styles/buttons'
import { OnboardingHighlight } from '../screens/onboarding/components/OnboardingHighlight'
import { BuildingType, OnboardingStep } from '../config/constants'
import { getBuildingLevel } from '../data/buildings/selectors'

const footerContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 0,
  padding: '1rem 1rem 0',
  width: '100%',
})

const footerButton = [
  css({
    padding: '5% 5% 7%',
    width: '12vw',
    maxWidth: '3.4rem',
    height: '12vw',
    maxHeight: '3.4rem',
    backgroundImage: `url(${buttonBackgroundUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    cursor: 'pointer',
    boxSizing: 'content-box',
  }),
  buttonPress,
]

const disabledFooterButton = [
  ...footerButton,
  css({
    filter: 'grayscale(1)',
    cursor: '',
  }),
]

const footerButtonIcon = css({
  display: 'block',
  height: '100%',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
})

const buildIcon = css({
  transform: 'rotateZ(30deg)',
})

export const NavigationBar = () => {
  const isOssuaryBuilt = useSelector(getBuildingLevel(BuildingType.Ossuary)) > 0
  const isCatacombsBuilt = useSelector(getBuildingLevel(BuildingType.Catacombs)) > 0
  const [stackSize, setStackSize] = useState(0)
  const match = useRouteMatch({ path: MAIN_HUB, exact: true })
  const history = useHistory()

  useEffect(
    () =>
      history.listen((location, action) => {
        if (action === 'PUSH') {
          setStackSize(stackSize + 1)
        }
        if (action === 'POP') {
          setStackSize(Math.max(stackSize - 1, 0))
        }
      }),
    [history, stackSize],
  )

  const isOnBuildPage = match?.isExact || false
  const handleHackNavigation: MouseEventHandler = event => {
    if (!isOnBuildPage && stackSize > 0) {
      event.preventDefault()
      history.goBack()
    }
  }

  return (
    <div css={footerContainer}>
      <Link to={MAIN_HUB} replace css={footerButton} onClick={handleHackNavigation}>
        <span css={[footerButtonIcon, buildIcon, backgroundImage(buildIconUrl)]} />
      </Link>
      <OnboardingHighlight<HTMLAnchorElement> step={OnboardingStep.LetsExplore}>
        {({ ref, className, onClick }) => (
          <Link
            ref={ref}
            className={className}
            to={EXPEDITIONS}
            replace={!isOnBuildPage}
            css={footerButton}
            onClick={onClick}
          >
            <span css={[footerButtonIcon, backgroundImage(expeditionsIconUrl)]} />
          </Link>
        )}
      </OnboardingHighlight>
      {isCatacombsBuilt && (
        <Link to={CATACOMBS} replace={!isOnBuildPage} css={footerButton}>
          <span css={[footerButtonIcon, backgroundImage(spellsIconUrl)]} />
        </Link>
      )}
      {!isCatacombsBuilt && (
        <span css={disabledFooterButton}>
          <span css={[footerButtonIcon, backgroundImage(spellsIconUrl)]} />
        </span>
      )}
      {isOssuaryBuilt && (
        <Link to={OSSUARY} replace={!isOnBuildPage} css={footerButton}>
          <span css={[footerButtonIcon, backgroundImage(researchIconUrl)]} />
        </Link>
      )}
      {!isOssuaryBuilt && (
        <span css={disabledFooterButton}>
          <span css={[footerButtonIcon, backgroundImage(researchIconUrl)]} />
        </span>
      )}
    </div>
  )
}
