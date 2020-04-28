/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalColor } from '../ui/Modal'
import { getUndeads, getUpkeep } from '../../data/undeads/selectors'
import { getMeat } from '../../data/resources/selectors'
import { h2Title } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { UndeadBox } from './UndeadBox'
import { killUndead } from '../../data/undeads/actions'
import { getCurrentPhase } from '../../data/turn/selectors'
import { TurnPhase, UndeadType } from '../../config/constants'

export const UndeadUpkeep = () => {
  const { t } = useTranslation()
  const meat = useSelector(getMeat)
  const upkeep = useSelector(getUpkeep)
  const undeads = useSelector(getUndeads)
  const phase = useSelector(getCurrentPhase)
  const dispatch = useDispatch()

  const handleBan = (type: UndeadType) => () => dispatch(killUndead(type))

  return (
    <Modal isOpen={upkeep > meat && phase === TurnPhase.Upkeep} color={ModalColor.PURPLE}>
      <h2 css={h2Title}>{t('upkeepTitle')}</h2>
      <p>{t('upkeepInsufficient', upkeep, meat)}</p>
      {undeads.map(undead => (
        <UndeadBox key={undead.type} undead={undead} onBan={handleBan(undead.type)} />
      ))}
    </Modal>
  )
}
