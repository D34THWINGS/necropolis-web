/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import skullImageUrl from '../../assets/images/skull.png'
import { colors, shadows } from '../../config/theme'

const turnCounter = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '1.0rem',
  flex: '0 0 auto',
  width: '22vw',
  maxWidth: '6rem',
  height: '28vw',
  maxHeight: '8rem',
  color: colors.WHITE,
  backgroundImage: `url(${skullImageUrl})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  fontSize: '1.8rem',
  textShadow: shadows.TEXT,
})

export type TurnCounterProps = {
  currentTurn: number
}

export const TurnCounter = ({ currentTurn }: TurnCounterProps) => <div css={turnCounter}>{currentTurn}</div>
