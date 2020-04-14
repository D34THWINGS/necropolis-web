/** @jsx jsx */
import { jsx } from '@emotion/core'
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

export const CharnelHouse = () => {
  const { t } = useTranslation()
  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('charnelHouse')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', 1)}</p>
        <p>{t('charnelHouseDescription', 1, 0, 3)}</p>
        <div css={buildingUpgradeContainer}>
          <div css={buildingUpgradeFrame}>
            <div css={buildingUpgradeArrow}>{t('buildingLevel', 2)}</div>
            <span>{t('charnelHouseUnlock', 3)}</span>
          </div>
          <div css={buildingUpgradeButton}>
            <img css={buildingResourceCost} src={resourcesIconUrl} alt="" /> 2
          </div>
        </div>
      </Panel>
    </div>
  )
}
