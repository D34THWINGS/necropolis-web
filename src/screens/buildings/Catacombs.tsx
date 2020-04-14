/** @jsx jsx */
import { css, jsx } from '@emotion/core'
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

const reanimateButton = css({
  alignSelf: 'center',
})

const reanimateIcon = css({
  width: '3rem',
})

export const Catacombs = () => {
  const { t } = useTranslation()
  return (
    <div css={buildingWrapper}>
      <button css={[...cyanSquareButton, reanimateButton]}>
        <img css={reanimateIcon} src={reanimateIconUrl} alt="" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('catacomb')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', 1)}</p>
        <p>{t('catacombDescription', 0, 1, 3)}</p>
        <div css={buildingUpgradeContainer}>
          <div css={buildingUpgradeFrame}>
            <div css={buildingUpgradeArrow}>{t('buildingLevel', 2)}</div>
            <span>{t('catacombUnlock')}</span>
          </div>
          <div css={buildingUpgradeButton}>
            <img css={buildingResourceCost} src={resourcesIconUrl} alt="" /> 2
          </div>
        </div>
      </Panel>
    </div>
  )
}
