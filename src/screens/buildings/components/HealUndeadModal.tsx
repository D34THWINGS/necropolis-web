import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { useTranslation } from '../../../lang/useTranslation'
import { getInjuredUndeads } from '../../../data/undeads/selectors'
import { UndeadBox } from '../../../components/undeads/UndeadBox'
import { h2Title } from '../../../styles/base'
import { healUndead } from '../../../data/undeads/actions'
import { Undead } from '../../../data/undeads/helpers'
import { CharnelHouse } from '../../../data/buildings/helpers'
import { spendResources } from '../../../data/resources/actions'
import { ResourceType } from '../../../config/constants'
import { nextPhase } from '../../../data/turn/actions'

const noTargets = css({
  margin: '1rem',
  textAlign: 'center',
})

export type HealUndeadModalProps = {
  charnelHouse: CharnelHouse
  isOpen: boolean
  onClose: () => void
}

export const HealUndeadModal = ({ charnelHouse, isOpen, onClose }: HealUndeadModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const injuredUndeads = useSelector(getInjuredUndeads)

  const handleHealUndead = (undead: Undead) => () => {
    dispatch(spendResources({ [ResourceType.Meat]: charnelHouse.healingCost }))
    dispatch(healUndead(undead.id, charnelHouse.healingAmount))
    dispatch(nextPhase())
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.PURPLE}>
      <h2 css={h2Title}>{t('healUndead')}</h2>
      {injuredUndeads.map(undead => (
        <UndeadBox key={undead.id} undead={undead} onClick={handleHealUndead(undead)} shouldConfirmAction={false} />
      ))}
      {injuredUndeads.length === 0 && <div css={noTargets}>{t('noTargetsToHeal')}</div>}
    </Modal>
  )
}
