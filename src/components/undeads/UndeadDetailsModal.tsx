import React from 'react'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { Undead } from '../../data/undeads/helpers'
import { layers } from '../../config/theme'
import { UndeadDetails } from './UndeadDetails'

export type UndeadDetailsModalProps = {
  undead: Undead | null
  onClose: () => void
  showAssault?: boolean
  showExpedition?: boolean
}

export const UndeadDetailsModal = ({ undead, onClose, showAssault, showExpedition }: UndeadDetailsModalProps) => (
  <Modal isOpen={!!undead} color={ModalColor.PURPLE} onClose={onClose} priority={layers.UNDEAD_OVERLAY}>
    {undead && (
      <UndeadDetails
        undead={undead}
        showExpedition={showExpedition}
        showAssault={showAssault}
        onCastAbility={onClose}
      />
    )}
  </Modal>
)
