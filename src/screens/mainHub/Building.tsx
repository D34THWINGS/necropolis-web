/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Panel } from '../../components/ui/Panel'
import { colors, shadows } from '../../config/theme'
import { useTranslation } from '../../lang/useTranslation'
import buildOutlinedIconUrl from '../../assets/images/icons/upgrade.png'
import chainsBackgroundUrl from '../../assets/images/buildings/chains.png'
import { cyanRoundButton } from '../../styles/buttons'
import { Image } from '../../components/images/Image'

const buildingHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '1.2rem',
  textShadow: shadows.TEXT_SOLID,
  fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
  fontWeight: 'normal',
})

const buildingName = css({
  margin: 0,
  color: colors.CYAN,
})

const buildingPanel = css({
  position: 'relative',
})

const buildingDescription = css({
  margin: 0,
  paddingRight: '1.5rem',
})

const buildingUpgradeButton = [
  cyanRoundButton,
  css({
    position: 'absolute',
    bottom: '-0.7rem',
    right: '-0.7rem',
  }),
]

const buildingLocked = css({
  position: 'absolute',
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
  backgroundImage: `url(${chainsBackgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  filter: 'contrast(1.3) brightness(0.8)',
})

export type BuildingProps = {
  name: ReactNode
  description: ReactNode
  level: number
  maxLevel: number
  route: string
}

export const Building = ({ name, description, level, maxLevel, route }: BuildingProps) => {
  const { t } = useTranslation()
  return (
    <Panel css={buildingPanel}>
      <div css={buildingHeader}>
        <h2 css={buildingName}>{name}</h2>
        <span>{t('buildingLevel', Math.max(level, 1))}</span>
      </div>
      <p css={buildingDescription}>{description}</p>
      {level === 0 && <div css={buildingLocked} />}
      {level < maxLevel && (
        <Link to={route} css={buildingUpgradeButton} type="button">
          <Image src={buildOutlinedIconUrl} block size="2.5rem" />
        </Link>
      )}
    </Panel>
  )
}
