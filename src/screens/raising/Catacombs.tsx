/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Panel } from '../../components/ui/Panel'
import { useTranslation } from '../../lang/useTranslation'
import { textColor } from '../../helpers/styles'
import { shadows } from '../../config/theme'

const catacombsWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  height: '100%',
})

const catacombsTitle = [
  css({ margin: 0, textAlign: 'center', fontSize: '1.2rem', textShadow: shadows.TEXT_SOLID }),
  textColor('CYAN'),
]

const catacombsLevel = css({ margin: 0, textAlign: 'center', fontSize: '1.2rem', textShadow: shadows.TEXT_SOLID })

export const Catacombs = () => {
  const { t } = useTranslation()
  return (
    <div css={catacombsWrapper}>
      <Panel>
        <h2 css={catacombsTitle}>{t('catacomb')}</h2>
        <p css={catacombsLevel}>{t('buildingLevel', 1)}</p>
      </Panel>
    </div>
  )
}
