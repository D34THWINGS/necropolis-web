import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { getAliveUndeads, getUpkeep } from '../../data/undeads/selectors'
import { getMeat } from '../../data/resources/selectors'
import { h2Title } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { UndeadBox } from './UndeadBox'
import { sacrificeUndead } from '../../data/undeads/actions'
import { getCurrentPhase } from '../../data/turn/selectors'
import { TurnPhase } from '../../config/constants'
import { Undead } from '../../data/undeads/helpers'

export const UndeadUpkeep = () => {
  const { t } = useTranslation()
  const meat = useSelector(getMeat)
  const upkeep = useSelector(getUpkeep)
  const undeads = useSelector(getAliveUndeads)
  const phase = useSelector(getCurrentPhase)
  const dispatch = useDispatch()

  const handleBan = (undeadId: Undead['id']) => () => dispatch(sacrificeUndead(undeadId))

  return (
    <Modal isOpen={meat > 0 && upkeep > meat && phase === TurnPhase.Upkeep} color={ModalColor.PURPLE}>
      <h2 css={h2Title}>{t('upkeepTitle')}</h2>
      <p>{t('upkeepInsufficient', upkeep, meat)}</p>
      {undeads.map(undead => (
        <UndeadBox
          key={undead.type}
          undead={undead}
          onClick={handleBan(undead.id)}
          renderConfirmText={name => t('confirmUndeadSacrifice', name)}
        />
      ))}
    </Modal>
  )
}
