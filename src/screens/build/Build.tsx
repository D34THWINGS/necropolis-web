/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Building } from './Building'
import { useTranslation } from '../../lang/useTranslation'
import { textColor } from '../../styles/base'
import { BATTLEMENTS, CATACOMBS, CHARNEL_HOUSE, OSSUARY, SOUL_WELL } from '../../config/routes'

const buildWrapper = css({
  padding: '0 1rem',
})

export const Build = () => {
  const { t } = useTranslation()

  return (
    <div css={buildWrapper}>
      <Building
        name={t('charnelHouse')}
        level={1}
        description={t('charnelHouseDescription', <span css={textColor('RED')}>{t('fleshAmount', 1)}</span>)}
        route={CHARNEL_HOUSE}
      />
      <Building
        name={t('catacomb')}
        level={1}
        description={t('catacombDescription', <span css={textColor('PURPLE')}>{t('undead')} (0/1)</span>)}
        route={CATACOMBS}
      />
      <Building
        name={t('soulWell')}
        level={1}
        description={t('soulWellDescription', <span css={textColor('BLUE')}>{t('soulAmount', 1)}</span>)}
        route={SOUL_WELL}
      />
      <Building name={t('ossuary')} level={1} description={t('ossuaryDescription')} locked route={OSSUARY} />
      <Building
        name={t('battlements')}
        level={1}
        description={t('battlementDescription', <span css={textColor('LIME')}>{t('defenseBonus', 4)}</span>)}
        locked
        route={BATTLEMENTS}
      />
    </div>
  )
}
