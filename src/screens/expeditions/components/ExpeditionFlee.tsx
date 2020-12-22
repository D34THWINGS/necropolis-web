import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { greenBox, smallMarginTop, textCenter } from '../../../styles/base'
import { PaladinsIcon } from '../../../components/images/PaladinsIcon'
import { useTranslation } from '../../../lang/useTranslation'
import { fleeExpedition } from '../../../data/expeditions/actions'
import { greenSquareButton } from '../../../styles/buttons'
import { getPaladinsCounter } from '../../../data/paladins/selectors'
import { preventSelectorUpdate } from '../../../data/helpers'

export type ExpeditionFleeProps = {
  onFlee: () => void
}

export const ExpeditionFlee = ({ onFlee }: ExpeditionFleeProps) => {
  const { t } = useTranslation()
  const paladinsCounter = useSelector(getPaladinsCounter, preventSelectorUpdate)
  const dispatch = useDispatch()

  const handleFlee = () => {
    dispatch(fleeExpedition())
    onFlee()
  }

  return (
    <>
      <div css={greenBox}>
        {t('fleeExpeditionDescription')}
        <p css={textCenter}>
          <PaladinsIcon counter={paladinsCounter + 1} />
        </p>
      </div>
      <button type="button" css={[...greenSquareButton, smallMarginTop]} onClick={handleFlee}>
        {t('fleeExpeditionButton')}
      </button>
    </>
  )
}
