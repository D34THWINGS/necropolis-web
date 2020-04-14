/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { cyanSquareButton } from '../../styles/buttons'
import researchIconUrl from '../../assets/images/icons/research.png'
import { buildingLevel, buildingTitle, buildingWrapper } from './helpers/buildingsStyles'

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
        <p>{t('ossuaryDescription')}</p>
      </Panel>
    </div>
  )
}
