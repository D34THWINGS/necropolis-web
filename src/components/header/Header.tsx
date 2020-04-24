/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import darken from 'polished/lib/color/darken'
import settingsImageUrl from '../../assets/images/header/settings.png'
import spellImageUrl from '../../assets/images/header/spells.png'
import { buttonBase } from '../../styles/buttons'
import { colors, shadows } from '../../config/theme'
import { TurnCounter } from './TurnCounter'
import { SettingsModal } from './SettingsModal'
import { useModalState } from '../ui/Modal'
import { getResources } from '../../data/resources/selectors'
import { getTurn } from '../../data/turn/selectors'
import { ResourceIcon } from '../images/ResourceIcon'
import { ResourceType } from '../../config/constants'
import { SpellsModal } from './SpellsModal'
import { Image } from '../images/Image'
import { getHasSpells } from '../../data/spells/selectors'

const headerContainer = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.5rem',
})

const headerCountersWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginLeft: '0.5rem',
})

const headerResourceCounter = (backgroundColor: string) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    margin: '0.7rem 0.8rem 0.7rem 1.8rem',
    border: `2px solid ${darken(0.3, backgroundColor)}`,
    borderRadius: '26px',
    padding: '0.2rem 0.5rem 0.2rem 0',
    width: '4rem',
    flex: '0 0 auto',
    backgroundColor,
    boxSizing: 'border-box',
    boxShadow: `inset 0px -8px 0px ${darken(0.12, backgroundColor)}`,
    textAlign: 'right',
    fontSize: '1.3rem',
    lineHeight: '1',
    color: colors.WHITE,
    textShadow: shadows.TEXT,
  })

const headerResourceIcon = css({
  position: 'absolute',
  left: 0,
  width: '3rem',
  transform: 'translateX(-50%)',
})

const headerButtons = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const headerSpacer = css({
  flexGrow: 1,
})

const spellsButton = [buttonBase, css({ zIndex: 1 })]

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
        <div css={headerResourceCounter('#94C58C')}>
          <ResourceIcon css={headerResourceIcon} type={ResourceType.Materials} />
          <span>{resources.materials}</span>
        </div>
        <div css={headerResourceCounter('#C58C8F')}>
          <ResourceIcon css={headerResourceIcon} type={ResourceType.Meat} />
          <span>{resources.meat}</span>
        </div>
        <span css={headerSpacer} />
        <div css={headerResourceCounter('#83B9D6')}>
          <ResourceIcon css={headerResourceIcon} type={ResourceType.Souls} />
          <span>{resources.souls}</span>
        </div>
        <div css={headerResourceCounter('#CDC59C')}>
          <ResourceIcon css={headerResourceIcon} type={ResourceType.Bones} />
          <span>{resources.bones}</span>
        </div>
        <span css={headerSpacer} />
      </div>
      <div css={headerButtons}>
        <button type="button" css={buttonBase} onClick={openSettings}>
          <Image src={settingsImageUrl} size="3rem" />
        </button>
        <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />
        <button type="button" css={spellsButton} disabled={!hasSpells} onClick={openSpells}>
          <Image src={spellImageUrl} size="4rem" />
        </button>
        <SpellsModal isOpen={isSpellsModalOpen} onClose={closeSpells} />
      </div>
    </div>
  )
}
