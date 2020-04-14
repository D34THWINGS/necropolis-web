/** @jsx jsx */
import { css, jsx } from '@emotion/core'
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

const researchButton = css({
  alignSelf: 'center',
})

const researchIcon = css({
  width: '3rem',
})

export const Ossuary = () => {
  const { t } = useTranslation()
  return (
    <div css={buildingWrapper}>
      <button css={[...cyanSquareButton, researchButton]}>
        <img css={researchIcon} src={researchIconUrl} alt="" />
      </button>
      <Panel>
        <h2 css={buildingTitle}>{t('ossuary')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', 1)}</p>
        <p>{t('ossuaryDescription', 3)}</p>
        <div css={buildingUpgradeContainer}>
          <div css={buildingUpgradeFrame}>
            <div css={buildingUpgradeArrow}>{t('buildingLevel', 2)}</div>
            <span>{t('ossuaryUnlock')}</span>
          </div>
          <div css={buildingUpgradeButton}>
            <img css={buildingResourceCost} src={resourcesIconUrl} alt="" /> 2
          </div>
        </div>
      </Panel>
    </div>
  )
}
