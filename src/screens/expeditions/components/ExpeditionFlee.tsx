/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { greenBox, smallMarginTop, textCenter } from '../../../styles/base'
import { PaladinsIcon } from '../../../components/images/PaladinsIcon'
import { useTranslation } from '../../../lang/useTranslation'
import { fleeExpedition } from '../../../data/expeditions/actions'
import { greenSquareButton } from '../../../styles/buttons'
import { getPaladinsCounter } from '../../../data/paladins/selectors'

export const ExpeditionFlee = () => {
  const { t } = useTranslation()
  const paladinsCounter = useSelector(getPaladinsCounter)
  const dispatch = useDispatch()

  const handleFlee = () => dispatch(fleeExpedition())

  return (
    <Fragment>
      <div css={greenBox}>
        {t('fleeExpeditionDescription')}
        <p css={textCenter}>
          <PaladinsIcon counter={paladinsCounter + 1} />
        </p>
      </div>
      <button type="button" css={[...greenSquareButton, smallMarginTop]} onClick={handleFlee}>
        {t('fleeExpeditionButton')}
      </button>
    </Fragment>
  )
}
