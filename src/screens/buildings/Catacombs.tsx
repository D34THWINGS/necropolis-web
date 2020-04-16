/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
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
import { getCatacombs } from '../../data/buildings/selectors'
import { upgradeBuilding } from '../../data/buildings/actions'
import {
  CATACOMBS_MAX_LEVEL,
  CATACOMBS_MAX_UNDEAD,
  CATACOMBS_SOUL_COST,
  CATACOMBS_UPGRADE_COST,
} from '../../config/constants'

const reanimateButton = css({
  alignSelf: 'center',
})

const reanimateIcon = css({
  width: '3rem',
})

export const Catacombs = () => {
  const { t } = useTranslation()
  const { level } = useSelector(getCatacombs)
  const dispatch = useDispatch()

  const handleUpgrade = () => dispatch(upgradeBuilding('catacombs'))

  return (
    <div css={buildingWrapper}>
      <button css={[...cyanSquareButton, reanimateButton]} type="button">
        <img css={reanimateIcon} src={reanimateIconUrl} alt="" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('catacomb')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', level)}</p>
        {level > 0 && <p>{t('catacombDescription', 0, CATACOMBS_MAX_UNDEAD[level], CATACOMBS_SOUL_COST[level])}</p>}
        {level < CATACOMBS_MAX_LEVEL && (
          <div css={buildingUpgradeContainer}>
            <div css={buildingUpgradeFrame}>
              <div css={buildingUpgradeArrow}>{t('buildingLevel', level + 1)}</div>
              <span>
                {level === 0
                  ? t('catacombUnlock')
                  : t('catacombUpgrade', CATACOMBS_MAX_UNDEAD[level + 1] - CATACOMBS_MAX_UNDEAD[level])}
              </span>
            </div>
            <button type="button" css={buildingUpgradeButton} onClick={handleUpgrade}>
              <img css={buildingResourceCost} src={resourcesIconUrl} alt="" />
              <span>{CATACOMBS_UPGRADE_COST[level + 1]}</span>
            </button>
          </div>
        )}
      </Panel>
    </div>
  )
}
