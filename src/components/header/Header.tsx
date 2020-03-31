/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import bonesImageUrl from '../../assets/images/bones.png'
import resourcesImageUrl from '../../assets/images/resources.png'
import meatImageUrl from '../../assets/images/meat.png'
import soulsImageUrl from '../../assets/images/souls.png'
import settingsImageUrl from '../../assets/images/settings.png'
import spellImageUrl from '../../assets/images/spell.png'
import { backgroundImage, buttonPress, resetButton } from '../../helpers/styles'
import { colors, shadows } from '../../config/theme'
import { TurnCounter } from './TurnCounter'
import { SettingsModal } from './SettingsModal'
import { useModalState } from '../ui/Modal'

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

const headerResourceCounter = (url: string) => [
  css({
    marginRight: '0.8rem',
    padding: '0.8rem 1rem',
    width: '5rem',
    height: '3rem',
    flex: '0 0 auto',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    textAlign: 'right',
    color: colors.WHITE,
    textShadow: shadows.TEXT,
  }),
  backgroundImage(url),
]

const headerButton = (url: string) => [
  resetButton,
  css({
    flex: '0 0 auto',
    width: '3.5rem',
    height: '3.5rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
  backgroundImage(url),
  buttonPress,
]

const headerSpacer = css({
  flexGrow: 1,
})

export const Header = () => {
  const { isOpen, close, open } = useModalState()

  return (
    <div css={headerContainer}>
      <TurnCounter currentTurn={5} />
      <div css={headerCountersWrapper}>
        <div css={headerResourceCounter(resourcesImageUrl)}>6</div>
        <div css={headerResourceCounter(meatImageUrl)}>6</div>
        <span css={headerSpacer} />
        <button type="button" css={headerButton(settingsImageUrl)} onClick={open} />
        <SettingsModal isOpen={isOpen} onClose={close} />
        <div css={headerResourceCounter(soulsImageUrl)}>6</div>
        <div css={headerResourceCounter(bonesImageUrl)}>6</div>
        <span css={headerSpacer} />
        <button type="button" css={headerButton(spellImageUrl)} />
      </div>
    </div>
  )
}
