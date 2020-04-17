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
import { getBattlements } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import { BATTLEMENTS_DEFENSE_BONUS, BATTLEMENTS_MAX_LEVEL, BATTLEMENTS_UPGRADE_COST } from '../../config/constants'
import { spendResources } from '../../data/resources/actions'
import { getMaterials } from '../../data/resources/selectors'

export const Battlements = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getBattlements)
  const materials = useSelector(getMaterials)
  const dispatch = useDispatch()

  const handleUpgrade = () => {
    dispatch(spendResources({ materials: BATTLEMENTS_UPGRADE_COST[level + 1] }))
    dispatch(upgradeBuilding('battlements'))
  }

  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('battlements')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('battlementDescription', BATTLEMENTS_DEFENSE_BONUS[level])}</p>}
        {level < BATTLEMENTS_MAX_LEVEL && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {t('battlementUpgrade', BATTLEMENTS_DEFENSE_BONUS[level + 1] - BATTLEMENTS_DEFENSE_BONUS[level])}
              </span>
            </div>
            <button
              type="button"
              disabled={BATTLEMENTS_UPGRADE_COST[level + 1] > materials}
              css={buildingUpgradeButton}
              onClick={handleUpgrade}
            >
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{BATTLEMENTS_UPGRADE_COST[level + 1]}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
