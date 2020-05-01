/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import darken from 'polished/lib/color/darken'
import { useRouteMatch } from 'react-router'
import settingsImageUrl from '../../assets/images/header/settings.png'
import spellImageUrl from '../../assets/images/header/spells.png'
import { buttonBase } from '../../styles/buttons'
import { breakpoints, colors, layers, shadows, transitions } from '../../config/theme'
import { TurnCounter } from './TurnCounter'
import { SettingsModal } from './SettingsModal'
import { useModalState } from '../ui/Modal/Modal'
import { getResources } from '../../data/resources/selectors'
import { getTurn } from '../../data/turn/selectors'
import { ResourceIcon } from '../images/ResourceIcon'
import { ResourceType } from '../../config/constants'
import { SpellsModal } from '../spells/SpellsModal'
import { Image } from '../images/Image'
import { getHasSpells } from '../../data/spells/selectors'
import { EXPEDITIONS } from '../../config/routes'

const headerContainer = css({
  display: 'flex',
  flexDirection: 'row-reverse',
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
  flexWrap: 'wrap',
  alignItems: 'center',
})

const headerResourceCounter = (backgroundColor: string) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    margin: '0.7rem 0.3rem 0.7rem 1.3rem',
    border: `2px solid ${darken(0.3, backgroundColor)}`,
    borderRadius: '26px',
    padding: '0.2rem 0.5rem 0.2rem 0',
    width: '3rem',
    flex: '0 0 auto',
    backgroundColor,
    boxSizing: 'border-box',
    boxShadow: `inset 0px -8px 0px ${darken(0.12, backgroundColor)}`,
    textAlign: 'right',
    fontSize: '1.3rem',
    lineHeight: '1',
    color: colors.WHITE,
    textShadow: shadows.TEXT,

    [breakpoints.SM]: {
      margin: '0.7rem 0.8rem 0.7rem 1.8rem',
      width: '4rem',
    },
  })

const headerResourceIcon = css({
  position: 'absolute',
  left: 0,
  width: '2.5rem',
  transform: 'translateX(-50%)',

  [breakpoints.SM]: {
    width: '3rem',
  },
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

const headerSpacer = css({
  flexGrow: 1,
})

const headerHideAble = (hidden: boolean) =>
  css({
    display: 'flex',
    transform: `translateY(${hidden ? '-110%' : '0'})`,
    transition: `transform ${transitions.SLOW}`,
  })

const settingsButton = [buttonBase, css({ zIndex: layers.SETTINGS })]

const spellsButton = [buttonBase, css({ zIndex: layers.SPELLS_MODAL })]

export const Header = () => {
  const isOnExpeditions = !!useRouteMatch(EXPEDITIONS)
  const { isOpen: isSettingsModalOpen, close: closeSettings, open: openSettings } = useModalState()
  const { isOpen: isSpellsModalOpen, close: closeSpells, open: openSpells } = useModalState()
  const resources = useSelector(getResources)
  const turn = useSelector(getTurn)
  const hasSpells = useSelector(getHasSpells)

  return (
    <div css={headerContainer}>
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
      <div css={headerHideAble(isOnExpeditions)}>
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
      </div>
    </div>
  )
}
