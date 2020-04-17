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
import { getSoulWell } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { SOUL_WELL_MAX_LEVEL, SOUL_WELL_SOUL_PRODUCTION, SOUL_WELL_UPGRADE_COST } from '../../config/constants'
import { spendResources } from '../../data/resources/actions'
import { getMaterials } from '../../data/resources/selectors'

export const SoulWell = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getSoulWell)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const handleUpgrade = () => {
    dispatch(spendResources({ materials: SOUL_WELL_UPGRADE_COST[level + 1] }))
    dispatch(upgradeBuilding('soulWell'))
  }

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('soulWell')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('soulWellDescription', SOUL_WELL_SOUL_PRODUCTION[level])}</p>}
        {level < SOUL_WELL_MAX_LEVEL && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {(() => {
                  switch (level) {
                    case 0:
                      return t('soulWellUnlock', SOUL_WELL_SOUL_PRODUCTION[1])
                    case 1:
                      return t('soulWellUpgradeStorm')
                    default:
                      return t('soulWellUpgrade', SOUL_WELL_SOUL_PRODUCTION[1])
                  }
                })()}
              </span>
            </div>
            <button
              type="button"
              disabled={SOUL_WELL_UPGRADE_COST[level + 1] > materials}
              css={buildingUpgradeButton}
              onClick={handleUpgrade}
            >
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{SOUL_WELL_UPGRADE_COST[level + 1]}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
