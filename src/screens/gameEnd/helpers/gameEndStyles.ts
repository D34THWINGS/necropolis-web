import { css } from '@emotion/core'
import { colors, shadows } from '../../../config/theme'

export const gameEndContainer = (backgroundUrl: string) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  })

export const gameEndText = (marginTop: string, backgroundColor: string) =>
  css({
    marginTop,
    marginBottom: '2rem',
    borderRadius: '20px',
    padding: '0.4rem',
    maxWidth: '18rem',
    backgroundColor,
    fontSize: '1.3rem',
    color: colors.WHITE,
    textShadow: shadows.TEXT_FLAT,
    textAlign: 'center',
  })
