import React from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'
import settingsImageUrl from '../../assets/images/header/settings.png'
import spellImageUrl from '../../assets/images/header/spells.png'
import { buttonBase } from '../../styles/buttons'
import { breakpoints, layers } from '../../config/theme'
import { TurnCounter } from './TurnCounter'
import { SettingsModal } from './SettingsModal'
import { useModalState } from '../ui/Modal/Modal'
import { getResources } from '../../data/resources/selectors'
import { getTurn } from '../../data/turn/selectors'
import { OnboardingStep, ResourceType } from '../../config/constants'
import { SpellsModal } from '../spells/SpellsModal'
import { Image } from '../images/Image'
import { getHasSpells } from '../../data/spells/selectors'
import { OnboardingHighlight } from '../../screens/onboarding/components/OnboardingHighlight'
import { ResourceButton } from '../resources/ResourceButton'

const headerContainer = css({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: '0.4rem',
  padding: '0 0.5rem',
  width: '100%',
  height: '8rem',
  fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
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

const settingsButton = [buttonBase, css({ zIndex: layers.SETTINGS })]

const spellsButton = [buttonBase, css({ zIndex: layers.SPELLS_MODAL })]

export const Header = () => {
  const { isOpen: isSettingsModalOpen, close: closeSettings, open: openSettings } = useModalState()
  const { isOpen: isSpellsModalOpen, close: closeSpells, open: openSpells } = useModalState()
  const resources = useSelector(getResources)
  const turn = useSelector(getTurn)
  const hasSpells = useSelector(getHasSpells)

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
        <button type="button" css={settingsButton} onClick={openSettings}>
          <Image src={settingsImageUrl} size="80%" />
        </button>
        <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />
        <button type="button" css={spellsButton} disabled={!hasSpells} onClick={openSpells}>
          <Image src={spellImageUrl} size="100%" />
        </button>
        <SpellsModal isOpen={isSpellsModalOpen} onClose={closeSpells} />
      </div>
    </div>
  )
}
