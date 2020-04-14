/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Panel } from '../../components/ui/Panel'
import { colors } from '../../config/theme'
import { useTranslation } from '../../lang/useTranslation'
import buildOutlinedIconUrl from '../../assets/images/build-outlined.png'
import chainsBackgroundUrl from '../../assets/images/chains.png'
import { cyanRoundButton } from '../../styles/buttons'
import { contentCover } from '../../styles/base'

const buildingHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
})

const buildingName = css({
  margin: 0,
  fontSize: '1.2rem',
  color: colors.CYAN,
})

const buildingLevel = css({
  fontSize: '1.2rem',
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
    padding: '0.2rem',
  }),
]

const buildingUpgradeIcon = [
  css({
    width: '2.6rem',
    height: '2.6rem',
    backgroundImage: `url(${buildOutlinedIconUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

const buildingLocked = [
  contentCover,
  css({
    backgroundImage: `url(${chainsBackgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }),
]

export type BuildingProps = {
  name: ReactNode
  description: ReactNode
  level: number
  locked?: boolean
  route: string
}

export const Building = ({ name, description, level, locked, route }: BuildingProps) => {
  const { t } = useTranslation()
  return (
    <Panel css={buildingPanel}>
      <div css={buildingHeader}>
        <h2 css={buildingName}>{name}</h2>
        <span css={buildingLevel}>{t('buildingLevel', level)}</span>
      </div>
      <p css={buildingDescription}>{description}</p>
      {!locked && (
        <Link to={route} css={buildingUpgradeButton} type="button">
          <div css={buildingUpgradeIcon} />
        </Link>
      )}
      {locked && <div css={buildingLocked} />}
    </Panel>
  )
}
