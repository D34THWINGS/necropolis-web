import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import backgroundImageUrl from '../../../assets/images/background.jpg'
import { buildingLevel, buildingTitle } from '../helpers/buildingsStyles'
import { ScreenWrapper } from '../../../components/ui/ScreenWrapper'
import { panelBorder, panelInner } from '../../../components/ui/Panel/Panel'
import { useTranslation } from '../../../lang/useTranslation'

const buildingShopBorder = [
  panelBorder,
  css({
    margin: '0 -1rem',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: '100%',
  }),
]

const buildingShopInner = [
  panelInner,
  css({
    borderRadius: 0,
    paddingBottom: '3rem',
    height: '100%',
    overflowY: 'auto',
  }),
]

export type BuildingShopProps = {
  title: ReactNode
  level: number
  children?: ReactNode
}

export const BuildingShop = ({ title, level, children }: BuildingShopProps) => {
  const { t } = useTranslation()

  return (
    <ScreenWrapper backgroundUrl={backgroundImageUrl}>
      <div css={buildingShopBorder}>
        <div css={buildingShopInner}>
          <h2 css={buildingTitle}>{title}</h2>
          <p css={buildingLevel}>{level === 0 ? t('buildingNotConstructed') : t('buildingLevel', level)}</p>
          {children}
        </div>
      </div>
    </ScreenWrapper>
  )
}
