import React, { useState } from 'react'
import { css } from '@emotion/react'
import { UndeadDetailsModal } from '../../../components/undeads/UndeadDetailsModal'
import { Undead } from '../../../data/undeads/helpers'
import { ExpeditionActionSheet } from './ExpeditionActionSheet'

const footer = css({
  display: 'flex',
  flexDirection: 'row-reverse',
  height: '3rem',
})

export const ExpeditionsFooter = () => {
  const [openedUndead, setOpenedUndead] = useState<Undead | null>(null)

  const handleCloseDetails = () => setOpenedUndead(null)

  return (
    <div css={footer}>
      <ExpeditionActionSheet />
      <UndeadDetailsModal undead={openedUndead} onClose={handleCloseDetails} showExpedition />
    </div>
  )
}
