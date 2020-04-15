/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import researchIconUrl from '../../assets/images/icons/research.png'
import resourcesIconUrl from '../../assets/images/resources/resources.png'
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
import { getOssuary } from '../../data/buildings/selectors'
import {
  OSSUARY_MAX_LEVEL,
  OSSUARY_UPGRADE_BONUS_BONES,
  OSSUARY_UPGRADE_BONUS_MEAT,
  OSSUARY_UPGRADE_COST,
} from '../../config/constants'
import { upgradeBuilding } from '../../data/buildings/actions'

const researchButton = css({
  alignSelf: 'center',
})

const researchIcon = css({
  width: '3rem',
})

export const Ossuary = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getOssuary)
  const dispatch = useDispatch()

  const handleUpgrade = () => dispatch(upgradeBuilding('ossuary'))

  return (
    <div css={buildingWrapper}>
      <button css={[...cyanSquareButton, researchButton]} type="button">
        <img css={researchIcon} src={researchIconUrl} alt="" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('ossuary')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        <p>{t('ossuaryDescription', 3)}</p>
        {level < OSSUARY_MAX_LEVEL && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {level === 0
                  ? t('ossuaryUnlock')
                  : t('ossuaryUpgrade', OSSUARY_UPGRADE_BONUS_MEAT[level + 1], OSSUARY_UPGRADE_BONUS_BONES[level + 1])}
              </span>
            </div>
            <button type="button" css={buildingUpgradeButton} onClick={handleUpgrade}>
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{OSSUARY_UPGRADE_COST[level + 1]}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
