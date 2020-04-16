/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Building } from './Building'
import { useTranslation } from '../../lang/useTranslation'
import { BATTLEMENTS, CATACOMBS, CHARNEL_HOUSE, OSSUARY, SOUL_WELL } from '../../config/routes'
import { getBuildings } from '../../data/buildings/selectors'
import {
  BATTLEMENTS_DEFENSE_BONUS,
  BATTLEMENTS_MAX_LEVEL,
  CATACOMBS_MAX_LEVEL,
  CATACOMBS_MAX_UNDEAD,
  CATACOMBS_SOUL_COST,
  CHARNEL_HOUSE_BONES_PRODUCTION,
  CHARNEL_HOUSE_MAX_LEVEL,
  CHARNEL_HOUSE_MEAT_PRODUCTION,
  CHARNEL_HOUSE_PRODUCTION_TURNS,
  OSSUARY_BONES_COST,
  OSSUARY_MAX_LEVEL,
  SOUL_WELL_MAX_LEVEL,
  SOUL_WELL_SOUL_PRODUCTION,
} from '../../config/constants'

const buildWrapper = css({
  padding: '0 1rem',
})

export const Build = () => {
  const { t } = useTranslation()
  const buildings = useSelector(getBuildings)

  return (
    <div css={buildWrapper}>
      <Building
        name={t('charnelHouse')}
        level={buildings.charnelHouse.level}
        maxLevel={CHARNEL_HOUSE_MAX_LEVEL}
        description={t(
          'charnelHouseDescription',
          CHARNEL_HOUSE_MEAT_PRODUCTION[buildings.charnelHouse.level || 1],
          CHARNEL_HOUSE_BONES_PRODUCTION[buildings.charnelHouse.level || 1],
          CHARNEL_HOUSE_PRODUCTION_TURNS[buildings.charnelHouse.level || 1],
        )}
        route={CHARNEL_HOUSE}
      />
      <Building
        name={t('catacomb')}
        level={buildings.catacombs.level}
        maxLevel={CATACOMBS_MAX_LEVEL}
        description={t(
          'catacombDescription',
          0,
          CATACOMBS_MAX_UNDEAD[buildings.catacombs.level || 1],
          CATACOMBS_SOUL_COST[buildings.catacombs.level || 1],
        )}
        route={CATACOMBS}
      />
      <Building
        name={t('soulWell')}
        level={buildings.soulWell.level}
        maxLevel={SOUL_WELL_MAX_LEVEL}
        description={t('soulWellDescription', SOUL_WELL_SOUL_PRODUCTION[buildings.soulWell.level || 1])}
        route={SOUL_WELL}
      />
      <Building
        name={t('ossuary')}
        level={buildings.ossuary.level}
        maxLevel={OSSUARY_MAX_LEVEL}
        description={t('ossuaryDescription', OSSUARY_BONES_COST[buildings.ossuary.level || 1])}
        route={OSSUARY}
      />
      <Building
        name={t('battlements')}
        level={buildings.battlements.level}
        maxLevel={BATTLEMENTS_MAX_LEVEL}
        description={t('battlementDescription', BATTLEMENTS_DEFENSE_BONUS[buildings.battlements.level || 1])}
        route={BATTLEMENTS}
      />
    </div>
  )
}
