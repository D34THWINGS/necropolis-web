/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import bonesImageUrl from '../../assets/images/resources/bones.png'
import resourcesImageUrl from '../../assets/images/resources/resources.png'
import meatImageUrl from '../../assets/images/resources/meat.png'
import soulsImageUrl from '../../assets/images/resources/souls.png'
import settingsImageUrl from '../../assets/images/header/settings.png'
import spellImageUrl from '../../assets/images/header/spell.png'
import { buttonBase, buttonPress, resetButton } from '../../styles/buttons'
import { backgroundImage } from '../../styles/base'
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

const headerResourceCounter = (url: string) =>
  css({
    marginRight: '0.8rem',
    padding: '0.8rem 1rem',
    width: '5rem',
    height: '3rem',
    flex: '0 0 auto',
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    textAlign: 'right',
    color: colors.WHITE,
    textShadow: shadows.TEXT,
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
