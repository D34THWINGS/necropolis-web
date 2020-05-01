/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Image } from '../images/Image'
import undeadIconUrl from '../../assets/images/undead.png'
import closeIconUrl from '../../assets/images/icons/close.png'
import { purpleBox, textColor } from '../../styles/base'
import { TalentIcon } from '../talents/TalentIcon'
import { useTranslation } from '../../lang/useTranslation'
import { colors, shadows } from '../../config/theme'
import { Undead } from '../../data/undeads/helpers'
import { purpleRoundButton } from '../../styles/buttons'
import { LA_MOTTE_DEFENSE_BONUS, UndeadType } from '../../config/constants'

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
  margin: '0 0.2rem',
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

  const getAbility = () => {
    switch (undead.type) {
      case UndeadType.Valet:
        return t('valetAbility')
      case UndeadType.Brikoler:
        return t('brikolerAbility')
      case UndeadType.LaMotte:
        return t('laMotteAbility', LA_MOTTE_DEFENSE_BONUS)
      case UndeadType.Skeleton:
        return t('skeletonAbility')
      case UndeadType.BloodPrince:
        return t('bloodPrinceAbility')
      default:
        return ''
    }
  }

  return (
    <div css={undeadBox(!!onBan)}>
      <h4 css={undeadName}>{t('undeadName', undead.type)}</h4>
      <div css={undeadDescription}>
        <Image src={undeadIconUrl} size="4rem" marginRight="0.5rem" />
        <div>
          <div css={textColor('CYAN')}>{t('undeadTalents')}</div>
          {undead.talents.map(([talent, value]) => (
            <TalentIcon css={undeadTalent} key={talent} type={talent} size="1.2rem" text={value} />
          ))}
          <br />
          <span css={textColor('CYAN')}>{t('undeadAbility')}</span> {getAbility()}
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
