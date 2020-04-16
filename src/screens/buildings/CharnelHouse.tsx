/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import {
  buildingLevel,
  buildingResourceCost,
  buildingTitle,
  buildingUpgradeArrow,
  buildingUpgradeButton,
  buildingUpgradeContainer,
  buildingUpgradeFrame,
  buildingWrapper,
} from './helpers/buildingsStyles'
import resourcesIconUrl from '../../assets/images/resources/resources.png'
import { getCharnelHouse } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import {
  CHARNEL_HOUSE_BONES_PRODUCTION,
  CHARNEL_HOUSE_MAX_LEVEL,
  CHARNEL_HOUSE_MEAT_PRODUCTION,
  CHARNEL_HOUSE_PRODUCTION_TURNS,
  CHARNEL_HOUSE_UPGRADE_COST,
} from '../../config/constants'

export const CharnelHouse = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getCharnelHouse)
  const dispatch = useDispatch()

  const handleUpgrade = () => dispatch(upgradeBuilding('charnelHouse'))

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('charnelHouse')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && (
          <p>
            {t(
              'charnelHouseDescription',
              CHARNEL_HOUSE_MEAT_PRODUCTION[level],
              CHARNEL_HOUSE_BONES_PRODUCTION[level],
              CHARNEL_HOUSE_PRODUCTION_TURNS[level],
            )}
          </p>
        )}
        {level < CHARNEL_HOUSE_MAX_LEVEL && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {level === 0
                  ? t('charnelHouseUnlock', CHARNEL_HOUSE_MEAT_PRODUCTION[level + 1])
                  : t(
                      'charnelHouseUpgrade',
                      CHARNEL_HOUSE_BONES_PRODUCTION[level + 1],
                      CHARNEL_HOUSE_PRODUCTION_TURNS[level + 1],
                    )}
              </span>
            </div>
            <button type="button" css={buildingUpgradeButton} onClick={handleUpgrade}>
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{CHARNEL_HOUSE_UPGRADE_COST[level + 1]}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
