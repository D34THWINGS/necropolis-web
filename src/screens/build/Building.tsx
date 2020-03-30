/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Panel } from '../../components/ui/Panel'
import { MouseEventHandler, ReactNode } from 'react'
import { colors } from '../../config/theme'
import { useTranslation } from '../../lang/useTranslation'
import upgradeButtonBackgroundUrl from '../../assets/images/upgrade-button.png'
import { buttonPress, resetButton } from '../../helpers/styles'

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
  resetButton,
  css({
    position: 'absolute',
    bottom: '-1.2rem',
    right: '-1.4rem',
    width: '3rem',
    height: '3rem',
    backgroundImage: `url(${upgradeButtonBackgroundUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
  buttonPress,
]

export type BuildingProps = {
  name: ReactNode
  description: ReactNode
  level: number
  onClick: MouseEventHandler
}

export const Building = ({ name, description, level, onClick }: BuildingProps) => {
  const { t } = useTranslation()
  return (
    <Panel css={buildingPanel}>
      <div css={buildingHeader}>
        <h2 css={buildingName}>{name}</h2>
        <span css={buildingLevel}>{t('buildingLevel', level)}</span>
      </div>
      <p css={buildingDescription}>{description}</p>
      <button css={buildingUpgradeButton} type="button" onClick={onClick} />
    </Panel>
  )
}
