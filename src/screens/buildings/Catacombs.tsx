/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { textColor } from '../../styles/base'
import { cyanSquareButton } from '../../styles/buttons'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import { buildingLevel, buildingTitle, buildingWrapper } from './helpers/buildingsStyles'

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
        <p>{t('catacombDescription', <span css={textColor('PURPLE')}>{t('undead')} (0/1)</span>)}</p>
      </Panel>
    </div>
  )
}
