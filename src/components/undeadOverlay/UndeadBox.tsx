/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Image } from '../images/Image'
import undeadIconUrl from '../../assets/images/undead.png'
import closeIconUrl from '../../assets/images/icons/close.png'
import { purpleBox, textColor } from '../../styles/base'
import { TalentIcon } from '../images/TalentIcon'
import { useTranslation } from '../../lang/useTranslation'
import { colors, shadows } from '../../config/theme'
import { Undead } from '../../data/undeads/helpers'
import { purpleRoundButton } from '../../styles/buttons'

const undeadBox = (canBeBanned: boolean) => [
  purpleBox,
  css({
    position: 'relative',
    paddingBottom: '1.5rem',
    marginBottom: canBeBanned ? '2rem' : '0.4rem',

    ':last-child': {
      marginBottom: '1rem',
    },
  }),
]

const undeadName = css({
  margin: 0,
  textAlign: 'center',
  color: colors.PURPLE,
  textShadow: shadows.TEXT_SOLID,
  fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
  fontWeight: 'normal',

  '&::after': {
    display: 'block',
    content: '""',
    marginBottom: '0.3rem',
    height: '3px',
    background: colors.PURPLE,
    boxShadow: shadows.TEXT_SOLID,
  },
})

const undeadDescription = css({
  display: 'flex',
  alignItems: 'flex-start',
})

const undeadTalent = css({
  display: 'inline-flex',
  alignItems: 'center',
})

const undeadBanButton = [
  purpleRoundButton,
  css({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%)',

    ':not(:disabled):active': {
      transform: 'translate(-50%, calc(50% + 0.1rem))',
    },
  }),
]

export type UndeadBoxProps = {
  undead: Undead
  onBan?: () => void
}

export const UndeadBox = ({ undead, onBan }: UndeadBoxProps) => {
  const { t } = useTranslation()

  return (
    <div css={undeadBox(!!onBan)}>
      <h4 css={undeadName}>{t('undeadName', undead.type)}</h4>
      <div css={undeadDescription}>
        <Image src={undeadIconUrl} size="4rem" marginRight="0.5rem" />
        <div>
          <div css={textColor('CYAN')}>{t('undeadTalents')}</div>
          {undead.talents.map(([talent, value]) => (
            <span key={talent} css={undeadTalent}>
              <TalentIcon type={talent} size="1rem" marginLeft="0.5rem" />
              &nbsp;{value}
            </span>
          ))}
          <div css={textColor('CYAN')}>{t('undeadAbility')}</div>
        </div>
      </div>
      {onBan && (
        <button type="button" css={undeadBanButton} onClick={onBan}>
          <Image src={closeIconUrl} size="2rem" block />
        </button>
      )}
    </div>
  )
}
