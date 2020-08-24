import React from 'react'
import { css } from '@emotion/core'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingType } from '../../config/constants'
import { getSoulWellSoulProduction } from '../../data/buildings/helpers'
import { BuildingDetails } from './components/BuildingDetails'
import backgroundImageUrl from '../../assets/images/background.jpg'
import soulWell1Url from '../../assets/images/buildings/soul-well-1.png'
import soulWell2Url from '../../assets/images/buildings/soul-well-2.png'
import soulWell3Url from '../../assets/images/buildings/soul-well-3.png'
import { Image } from '../../components/images/Image'

const soulWellImages = [soulWell1Url, soulWell2Url, soulWell3Url]

const soulWellImage = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 0 auto',
})

export const SoulWell = () => {
  const { t } = useTranslation()

  return (
    <BuildingDetails
      type={BuildingType.SoulWell}
      backgroundUrl={backgroundImageUrl}
      renderDescription={level => t('soulWellDescription', getSoulWellSoulProduction(level))}
      renderUpgradeDescription={level => {
        switch (level) {
          case 1:
            return t('soulWellUnlock', getSoulWellSoulProduction(level))
          case 2:
            return t('soulWellUpgradeStorm')
          default:
            return t('soulWellUpgrade', getSoulWellSoulProduction(level))
        }
      }}
    >
      {level =>
        level === 0 ? null : (
          <div css={soulWellImage}>
            <Image src={soulWellImages[level - 1]} size="70%" />
          </div>
        )
      }
    </BuildingDetails>
  )
}
