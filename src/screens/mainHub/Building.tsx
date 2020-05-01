/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { panelBorder, panelInner } from '../../components/ui/Panel'
import { colors, shadows } from '../../config/theme'
import { useTranslation } from '../../lang/useTranslation'

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

const buildingDescription = css({
  margin: 0,
  paddingRight: '1.5rem',
})

const buildingPanelBorder = (isBuilt: boolean) => [
  panelBorder,
  css({
    display: 'block',
    textDecoration: 'none',
    lineHeight: 'inherit',
    filter: isBuilt ? undefined : 'contrast(1.1) brightness(0.7)',
  }),
]

export type BuildingProps = {
  name: ReactNode
  description: ReactNode
  level: number
  route: string
}

export const Building = ({ name, description, level, route }: BuildingProps) => {
  const { t } = useTranslation()
  return (
    <Link to={route} css={buildingPanelBorder(level > 0)}>
      <div css={panelInner}>
        <div css={buildingHeader}>
          <h2 css={buildingName}>{name}</h2>
          <span>{level === 0 ? t('buildingNotConstructed') : t('buildingLevel', level)}</span>
        </div>
        <p css={buildingDescription}>{description}</p>
      </div>
    </Link>
  )
}
