/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from 'react-router-dom'
import { BUILD, EXPEDITIONS, OSSUARY, CATACOMBS } from '../config/routes'
import buttonBackgroundUrl from '../assets/images/footer/button.png'
import buildIconUrl from '../assets/images/footer/build.png'
import expeditionsIconUrl from '../assets/images/footer/expeditions.png'
import spellsIconUrl from '../assets/images/footer/spells.png'
import researchIconUrl from '../assets/images/footer/research.png'
import { backgroundImage } from '../styles/base'
import { buttonPress } from '../styles/buttons'

const footerContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1rem 0',
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

export const NavigationBar = () => (
  <div css={footerContainer}>
    <Link to={BUILD} css={footerButton}>
      <span css={[footerButtonIcon, buildIcon, backgroundImage(buildIconUrl)]} />
    </Link>
    <Link to={EXPEDITIONS} css={footerButton}>
      <span css={[footerButtonIcon, backgroundImage(expeditionsIconUrl)]} />
    </Link>
    <Link to={CATACOMBS} css={footerButton}>
      <span css={[footerButtonIcon, backgroundImage(spellsIconUrl)]} />
    </Link>
    <Link to={OSSUARY} css={footerButton}>
      <span css={[footerButtonIcon, backgroundImage(researchIconUrl)]} />
    </Link>
  </div>
)
