import React from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { useTranslation } from '../../../lang/useTranslation'
import { getCursedUndeads } from '../../../data/undeads/selectors'
import { UndeadBox } from '../../../components/undeads/UndeadBox'
import { h2Title } from '../../../styles/base'
import { cleanseUndead } from '../../../data/undeads/actions'
import { Undead } from '../../../data/undeads/helpers'
import { CharnelHouse } from '../../../data/buildings/helpers'
import { spendResources } from '../../../data/resources/actions'
import { ResourceType } from '../../../config/constants'

const noTargets = css({
  margin: '1rem',
  textAlign: 'center',
})

export type CleanseUndeadModalProps = {
  charnelHouse: CharnelHouse
  isOpen: boolean
  onClose: () => void
}

export const CleanseUndeadModal = ({ charnelHouse, isOpen, onClose }: CleanseUndeadModalProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cursedUndeads = useSelector(getCursedUndeads)

  const handleCleanseUndead = (undead: Undead) => () => {
    dispatch(spendResources({ [ResourceType.Meat]: charnelHouse.cleansingCost }))
    dispatch(cleanseUndead(undead.id))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.PURPLE}>
      <h2 css={h2Title}>{t('cleanseUndead')}</h2>
      {cursedUndeads.map(undead => (
        <UndeadBox key={undead.id} undead={undead} onClick={handleCleanseUndead(undead)} shouldConfirmAction={false} />
      ))}
      {cursedUndeads.length === 0 && <div css={noTargets}>{t('noTargetsToCleanse')}</div>}
    </Modal>
  )
}
