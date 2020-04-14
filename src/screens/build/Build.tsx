/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Building } from './Building'
import { useTranslation } from '../../lang/useTranslation'
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
        description={t('charnelHouseDescription', 1, 0, 3)}
        route={CHARNEL_HOUSE}
      />
      <Building name={t('catacomb')} level={1} description={t('catacombDescription', 0, 1, 3)} route={CATACOMBS} />
      <Building name={t('soulWell')} level={1} description={t('soulWellDescription', 1)} route={SOUL_WELL} />
      <Building name={t('ossuary')} level={1} description={t('ossuaryDescription', 3)} locked route={OSSUARY} />
      <Building
        name={t('battlements')}
        level={1}
        description={t('battlementDescription', 4)}
        locked
        route={BATTLEMENTS}
      />
    </div>
  )
}
