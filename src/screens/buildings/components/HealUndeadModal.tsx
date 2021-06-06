import React from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalColor } from '../../../components/ui/Modal/modalStyles'
import { useTranslation } from '../../../lang/useTranslation'
import { getInjuredUndeads } from '../../../data/undeads/selectors'
import { UndeadBox } from '../../../components/undeads/UndeadBox'
import { h2Title } from '../../../styles/base'
import { Undead } from '../../../data/undeads/helpers'

const noTargets = css({
  margin: '1rem',
  textAlign: 'center',
})

export type HealUndeadModalProps = {
  isOpen: boolean
  onClose: () => void
  onHeal: (undead: Undead) => void
}

export const HealUndeadModal = ({ isOpen, onClose, onHeal }: HealUndeadModalProps) => {
  const { t } = useTranslation()
  const injuredUndeads = useSelector(getInjuredUndeads)

  const handleHealUndead = (undead: Undead) => () => {
    onHeal(undead)
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
