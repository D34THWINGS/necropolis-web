import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { css } from '@emotion/react'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingDetails } from './components/BuildingDetails'
import backgroundImageUrl from '../../assets/images/background.jpg'
import soulWell1Url from '../../assets/images/buildings/soul-well-1.png'
import soulWell2Url from '../../assets/images/buildings/soul-well-2.png'
import soulWell3Url from '../../assets/images/buildings/soul-well-3.png'
import { getSoulWell } from '../../data/buildings/selectors'
import { MAIN_HUB } from '../../config/routes'
import { ResourceType } from '../../config/constants'
import { makeUpgradedBuilding } from '../../data/buildings/helpers'

const soulWellImages = [soulWell1Url, soulWell2Url, soulWell3Url]

const soulWellImage = (backgroundUrl: string) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  })

export const SoulWell = () => {
  const { t } = useTranslation()
  const soulWell = useSelector(getSoulWell)

  if (!soulWell) {
    return <Redirect to={MAIN_HUB} />
  }

  return (
    <BuildingDetails
      building={soulWell}
      backgroundUrl={backgroundImageUrl}
      renderDescription={() => t('soulWellDescription', soulWell.produces[ResourceType.Souls] ?? 0)}
      renderUpgradeDescription={() => {
        const upgradedSoulWell = makeUpgradedBuilding(soulWell)
        switch (soulWell.level) {
          case 0:
            return t('soulWellUnlock', upgradedSoulWell.produces[ResourceType.Souls] ?? 0)
          case 1:
            return t('soulWellUpgradeStorm')
          default:
            return t('soulWellUpgrade', upgradedSoulWell.produces[ResourceType.Souls] ?? 0)
        }
      }}
    >
      {level => (level === 0 ? null : <div css={soulWellImage(soulWellImages[level - 1])} />)}
    </BuildingDetails>
  )
}
