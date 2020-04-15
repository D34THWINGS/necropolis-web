/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import bonesImageUrl from '../../assets/images/resources/bones.png'
import resourcesImageUrl from '../../assets/images/resources/resources.png'
import meatImageUrl from '../../assets/images/resources/meat.png'
import soulsImageUrl from '../../assets/images/resources/souls.png'
import settingsImageUrl from '../../assets/images/header/settings.png'
import spellImageUrl from '../../assets/images/header/spell.png'
import { buttonBase } from '../../styles/buttons'
import { colors, shadows } from '../../config/theme'
import { TurnCounter } from './TurnCounter'
import { SettingsModal } from './SettingsModal'
import { useModalState } from '../ui/Modal'
import { getResources } from '../../data/resources/selectors'

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
    margin: '0 0.8rem 0 1.8rem',
    border: '2px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '26px',
    padding: '0.2rem 0.5rem 0.2rem 0',
    width: '4rem',
    flex: '0 0 auto',
    backgroundColor,
    boxSizing: 'border-box',
    boxShadow: 'inset 0px -12px 0px rgba(0, 0, 0, 0.16)',
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

const headerButton = (url: string) => [
  buttonBase,
  css({
    flex: '0 0 auto',
    width: '3.5rem',
    height: '3.5rem',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

const headerSpacer = css({
  flexGrow: 1,
})

export const Header = () => {
  const { isOpen, close, open } = useModalState()
  const resources = useSelector(getResources)

  return (
    <div css={headerContainer}>
      <TurnCounter currentTurn={5} />
      <div css={headerCountersWrapper}>
        <div css={headerResourceCounter('#94C58C')}>
          <img css={headerResourceIcon} src={resourcesImageUrl} alt="" />
          <span>{resources.materials}</span>
        </div>
        <div css={headerResourceCounter('#C58C8F')}>
          <img css={headerResourceIcon} src={meatImageUrl} alt="" />
          <span>{resources.meat}</span>
        </div>
        <span css={headerSpacer} />
        <button type="button" css={headerButton(settingsImageUrl)} onClick={open} />
        <SettingsModal isOpen={isOpen} onClose={close} />
        <div css={headerResourceCounter('#83B9D6')}>
          <img css={headerResourceIcon} src={soulsImageUrl} alt="" />
          <span>{resources.souls}</span>
        </div>
        <div css={headerResourceCounter('#CDC59C')}>
          <img css={headerResourceIcon} src={bonesImageUrl} alt="" />
          <span>{resources.bones}</span>
        </div>
        <span css={headerSpacer} />
        <button type="button" css={headerButton(spellImageUrl)} />
      </div>
    </div>
  )
}
