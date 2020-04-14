/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { textColor } from '../../styles/base'
import { buildingLevel, buildingTitle, buildingWrapper } from './helpers/buildingsStyles'

export const Battlements = () => {
  const { t } = useTranslation()
  return (
    <div css={buildingWrapper}>
      <Panel>
        <h2 css={buildingTitle}>{t('battlements')}</h2>
        <p css={buildingLevel}>{t('buildingLevel', 1)}</p>
        <p>{t('battlementDescription', <span css={textColor('LIME')}>{t('defenseBonus', 4)}</span>)}</p>
      </Panel>
    </div>
  )
}
